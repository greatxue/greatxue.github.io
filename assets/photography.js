(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const galleries = new Map();

    function setupGallery(gallery) {
        const track = gallery.querySelector('.photo-track');
        const controls = gallery.querySelector('.gallery-controls');
        const previous = gallery.querySelector('[data-photo-prev]');
        const next = gallery.querySelector('[data-photo-next]');
        let destination = null;

        function updateControls() {
            const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
            controls.hidden = maximum <= 2;
            previous.disabled = track.scrollLeft <= 2;
            next.disabled = track.scrollLeft >= maximum - 2;

            if (destination !== null && Math.abs(track.scrollLeft - destination) <= 2) {
                destination = null;
            }
        }

        function scrollToPosition(position) {
            destination = position;
            track.scrollTo({
                left: position,
                behavior: reducedMotion.matches ? 'instant' : 'smooth',
            });
        }

        function move(direction) {
            if (!track.firstElementChild) return;

            const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
            const origin = track.firstElementChild.getBoundingClientRect().left;
            const positions = Array.from(track.children, (item) =>
                Math.min(maximum, item.getBoundingClientRect().left - origin)
            );
            const current = destination === null ? track.scrollLeft : destination;
            const position = direction > 0
                ? positions.find((offset) => offset > current + 2)
                : positions.reverse().find((offset) => offset < current - 2);
            const boundary = direction > 0 ? maximum : 0;
            scrollToPosition(position === undefined ? boundary : position);
        }

        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        track.addEventListener('scroll', updateControls, { passive: true });
        track.addEventListener('scrollend', () => { destination = null; });
        ['pointerdown', 'wheel', 'focusin'].forEach((event) => {
            track.addEventListener(event, () => { destination = null; }, { passive: true });
        });

        track.addEventListener('keydown', (event) => {
            if (event.target !== track) return;

            switch (event.key) {
                case 'ArrowLeft': move(-1); break;
                case 'ArrowRight': move(1); break;
                case 'Home': scrollToPosition(0); break;
                case 'End': scrollToPosition(track.scrollWidth - track.clientWidth); break;
                default: return;
            }
            event.preventDefault();
        });

        function refresh() {
            destination = null;
            updateControls();
        }

        if ('ResizeObserver' in window) {
            const observer = new ResizeObserver(refresh);
            observer.observe(track);
            Array.from(track.children).forEach((item) => observer.observe(item));
        } else {
            window.addEventListener('resize', refresh);
        }
        track.addEventListener('load', refresh, true);
        document.fonts?.ready.then(refresh);
        updateControls();
        return refresh;
    }

    document.querySelectorAll('[data-photo-gallery]').forEach((gallery) => {
        galleries.set(gallery, setupGallery(gallery));
    });

    document.querySelectorAll('[data-photo-album]').forEach((trigger) => {
        const dialog = document.getElementById(trigger.dataset.photoAlbum);
        if (!dialog) return;

        const track = dialog.querySelector('.photo-track');
        let previousOverflow = '';
        let startedOutside = false;

        function outsideDialog(event) {
            const rect = dialog.getBoundingClientRect();
            return event.target === dialog && (
                event.clientX < rect.left || event.clientX > rect.right ||
                event.clientY < rect.top || event.clientY > rect.bottom
            );
        }

        trigger.addEventListener('click', () => {
            if (dialog.open) return;
            previousOverflow = document.documentElement.style.overflow;
            dialog.showModal();
            document.documentElement.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                if (!dialog.open) return;
                galleries.get(dialog.querySelector('[data-photo-gallery]'))();
                track.focus({ preventScroll: true });
            });
        });

        dialog.querySelector('[data-album-close]').addEventListener('click', () => dialog.close());
        dialog.addEventListener('pointerdown', (event) => { startedOutside = outsideDialog(event); });
        dialog.addEventListener('pointercancel', () => { startedOutside = false; });
        dialog.addEventListener('click', (event) => {
            if (startedOutside && outsideDialog(event)) dialog.close();
            startedOutside = false;
        });
        dialog.addEventListener('close', () => {
            document.documentElement.style.overflow = previousOverflow;
            trigger.focus({ preventScroll: true });
        });
    });
})();

document.querySelectorAll('[data-writing-gallery]').forEach((gallery) => {
    const track = gallery.querySelector('.writing-gallery-track');
    const controls = gallery.querySelector('.gallery-controls');
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let destination = null;

    function updateControls() {
        const maximum = track.scrollWidth - track.clientWidth;
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

        const maximum = track.scrollWidth - track.clientWidth;
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

    // Native gestures and focus navigation take over from an animated button click.
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
});

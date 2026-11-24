const abstracts = Array.from(document.querySelectorAll('.paper-abstract'), (button) => ({
    button,
    panel: document.getElementById(button.getAttribute('aria-controls')),
})).filter(({ panel }) => panel);

function setAbstractExpanded({ button, panel }, expanded) {
    panel.hidden = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
}

abstracts.forEach((abstract) => {
    const { button, panel } = abstract;
    setAbstractExpanded(abstract, false);
    button.hidden = false;

    button.addEventListener('click', () => {
        const open = panel.hidden;
        abstracts.forEach((item) => {
            setAbstractExpanded(item, item === abstract && open);
        });
    });
});

const pendingCodes = Array.from(document.querySelectorAll('.paper-code-pending'), (button) => ({
    button,
    status: document.getElementById(button.getAttribute('aria-controls')),
})).filter(({ status }) => status);

function setCodeExpanded({ button, status }, expanded) {
    status.hidden = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
}

pendingCodes.forEach((code) => {
    const { button, status } = code;
    setCodeExpanded(code, false);
    button.hidden = false;
    button.addEventListener('click', () => {
        setCodeExpanded(code, status.hidden);
    });
});

const publicationList = document.getElementById('publication-list');
const publicationViews = Array.from(document.querySelectorAll('[data-publication-view]'))
    .filter((button) => ['selected', 'full'].includes(button.dataset.publicationView));

if (publicationList && publicationViews.some((button) => button.dataset.publicationView === 'selected')
    && publicationViews.some((button) => button.dataset.publicationView === 'full')) {
    const papers = Array.from(publicationList.querySelectorAll('.paper'));

    function setPublicationView(view) {
        papers.forEach((paper) => {
            paper.hidden = view !== 'full' && paper.dataset.selected !== 'true';
            if (!paper.hidden) return;

            abstracts.forEach((abstract) => {
                if (paper.contains(abstract.panel)) setAbstractExpanded(abstract, false);
            });
            pendingCodes.forEach((code) => {
                if (paper.contains(code.status)) setCodeExpanded(code, false);
            });
        });
        publicationViews.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.publicationView === view));
        });
    }

    function revealHashTarget() {
        let fragment = window.location.hash.slice(1);
        if (!fragment) return;
        try {
            fragment = decodeURIComponent(fragment);
        } catch {
            // A malformed escape must not prevent the controls from initializing.
        }

        const target = document.getElementById(fragment);
        const paper = target && target.closest('.paper');
        if (!paper || !publicationList.contains(paper)) return;

        let revealed = paper.hidden;
        if (paper.dataset.selected !== 'true') setPublicationView('full');

        const targetAbstract = abstracts.find(({ panel }) => panel.contains(target));
        if (targetAbstract && targetAbstract.panel.hidden) {
            abstracts.forEach((abstract) => {
                setAbstractExpanded(abstract, abstract === targetAbstract);
            });
            revealed = true;
        }
        const targetCode = pendingCodes.find(({ status }) => status.contains(target));
        if (targetCode && targetCode.status.hidden) {
            setCodeExpanded(targetCode, true);
            revealed = true;
        }

        if (revealed) {
            window.requestAnimationFrame(() => {
                if (!paper.hidden) target.scrollIntoView({ block: 'start' });
            });
        }
    }

    publicationViews.forEach((button) => {
        button.addEventListener('click', () => {
            setPublicationView(button.dataset.publicationView);
        });
    });
    setPublicationView('selected');
    revealHashTarget();
    publicationViews.forEach((button) => { button.hidden = false; });
    window.addEventListener('hashchange', revealHashTarget);
}

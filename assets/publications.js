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

document.querySelectorAll('.paper-code-pending').forEach((button) => {
    const status = document.getElementById(button.getAttribute('aria-controls'));
    if (!status) return;

    button.hidden = false;
    button.addEventListener('click', () => {
        status.hidden = !status.hidden;
        button.setAttribute('aria-expanded', String(!status.hidden));
    });
});

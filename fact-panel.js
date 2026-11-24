const factUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

class FactPanel extends HTMLElement {
    static get observedAttributes() {
        return ['compact'];
    }

    connectedCallback() {
        // only build the panel once, even if the element is moved on the page
        if (this.factText) {
            return;
        }

        const heading = document.createElement('h3');
        heading.textContent = 'Random Fact';

        this.description = document.createElement('p');
        this.description.textContent = 'Browse random facts.';

        this.factText = document.createElement('p');
        this.factText.className = 'fact-text';
        this.factText.textContent = 'No fact loaded yet.';

        this.nextButton = document.createElement('button');
        this.nextButton.type = 'button';
        this.nextButton.textContent = 'Next fact';

        this.status = document.createElement('p');
        this.status.setAttribute('role', 'status');

        this.appendChild(heading);
        this.appendChild(this.description);
        this.appendChild(this.factText);
        this.appendChild(this.nextButton);
        this.appendChild(this.status);

        const panel = this;
        this.nextButton.addEventListener('click', function () {
            panel.loadFact();
        });

        // the compact attribute may already be set before the panel is built
        this.description.hidden = this.hasAttribute('compact');

        // load the first fact when the panel appears
        this.loadFact();
    }

    async loadFact() {
        this.nextButton.disabled = true;
        this.status.textContent = 'Loading...';

        try {
            const response = await fetch(factUrl);
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            const data = await response.json();
            if (typeof data.text !== 'string' || data.text.trim() === '') {
                throw new Error('The response did not include a fact.');
            }

            this.factText.textContent = data.text;
            this.status.textContent = 'Fact updated.';
        } catch (error) {
            // the old fact stays on the screen, so only the status changes
            this.status.textContent = 'Unable to load fact. Try again.';
        } finally {
            this.nextButton.disabled = false;
        }
    }

    attributeChangedCallback(name) {
        // only hide or show the description, so the current fact stays the same
        if (name === 'compact' && this.description) {
            this.description.hidden = this.hasAttribute('compact');
        }
    }
}

customElements.define('fact-panel', FactPanel);

const modeKey = 'hw5-fact-panel-mode';
const compactButton = document.querySelector('#compact-toggle');
const factPanel = document.querySelector('fact-panel');

let mode = 'expanded';

try {
    const savedMode = localStorage.getItem(modeKey);
    // only use the saved value if it is one of the two modes
    if (savedMode === 'compact' || savedMode === 'expanded') {
        mode = savedMode;
    }
} catch (error) {
    // localStorage is blocked, so start in expanded mode
}

function updateCompactButton() {
    if (factPanel.hasAttribute('compact')) {
        compactButton.textContent = 'Expanded view';
    } else {
        compactButton.textContent = 'Compact view';
    }
}

// setting the attribute runs attributeChangedCallback, which hides or shows the description
factPanel.toggleAttribute('compact', mode === 'compact');
updateCompactButton();
compactButton.hidden = false;

compactButton.addEventListener('click', function () {
    factPanel.toggleAttribute('compact');
    updateCompactButton();

    if (factPanel.hasAttribute('compact')) {
        mode = 'compact';
    } else {
        mode = 'expanded';
    }

    try {
        localStorage.setItem(modeKey, mode);
    } catch (error) {
        // can't save the mode, but it still changes on this page
    }
});

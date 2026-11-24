let theme = 'light';

try {
    if (localStorage.getItem('theme') === 'dark') {
        theme = 'dark';
    }
} catch (error) {
    // localStorage is blocked, so start with the light theme
}

// this runs in the <head>, so the saved theme is applied before the page shows
if (theme === 'dark') {
    document.documentElement.classList.add('dark');
}

function switchTheme() {
    if (theme === 'dark') {
        theme = 'light';
        document.documentElement.classList.remove('dark');
    } else {
        theme = 'dark';
        document.documentElement.classList.add('dark');
    }
    updateButton();

    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        // can't save the theme, but it still changes on this page
    }
}

function updateButton() {
    const themeButton = document.querySelector('#theme-toggle');
    if (theme === 'dark') {
        themeButton.textContent = 'Switch to light theme';
    } else {
        themeButton.textContent = 'Switch to dark theme';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeButton = document.querySelector('#theme-toggle');
    themeButton.hidden = false;
    updateButton();

    themeButton.addEventListener('click', function () {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (document.startViewTransition && !reduceMotion) {
            document.startViewTransition(switchTheme);
        } else {
            switchTheme();
        }
    });
});

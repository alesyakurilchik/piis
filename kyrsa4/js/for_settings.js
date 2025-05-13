// Settings Navigation
const settingsNavLinks = document.querySelectorAll('.settings-nav__link');
const settingsSections = document.querySelectorAll('.settings-section');

if (settingsNavLinks.length > 0) {
    settingsNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            settingsNavLinks.forEach(l => l.classList.remove('settings-nav__link--active'));

            // Add active class to clicked link
            link.classList.add('settings-nav__link--active');

            // Hide all sections
            settingsSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show corresponding section
            const sectionId = link.getAttribute('href').substring(1);
            document.getElementById(sectionId).style.display = 'block';

            // Scroll to section
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Theme Toggle
const lightThemeRadio = document.getElementById('lightTheme');
const darkThemeRadio = document.getElementById('darkTheme');
const systemThemeRadio = document.getElementById('systemTheme');

if (lightThemeRadio && darkThemeRadio && systemThemeRadio) {
    lightThemeRadio.addEventListener('change', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    });

    darkThemeRadio.addEventListener('change', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    });

    systemThemeRadio.addEventListener('change', () => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
        localStorage.setItem('theme', 'system');
    });
}

// Font Size Toggle
const smallFontRadio = document.getElementById('smallFont');
const mediumFontRadio = document.getElementById('mediumFont');
const largeFontRadio = document.getElementById('largeFont');

if (smallFontRadio && mediumFontRadio && largeFontRadio) {
    smallFontRadio.addEventListener('change', () => {
        document.documentElement.style.fontSize = '14px';
        localStorage.setItem('fontSize', 'small');
    });

    mediumFontRadio.addEventListener('change', () => {
        document.documentElement.style.fontSize = '16px';
        localStorage.setItem('fontSize', 'medium');
    });

    largeFontRadio.addEventListener('change', () => {
        document.documentElement.style.fontSize = '18px';
        localStorage.setItem('fontSize', 'large');
    });
}

// Initialize settings based on localStorage
window.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' && lightThemeRadio) {
        lightThemeRadio.checked = true;
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else if (savedTheme === 'dark' && darkThemeRadio) {
        darkThemeRadio.checked = true;
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'system' && systemThemeRadio) {
        systemThemeRadio.checked = true;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }

    // Font Size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize === 'small' && smallFontRadio) {
        smallFontRadio.checked = true;
        document.documentElement.style.fontSize = '14px';
    } else if (savedFontSize === 'medium' && mediumFontRadio) {
        mediumFontRadio.checked = true;
        document.documentElement.style.fontSize = '16px';
    } else if (savedFontSize === 'large' && largeFontRadio) {
        largeFontRadio.checked = true;
        document.documentElement.style.fontSize = '18px';
    }
});
// i18n hydration for Cat Scratches extension settings page
'use strict';

function localizeHTML() {
    // Replace textContent for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const msg = browser.i18n.getMessage(key);
        if (msg) el.textContent = msg;
    });

    // Replace placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const msg = browser.i18n.getMessage(key);
        if (msg) el.placeholder = msg;
    });

    // Replace innerHTML for elements with links or formatting
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const msg = browser.i18n.getMessage(key);
        if (msg) el.innerHTML = msg;
    });

    // Replace aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const msg = browser.i18n.getMessage(key);
        if (msg) el.setAttribute('aria-label', msg);
    });

    // Set HTML lang attribute
    document.documentElement.lang = browser.i18n.getUILanguage();
}

document.addEventListener('DOMContentLoaded', localizeHTML);

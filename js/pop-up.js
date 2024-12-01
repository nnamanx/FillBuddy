// File: js/pop-up.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('FillBuddy content script loaded.');

    const formFields = {
        firstname: 'Turkana',
        lastname: 'Aliyeva',
        email: 'turkanaaliyeva@example.com',
        phone: '123-456-7890',
        address: 'ADA Uni',
        city: 'Baku',
        zip: '12345',
        linkedin: 'https://linkedin.com/in/turkanaaliyeva',
        github: 'https://github.com/turkanaaliyeva',
        website: 'https://google.com'
    };

    for (const [id, value] of Object.entries(formFields)) {
        const input = document.getElementById(id);
        if (input) {
            input.value = value;
        }
    }

    const openDashboardButton = document.getElementById('openDashboard');
    const generateCoverLetterButton = document.getElementById('generateCoverLetter');

    // Listener to open the Dashboard page in a new tab
    openDashboardButton.addEventListener('click', () => {
        console.log('Open Dashboard button clicked');
        chrome.tabs.create({ url: chrome.runtime.getURL('main.html') }, (tab) => {
            console.log('Dashboard tab created', tab);
        });
    });

    // Listener to open the Cover Letter Generator page in a new tab
    generateCoverLetterButton.addEventListener('click', () => {
        console.log('Generate Cover Letter button clicked');
        chrome.tabs.create({ url: chrome.runtime.getURL('cover-letter.html') }, (tab) => {
            console.log('Cover Letter tab created', tab);
        });
    });
});

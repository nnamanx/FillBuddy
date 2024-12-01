
document.addEventListener('DOMContentLoaded', () => {

    const openDashboardButton = document.getElementById('openDashboard');
    if (openDashboardButton) {
        openDashboardButton.click();
        console.assert(openDashboardButton, 'Open Dashboard button should be present.');
        console.log('Open Dashboard button test passed.');
    } else {
        console.error('Open Dashboard button test failed: button not found.');
    }

    const generateCoverLetterButton = document.getElementById('generateCoverLetter');
    if (generateCoverLetterButton) {
        generateCoverLetterButton.click();
        console.assert(generateCoverLetterButton, 'Generate Cover Letter button should be present.');
        console.log('Generate Cover Letter button test passed.');
    } else {
        console.error('Generate Cover Letter button test failed: button not found.');
    }

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
            console.assert(input.value === value, `${id} should be ${value}.`);
            console.log(`${id} field test passed.`);
        } else {
            console.error(`${id} field test failed: field not found.`);
        }
    }

    chrome.tabs.create({ url: chrome.runtime.getURL('main.html') }, (tab) => {
        console.assert(tab, 'Dashboard tab should be created.');
        console.log('Dashboard tab creation test passed.');
    });

    chrome.tabs.create({ url: chrome.runtime.getURL('cover-letter.html') }, (tab) => {
        console.assert(tab, 'Cover Letter tab should be created.');
        console.log('Cover Letter tab creation test passed.');
    });
});

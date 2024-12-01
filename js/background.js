
chrome.runtime.onInstalled.addListener(() => {
    console.log('FillBuddy extension installed.');

    chrome.action.onClicked.addListener((tab) => {
        chrome.tabs.create({ url: 'main.html' });
    });

    chrome.storage.local.set({ installed: true }, () => {
        console.log('Extension installation status saved.');
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProfileData') {
        chrome.storage.local.get(['profileData'], (result) => {
            sendResponse({ profileData: result.profileData });
        });
        return true; 
    }
});
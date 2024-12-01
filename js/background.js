chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "generateCoverLetter") {
        const { jobTitle, companyName, userProfile } = message.data;

        // Example API endpoint for generating cover letters
        const apiUrl = "https://ai.google.dev/free-api-for-cover-letters";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_title: jobTitle,
                    company_name: companyName,
                    user_profile: userProfile
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch cover letter");
            }

            const coverLetterData = await response.json();
            sendResponse({ success: true, coverLetter: coverLetterData.cover_letter });
        } catch (error) {
            console.error("Error generating cover letter:", error);
            sendResponse({ success: false, error: error.message });
        }
    }
    return true; 
});


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: main,
        args: []
    });
});

function main() {
    if (autofill_manager.popup !== null) {
        autofill_manager.popup.show_popup();
    } else {
        console.log("reload the page");
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "open edit page") {
        chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
    }
});

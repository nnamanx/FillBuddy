document.addEventListener("DOMContentLoaded", () => {
    loadDataFields();

    document.getElementById("save").addEventListener("click", saveProfile);
    document.getElementById("fill-form").addEventListener("click", fillForm);
});

function loadDataFields() {
    // Load user data from local storage and populate fields
    chrome.storage.local.get("userProfile", (data) => {
        const profile = data.userProfile || {};
        const fieldsContainer = document.getElementById("data-fields");

        // Example of dynamic field creation
        Object.keys(profile).forEach((key) => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = profile[key];
            input.placeholder = key;
            fieldsContainer.appendChild(input);
        });
    });
}

function saveProfile() {
    const inputs = document.querySelectorAll("#data-fields input");
    const profile = {};

    inputs.forEach((input) => {
        profile[input.placeholder] = input.value;
    });

    // Store user profile in local storage
    chrome.storage.local.set({ userProfile: profile }, () => {
        console.log("Profile saved!");
    });
}

function fillForm() {
    // Logic to fill the active form with user data
    // This will require accessing the content script
    console.log("Filling form...");
}

document.addEventListener("DOMContentLoaded", () => {
    const profileSelect = document.getElementById("profileSelect");
    const newProfileButton = document.getElementById("newProfileButton");
    const fields = ["firstname", "lastname", "email", "phone", "address", "city", "zip", "linkedin", "github", "website"];

    loadProfiles();

    newProfileButton.addEventListener("click", () => {
        const profileName = prompt("Enter a name for the new profile:");
        if (profileName) {
            createProfile(profileName);
        }
    });

    profileSelect.addEventListener("change", () => {
        loadProfileData(profileSelect.value);
    });

    function loadProfiles() {
        const profiles = LocalStorageManager.getData("profiles") || [];
        profileSelect.innerHTML = profiles.map(profile => `<option value="${profile}">${profile}</option>`).join('');
        if (profiles.length > 0) loadProfileData(profiles[0]); 
    }

    function createProfile(profileName) {
        let profiles = LocalStorageManager.getData("profiles") || [];
        profiles.push(profileName);
        LocalStorageManager.saveData("profiles", profiles);
        profileSelect.innerHTML += `<option value="${profileName}">${profileName}</option>`;
        saveProfileData(profileName);  
    }

    function loadProfileData(profileName) {
        fields.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            const profileData = LocalStorageManager.getData(`${profileName}_${fieldId}`);
            fieldElement.value = profileData || '';
        });
    }

    function saveProfileData(profileName) {
        fields.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            LocalStorageManager.saveData(`${profileName}_${fieldId}`, fieldElement.value);
        });
    }

    fields.forEach(fieldId => {
        const fieldElement = document.getElementById(fieldId);
        fieldElement.addEventListener("input", () => {
            saveProfileData(profileSelect.value); 
        });
    });
});

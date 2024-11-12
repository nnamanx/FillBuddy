document.addEventListener("DOMContentLoaded", () => {
    const profileSelect = document.getElementById("profileSelect");
    const createProfileButton = document.getElementById("createProfileButton");
    const newProfileNameInput = document.getElementById("newProfileName");
    const fields = ["firstname", "lastname", "email", "phone", "address", "city", "zip", "linkedin", "github", "website"];

    loadProfiles();

    createProfileButton.addEventListener("click", () => {
        const profileName = newProfileNameInput.value.trim();
        if (profileName) {
            createProfile(profileName);
            newProfileNameInput.value = ""; 
        } else {
            alert("Please enter a profile name.");
        }
    });

    profileSelect.addEventListener("change", () => {
        const selectedProfile = profileSelect.value;
        if (selectedProfile) {
            loadProfileData(selectedProfile);
        }
    });

    function loadProfiles() {
        const profiles = LocalStorageManager.getData("profiles") || [];
        profileSelect.innerHTML = profiles.map(profile => `<option value="${profile}">${profile}</option>`).join('');

        if (profiles.length > 0) {
            profileSelect.value = profiles[0];
            loadProfileData(profiles[0]);
        }
    }

    function createProfile(profileName) {
        let profiles = LocalStorageManager.getData("profiles") || [];
        if (!profiles.includes(profileName)) {
            profiles.push(profileName);
            LocalStorageManager.saveData("profiles", profiles);

            const option = document.createElement("option");
            option.value = profileName;
            option.textContent = profileName;
            profileSelect.appendChild(option);
            profileSelect.value = profileName;  

            saveProfileData(profileName);

            loadProfileData(profileName);
        } else {
            alert("Profile name already exists. Please choose a different name.");
        }
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
            const selectedProfile = profileSelect.value;
            if (selectedProfile) {
                saveProfileData(selectedProfile);
            }
        });
    });
});

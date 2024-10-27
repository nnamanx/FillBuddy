document.addEventListener("DOMContentLoaded", () => {
    loadDataFields();

    document.getElementById("save").addEventListener("click", saveProfile);
    document.getElementById("fill-form").addEventListener("click", fillForm);
});
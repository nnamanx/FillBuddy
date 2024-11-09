
document.addEventListener("DOMContentLoaded", () => {
    
    const fields = ["linkedin", "github", "website"];
  
    fields.forEach(fieldId => {
      const fieldElement = document.getElementById(fieldId);
      
      // taking from local storage
      const savedData = localStorage.getItem(fieldId);
      if (savedData) {
        fieldElement.value = savedData;
      }
      
      // updating local storage 
      fieldElement.addEventListener("input", () => {
        localStorage.setItem(fieldId, fieldElement.value);
      });
    });
  });
  
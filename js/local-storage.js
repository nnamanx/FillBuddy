const LocalStorageManager = {
    saveData: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    
    getData: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
    
    deleteData: (key) => {
      localStorage.removeItem(key);
    }
  };
  
  // example 
  LocalStorageManager.saveData("sampleKey", { name: "laman" });
  const retrievedData = LocalStorageManager.getData("sampleKey");
  // Should log: { name: "laman" }
  console.log(retrievedData); 
  LocalStorageManager.deleteData("sampleKey");
  
(function extractLinkedInData() {
  const linkedInData = {
    name: "Laman Khudadatzada",
    experience: "Backend Developer",
    education: "Bachelor's Degree in Computer Science"
  };

  localStorage.setItem("linkedInData", JSON.stringify(linkedInData));
})();

// UI variables
const closeBtn = document.querySelector("#cross");

// Event handler
closeBtn.addEventListener("click", () => {
  closeBtn.parentElement.remove();
});

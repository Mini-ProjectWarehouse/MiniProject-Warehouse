const filterButtonsContainer = document.querySelector(".filter-buttons");
const items = document.querySelectorAll(".item");

filterButtonsContainer.addEventListener("click", (event) => {
  const button = event.target;
  if (!button.classList.contains("filter-btn")) return;
  
  const buttons = filterButtonsContainer.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
  });

  button.classList.add("active");
  button.setAttribute("aria-pressed", "true");

  const filter = button.getAttribute("data-filter");

  items.forEach(item => {
    const category = item.getAttribute("data-container");
    if (filter === "all" || category === filter) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

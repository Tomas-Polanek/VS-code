const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

const header = document.querySelector("header");
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (header && toggleBtn && nav) {
  const links = nav.querySelectorAll("a");

  const closeMenu = () => {
    header.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.textContent = "☰";
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.textContent = isOpen ? "✕" : "☰";
  });

  
  links.forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    const clickedInside = header.contains(e.target);
    if (!clickedInside) closeMenu();
  });


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}
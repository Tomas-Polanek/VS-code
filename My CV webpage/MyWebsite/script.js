/* =========================
   REVEAL SECTIONS
========================= */
const revealTargets = document.querySelectorAll("section, #hero");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));


/* =========================
   MOBILE NAV TOGGLE
========================= */
const header = document.querySelector("header");
const toggleBtn = document.querySelector(".nav-toggle");
const navMenuLinks = document.querySelectorAll(".nav a");

if (header && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleBtn.textContent = isOpen ? "✕" : "☰";
  });

  navMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.textContent = "☰";
    });
  });
}


/* ===== DEBOUNCE HELPER ===== */
function debounce(fn, delay = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

/* ===== BREAKPOINT & DEVICE CHECK ===== */
const DESKTOP_BREAKPOINT = 768;

function isDesktop() {
  return window.innerWidth > DESKTOP_BREAKPOINT;
}

/* =========================
   ACTIVE NAV HIGHLIGHT
========================= */
const spySections = document.querySelectorAll("section[id]");
const spyNavLinks = document.querySelectorAll("nav a[href^='#']");

function setActive(id) {
  spyNavLinks.forEach((link) => link.classList.remove("active"));
  const active = document.querySelector(`nav a[href="#${id}"]`);
  if (active) active.classList.add("active");
}

function handleScroll() {
  const scrollPos = window.scrollY + 160;
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;

  if (window.scrollY < 50) {
    setActive("top");
    return;
  }

  if (window.scrollY + viewportHeight >= pageHeight - 5) {
    const lastSection = spySections[spySections.length - 1];
    if (lastSection) setActive(lastSection.id);
    return;
  }

  spySections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      setActive(section.id);
    }
  });
}

/* ===== CONDITIONAL SCROLL LISTENER ===== */
let scrollHandler = null;

function attachScrollListener() {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }

  scrollHandler = isDesktop()
    ? debounce(handleScroll, 80)
    : handleScroll;

  window.addEventListener("scroll", scrollHandler, { passive: true });
  handleScroll();
}

/* ===== INIT ===== */
attachScrollListener();

/* ===== RESPONSIVE REATTACH ===== */
window.addEventListener("resize", debounce(attachScrollListener, 150));


const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const blocked =
    (event.ctrlKey || event.metaKey) &&
    ["c", "s", "u", "p", "a"].includes(key);

  if (blocked || key === "f12") {
    event.preventDefault();
  }
});

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  nav?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".jlt-nav a").forEach((link) => {
  const linkPage = link.getAttribute("href")?.split("/").pop();
  link.classList.toggle("active", linkPage === currentPage);
});

const revealItems = document.querySelectorAll(".investor-section, .investor-disclaimer, .cta-band");

if ("IntersectionObserver" in window && revealItems.length) {
  document.body.classList.add("reveal-ready");
  revealItems.forEach((item) => item.classList.add("reveal-in"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

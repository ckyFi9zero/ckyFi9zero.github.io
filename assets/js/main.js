(() => {
  // Cache the shared root and navigation elements used by several interactions.
  const root = document.documentElement;
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Language and color-theme preferences are persisted across visits.
  document.querySelector(".language-toggle").addEventListener("click", () => {
    window.setSiteLanguage(root.lang === "en" ? "zh" : "en");
  });

  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  });

  // Mobile navigation mirrors its visual state in aria-expanded.
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Reusable disclosure behavior powers both updates and secondary awards.
  const bindDisclosure = (buttonSelector, itemSelector) => {
    const button = document.querySelector(buttonSelector);
    const items = document.querySelectorAll(itemSelector);
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      items.forEach((item) => { item.hidden = expanded; });
      button.setAttribute("aria-expanded", String(!expanded));
      const labels = button.querySelectorAll("[data-lang]");
      labels[0].textContent = expanded ? (buttonSelector.includes("updates") ? "展开全部动态 ↓" : "查看次要奖项 ↓") : "收起 ↑";
      labels[1].textContent = expanded ? (buttonSelector.includes("updates") ? "Show all updates ↓" : "Show additional award ↓") : "Show less ↑";
    });
  };
  bindDisclosure(".updates-toggle", ".more-update");
  bindDisclosure(".honors-toggle", ".secondary-award");

  document.querySelector(".print-button").addEventListener("click", () => window.print());

  // Reveal education entries once; reduced-motion users receive static content.
  const educationItems = [...document.querySelectorAll(".education-row")];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    educationItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    educationItems.forEach((item, itemIndex) => {
      item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", String(itemIndex * 80) + "ms");
    });
    const educationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    educationItems.forEach((item) => educationObserver.observe(item));
  }

  // The native dialog handles the WeChat QR overlay and Escape-key closing.
  const dialog = document.querySelector(".wechat-dialog");
  document.querySelector(".intro-wechat-button").addEventListener("click", () => dialog.showModal());
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Highlight the navigation item for the section currently being read.
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id === "news" ? "research" : entry.target.id;
      links.forEach((link) => link.classList.toggle("active", link.hash === `#${activeId}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
})();

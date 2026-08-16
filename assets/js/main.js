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

(() => {
  // Top-of-viewport reading-progress indicator.
  const progress = document.querySelector(".scroll-progress");
  if (progress) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Sparse LiDAR-style point-cloud background; honours reduced-motion.
  const canvas = document.querySelector(".point-cloud");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const root = document.documentElement;
  const readAccent = () => getComputedStyle(root).getPropertyValue("--accent").trim() || "#7896ff";
  let color = readAccent();
  new MutationObserver(() => { color = readAccent(); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  let dots = [];
  let w = 0, h = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.round(window.innerWidth * dpr);
    h = canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const count = Math.min(150, Math.max(60, Math.round((window.innerWidth * window.innerHeight) / 16000)));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.7 + 0.5) * dpr,
      vx: (Math.random() - 0.5) * 0.12 * dpr,
      vy: (Math.random() - 0.5) * 0.12 * dpr,
      a: Math.random() * 0.26 + 0.06
    }));
  };
  resize();
  window.addEventListener("resize", resize);

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = w; else if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; else if (d.y > h) d.y = 0;
      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

// CV Chinese-English language toggle.
// Persists the user's choice in localStorage and keeps the page
// title, <html lang>, button label, and ARIA state in sync.
(function () {
  "use strict";

  var STORAGE_KEY = "cv-language";
  var SUPPORTED_LANGUAGES = ["zh", "en"];

  var zhSection = document.getElementById("cv-zh");
  var enSection = document.getElementById("cv-en");
  var toggleButton = document.getElementById("language-toggle");
  var toggleLabel = document.getElementById("language-toggle-label");

  // If this page has no CV containers, hide the button and bail out
  // silently so other pages are unaffected.
  if (!zhSection || !enSection || !toggleButton || !toggleLabel) {
    if (toggleButton) {
      toggleButton.hidden = true;
    }
    return;
  }

  var BUTTON = toggleButton.querySelector("button");

  // Page titles shown in the browser tab for each language.
  var PAGE_TITLES = {
    zh: "个人简历",
    en: "Curriculum Vitae"
  };

  function getLanguage() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "zh" || stored === "en") {
        return stored;
      }
    } catch (e) {
      // localStorage may be unavailable (private mode, disabled);
      // fall back to the default language.
    }
    return "zh";
  }

  function setLanguage(lang) {
    if (SUPPORTED_LANGUAGES.indexOf(lang) === -1) {
      lang = "zh";
    }

    var showZh = lang === "zh";

    zhSection.hidden = !showZh;
    enSection.hidden = showZh;

    var label = showZh ? "EN" : "中文";
    toggleLabel.textContent = label;

    BUTTON.setAttribute("aria-pressed", String(!showZh));
    BUTTON.setAttribute(
      "aria-label",
      showZh
        ? "Switch CV language to English"
        : "Switch CV language to Chinese"
    );

    document.documentElement.lang = showZh ? "zh-CN" : "en";

    if (PAGE_TITLES[lang]) {
      document.title = PAGE_TITLES[lang];
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Ignore write failures (private mode, storage full, etc.).
    }
  }

  function toggleLanguage() {
    var current = getLanguage();
    setLanguage(current === "zh" ? "en" : "zh");
  }

  BUTTON.addEventListener("click", toggleLanguage);

  // Apply the saved (or default) language on load.
  setLanguage(getLanguage());
})();

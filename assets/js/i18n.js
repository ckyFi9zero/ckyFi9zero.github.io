(() => {
  // Metadata and control labels that must change together with page language.
  const copy = {
    zh: {
      lang: "zh-CN",
      title: "陈旷镒｜机器人鲁棒感知研究者",
      description: "陈旷镒，杭州电子科技大学控制工程硕士生，研究机器人在恶劣天气与非结构化环境下的鲁棒感知。",
      toggle: "EN",
      theme: "切换深浅主题"
    },
    en: {
      lang: "en",
      title: "Kuangyi Chen | Robust Robot Perception Researcher",
      description: "Kuangyi Chen is an M.Eng. student at Hangzhou Dianzi University studying robust robot perception in adverse weather and unstructured environments.",
      toggle: "中",
      theme: "Toggle color theme"
    }
  };

  // Apply language to visible copy, document metadata, controls, and storage.
  window.setSiteLanguage = (language) => {
    const key = language === "en" ? "en" : "zh";
    const value = copy[key];
    document.documentElement.lang = value.lang;
    document.title = value.title;
    document.querySelector('meta[name="description"]').content = value.description;
    document.querySelector('meta[property="og:title"]').content = value.title;
    document.querySelector('meta[property="og:description"]').content = value.description;
    document.querySelector(".language-toggle").textContent = value.toggle;
    document.querySelector(".theme-toggle").ariaLabel = value.theme;
    localStorage.setItem("language", key);
  };

  // Respect an explicit choice; otherwise follow the browser language.
  const saved = localStorage.getItem("language");
  const initial = saved || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
  window.setSiteLanguage(initial);
})();

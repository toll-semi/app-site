(function () {
  var buttons = document.querySelectorAll(".lang button");
  var zh = document.getElementById("zh");
  var en = document.getElementById("en");
  var title = document.querySelector("h1");
  var meta = document.querySelector(".meta");

  function setLang(lang) {
    var isEn = lang === "en";
    zh.hidden = isEn;
    en.hidden = !isEn;
    document.documentElement.lang = isEn ? "en" : "zh-CN";
    if (title) title.textContent = isEn ? title.dataset.en : title.dataset.zh;
    if (meta) meta.textContent = isEn ? meta.dataset.en : meta.dataset.zh;
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });
    try {
      history.replaceState(null, "", lang === "en" ? "#en" : "#zh");
    } catch (_) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });

  var hash = (location.hash || "").replace("#", "").toLowerCase();
  var query = new URLSearchParams(location.search).get("lang");
  setLang(query === "en" || hash === "en" ? "en" : "zh");
})();

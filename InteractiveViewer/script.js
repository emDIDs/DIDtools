const button1 = document.querySelector("#load");
const input1 = document.querySelector("#id1");
const promptCheckbox = document.querySelector("#prompt-checkbox");
const debugCheckbox = document.querySelector("#debug-checkbox");
const languageCheckbox = document.querySelector("#language-checkbox");
const prompt = document.querySelector("#prompt");
const currentUrl = new URL(window.location.href);
const { searchParams } = currentUrl;
let matID = searchParams.get("matId") || "";
const language = searchParams.get("lang") || "en";

input1.addEventListener("change", () => {
  matID = input1.value;
  searchParams.set("matId", matID);
  const prompt = document.querySelector("#prompt");
  if (prompt) {
    prompt.textContent = "";
  }
  const scoring = document.querySelector("#scoring");
  if (scoring) {
    scoring.textContent = "";
  }
  history.pushState({}, "", currentUrl.toString());
});

promptCheckbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    prompt.style.display = "block";
  } else {
    prompt.style.display = "none";
  }
});

debugCheckbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    searchParams.set("GeoGebraDebug", true);
  } else {
    searchParams.delete("GeoGebraDebug");
  }
  history.pushState({}, "", currentUrl.toString());
});

languageCheckbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    searchParams.set("lang", "es");
  } else {
    searchParams.delete("lang");
  }
  window.location.href = currentUrl.toString();
});

const loadGeoGebra = () => {
  const params = {
    material_id: matID.replace(/[^A-Za-z0-9]/g, ""),
    enableRightClick: false,
    enableShiftDragZoom: false,
    language,
    id: "ggbApplet",
    showToolBarHelp: false,
    appletOnLoad: (ggbApplet) => {
      const promptText = ggbApplet
        .getValueString("prompt")
        .concat(" ", ggbApplet.getValueString("promptText"));
      if (prompt && promptText !== "") {
        prompt.textContent = `Prompt: ${promptText}`;
      }
      ggbApplet.registerObjectUpdateListener("correct", () => {
        const scoring = document.querySelector("#scoring");
        if (scoring) {
          scoring.textContent = `Correct: ${ggbApplet.getValue("correct")}`;
        }
      });
    },
  };
  // eslint-disable-next-line no-undef
  const applet1 = new GGBApplet(params, true);
  applet1.inject("ggb-element");
};

window.addEventListener("load", () => {
  input1.value = matID;
  const { searchParams } = currentUrl;
  const language = searchParams.get("lang");
  if (language === "es") {
    languageCheckbox.checked = true;
    document.documentElement.lang = "es";
  } else {
    document.documentElement.lang = "en";
  }
  const debug = searchParams.get("GeoGebraDebug");
  if (debug === "true") {
    debugCheckbox.checked = true;
  }
  if (matID !== "") {
    loadGeoGebra();
  }
});

button1.addEventListener("click", loadGeoGebra);

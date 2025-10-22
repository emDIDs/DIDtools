const button1 = document.querySelector("#load");
const input1 = document.querySelector("#id1");
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
let matID = searchParams.get("matId") || "";
const language = searchParams.get("lang") || "en";
console.log(matID, language);
input1.addEventListener("change", () => {
  matID = input1.value;
  const prompt = document.querySelector("#prompt");
  if (prompt) {
    prompt.textContent = "";
  }
  const scoring = document.querySelector("#scoring");
  if (scoring) {
    scoring.textContent = "";
  }
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
      const prompt = document.querySelector("#prompt");
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
  loadGeoGebra();
});

button1.addEventListener("click", loadGeoGebra);


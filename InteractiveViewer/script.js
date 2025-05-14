const button1 = document.querySelector("#load");
const input1 = document.querySelector("#id1");
let matID = "";

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

button1.addEventListener("click", () => {
  const params = {
    material_id: matID,
    enableRightClick: false,
    enableShiftDragZoom: false,
    language: "en",
    id: "ggbApplet",
    appletOnLoad: (ggbApplet) => {
      const prompt = document.querySelector("#prompt");
      const promptText = ggbApplet.getValueString("prompt");
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
});

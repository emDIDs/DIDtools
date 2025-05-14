const button1 = document.querySelector("#load");
const input1 = document.querySelector("#id1");
let matID = "";

input1.addEventListener("change", () => {
  matID = input1.value;
});

button1.addEventListener("click", () => {
  const params = {
    material_id: matID,
    enableRightClick: false,
    enableShiftDragZoom: false,
    language: "en",
    id: "ggbApplet",
  };
  // eslint-disable-next-line no-undef
  const applet1 = new GGBApplet(params, true);
  applet1.inject("ggb-element");
});

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const matID = searchParams.get("matId") || "";
const language = searchParams.get("lang") || "en";

const loadGeoGebra = () => {
  const params = {
    material_id: matID.replace(/[^A-Za-z0-9]/g, ""),
    enableRightClick: false,
    enableShiftDragZoom: false,
    language,
    id: "ggbApplet",
  };
  // eslint-disable-next-line no-undef
  const applet1 = new GGBApplet(params, true);
  applet1.inject("ggb-element");
};

window.addEventListener("load", () => {
  loadGeoGebra();
});

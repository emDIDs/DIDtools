const button1 = document.querySelector("#load");
const button2 = document.querySelector("#compare");
const output = document.querySelector("#output");
const input1 = document.querySelector("#id1");
const input2 = document.querySelector("#id2");
let matID1 = "";
let matID2 = "";
input1.addEventListener("change", () => {
  matID1 = input1.value;
});

input2.addEventListener("change", () => {
  matID2 = input2.value;
});

button1.addEventListener("click", () => {
  const params1 = {
    material_id: matID1,
    enableRightClick: false,
    enableShiftDragZoom: false,
    language: "en",
    id: "ggb1",
  };
  // eslint-disable-next-line no-undef
  const applet1 = new GGBApplet(params1, true);
  applet1.setHTML5Codebase("https://www.geogebra.org/apps/5.2.820.0/web3d");
  applet1.inject("ggb-element1");

  const params2 = {
    material_id: matID2,
    enableRightClick: false,
    enableShiftDragZoom: false,
    language: "en",
    id: "ggb2",
  };
  // eslint-disable-next-line no-undef
  const applet2 = new GGBApplet(params2, true);
  applet2.setHTML5Codebase("https://www.geogebra.org/apps/5.2.820.0/web3d");
  applet2.inject("ggb-element2");
});

button2.addEventListener("click", () => {
  const firstObjectNames = window.ggb1.getAllObjectNames();
  const secondObjectNames = window.ggb2.getAllObjectNames();
  const firstCommandStrings = firstObjectNames.map((object) =>
    object.concat(":", window.ggb1.getCommandString(object))
  );
  const secondCommandStrings = secondObjectNames.map((object) =>
    object.concat(":", window.ggb2.getCommandString(object))
  );

  function compareTwoArrays(first, second) {
    const presentOnlyInFirst = first.filter(
      (element) => !second.includes(element)
    );
    const presentOnlyInSecond = second.filter(
      (element) => !first.includes(element)
    );
    return { presentOnlyInFirst, presentOnlyInSecond };
  }

  const namesDiff = compareTwoArrays(firstObjectNames, secondObjectNames);
  const defDiff = compareTwoArrays(firstCommandStrings, secondCommandStrings);

  output.innerText = `Present Only in First:\n ${namesDiff.presentOnlyInFirst.join("\n")}

  Present Only in Second:\n ${namesDiff.presentOnlyInSecond.join("\n")}

  Definitions Only in First:\n ${defDiff.presentOnlyInFirst.join("\n")}

  Definitions Only in Second:\n ${defDiff.presentOnlyInSecond.join("\n")}
  `;
});

const button1 = document.getElementById("load");
const button2 = document.getElementById("compare");
const input = document.getElementById("material-id");
const output = document.getElementById("results");
const link = document.getElementById("download");
let spanishDictionary = [];
let notSpanishString = "";

fetch(
  "https://raw.githubusercontent.com/words/an-array-of-spanish-words/refs/heads/master/index.json"
)
  .then((res) => res.json())
  .then((data) => {
    spanishDictionary = data;
  })
  .catch((err) => console.error(err));

button1.addEventListener("click", () => {
  output.textContent = ``;
  link.textContent = ``;
  const matID = input.value;
  const params = {
    // eslint-disable-next-line camelcase
    material_id: matID,
    appName: "classic",
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    enableRightClick: false,
    language: "en",
    appletOnLoad(api1) {
      api1.setValue("showKeyboardInstructions", true);
    },
  };

  // eslint-disable-next-line no-undef
  const applet = new GGBApplet(params, true);
  applet.setHTML5Codebase("https://www.geogebra.org/apps/5.2.849.0/web3d");
  applet.inject("ggb-element");
});

function getGlobalJS() {
  let archiveNum = -1;
  const jsonArchive = ggbApplet.getFileJSON().archive;
  const jsonKeysArray = Object.keys(jsonArchive);
  jsonKeysArray.some(function (element) {
    if (jsonArchive[element].fileName === "geogebra_javascript.js") {
      archiveNum = element;
      return true;
    }
    return false;
  });
  const archiveGlobalJS = jsonArchive[archiveNum].fileContent;
  return archiveGlobalJS;
}

function getText() {
  // handles minimum/maximum text, point labels, titles
  const bigObject = {
    materialID: input.value,
    text: {},
  };

  // handle ariaLabel
  const { ariaLabel } = document.querySelector(`canvas`);
  bigObject.text.ariaLabelForGGB = ariaLabel;

  // handle all text objects, lists, and anything that has a caption
  const allItems = ggbApplet.getAllObjectNames();
  allItems.forEach(function (el) {
    const type = ggbApplet.getObjectType(el);
    switch (type) {
      // for text, if independent get the value otherwise get the definition
      case "text": {
        if (ggbApplet.isIndependent(el)) {
          bigObject.text[el] = ggbApplet
            .getValueString(el)
            .replace(/(\r\n|\n|\r)/gm, "");
        } else {
          bigObject.text[el] = ggbApplet
            .getDefinitionString(el)
            .replace(/(\r\n|\n|\r)/gm, "");
        }
        break;
      }
      // for list, get the definition string, then find out if anyone used SelectedElement instead of SelectedIndex
      case "list": {
        const listXML = ggbApplet.getXML(el);

        // if list is drawn as a dropdown
        if (listXML.includes("comboBox")) {
          bigObject.text[el] = ggbApplet.getDefinitionString(el);
          const allXML = ggbApplet.getXML();
          const parser = new DOMParser();
          const xmldom = parser.parseFromString(allXML, "application/xml");

          // if someone used SelectedElement instead of SelectedIndex, find it
          const value = xmldom.querySelectorAll(
            `condition[showObject*="SelectedElement"]`
          );
          if (value.length > 0) {
            const matches = allXML.match(
              /<condition showObject="SelectedElement\[.*\].*&quot;(.*)&quot;.*"/g
            );
            bigObject.text.conditions = {
              ...matches,
            };
          }
        }
        break;
      }
      // if something has a caption, put that caption
      default: {
        if (ggbApplet.getCaption(el) !== "") {
          bigObject.text[el.concat("CaptionText")] = ggbApplet.getCaption(el);
        }
        break;
      }
    }
  });

  // search through globalJS for any alt text
  bigObject.text.globalJSText = {};

  const pulledGlobalJS = getGlobalJS();

  // removes all non-line break space
  const cleanedJS = pulledGlobalJS.replace(/([^\n][^\S\r\n])[^\S\r\n]+/g, "");

  // removes all line breaks
  const squeakyClean = cleanedJS.replace(/(\r\n|\n|\r)/gm, "");
  // if you find ReadText(something), pull the text
  function pullReadText() {
    // matches anything that starts with the words ReadText
    const allMatches = squeakyClean.match(/ReadText\((.*?)\)/g);

    // if matches exist, Put them into their own section of globalJSText
    if (allMatches && allMatches.length !== 0) {
      allMatches.forEach(function (element, index) {
        bigObject.text.globalJSText["GGBReadText" + index] = element
          .replace(/([^\n][^\S\r\n])[^\S\r\n]+/g, "")
          .trim();
      });
    }
    // get keyboard instructions constant, if something has been changed, include it
    const allKeyboardInstructions = squeakyClean.match(
      /const keyboardInstructions = \{.*?\}/g
    );
    bigObject.text.keyboardInstructionsConst = allKeyboardInstructions[0]
      .replace("const keyboardInstructions = ", "")
      .replace(
        '// A: "Presiona las teclas de flecha para mover este punto.", // example for a point',
        ""
      )
      .replaceAll("// example for a point", "");
  }

  pullReadText();
  // take everthing in english and duplicate it
  bigObject.spanish = bigObject.text;
  return bigObject;
}

function compareText() {
  const textToCompare = getText().text;
  const comparisonArray = [];
  for (const item in textToCompare) {
    console.log(textToCompare[item]);
    if (typeof textToCompare[item] === "string") {
      comparisonArray.push(...textToCompare[item].split(" "));
    }
  }
  const squeakyClean = comparisonArray.map((item) =>
    item.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, "")
  );

  const cleanedComparison = squeakyClean.filter((word) => word !== "");
  const uniqueComparison = [...new Set(cleanedComparison)];

  const notSpanish = uniqueComparison.filter(
    (item) => !spanishDictionary.includes(item.toLowerCase())
  );
  const leftOverWords = notSpanish.length;
  const totalWords = uniqueComparison.length;
  const percentage = leftOverWords / totalWords;
  const roundedPercentage = Math.round(100 * percentage);
  output.textContent = `${roundedPercentage.toString()}% of the words found are not in the Spanish dictionary.`;
  link.textContent = `Click to Download Flagged Words`;
  notSpanishString = notSpanish.join("\n");
}

button2.addEventListener("click", compareText);

link.addEventListener("click", () => {
  if (notSpanishString) {
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + notSpanishString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.download = "MissingText-".concat(input.value, ".csv");
  }
});

// Things I want in my helper:
/**
 *
 * 1. Num rows
 * 2. Num cols
 * 3. Column header checkbox - not right now
 * 4. Return .tsx file (pascal case name of applet + data.tsx)
 * 5. Add multiple inputs (or checkboxes) per input
 * 6. Eventually, add an option for two languages
 *
 *
 */

function makeTable() {
  // delete old table if shown
  const myTable = document.getElementById("myTable");
  if (myTable.hasChildNodes()) {
    while (myTable.hasChildNodes()) {
      myTable.removeChild(myTable.firstChild);
    }
  }

  const numRows = document.getElementById("numRows").value;
  const numCols = document.getElementById("numCols").value;
  const downloadButton = document.getElementById("downloadButton");
  // const hasColHeaders = document.getElementById("colHeaders").checked;

  downloadButton.removeAttribute("hidden");

  for (let r = 0; r < numRows; r++) {
    // Inserting a new row
    const x = document.getElementById("myTable").insertRow(r);
    // Looping through columns
    for (let c = 0; c < numCols; c++) {
      // Inserting a new cell at index c in the current row

      // If table headers, add them. Else, create regular cell
      // Commented line below bc we are assuming always want column headers right now - will update later when option for row headers (and both) is added
      // if (hasColHeaders && r === 0) {
      if (r === 0) {
        const colHeader = document.createElement("th");
        colHeader.setAttribute("class", "tableHeader");
        colHeader.setAttribute("id", `row${r}Col${c}`);
        const inputBox = document.createElement("input");
        inputBox.id = `row${r}Col${c}Input`;
        colHeader.appendChild(inputBox);
        createEditableCheckbox(colHeader, c, r);
        createErrorMessageInput(colHeader, c, r);
        x.appendChild(colHeader);
      } else {
        const y = x.insertCell(c);
        const inputBox = document.createElement("input");
        inputBox.id = `row${r}Col${c}Input`;
        y.appendChild(inputBox);
        createEditableCheckbox(y, c, r);
        createErrorMessageInput(y, c, r);
      }
    }
  }

  function createEditableCheckbox(el, colNum, rowNum) {
    // create div
    const newDiv = document.createElement("div");

    // create checkbox
    const newCheckbox = document.createElement("input");
    const tempID = `row${rowNum}Col${colNum}Editable`;
    newCheckbox.id = tempID;
    newCheckbox.setAttribute("type", "checkbox");

    // create label
    const newLabel = document.createElement("label");
    newLabel.textContent = `Editable? `;
    newLabel.setAttribute("for", tempID);

    newLabel.appendChild(newCheckbox);

    el.appendChild(newDiv);
    newDiv.appendChild(newLabel);
  }

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const targetDiv = document.getElementById(
        `${checkbox.id.concat("ErrorMessage")}`
      );
      if (checkbox.checked) {
        console.log(`Checkbox ${this.id} is checked`);
        // Show error message string input box
        targetDiv.style.visibility = "visible";
      } else {
        console.log(`Checkbox ${this.id} is unchecked`);
        // Hide error message string input box
        targetDiv.style.visibility = "hidden";
      }
    });
  });

  function createErrorMessageInput(el, colNum, rowNum) {
    // creates error message input with label
    // create div
    const newDiv = document.createElement("div");
    const tempDivID = `row${rowNum}Col${colNum}EditableErrorMessage`;
    newDiv.id = tempDivID;

    // create input
    const newErrowMessageInput = document.createElement("input");
    const tempID = `row${rowNum}Col${colNum}ErrorMessageInput`;
    newErrowMessageInput.id = tempID;
    // newErrowMessageInput.setAttribute("type", "checkbox");

    // create label
    const newLabel = document.createElement("label");
    newLabel.textContent = `Error Message: `;
    newLabel.setAttribute("for", tempID);

    newLabel.appendChild(newErrowMessageInput);

    el.appendChild(newDiv);
    newDiv.appendChild(newLabel);
    newDiv.style.visibility = "hidden";
  }
}

function download() {
  // generates and downloads a .tsx file that includes exports for column headers and rows

  const appletName = document.getElementById("appletName").value;
  const numRows = document.getElementById("numRows").value;
  const numCols = document.getElementById("numCols").value;

  // Covert appletName to pascal case
  const pascalAppletName = appletName
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  console.log("pascalAppletName", pascalAppletName);

  // Loop through all cells to grab info - this assumes first row is always a header row

  const arrayOfHeaderObjects = [];
  const arrayOfRowArrays = [];

  for (let i = 0; i < numRows; i++) {
    const tempRow = [];
    for (let j = 0; j < numCols; j++) {
      const tempCellValue = document.getElementById(
        `row${i}Col${j}Input`
      ).value;
      const tempEditableBool = document.getElementById(
        `row${i}Col${j}Editable`
      ).checked;
      const tempErrorMessage = document.getElementById(
        `row${i}Col${j}ErrorMessageInput`
      ).value;

      const cleanedUpCellValue =
        tempCellValue === "" ? `''` : `'${tempCellValue}'`;
      const cleanedUpErrorMessage =
        tempErrorMessage === "" ? `''` : `'${tempErrorMessage}'`;

      tempRow.push(
        `{value: ${cleanedUpCellValue}, editable: ${tempEditableBool}, errorText: ${cleanedUpErrorMessage}}`
      );
    }
    if (i === 0) {
      arrayOfHeaderObjects.push(tempRow);
    } else {
      arrayOfRowArrays.push(`[${tempRow}]`);
    }
  }

  const arrayString = arrayOfHeaderObjects.join();

  const columnsString = `export const columns = [${arrayString}]`;

  const rowString = `export const rows = [${arrayOfRowArrays}]`;

  const downloadText = `${columnsString}

${rowString}`;

  let filename = `${pascalAppletName}.tsx`;

  downloadFile(downloadText, filename);
}
function downloadFile(content, filename) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: ".tsx" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for Firefox
  element.click();
  document.body.removeChild(element);
}

/**
 * DESIRED FORMAT: 
 * 
 * export const columns = [
  { name: 'Diameter (centimeters)', editable: true, errorText: "" },
  {
    name: 'Distance Around the Circle (centimeters)',
    editable: true,
    errorText: ""
  },
  {
    name: 'Value of the Ratio of the Distance Around the Circle to the Diameter',
    editable: true,
    errorText: ""
  },
];

export const rows = [
  [
    {
      value: '',
      editable: true,
      errorText: '',
      invalid: false,
    },
    {
      value: '',
      editable: true,
      errorText: '',
      invalid: false,
    },
    {
      value: '',
      editable: false,
      errorText: '',
      invalid: false,
    },
  ],
];
 */

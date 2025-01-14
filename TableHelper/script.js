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

  const myTable = document.querySelector("table");
  const numRows = document.getElementById("numRows").value;
  const numCols = document.getElementById("numCols").value;

  // first, take care of column headers
  const headers = document.querySelectorAll("th");
  if (headers.length) {
    // grab needed info from input boxes
    const names = [];
    const editableBooleansHeaders = [];
    // const keys = [];
    // const isRowHeader = [];

    headers.forEach((header, index) => {
      const inputString = header.children[0].value;
      names.push(inputString === "" ? "''" : inputString);

      const tempEditableBool = document.getElementById(
        `row0Col${index}Editable`
      ).checked;
      editableBooleansHeaders.push(tempEditableBool);

      // const uniqueKey = "header".concat(index, inputString.replace(/\s/g, ""));
      // keys.push(uniqueKey);

      // isRowHeader.push(index === 0 ? true : false);
    });

    // create string with info
    const arrayOfHeaderObjects = [];
    names.forEach((name, index) => {
      // const cellString = `{ name: ${name}, key: ${keys[index]}, isRowHeader: ${isRowHeader[index]}}`;
      const cellString = `{ name: ${name}, editable: ${editableBooleansHeaders[index]}}`;
      arrayOfHeaderObjects.push(cellString);
    });
    const arrayString = arrayOfHeaderObjects.join();

    const columnsString = `export const columns = [${arrayString}]`;
    console.log("final columnsString:", columnsString);
  }

  // next, take care of regular rows to create rows
  // note: cells does not contain header row cells
  const cells = document.querySelectorAll("td");

  const cellValues = [];
  const editableBooleansCells = [];

  cells.forEach((cell) => {
    const tempCellString = cell.childNodes[0].value;
    cellValues.push(tempCellString === "" ? "''" : tempCellString);
  });

  const arrayOfRowArrays = [];

  const adjustedNumRows = numRows - 1;
  let cellIndex = 0;

  for (let i = 0; i < adjustedNumRows; i++) {
    const tempRow = [];
    for (let j = 0; j < numCols; j++) {
      const tempEditableBool = document.getElementById(
        `row${i + 1}Col${j}Editable`
      ).checked;
      tempRow.push(
        `{value: ${cellValues[cellIndex]}, editable: ${tempEditableBool}}`
      );
      cellIndex++;
    }
    arrayOfRowArrays.push(`[${tempRow}]`);
  }

  const rowString = `export const rows = [${arrayOfRowArrays}]`;
  console.log("rowString:", rowString);
}

/**
 * export const columns = [
  { name: 'Diameter (centimeters)', editable: true },
  {
    name: 'Distance Around the Circle (centimeters)',
    editable: true
  },
  {
    name: 'Value of the Ratio of the Distance Around the Circle to the Diameter',
    editable: true
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

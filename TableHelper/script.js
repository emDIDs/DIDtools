// Things I want in my helper:
/**
 *
 * 1. Num rows
 * 2. Num cols
 * 3. Column header checkbox
 * 4. Return .tsx file (pascal case name of applet + data.tsx)
 * 5. Add multiple inputs (or checkboxes) per input
 * 6. Eventually, add an option for two languages
 *
 *
 */

function makeTable() {
  console.log("button clicked!");

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
        const inputBox = document.createElement("input");
        inputBox.id = `row${r}Col${c}`;
        colHeader.appendChild(inputBox);
        x.appendChild(colHeader);
      } else {
        const y = x.insertCell(c);
        const inputBox = document.createElement("input");
        inputBox.id = `row${r}Col${c}`;
        y.appendChild(inputBox);
      }
    }
  }
}

function download() {
  // generates and downloads a .tsx file that includes exports for column headers and rows

  const myTable = document.querySelector("table");
  console.log("myTable:", myTable);
  const numRows = document.getElementById("numRows").value;
  const numCols = document.getElementById("numCols").value;

  // first, take care of column headers
  const headers = document.querySelectorAll("th");
  if (headers.length) {
    // grab needed info from input boxes
    const names = [];
    // const keys = [];
    // const isRowHeader = [];

    headers.forEach((header, index) => {
      const inputString = header.children[0].value;
      names.push(inputString);

      // const uniqueKey = "header".concat(index, inputString.replace(/\s/g, ""));
      // keys.push(uniqueKey);

      // isRowHeader.push(index === 0 ? true : false);
    });

    // create string with info
    const arrayOfHeaderObjects = [];
    names.forEach((name, index) => {
      // const cellString = `{ name: ${name}, key: ${keys[index]}, isRowHeader: ${isRowHeader[index]}}`;
      const cellString = `{ name: ${name}}`;
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

  cells.forEach((cell) => {
    cellValues.push(cell.childNodes[0].value);
  });

  const arrayOfRowArrays = [];

  const adjustedNumRows = numRows - 1;
  let cellIndex = 0;

  for (let i = 0; i < adjustedNumRows; i++) {
    const tempRow = [];
    for (let j = 0; j < numCols; j++) {
      tempRow.push(`{value: ${cellValues[cellIndex]}}`);
      cellIndex++;
    }
    arrayOfRowArrays.push(`[${tempRow}]`);
  }

  const rowString = `export const rows = [${arrayOfRowArrays}]`;
  console.log("rowString:", rowString);
}

/**
 * export const columns = [
  { name: 'Diameter (centimeters)', key: 'diameter', isRowHeader: true },
  {
    name: 'Distance Around the Circle (centimeters)',
    key: 'circumference',
    isRowHeader: false,
  },
  {
    name: 'Value of the Ratio of the Distance Around the Circle to the Diameter',
    key: 'ratio',
    isRowHeader: false,
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

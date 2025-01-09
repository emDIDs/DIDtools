// Things I want in my helper:
/**
 *
 * 1. Num rows
 * 2. Num cols
 * 3. Column header checkbox
 * 4. Return .tsx file (pascal case name of applet + data.tsx)
 * 5. Add multiple inputs (or checkboxes) per input
 *
 *
 */

function makeTable() {
  console.log("button clicked!");

  const numRows = document.getElementById("numRows").value;
  const numCols = document.getElementById("numCols").value;
  const hasColHeaders = document.getElementById("colHeaders").checked;

  for (let r = 0; r < numRows; r++) {
    // Inserting a new row
    const x = document.getElementById("myTable").insertRow(r);
    // Looping through columns
    for (let c = 0; c < numCols; c++) {
      // Inserting a new cell at index c in the current row

      // If table headers, add them. Else, create regular cell
      if (hasColHeaders && r === 0) {
        const colHeader = document.createElement("th");
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

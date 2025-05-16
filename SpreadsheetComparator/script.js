let didiFile;
let appletFile;
const compareBtn = document.getElementById("compareBtn");
const deletionsBox = document.getElementById("deletionsBox");

const didiInput = document.getElementById("didiInput");
const appletInput = document.getElementById("appletInput");

didiInput.addEventListener("change", (event) => {
  didiFile = event.target.files[0];
  updateCompareButton();
});

appletInput.addEventListener("change", (event) => {
  appletFile = event.target.files[0];
  updateCompareButton();
});

function updateCompareButton() {
  if (didiFile && appletFile) {
    compareBtn.classList.add("enabled");
    compareBtn.disabled = false;
  }
}

compareBtn.addEventListener("click", async () => {
  const didiData = await readXLSX(didiFile);
  const appletData = await readCSV(appletFile);

  const didiURLs = new Set(didiData.map((row) => row.URL));
  const appletURLs = new Set(
    appletData.map((row) => row.url.replaceAll('"', ""))
  );

  console.log(didiURLs);
  console.log(appletURLs);

  // Find additions
  const additions = appletData.filter(
    (row) => !didiURLs.has(row.url.replaceAll('"', ""))
  );
  if (additions.length > 0) downloadCSV(additions, "additions.csv");

  // Find deletions
  const deletions = didiData
    .filter((row) => !appletURLs.has(row.URL))
    .map((row) => row["Interactive Name"]);

  if (deletions.length > 0) {
    deletionsBox.innerHTML = deletions
      .map((deletion) => `\u2022 ${deletion}`)
      .join("\n");
  } else {
    deletionsBox.textContent = "There were no deletions.";
  }
});

function readXLSX(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      // eslint-disable-next-line
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      // eslint-disable-next-line
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      resolve(data);
    };
    reader.readAsArrayBuffer(file);
  });
}

function readCSV(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const rows = reader.result.trim().split(/\r?\n/);
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((line) => {
        const values = line.split(",");
        return Object.fromEntries(
          headers.map((header, i) => [header.trim(), values[i]?.trim()])
        );
      });
      resolve(data);
    };
    reader.readAsText(file);
  });
}

function downloadCSV(rows, filename) {
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

/* eslint-disable no-undef */
document.getElementById("submitBtn").addEventListener("click", function () {
  const dbTitle = document.getElementById("dbTitle").value;
  const ticketNum = document.getElementById("ticketNum").value;
  const spanishTitle = getSpanishTitle(dbTitle);
  const pascalTitle = pascalCase(spanishTitle);
  document.getElementById("branchField").value = makeBranchName(
    spanishTitle,
    ticketNum
  );
  document.getElementById("pullRequestField").value = makePRTitle(
    spanishTitle,
    ticketNum
  );
});

function makeBranchName(title, ticketNum) {
  const hyphenTitle = hyphenate(title);
  return `feat-digi-${ticketNum.replace("DIGI-", "")}-${hyphenTitle}`;
}
function makePRTitle(title, ticketNum) {
  return `feat: [DIGI-${ticketNum}] add ${title.toLowerCase()}`;
}
function pascalCase(title) {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");
}
function getSpanishTitle(title) {
   return "spanish ".concat(title)

}

function hyphenate(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}

function copyToClipboard(elementId) {
  const textarea = document.getElementById(elementId);
  const copyButton = document.querySelector(
    `button[onclick="copyToClipboard('${elementId}')"]`
  );

  navigator.clipboard.writeText(textarea.value);

  // Change button text to "Copied!"
  copyButton.textContent = "Copied!";

  // Revert back to "Copy" after a moment
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1000);
}
// document.getElementById("otherBtn").addEventListener("click", function () {
//   const fields = [
//     "mdxField",
//     "storyField",
//     "pageField",
//     "pascalField",
//     "specField",
//   ];
//   const zip = new JSZip();
//   zip.file(downloadFile);
//   fields.forEach((field) => {
//     zip.file(
//       document
//         .getElementById("folderField")
//         .value.concat(
//           "/",
//           document.querySelector(`label[for="${field}"]`).textContent
//         ),
//       document.getElementById(field).value
//     );
//   });
//   zip.generateAsync({ type: "blob" }).then(function (content) {
//     downloadFile(
//       content,
//       document.getElementById("folderField").value.concat(".zip")
//     );
//   });
// });

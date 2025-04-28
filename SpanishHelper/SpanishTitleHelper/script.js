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
  // Update labels
  document.querySelector('label[for="mdxField"]').textContent =
    `Story/${pascalTitle}.mdx`;
  document.querySelector('label[for="storyField"]').textContent =
    `Story/${pascalTitle}.stories.tsx`;
  document.querySelector('label[for="pascalField"]').textContent =
    `${pascalTitle}.tsx`;
  document.querySelector('label[for="specField"]').textContent =
    `${pascalTitle}.spec.tsx`;
});

function makeBranchName(title, ticketNum) {
  const hyphenTitle = hyphenate(title);
  return `feat-digi-${ticketNum.replace("DIGI-", "")}-${hyphenTitle}`;
}
function makePRTitle(title, ticketNum) {
  const hyphenTitle = hyphenate(title);
  return `feat: [DIGI-${ticketNum}] add ${title}`;
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

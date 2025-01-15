/* eslint-disable no-undef */
document.getElementById("submitBtn").addEventListener("click", function () {
  const dbTitle = document.getElementById("dbTitle").value;
  const materialId = document.getElementById("materialId").value;
  const ticketNum = document.getElementById("ticketNum").value;
  const pascalTitle = pascalCase(dbTitle);
  document.getElementById("mdxField").value = makeMDX(dbTitle);
  document.getElementById("storyField").value = makeStoryTSX(dbTitle);
  document.getElementById("pageField").value = makePageTSX(dbTitle);
  document.getElementById("pascalField").value = makePascalTSX(
    dbTitle,
    materialId
  );
  document.getElementById("specField").value = makeSpecTSX(dbTitle);
  document.getElementById("folderField").value = hyphenate(dbTitle);
  document.getElementById("branchField").value = makeBranchName(
    dbTitle,
    ticketNum
  );
  document.getElementById("pullRequestField").value = makePRTitle(
    dbTitle,
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

document.getElementById("otherBtn").addEventListener("click", function () {
  const fields = [
    "mdxField",
    "storyField",
    "pageField",
    "pascalField",
    "specField",
  ];
  const zip = new JSZip();
  zip.file(downloadFile);
  fields.forEach((field) => {
    zip.file(
      document
        .getElementById("folderField")
        .value.concat(
          "/",
          document.querySelector(`label[for="${field}"]`).textContent
        ),
      document.getElementById(field).value
    );
  });
  zip.generateAsync({ type: "blob" }).then(function (content) {
    downloadFile(
      content,
      document.getElementById("folderField").value.concat(".zip")
    );
  });
});

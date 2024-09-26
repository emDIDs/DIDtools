/* eslint-disable no-undef */
document.getElementById("submitBtn").addEventListener("click", function () {
  const dbTitle = document.getElementById("dbTitle").value;
  const baseName = document.getElementById("baseName").value;
  const ticketNum = document.getElementById("ticketNum").value;
  const pascalTitle = pascalCase(dbTitle);
  document.getElementById("mdxField").value = makeMDX(dbTitle, true, baseName);
  document.getElementById("storyField").value = makeStoryTSX(
    dbTitle,
    true,
    baseName
  );
  document.getElementById("pageField").value = makePageTSX(dbTitle);
  document.getElementById("pascalField").value = makePascalTSX(
    dbTitle,
    null,
    true,
    baseName
  );
  document.getElementById("specField").value = makeSpecTSX(
    dbTitle,
    true,
    baseName
  );
  document.getElementById("folderField").value = hyphenate(dbTitle);
  document.getElementById("branchField").value = makeBranchName(
    dbTitle,
    ticketNum
  );
  // Update labels
  document.querySelector('label[for="mdxField"]').textContent =
    `${baseName}.mdx`;
  document.querySelector('label[for="storyField"]').textContent =
    `${baseName}.stories.tsx`;
  document.querySelector('label[for="pascalField"]').textContent =
    `${pascalTitle}.tsx`;
  document.querySelector('label[for="specField"]').textContent =
    `${pascalTitle}.spec.tsx`;
});

document.getElementById("otherBtn").addEventListener("click", function () {
  const fields = ["pageField", "pascalField", "specField"];
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

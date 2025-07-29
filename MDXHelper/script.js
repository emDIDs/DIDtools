function getPascalName(name) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase())
    .replace(/\s+/g, "");
}

function extractGMTL(text, location = "description") {
  const patterns = [
    /(G|A|A1|PK|K|7-8)?\d?\s*M\s*\d\s*T?\s*\w?\s*L\s*\d{1,2}/i,
    /GMTL:?\s*(A|A1|PK|K|7-8)?\d?\s*M?\s*\d\s*T?\s*[A-G]?\s*L?\s*\d{1,2}/i,
    /(A|A1|PK|K|7-8)?\s?[1-6]\s?[A-G]?\s?\d{1,2}/i,
    /GMTL:?\s*(A|A1|PK|K|7-8)\s?[1-6]/i,
    location !== "title" ? /(?<!DIGI-)\d\s[1-6]\s[A-G]?\s\d{1,2}/i : null,
  ].filter(Boolean);

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return "No GMTL Info Found";
}

function cleanDescription(description) {
  return description
    .replace(/h([1-6])\.(.+)/g, "<h$1>$2</h$1>")
    .replace(/‚Äô/g, "'")
    .replace(/‚Äú|‚Äù/g, '"')
    .replace(/\|SmartLink/g, "")
    .replace(/\|smart-link/g, "")
    .replace(/{quote}/g, '"')
    .replace(/\[([^\|\]]+)\|([^\]]+)\]/g, "[$1]($2)")
    .replace(/#/g, "");
}

function generateBlock() {
  const issueKey = document
    .getElementById("issueKey")
    .value.trim()
    .includes("DIGI")
    ? document.getElementById("issueKey").value.trim()
    : "DIGI-".concat(document.getElementById("issueKey").value.trim());
  const jiraTitle = document.getElementById("jiraTitle").value.trim();
  const description = document.getElementById("description").value.trim();
  const type = document.getElementById("type").value;
  const variantName = document.getElementById("variantName").value.trim();

  const gmtl = extractGMTL(jiraTitle, "title") || extractGMTL(description);
  const cleaned = cleanDescription(description);
  const pascalVariant = getPascalName(variantName);

  let result = "";

  if (type === "parent") {
    result = `<Canvas of={Main} />

<details>
<summary>${issueKey} More Information about Parent</summary>

GMTL: ${gmtl}

${cleaned}

</details>`;
  } else {
    const variantTitle = variantName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());

    result = `<Canvas of={${pascalVariant}} />

<details>
<summary>${issueKey} More Information about Variant - ${variantTitle}</summary>

GMTL: ${gmtl}

${cleaned}

</details>`;
  }

  document.getElementById("output").textContent = result;
  navigator.clipboard.writeText(result);
}

generateBlock();

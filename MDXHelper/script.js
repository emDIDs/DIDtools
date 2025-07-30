const sourceChoice = document.querySelector("#source");
const button = document.querySelector("#generate-copy");
const csvInfo = document.querySelector("#csv-info");
const xmlInfo = document.querySelector("#xml-info");

sourceChoice.addEventListener("change", () => {
  if (sourceChoice.value === "csv") {
    csvInfo.classList.remove("hidden");
    xmlInfo.classList.add("hidden");
  } else {
    csvInfo.classList.add("hidden");
    xmlInfo.classList.remove("hidden");
  }
});

button.addEventListener("click", () => {
  generateBlock();
});

window.addEventListener("load", generateBlock);

function extractXMLInfo() {
  const xmlInput = document.querySelector("#xml-input").value.trim();
  const titleInfo = xmlInput.match(/<title>\[DIGI-(\d*)\]\s(.+?)?<\/title>/);
  const issueKeyXML = titleInfo ? "DIGI-".concat(titleInfo[1]) : null;
  const jiraTitleXML = titleInfo ? titleInfo[2] : null;
  const descriptionInfo = xmlInput.match(/<description>(.*)<\/description>/);
  const descriptionXML = descriptionInfo ? descriptionInfo[1] : null;
  return { issueKeyXML, jiraTitleXML, descriptionXML };
}

function convertValidLinks(description) {
  const regex = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  if (!description) return;
  return description.replace(regex, (_match, href, text) => {
    text = text.trim();
    return `[${text}](${href})`;
  });
}

function convertInvalidLinks(description) {
  const regex = /<a[^>]*[^>]*>(.*?)<\/a>/gi;
  if (!description) return;

  return description.replace(regex, (_match, text) => {
    return text.trim();
  });
}

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
    if (match) return match[0].replace(/[GMTL:]/g, "");
  }
  return null;
}

function cleanDescription(description) {
  return description
    .replace(/<span class="image-wrap".+?><\/span>/g, "")
    .replace(/!image.*.png""!/g, "")
    .replace(/style=".*"/g, "")
    .replace(/h([1-6])\.(.+)/g, "<h$1>$2</h$1>")
    .replace(/‚Äô/g, "'")
    .replace(/‚Äú|‚Äù/g, '"')
    .replace(/\|SmartLink/g, "")
    .replace(/\|smart-link/g, "")
    .replace(/{quote}/g, '"')
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "")
    .replace(/<b>/g, "*")
    .replace(/<\/b>/g, "*")
    .replace(/\[([^|\]]+)\|([^\]]+)\]/g, "[$1]($2)")
    .replace(/#/g, "");
}

function generateBlock() {
  const issueKeyCSV = document
    .getElementById("issueKey")
    .value.trim()
    .includes("DIGI")
    ? document.getElementById("issueKey").value.trim()
    : "DIGI-".concat(document.getElementById("issueKey").value.trim());
  const jiraTitleCSV = document.getElementById("jiraTitle").value.trim();
  const descriptionCSV = document.getElementById("description").value.trim();
  const type = document.getElementById("type").value;
  const variantName = document.getElementById("variantName").value.trim();

  const { issueKeyXML, jiraTitleXML, descriptionXML } = extractXMLInfo();
  const firstPassConversion = convertValidLinks(descriptionXML);
  const newDescriptionXML = convertInvalidLinks(firstPassConversion);
  const issueKey = sourceChoice.value === "xml" ? issueKeyXML : issueKeyCSV;
  const jiraTitle = sourceChoice.value === "xml" ? jiraTitleXML : jiraTitleCSV;
  const description =
    sourceChoice.value === "xml" ? newDescriptionXML : descriptionCSV;

  const gmtl = extractGMTL(jiraTitle, "title") || extractGMTL(description);
  const cleaned = cleanDescription(description);
  const pascalVariant = getPascalName(variantName);

  let result = "";

  if (type === "parent") {
    result = `<Canvas of={Main} />
    
<details>
<summary>${issueKey} More Information about Parent</summary>

${gmtl ? `GMTL: ${gmtl}` : ""}

${cleaned}

</details>`;
  } else {
    const variantTitle = variantName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());

    result = `<Canvas of={${pascalVariant}} />
    
<details>
<summary>${issueKey} More Information about Variant - ${variantTitle}</summary>
    
${gmtl ? `GMTL: ${gmtl}` : ""}
    
${cleaned}
  
</details>`;
  }
  if (document) {
    navigator.clipboard.writeText(result);
  }
  document.getElementById("output").textContent = result;
}

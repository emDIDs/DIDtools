function format() {
  const inputText = document.getElementById("input-text").value;
  const showTabText = document.getElementById("toggle-tab-text").checked;
  const useCustomWidth = document.getElementById("toggle-custom-width").checked;
  const width = useCustomWidth
    ? document.getElementById("custom-width").value
    : 38;
  const rgx = new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, "g");
  const wrapText = inputText.replace(rgx, "$1\\\\");
  const tabText = showTabText
    ? "\\\\\\\\Press x to restart the tab cycle."
    : "";
  const result = `Text(\"\\text{${wrapText} \\\\\\\\Press k to " + If(showKeyboardInstructions,"hide","show") + " keyboard instructions. ${tabText}}\", (0, 0), false, true)`;
  document.getElementById("output-text").value = result;
}

function handleWidthInput() {
  if (document.getElementById("toggle-custom-width").checked) {
    document.getElementById("custom-width").disabled = false;
  } else {
    document.getElementById("custom-width").disabled = true;
  }
}

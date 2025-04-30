/* eslint-disable no-unused-vars */
// Lists all English strings and their corresponding Spanish replacements
const replacements = [
  // If a sub-phrase is used multiple times, list large strings or whole sentences first, followed by smaller strings and sub-phrases
  {
    english:
      "Press space to open. Press up arrow\\\\and down arrow to go to different\\\\options. Press enter to select.",
    spanish:
      "Presiona la barra de espacio para abrir.\\\\\\\\Presiona las teclas de flecha arriba y flecha abajo para dirigirte\\\\\\\\a diferentes opciones. Presiona la tecla intro para seleccionar",
  },
    {
    english: "Press space to open the instructions",
    spanish: "Presiona la barra de espacio para abrir las instrucciones",
  },
  {
    english: "Press space to open",
    spanish: "Presiona la barra de espacio para abrir",
  },
  {
    english:
      'Press k to " + (If(showKeyboardInstructions, "hide", "show")) + " keyboard instructions',
    spanish:
      'Presiona k para " + (If(showKeyboardInstructions, "ocultar", "mostrar")) + " las instrucciones de teclado',
  },
  {
    english: "Press the arrow keys",
    spanish: "Presiona las teclas de flecha",
  },
  {
    english: "Press left and right arrow keys",
    spanish: "Presiona las teclas de flecha izquierda y flecha derecha para",
  },
  {
    english: "Press the left and right arrow keys",
    spanish: "Presiona las teclas de flecha izquierda y flecha derecha para",
  },
  {
    english: "Press up and down arrow keys",
    spanish: "Presiona las teclas de flecha arriba y flecha abajo",
  },
  {
    english: "Press up and down arrows",
    spanish: "Presiona las teclas de flecha arriba y flecha abajo",
  },
  {
    english: "Press up and down arrow",
    spanish: "Presiona las teclas de flecha arriba y flecha abajo",
  },
  {
    english: "Press the up and down arrow keys",
    spanish: "Presiona las teclas de flecha arriba y flecha abajo",
  },
  {
    english: "to change the number of partitions",
    spanish: "para cambiar el número de divisiones",
  },
  {
    english: "to change the slider value",
    spanish: "para cambiar el valor del control deslizante",
  },
  {
    english: "to change the value",
    spanish: "para cambiar el valor",
  },
  {
    english: "to go to different options",
    spanish: "para dirigirte a diferentes opciones",
  },
  {
    english: "Use + or - to move this point",
    spanish: "Usa las teclas más o menos para mover este punto",
  },
  {
    english: "Use + or -",
    spanish: "Usa las teclas más o menos",
  },
  {
    english: "to move this point",
    spanish: "para mover este punto",
  },
  {
    english: "to change the height of the bar",
    spanish: "para cambiar la altura de la barra",
  },
  {
    english: "to change the number of X's",
    spanish: "para cambiar el número de equis",
  },
  {
    english: "to move the cursor rectangle",
    spanish: "para mover el cursor a otro rectángulo",
  },
  {
    english: "to move the number label",
    spanish: "para mover el rótulo del número",
  },
  {
    english: "Press space to read the prompt again",
    spanish: "Presiona la barra de espacio para volver a leer el planteamiento",
  },
  {
    english: "Press space to read the prompt",
    spanish: "Presiona la barra de espacio para a leer el planteamiento",
  },
  {
    english: "Press space to shade or unshade",
    spanish: "Presiona la barra de espacio para sombrear o quitar el sombreado",
  },
  {
    english: "Press space to try your work",
    spanish: "Presiona la barra de espacio para probar tu trabajo",
  },
  {
    english: "Press space to reset your work",
    spanish: "Presiona la barra de espacio para reiniciar tu trabajo",
  },
  {
    english: "Use the reset button to reset your work",
    spanish: "Presiona la barra de espacio para reiniciar tu trabajo",
  },
  {
    english: "Press space to reset the interactive",
    spanish:
    "Presiona la barra de espacio para reiniciar la actividad interactiva",
  },
  {
    english: "Press space to reset",
    spanish: "Presiona la barra de espacio para reiniciar",
  },
  {
    english: "Press space to check your work",
    spanish: "Presiona la barra de espacio para comprobar tu trabajo",
  },
  {
    english: "Press space to check checkbox",
    spanish:
      "Presiona la barra de espacio para marcar la casilla de verificación",
  },
  {
    english: "Press space to uncheck checkbox",
    spanish:
      "Presiona la barra de espacio para desmarcar la casilla de verificación",
  },
  // If none of the above specific "Press space to" strings are present, use the generic starter:
  {
    english: "Press space to",
    spanish: "Presiona la barra de espacio para",
  },
  {
    english: "Input a value",
    spanish: "Ingresa un valor",
  },
  {
    english: "and press enter to submit",
    spanish: "y presiona la tecla intro para enviar",
  },
  {
    english: "press enter to submit",
    spanish: "presiona la tecla intro para enviar",
  },
  {
    english:
      "Press the escape key to exit the interactive and return to the page",
    spanish:
      "Presiona la tecla de escape para salir de la actividad interactiva y regresar a la página",
  },
  {
    english: "Press enter to select",
    spanish: "Presiona la tecla intro para seleccionar",
  },
  { english: "Press k to", spanish: "Presiona k para" },
  {
    english: "show keyboard instructions",
    spanish: "ocultar las instrucciones de teclado",
  },
  {
    english: "hide keyboard instructions",
    spanish: "mostrar las instrucciones de teclado",
  },
  {
    english: "Press x to restart the tab cycle",
    spanish: "Presiona x para reiniciar el ciclo de pestañas",
  },
  {
    english: "Press tab to select next object",
    spanish: "Presiona la tecla tab para seleccionar el siguiente objeto",
  },
  {
    english: "The interactive has been reset",
    spanish: "La actividad interactiva se ha reiniciado",
  },
  {
    english: "Input Error",
    spanish: "Error en el valor de entrada",
  },
  {
    english: "Enter a number",
    spanish: "Ingresa un número",
  },
  {
    english: "There is an input error on this line",
    spanish: "Hay un error en el valor de entrada en esta línea",
  },
  {
    english: "There are input errors on this line",
    spanish: "Hay errores en el valor de entrada en esta línea",
  },
  {
    english: "Length in inches",
    spanish: "Longitud en pulgadas",
  },
  {
    english: "The whole number intervals are not partitioned",
    spanish: "Los intervalos de números enteros no están divididos",
  },
  {
    english: "Consider the expression",
    spanish: "Considera la expresión",
  },
  {
    english: "Keyboard instructions enabled",
    spanish: "Las instrucciones de teclado están activadas",
  },
  {
    english: "Keyboard instructions on",
    spanish: "Las instrucciones de teclado están activadas",
  },
  {
    english: "The point is at its",
    spanish: "Este punto está en su",
  },
  {
    english: "This point is at its",
    spanish: "Este punto está en su",
  },

  {
    english: "minimum x value and maximum and y value",
    spanish: "valor X mínimo y en su valor Ye máximo",
  },
  {
    english: "maximum x value and minimum and y value",
    spanish: "valor X máximo y en su valor Ye mínimo",
  },
  {
    english: "maximum x value",
    spanish: "valor X máximo",
  },
  {
    english: "maximum y value",
    spanish: "valor Ye máximo",
  },
  {
    english: "maximum x and y value",
    spanish: "valor X y Ye máximo",
  },
  {
    english: "minimum x value",
    spanish: "valor X mínimo",
  },
  {
    english: "minimum y value",
    spanish: "valor Ye mínimo",
  },
  {
    english: "minimum x and y value",
    spanish: "valor X y Ye mínimo",
  },
  {
    english: "The slider is at its smallest number",
    spanish: "Esta barra deslizadora está en su número más pequeño.",
  },
  {
    english: "The slider is at its biggest number",
    spanish: "Esta barra deslizadora está en su número más grande.",
  },
  {
    english: "This slider is at its lowest value",
    spanish: "Esta barra deslizadora está en su valor mínimo",
  },
  {
    english: "This slider is at its highest value",
    spanish: "Esta barra deslizadora está en su valor máximo",
  },
  {
    english: "Fill in the blanks to find",
    spanish: "Completa los espacios para hallar",
  },
  {
    english: "Current movement increment is",
    spanish: "El incremento actual del movimiento es de",
  },
  {
    english: "Current X movement increment is",
    spanish: "El incremento actual del movimiento en el eje X es de",
  },
  {
    english: "and Y movement increment is",
    spanish: "y el incremento del movimiento en el eje Ye es de",
  },
];
// {
//   english: "Press space to increment X by [nextStepDX] and Y by [nextStepDY].",
//   spanish: "Presiona la barra de espacio para aumentar [nextStepDX] a la vez en el eje X y [nextStepDY] a la vez en el eje Ye.",
// },

// Replace the English string with its Spanish equivalent.
function replaceStrings(code) {
  replacements.forEach((replacement) => {
    // Split the sentence into words using non-word characters as delimiters
    const words = replacement.english.split(/\W+/).filter(Boolean);

    // Check if all words are found in the code
    const allWordsFound = words.every((word) =>
      new RegExp(`(?:^|\\s|\\W)${word}(?=$|\\s|\\W)`, "gi").test(code)
    );

    if (allWordsFound) {
      // Regex to match the sentence and any surrounding characters
      const sentencePattern = words.join("[\\W\\s]*");
      const replacementRegex = new RegExp(sentencePattern, "gi");

      // Replace the entire sentence with the replacement sentence
      code = code
        .replace(replacementRegex, replacement.spanish)
        .replace(" - ", " ");
    }
  });
  return code;
}

function swapStrings() {
  const inputCode = document.getElementById("inputCode").value;
  const outputCode = replaceStrings(inputCode);
  const outputElement = document.getElementById("outputCode");
  outputElement.textContent = outputCode;

  const copyButton = document.getElementById("copyButton");
  if (outputCode.trim()) {
    copyButton.style.display = "block";
  } else {
    copyButton.style.display = "none";
  }
}

function copyCode() {
  const outputCode = document.getElementById("outputCode");
  const range = document.createRange();
  range.selectNodeContents(outputCode);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  autoDismissAlert("Code copied to clipboard!", 2000);
}
function autoDismissAlert(message, duration) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
  `;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    document.body.removeChild(alertBox);
  }, duration);
}

/* eslint-disable no-unused-vars */

function makeMDX(dbTitle, isVariant = false, baseName = "") {
  const pascalTitle = pascalCase(dbTitle);
  const today = new Date();
  const todayFormatted = `${today.getMonth() + 1}/${today.getDate()}/${
    today.getFullYear() % 1000
  }`;
  return isVariant
    ? `Modify .mdx of base applet!

- Add to stories import:
import { /* current stuff */, ${pascalTitle} } from './${baseName}.stories.tsx';

- Add to Variations section:
### ${dbTitle}
<Canvas of={${pascalTitle}} />`
    : `import { Meta, Canvas } from '@storybook/blocks';
import { Main } from './${pascalTitle}.stories.tsx';

<Meta title="Math/${dbTitle}" />

# ${dbTitle}

## Pedagogical Overview

Provide a detailed description of the applet. Explain the
primary purpose, the problem it solves, and its significance in the context
of the application or project. Include any non-negotiables.

## Features

Include features (input box, animation, "press m", etc.).

## Changelog

 - ${todayFormatted} (Name) Added to storybook.

## Demo

<Canvas of={Main} />

## Variations
`;
}

function makeStoryTSX(dbTitle, isVariant = false, baseName = "") {
  const pascalTitle = pascalCase(dbTitle);
  const hyphenTitle = hyphenate(dbTitle);
  const uniqueID = makeUniqueID(dbTitle, isVariant, baseName);
  return isVariant
    ? `Modify .stories.tsx of base applet!
    
- Add new import:
import {
  variantAppletOnLoad as onLoad${pascalTitle},
  extraParams as params${pascalTitle},
} from '../${hyphenTitle}/${pascalTitle}';

- Add new export:
export const ${pascalTitle}: Story = {
  args: {
    geogebraParams: {
      ...geogebraParams,
      id: '${uniqueID}',
      appletOnLoad: onLoad${pascalTitle},
      ...params${pascalTitle},
    },
  },
};`
    : `import type { Meta, StoryObj } from '@storybook/react';
import { GeoGebra } from '@/components/sharedUI/GeoGebra/GeoGebra';
import { geogebraParams } from '../${pascalTitle}';

const meta: Meta<typeof GeoGebra> = {
  component: GeoGebra,
  title: 'Math/${dbTitle}',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GeoGebra>;

export const Main: Story = {
  args: {
    geogebraParams: {
      ...geogebraParams,
    },
  },
};
`;
}

function makePascalTSX(dbTitle, materialId, isVariant = false, baseName = "") {
  const pascalTitle = pascalCase(dbTitle);
  const uniqueID = makeUniqueID(dbTitle, isVariant, baseName);
  // --
  const extraImport = isVariant
    ? `
import { GeoGebraObject } from '@/utils/ggbApplets/GgbObject';`
    : "";
  const matID = isVariant
    ? `import { geogebraParams } from '../${baseName}';`
    : `export const geogebraParams = {
  material_id: '${materialId}',
  id: '${uniqueID}',
};`;
  // --
  const modifications = isVariant
    ? `

export const extraParams = { /* any extra GGB params here */ };

export const variantAppletOnLoad = (ggbObject: GeoGebraObject) => {
  // on load code here
};`
    : "";
  // --
  const passItems = isVariant
    ? `, id: '${uniqueID}', appletOnLoad: variantAppletOnLoad, ...extraParams`
    : "";
  // --
  const useClient = isVariant
    ? `'use client';
`
    : "";
  // --
  return `${useClient}import { GeoGebra } from '@/components/sharedUI/GeoGebra/GeoGebra';${extraImport}

${matID}${modifications}

export const ${pascalTitle} = () => <GeoGebra geogebraParams={{ ...geogebraParams${passItems} }} />;
`;
}

function makeSpecTSX(dbTitle, isVariant = false, baseName = "") {
  const pascalTitle = pascalCase(dbTitle);
  const uniqueID = makeUniqueID(dbTitle, isVariant, baseName);
  // --
  const extraImports = isVariant
    ? `
import { createMockGeoGebraObject } from '@/utils/ggbApplets/mockGgbObject';
import { geogebraParams } from '../${baseName}';`
    : "";
  // --
  const onLoadDescribe = isVariant
    ? `describe('${pascalTitle} onAppletLoad', () => {
  it('example: should show text1', () => {
    const mockGgbObject = createMockGeoGebraObject();
    variantAppletOnLoad(mockGgbObject);
    // expect(mockGgbObject.setVisible).toHaveBeenCalledWith('text1', true);
  });
  // make sure you have one "it should" block per GGB method call!
});

`
    : "";
  // --
  const extraPassDescribe = isVariant
    ? `
          id: '${uniqueID}',
          appletOnLoad: expect.any(Function),
          ...extraParams,`
    : "";
  // --
  return `import { render } from '@/utils/testUtils';
import { ${pascalTitle}, ${
    isVariant ? `variantAppletOnLoad, extraParams` : `geogebraParams`
  } } from './${pascalTitle}';${extraImports}

${onLoadDescribe}describe('${pascalTitle}', () => {
  it('should call GeoGebra', () => {
    const mockGeoGebra =
      require('${
        isVariant ? "../" : ""
      }../../../components/sharedUI/GeoGebra/GeoGebra').GeoGebra;
    render(<${pascalTitle} />);
    expect(mockGeoGebra).toHaveBeenCalledWith(
      expect.objectContaining({
        geogebraParams: {
          ...geogebraParams,${extraPassDescribe}
        },
      }),
      {},
    );
  });
});
`;
}

function makePageTSX(dbTitle) {
  const pascalTitle = pascalCase(dbTitle);
  return `import { ${pascalTitle} } from './${pascalTitle}';

export default ${pascalTitle};
`;
}

function makeBranchName(dbTitle, ticketNum) {
  const hyphenTitle = hyphenate(dbTitle);
  return `feat-digi-${ticketNum.replace("DIGI-", "")}-${hyphenTitle}`;
}

function makeUniqueID(dbTitle, isVariant = false, baseName) {
  const baseSpaced = baseName.replace(/([A-Z]|[0-9]+)/g, " $&").trim();
  return hyphenate(isVariant ? `${baseSpaced} ${dbTitle}` : `${dbTitle} main`);
}

function pascalCase(title) {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");
}

function hyphenate(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}

function downloadFile(content, filename) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for Firefox
  element.click();
  document.body.removeChild(element);
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

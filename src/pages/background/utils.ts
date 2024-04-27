/**
 * Copies the provided text to the clipboard using the Clipboard API.
 * If the Clipboard API is not available, it falls back to a temporary textarea method.
 * @param text - The text to be copied to the clipboard.
 */
async function copyTextToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    // Clipboard API not available, use fallback method
    fallbackCopyTextToClipboard(text);
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    print("Text successfully copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text to clipboard:", err);
  }
}

/**
 * Fallback method to copy text to the clipboard by creating a temporary textarea element.
 * @param text - The text to be copied to the clipboard.
 */
function fallbackCopyTextToClipboard(text: string): void {
  // Create a temporary textarea element
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    print("Text successfully copied to clipboard");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

/**
 * Extracts the XPath of a given DOM element.
 * @param HTMLElement - The DOM element to extract the XPath from.
 * @returns The XPath string of the element.
 */
function extractXPath(element: HTMLElement): string {
  if (element.tagName === "BODY" || element === null) {
    return "/HTML/BODY";
  }

  let path = "";
  let siblingIndex = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i] as HTMLElement;
    if (
      sibling.nodeType === Node.ELEMENT_NODE &&
      sibling.tagName === element.tagName
    ) {
      siblingIndex++;
      if (sibling === element) {
        path = "/" + element.tagName + "[" + siblingIndex + "]" + path;
        break;
      }
    }
  }
  return extractXPath(element.parentNode as HTMLElement) + path;
}

/**
 * Extracts the XPath of a given DOM element.
 * @param HTMLElement - The DOM element to extract the XPath from.
 * @returns The HTML element.
 */
function extractTextXPath(element: HTMLElement): HTMLElement {
  if (element.tagName === "BODY" || element === null) {
    return null;
  }
  if (
    element.tagName === "TEXTAREA" ||
    element.tagName === "INPUT" ||
    element.contentEditable === "true"
  ) {
    return element;
  } else {
    return extractTextXPath(element.parentNode as HTMLElement);
  }
}

/**
 * Highlights a DOM element specified by an XPath.
 * @param xpath - The XPath to find the element.
 * @param document - The document to search within.
 * @param setHighlightedElement - Function to set the highlighted element state.
 */
function highlightElementByXPath(
  xpath: string,
  document: Document,
  setHighlightedElement: (element: {
    Element: HTMLElement;
    OriginalStyle: string;
  }) => void,
): void {
  const xPathRes = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  const element = xPathRes.singleNodeValue;

  if (element && element instanceof HTMLElement) {
    const originalStyle = element.style.border;
    element.style.border = "2px solid #E7191F";
    setHighlightedElement({ Element: element, OriginalStyle: originalStyle });
  }
}

/**
 * Removes the highlight from an element specified by an XPath.
 * @param highlightedElement - The highlighted element object containing the element and its original style.
 */
function removeHighlightElementByXPath(highlightedElement: {
  Element: HTMLElement;
  OriginalStyle: string;
}): void {
  const element = highlightedElement["Element"];
  const originalStyle = highlightedElement["OriginalStyle"];
  element.style.border = originalStyle;
}

/**
 * Replaces keys in a string with corresponding values from a key-value object.
 * @param textString - The string containing keys to be replaced.
 * @param keyObject - The object containing key-value pairs for replacement.
 * @returns The string with keys replaced by values.
 */
function replaceKeysWithValues(
  textString: string,
  keyObject: { [key: string]: { value: { content: string } } },
): string {
  if (
    !(Object.keys(keyObject).length === 0 && keyObject.constructor === Object)
  ) {
    Object.keys(keyObject).forEach(key => {
      const escapedKey = "@" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      textString = textString.replace(
        new RegExp(escapedKey, "g"),
        keyObject[key]["value"]["content"],
      );
    });
  }
  return textString;
}

/**
 * Replaces keys in a string with corresponding values from a key-value object.
 * @param textString - The string containing keys to be replaced.
 * @param keyObject - The object containing key-value pairs for replacement.
 * @returns The string with keys replaced by values.
 */
function replaceKeysWithValues2(
  textString: string,
  keyObject: { [key: string]: string },
): string {
  if (
    !(Object.keys(keyObject).length === 0 && keyObject.constructor === Object)
  ) {
    Object.keys(keyObject).forEach(key => {
      const escapedKey = "@" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      textString = textString.replace(
        new RegExp(escapedKey, "g"),
        keyObject[key],
      );
    });
  }
  return textString;
}

/**
 * Replaces keys in a string with corresponding values from a key-value object and can add spaces between values.
 * @param textString - The string containing keys to be replaced.
 * @param keyObject - The object containing key-value pairs for replacement.
 * @param addSpace - Boolean indicating whether to add spaces between replaced values.
 * @returns An array of strings, or a string with keys replaced by values.
 */
function replaceKeysWithValues3(
  textString: string,
  keyObject: { [key: string]: string | Array<string> },
  addSpace: boolean,
): Array<string> | string {
  if (
    !(Object.keys(keyObject).length === 0 && keyObject.constructor === Object)
  ) {
    let index = 0;
    // Explicitly type tempObject to have string keys and array values
    const tempObject: { [key: string]: string | Array<string> } = {};
    Object.keys(keyObject).forEach(key => {
      const escapedKey = "@" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      textString = textString.replace(
        new RegExp(escapedKey, "g"),
        `var${index}`,
      );
      // Ensure every value is treated as an array
      tempObject[`var${index}`] = Array.isArray(keyObject[key])
        ? ([] as string[]).concat(...(keyObject[key] as string[]))
        : [keyObject[key] as string];
      index += 1;
    });

    const resultList: Array<string> = [];
    const textStringItems = textString.split(" ");
    const maxLength = Math.max(
      ...Object.values(tempObject).map(arr => arr.length),
    );

    if (textStringItems.includes("@blanklist")) {
      tempObject["@blanklist"] = new Array(maxLength).fill(" ");
      print("Updated tempObject", tempObject);
    }
    // Find the longest array length to know how many iterations are needed
    print("This is the tempobject", tempObject);
    for (let i = 0; i < maxLength; i++) {
      textStringItems.forEach(val => {
        const valueArray = tempObject[val];
        if (valueArray && i < valueArray.length) {
          print("This is the valueArray element", valueArray[i]);
          resultList.push(valueArray[i]);
          if (addSpace) resultList.push(" ");
        } else if (!valueArray && i === 0) {
          // Only add non-variable words in the first iteration
          resultList.push(val);
        }
      });
    }

    return resultList;
  } else {
    return textString;
  }
}

/**
 * Replaces keys in a string with corresponding values from a key-value object and returns an object with the replacements.
 * @param textString - The string containing keys to be replaced.
 * @param keyObject - The object containing key-value pairs for replacement.
 * @returns An object with keys that were replaced and their corresponding values.
 */
function replaceKeysWithValues4(
  textString: string,
  keyObject: { [key: string]: string },
): { [key: string]: string } {
  const returnObject = {};
  if (
    !(Object.keys(keyObject).length === 0 && keyObject.constructor === Object)
  ) {
    Object.keys(keyObject).forEach(key => {
      const escapedKey = "@" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const newTextString = textString.replace(
        new RegExp(escapedKey, "g"),
        keyObject[key],
      );
      if (newTextString !== textString) {
        textString = newTextString;
        returnObject[key] = keyObject[key];
      }
    });
  }
  return returnObject;
}

/**
 * Strips newlines from a string and cuts it down to the first 2000 words.
 * @param text - The text to be processed.
 * @returns The processed string.
 */
function stripNewlinesAndCutWords(text: string): string {
  const noNewlines = text.replace(/\r?\n|\r/g, " ");
  const words = noNewlines.split(/\s+/);
  const first2000Words = words.slice(0, 2000).join(" ");
  if (first2000Words) return first2000Words;
  else return text;
}

/**
 * Asynchronously retrieves the current tab ID using Chrome's messaging API.
 * @returns A promise that resolves to the current tab ID.
 */
async function getTabIdAsync(): Promise<number> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getTabId" }, function (response) {
      if (chrome.runtime.lastError) {
        print(chrome.runtime.lastError.message);
        reject(new Error("chrome.runtime.lastError"));
      } else {
        resolve(response.tabId);
      }
    });
  });
}

/**
 * Extracts words that start with "@" from a string.
 * @param str - The string to extract words from.
 * @returns An array of words that start with "@".
 */
function extractAtWords(str: string): Array<string> {
  const words = str.split(/\s+/);
  const atWords = words
    .filter(word => word.startsWith("@"))
    .map(word => word.slice(1));
  return atWords;
}

/**
 * Generates the next key based on a prefix and existing keys in a given object.
 * @param memory - The object containing existing keys.
 * @param keyPrefix - The prefix for the key.
 * @returns The next key string.
 */
function getNextKey(
  memory: { [key: string]: object },
  keyPrefix: string,
): string {
  const numbers = Object.keys(memory)
    .filter(key => key.startsWith(keyPrefix))
    .map(key => parseInt(key.slice(keyPrefix.length), 10))
    .filter(num => !isNaN(num));

  const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
  return `${keyPrefix}${maxNumber + 1}`;
}

/**
 * Sets a value with a specified key in Chrome's local storage.
 * @param key - The key under which the value is stored.
 * @param value - The value to be stored.
 * @returns A promise that resolves to true when the operation is successful.
 */
function setChromeStorage(
  key: string,
  value: object | string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * Retrieves a value from Chrome's local storage by key.
 * @param key - The key of the value to be retrieved.
 * @returns A promise that resolves to the value associated with the key.
 */
function getChromeStorage(key: string): Promise<object | string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}

/**
 * Generates a random alphanumeric string of 20 characters.
 * @returns A string representing a randomly generated UUID.
 */
const generateAlphanumericUUID: () => string = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uuid = "";
  for (let i = 0; i < 20; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
};

/**
 * Sorts an array of objects by a timestamp property.
 * @param array - The array to be sorted.
 * @returns The sorted array with the most recent timestamp first.
 */
const sortArrayByTimestamp = array => {
  const convertToDate = timestamp => {
    if (typeof timestamp === "string") {
      return new Date(timestamp);
    }
    return new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
    );
  };

  return array.sort((a, b) => {
    const dateA = convertToDate(a.timestamp);
    const dateB = convertToDate(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Custom print function that logs inputs to the console along with their call location, used only in development mode.
 * @param inputs - The inputs to be logged.
 */
const print = (...inputs) => {
  if (import.meta.env.MODE === "development") {
    const stack = new Error().stack;
    console.log(...inputs, "\nLocation:", stack.split("\n")[2].trim());
  }
};

/**
 * Generates a simple hash from a string.
 * @param s - The string to hash.
 * @returns The hash code of the string.
 */
function simpleHash(s: string): number {
  return s.split("").reduce((a, b) => {
    return (a << 5) - a + b.charCodeAt(0);
  }, 0);
}

/**
 * Extracts the domain from a given URL.
 * @param url - The URL to extract the domain from.
 * @returns The domain name of the URL.
 */
function getDomainFromUrl(url: string): string {
  const hostname = new URL(url).hostname;
  return hostname;
}

function checkIfLatest(automation) {
  const nameArray = automation.Automation.map(obj => obj.Name);

  const caseArray = [
    "Click",
    "Go to a URL",
    "Scroll",
    "Type",
    "Instant Actions & Triggers",
    "Wait",
    "Read from screen",
    "Loop Logic",
    "Decision Logic",
    "Action Logic",
    "Loop Logic",
    "Get URL",
    "Go Back",
  ];

  return nameArray.every(name => caseArray.includes(name));
}

export {
  copyTextToClipboard,
  extractXPath,
  extractTextXPath,
  highlightElementByXPath,
  removeHighlightElementByXPath,
  replaceKeysWithValues,
  replaceKeysWithValues2,
  replaceKeysWithValues3,
  replaceKeysWithValues4,
  stripNewlinesAndCutWords,
  getTabIdAsync,
  extractAtWords,
  getNextKey,
  generateAlphanumericUUID,
  sortArrayByTimestamp,
  print,
  setChromeStorage,
  getChromeStorage,
  simpleHash,
  getDomainFromUrl,
  checkIfLatest,
};

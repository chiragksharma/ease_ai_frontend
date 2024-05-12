import { PointerAnimation,TypingAnimation } from "@pages/background/animationFunctions";

// Define a type for the sendResponse callback function
type SendResponse = (response: { status: string, error?: string }) => void;


// Function to get an element by XPath
export function getElementByXPath(xpath: string): HTMLElement | null {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
}

// Function to process a click action via XPath
export function processXPathAndClick(xpath: string, callback: () => void, sendResponse: SendResponse): void {
    let element = getElementByXPath(xpath);
    if (element) {
        element.click();
        console.log("Clicked on the element", element);
        callback();
    } else {
        console.error("Clickable element not found");
        sendResponse({ status: "failed", error: "Clickable element not found" });
    }
}

// Function to process typing in an element identified by XPath
export function processXPathAndType(xpath: string, cursor: HTMLElement, text: string, sendResponse: SendResponse): void {
    let inputElement = getElementByXPath(xpath);
    console.log("This is the input element:",inputElement)
    //&& (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement)
    if (inputElement) {
        console.log("inside the inputelement function")
        const pointerAnimation = new PointerAnimation(cursor); // Assuming PointerAnimation is defined elsewhere
        const typingAnimation = new TypingAnimation(inputElement); // Assuming TypingAnimation is defined elsewhere

        pointerAnimation.movePointerToElement(inputElement)
            .then(() => {
                // cursor.style.display = 'none'; // Hide cursor after moving
                return typingAnimation.startTyping(text);
            })
            .then(() => {
                console.log("Typing animation completed");
                cursor.style.display = 'none';
                sendResponse({ status: "completed" });
            })
            .catch(error => {
                console.error("Failed to complete animation", error);
                sendResponse({ status: "failed", error: error.toString() });
            });
    } else {
        console.error("Input element is not an input or textarea");
        sendResponse({ status: "failed", error: "Incorrect input element type or not found" });
    }
}

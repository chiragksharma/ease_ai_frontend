export class PointerAnimation {
    private cursorElement: HTMLElement;

    constructor(cursorElement: HTMLElement) {
        this.cursorElement = cursorElement;
    }

    async movePointerToElement(targetElement: HTMLElement, duration: number = 1080): Promise<string> {
        const targetRect = targetElement.getBoundingClientRect();
        const targetX = targetRect.left + window.scrollX + targetRect.width / 2;
        const targetY = targetRect.top + window.scrollY + targetRect.height / 2;

        return new Promise<string>((resolve) => {
            const startTime = performance.now();
            const startX = parseFloat(this.cursorElement.style.left) || 0;
            const startY = parseFloat(this.cursorElement.style.top) || 0;

            const movePointer = (currentTime: number): void => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const newX = startX + (targetX - startX) * progress;
                const newY = startY + (targetY - startY) * progress;

                this.cursorElement.style.left = `${newX}px`;
                this.cursorElement.style.top = `${newY}px`;

                if (progress < 1) {
                    requestAnimationFrame(movePointer);
                } else {
                    resolve("completed");
                }
            };

            this.cursorElement.style.display = "block";
            requestAnimationFrame(movePointer);
        });
    }
}

export class TypingAnimation {
    private inputElement: HTMLInputElement;
    private element: HTMLInputElement;


    // constructor(inputElement: HTMLInputElement) {
    //     this.inputElement = inputElement;
    // }
    constructor(element) {
        this.element = element; // The element where typing occurs
    }

    startTyping(text: string, typingSpeed: number = 200): Promise<string> {
        return new Promise<string>((resolve) => {
            let i = 0;
            console.log("INside the water tank: ",text);
            const typing = (): void => {
                if (i < text.length) {
                    console.log("Okk bhai: ",text.length);
                    // this.inputElement.value += text.charAt(i);
                    this.element.innerHTML += text.charAt(i); // Use innerHTML or innerText
                    i++;
                    setTimeout(typing, typingSpeed);
                } else {
                    resolve("typing completed");
                }
            };
            typing();
        });
    }
}

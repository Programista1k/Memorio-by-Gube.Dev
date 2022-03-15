export class Hider {
    public static showElement(element: HTMLElement) {
        element.classList.toggle("hidden", false);
        element.classList.toggle("fadeIn", true);
    }

    public static hideElement(element: HTMLElement) {
        element.classList.toggle("hidden", true);
        element.classList.toggle("fadeIn", false);
    }
}

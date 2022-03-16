// This is main file, which is used to start the application - Enjoy!
// Btw. It's my first TypeScript project so it's a bit messy and not perfect for sure!

// Designed & Developed by gube.dev Maciej Guba!

import { InitModule } from "./modules/init";

class App {
    constructor() {
        new InitModule("Jak masz na Imię?...");
    }
}

new App();

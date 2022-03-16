// This is main file, which is used to start the application - Enjoy!
// Btw. It's my first TypeScript project so it's a bit messy and not perfect for sure!

// ============================ Explanation ============================
// You can find few config's here, for example the text that should be displayed on the login screen.

import { Game } from "./modules/game";
import { InitModule } from "./modules/init";
// import { Game } from "./modules/game";

class App {
    constructor() {
        new InitModule("Jak masz na Imię?...");
        new Game("Maciej", "Łatwy");
    }
}

new App();

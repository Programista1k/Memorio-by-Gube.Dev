// This is main file, which is used to start the application - Enjoy!
// Btw. It's my first TypeScript project so it's a bit messy and not perfect for sure!

import { LoginModule } from "./modules/login";

class App {
  constructor() {
    const login = new LoginModule("Jak masz na Imię?...");
    login.typingAnimation();

    console.log("This is constructor body");
  }
}

new App();

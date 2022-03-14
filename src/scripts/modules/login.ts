import { Autobind } from "../utils/Autobind";

export class LoginModule {
    private name: string = "";

    private loginLabel = document.querySelector(".login__name__label")!;
    private loginInput = document.querySelector(".login__name__input")! as HTMLInputElement;
    private loginError = document.querySelector(".login__error")!;

    private loginSubmit = document.querySelector(".login__submit")!;

    constructor(private text: string) {
        this.setListeners();
    }

    typingAnimation() {
        for (let i = 0; i < this.text.length; i++) {
            setTimeout(() => {
                this.loginLabel.innerHTML += this.text[i];
            }, i * 100);
        }
    }

    setName() {
        this.name = this.loginInput.textContent!;
    }

    getName() {
        return this.name;
    }

    showSubmit() {
        this.loginSubmit.classList.toggle("hidden", false);
        this.loginSubmit.classList.toggle("fadeIn", true);
    }

    hideSubmit() {
        this.loginSubmit.classList.toggle("hidden", true);
        this.loginSubmit.classList.toggle("fadeIn", false);
    }

    private setListeners() {
        this.loginInput.addEventListener("input", this.validateInput);
    }

    @Autobind
    private validateInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.loginError.innerHTML = "";
        if (target.value.length > 0 && target.value.length < 15) {
            this.setName();
            this.showSubmit();
        } else {
            this.loginError.innerHTML = "Nazwa musi zawierać od 1 do 15 znaków.";
            this.hideSubmit();
        }
    }
}

import { Autobind } from "../decorators/autobind";
import { Hider } from "../modules/helpers/hider";
import { Game } from "../modules/game";

export enum Difficulty {
    "easy" = "Łatwy",
    "medium" = "Średni",
    "hard" = "Trudny",
}

export class InitModule {
    private name: string = "";
    private difficulty: Difficulty;

    // Login section
    private loginContainer = document.querySelector(".container--login")!;

    private loginLabel = document.querySelector(".login__name__label")!;
    private loginInput = document.querySelector(".login__name__input")! as HTMLInputElement;
    private loginError = document.querySelector(".login__error")!;

    private loginSubmit = document.querySelector(".login__submit")! as HTMLElement;

    // Difficulty section
    private difficultyContainer = document.querySelector(".container--difficulty")! as HTMLElement;

    private difficulties = document.querySelectorAll(".difficulty")!;

    private difficultySubmit = document.querySelector(".difficulty__submit")! as HTMLElement;

    constructor(private text: string) {
        this.setListeners();
        this.typingAnimation();
        this.difficulty = Difficulty.easy;
    }

    @Autobind
    startGame() {
        new Game(this.name, this.difficulty);
        this.difficultyContainer.classList.remove("fadeIn");
        Hider.hideElement(this.difficultyContainer);
        this.difficultyContainer.classList.add("fadeOut");
    }

    @Autobind
    nextStep() {
        this.setName();
        this.loginContainer.classList.add("slideRight");
        setTimeout(() => {
            this.loginContainer.classList.add("hidden");
        }, 500);
        setTimeout(() => {
            this.difficultyContainer.classList.remove("hidden");
        }, 500);
        this.difficultyContainer.classList.add("fadeIn");
    }

    typingAnimation() {
        for (let i = 0; i < this.text.length; i++) {
            setTimeout(() => {
                this.loginLabel.innerHTML += this.text[i];
            }, i * 100);
        }
    }

    private setName() {
        this.name = this.loginInput.textContent!;
    }

    @Autobind
    private setDifficulty(e: Event) {
        const target = e.target as HTMLInputElement;
        switch (target.value) {
            case "easy":
                this.difficulty = Difficulty.easy;
                break;

            case "medium":
                this.difficulty = Difficulty.medium;
                break;

            case "hard":
                this.difficulty = Difficulty.hard;
                break;
        }
        Hider.showElement(this.difficultySubmit);
    }

    private setListeners() {
        this.loginInput.addEventListener("input", this.validateInput);
        this.loginSubmit.addEventListener("click", this.nextStep);
        this.difficulties.forEach((difficulty) => {
            const diff = difficulty as HTMLInputElement;
            diff.addEventListener("change", this.setDifficulty);
        });
        this.difficultySubmit.addEventListener("click", this.startGame);
    }

    @Autobind
    private validateInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.loginError.innerHTML = "";
        if (target.value.length > 0 && target.value.length < 15) {
            this.setName();
            Hider.showElement(this.loginSubmit);
        } else {
            this.loginError.innerHTML = "Nazwa musi zawierać od 1 do 15 znaków.";
            Hider.hideElement(this.loginSubmit);
        }
    }
}

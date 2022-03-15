import { Autobind } from "../decorators/autobind";
import { Renderer } from "./renderer";
import { Difficulty } from "./init";

export class Game {
    // All timer related
    private timerEnabled: boolean = true;
    private timeLimit: boolean = false;
    private time: string = "";
    private timeContent = document.querySelector(".game__nav__time")! as HTMLParagraphElement;

    private seconds = 0;
    private minutes = 0;
    private hours = 0;

    //Game related
    private gameContainer = document.querySelector(".container--game")!;

    private matchedElement = document.querySelector(".game__nav__matched") as HTMLSpanElement;
    private missMatchedElement = document.querySelector(".game__nav__missMatched") as HTMLSpanElement;
    private difficultyElement = document.querySelector(".game__nav__difficulty__text") as HTMLSpanElement;
    private singleCardElement = document.querySelectorAll(".single__card")!;

    private matched: number = 0;
    private missMatched: number = 0;

    constructor(private name: string, private difficulty: string) {
        this.prepareGame();
        this.setupListeners();
        this.getTime();
        new Renderer(this.name, this.difficulty);
    }

    private setupListeners() {
        this.singleCardElement.forEach((card) => {
            card.addEventListener("click", this.handleCardClick);
        });
    }

    private handleCardClick(e: Event) {
        const target = e.currentTarget as HTMLElement;
        target.classList.add("single__card__show");
    }

    private getTime() {
        this.time;
        this.matched;
        this.missMatched;
        this.matchedElement;
        this.missMatchedElement;
    }

    private prepareGame() {
        this.gameContainer.classList.remove("hidden");
        this.gameContainer.classList.add("fadeIn");
        this.startTimer();
        this.difficultyElement.innerText = this.difficulty;
        if (this.difficulty === Difficulty.hard) {
            this.timeLimit = true;
        }
    }

    private endGame() {
        // Tutaj będzie zakańczanie gry, pokazywanie ekranu końcowego z wynikami, usuwanie wszystkich pól, etc.
    }

    private startTimer() {
        if (this.timerEnabled === true) {
            setInterval(this.timer, 1000);
        }
    }

    @Autobind
    private timer() {
        if (this.timeLimit || this.minutes === 10) {
            this.endGame();
        }

        ++this.seconds;
        if (this.seconds == 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes == 60) {
                this.minutes = 0;
                this.hours++;
            }
        }

        this.setProperTime();
        this.timeContent.innerText = this.time;
    }

    private setProperTime() {
        let s: string;
        let m: string;
        let h: string;

        if (this.seconds < 10) {
            s = "0" + this.seconds;
        } else {
            s = this.seconds.toString();
        }

        if (this.minutes < 10) {
            m = "0" + this.minutes;
        } else {
            m = this.minutes.toString();
        }

        if (this.hours < 10) {
            h = "0" + this.hours;
        } else {
            h = this.hours.toString();
        }

        this.time = `${h}:${m}:${s}`;
    }
}

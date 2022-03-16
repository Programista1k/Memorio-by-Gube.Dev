import { Autobind } from "../decorators/autobind";
import { Renderer } from "./renderer";
import { Difficulty } from "./init";
import { Hider } from "./helpers/hider";

export class Game {
    private renderer: Renderer;

    // All timer related
    private timerEnabled: boolean = true;
    private timeLimit: boolean = false;
    private time: string = "";
    private timeContent = document.querySelector(".game__nav__time")! as HTMLParagraphElement;

    private seconds = 0;
    private minutes = 0;
    private hours = 0;

    //Game related
    private gameContainer = document.querySelector(".container--game")! as HTMLElement;

    private matchedElement = document.querySelector(".game__nav__matched") as HTMLSpanElement;
    private missMatchedElement = document.querySelector(".game__nav__missMatched") as HTMLSpanElement;
    private difficultyElement = document.querySelector(".game__nav__difficulty__text") as HTMLSpanElement;

    private singleCardElements = document.getElementsByClassName("single__card")!;

    private currentlyComparing: HTMLElement[] = [];

    private totalPairs: number = 0;

    private matched: number = 0;
    private missMatched: number = 0;

    private flipped: number = 0;

    // Ending container

    private endContainer = document.querySelector(".container--end")! as HTMLElement;
    private failedContainer = document.querySelector(".container--failed")! as HTMLElement;
    private endHeadingName = document.querySelector(".end__heading__name")! as HTMLSpanElement;
    private failedHeadingName = document.querySelector(".failed__heading__name")! as HTMLSpanElement;

    private endScore = {
        time: document.querySelector(".end__score__time")! as HTMLSpanElement,
        difficulty: document.querySelector(".end__score__difficulty")! as HTMLSpanElement,
        mistakes: document.querySelector(".end__score__mistakes")! as HTMLSpanElement,
        matches: document.querySelector(".end__score__matches")! as HTMLSpanElement,
    };

    private failedScore = {
        time: document.querySelector(".failed__score__time")! as HTMLSpanElement,
        difficulty: document.querySelector(".failed__score__difficulty")! as HTMLSpanElement,
        mistakes: document.querySelector(".failed__score__mistakes")! as HTMLSpanElement,
        matches: document.querySelector(".failed__score__matches")! as HTMLSpanElement,
    };

    private resetButton = document.querySelector(".end__restart")!;
    private resetFailedButton = document.querySelector(".failed__restart")!;

    constructor(private name: string, private difficulty: string) {
        this.setPairsCount();
        this.prepareGame();
        this.renderer = new Renderer(this.difficulty);
        this.setupListeners();
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
        this.timerEnabled = false;

        Hider.hideElement(this.gameContainer);
        this.gameContainer.classList.add("fadeOut");
        Hider.showElement(this.endContainer);

        this.resetButton.addEventListener("click", () => window.location.reload());

        this.endHeadingName.innerText = this.name;
        this.endScore.time.innerText = this.time;
        this.endScore.difficulty.innerText = this.difficulty;
        this.endScore.matches.innerText = this.matched.toString() + " / " + this.totalPairs.toString();
        this.endScore.mistakes.innerText = this.missMatched.toString();
    }

    private gameFailed() {
        Hider.hideElement(this.gameContainer);
        this.gameContainer.classList.add("fadeOut");
        Hider.showElement(this.failedContainer);

        this.resetFailedButton.addEventListener("click", () => window.location.reload());

        this.failedHeadingName.innerText = this.name;

        this.failedScore.time.innerText = this.time;
        this.failedScore.difficulty.innerText = this.difficulty;
        this.failedScore.matches.innerText = this.matched.toString() + " / " + this.totalPairs.toString();
        this.failedScore.mistakes.innerText = this.missMatched.toString();
    }

    private setupListeners() {
        for (let card of this.singleCardElements) {
            card.addEventListener("click", this.handleCardClick);
        }
    }

    private setPairsCount() {
        switch (this.difficulty) {
            case Difficulty.easy:
                this.totalPairs = 9;
                break;

            case Difficulty.medium:
                this.totalPairs = 16;
                break;

            case Difficulty.hard:
                this.totalPairs = 32;
                break;
        }
    }

    @Autobind
    private handleCardClick(e: Event) {
        const target = e.currentTarget as HTMLElement;
        if (this.flipped < 2) {
            this.flipped++;
            target.classList.add("single__card__show");
            target.classList.add("blocked");
            this.addToComparing(target);
            if (this.flipped === 2) {
                this.compareCards();
            }

            if (this.matched == this.totalPairs) {
                this.endGame();
            }
        }
    }

    @Autobind
    private startTimer() {
        if (this.timerEnabled === true) {
            setInterval(this.timer, 1000);
        }
    }

    private addToComparing(card: HTMLElement) {
        this.currentlyComparing.push(card);
    }

    private compareCards() {
        const firstId = this.currentlyComparing[0].id;
        const secondId = this.currentlyComparing[1].id;

        if (this.renderer.matchCards(firstId, secondId)) {
            this.matched++;
            this.currentlyComparing.forEach((card) => {
                card.classList.add("single__card__matched");
            });
            this.currentlyComparing = [];
            this.flipped = 0;
        } else {
            this.missMatched++;
            setTimeout(() => {
                this.currentlyComparing.forEach((card) => {
                    card.classList.remove("single__card__show");
                    card.classList.remove("blocked");
                });
                this.currentlyComparing = [];
                this.flipped = 0;
            }, 1000);
        }

        this.matchedElement.innerText = this.matched.toString();
        this.missMatchedElement.innerText = this.missMatched.toString();
    }

    @Autobind
    private timer() {
        if (this.timeLimit && this.minutes === 10) {
            this.timerEnabled = false;
            return this.gameFailed();
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

// import { Game } from ".game";
import { Difficulty } from "./init";

export class Renderer {
    // private gameContainer = document.querySelector(".container--game")!;
    private cardsContainer = document.querySelector(".game__content")!;

    private singleCardTemplate = document.querySelector(".single__card__template")! as HTMLTemplateElement;

    private cardsStorage: SingleCard[] = [];

    constructor(private difficulty: string) {
        this.initRender();
    }

    public matchCards(firstId: string, secondId: string) {
        const firstObject = this.cardsStorage.find((card) => card.id === firstId)!;
        const secondObject = this.cardsStorage.find((card) => card.id === secondId)!;

        if (firstObject.position === secondObject.pairPosition) {
            return true;
        } else {
            return false;
        }
    }

    private initRender() {
        switch (this.difficulty) {
            case Difficulty.easy:
                this.createCards(9, "easy");
                this.renderCards("easy");
                break;

            case Difficulty.medium:
                this.createCards(16, "medium");
                this.renderCards("medium");
                break;

            case Difficulty.hard:
                this.createCards(32, "hard");
                this.renderCards("hard");
                break;
        }
    }

    private renderCards(difficulty: string) {
        this.cardsStorage.forEach((card) => {
            let singleCard = this.singleCardTemplate.content.cloneNode(true) as HTMLElement;
            singleCard = singleCard.querySelector("div")!;
            singleCard.id = card.id;
            singleCard.classList.add(`single__card__${difficulty}`);
            const img = singleCard.querySelector(".single__card__image") as HTMLImageElement;
            img.src = card.imageSrc;

            this.cardsContainer.append(singleCard);
        });
    }

    private createCards(pairsCount: number, difficulty: string) {
        const randomSrcNumbers = this.getRandomNumbers(pairsCount);
        let randomPosNumbers = this.getArrayOfNumbers(0, 9);
        let randomSecondPosNumbers = this.getArrayOfNumbers(9, 18);

        while (!this.arrayValidation(randomPosNumbers, randomSecondPosNumbers)) {
            randomPosNumbers = this.getArrayOfNumbers(0, 9);
            randomSecondPosNumbers = this.getArrayOfNumbers(9, 18);
        }

        const randomSrcCopy = this.cloneArray(randomSrcNumbers);
        const randomSrcCopyClone = this.cloneArray(randomSrcNumbers);

        const cards: SingleCard[] = [];
        const clonedCards: SingleCard[] = [];

        for (let i = 0; i < pairsCount; i++) {
            const src = `src/images/${difficulty}/0${randomSrcCopy.pop()}.png`;
            const position = 0;
            const card = new SingleCard(Math.random().toString(), src, position, 0);
            cards.push(card);
        }

        cards.forEach((_) => {
            const src = `src/images/${difficulty}/0${randomSrcCopyClone.pop()}.png`;
            const clonePosition = 0;
            const cardClone = new SingleCard(Math.random().toString(), src, clonePosition, 0);
            clonedCards.push(cardClone);
        });

        randomPosNumbers = randomPosNumbers.reverse();
        randomSecondPosNumbers = randomSecondPosNumbers.reverse();

        cards.forEach((card) => {
            card.position = randomPosNumbers.pop() as number;
        });

        clonedCards.forEach((cardClone) => {
            cardClone.position = randomSecondPosNumbers.pop() as number;
        });

        for (let i = 0; i < cards.length; i++) {
            cards[i].setPairPosition(clonedCards[i].position);
            clonedCards[i].setPairPosition(cards[i].position);
        }

        this.cardsStorage.push(...cards, ...clonedCards);
    }

    private arrayValidation(a1: number[], a2: number[]): boolean {
        if (a1.length !== a2.length) {
            throw new Error("Arrays must have the same length.");
        }

        for (let i = 0; i < a1.length; i++) {
            if (a1[i] === a2[i]) {
                return false;
            }
        }

        return true;
    }

    private cloneArray(array: any[]) {
        let clonedArray = [];

        for (let i = 0; i < array.length; i++) {
            clonedArray.push(array[i]);
        }

        return clonedArray;
    }

    private getArrayOfNumbers(start: number, end: number) {
        const numbers = [];

        for (let x = start; x < end; x++) {
            numbers.push(x);
        }

        return numbers;
    }

    private getRandomNumbers(count: number) {
        const numbers = [];

        for (let x = 0; x < count; x++) {
            numbers.push(x);
        }

        for (let i = numbers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp: any = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

        return numbers;
    }

    getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

interface Card {
    id: string;
    imageSrc: string;
    position: number;
    pairPosition: number;
}

class SingleCard implements Card {
    constructor(
        public id: string,
        public imageSrc: string,
        public position: number,
        public pairPosition: number
    ) {}

    setPairPosition(pos: number) {
        this.pairPosition = pos;
    }
}

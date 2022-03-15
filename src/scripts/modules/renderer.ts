// import { Game } from ".game";
import { Difficulty } from "./init";

export class Renderer {
    private gameContainer = document.querySelector(".container--game");

    // private singleCardTemplate = document.querySelector(".single__card__template")! as HTMLTemplateElement;
    // private singleCardCloned = this.singleCardTemplate.content.cloneNode(true) as DocumentFragment;

    private cardsStorage: SingleCard[] = [];

    constructor(private name: string, private difficulty: string) {
        this.name;
        this.difficulty;
        this.gameContainer;
        this.render();
    }

    render() {
        this.initRender(this.difficulty);
        this.createCards(9, this.difficulty);
        console.log(this.cardsStorage);
    }

    private initRender(difficulty: string) {
        switch (difficulty) {
            case Difficulty.easy:
                this.renderEasy();
                break;

            case Difficulty.medium:
                this.renderMedium();
                break;

            case Difficulty.hard:
                this.renderHard();
                break;
        }
    }

    // Renders 9 pairs, 18 elements total!
    private renderEasy() {}

    // Renders 16 pairs, 32 elements total!
    private renderMedium() {}

    // Renders 32 pairs, 64 elements total - has 10 minute limit time!
    private renderHard() {}

    private createCards(pairsCount: number, difficulty: string) {
        const randomSrcNumbers = this.getRandomNumbers(pairsCount);
        let randomPosNumbers = this.getRandomNumbers(pairsCount);
        let randomSecondPosNumbers = this.getRandomNumbers(pairsCount);

        while (!this.arrayValidation(randomPosNumbers, randomSecondPosNumbers)) {
            randomPosNumbers = this.getRandomNumbers(pairsCount);
            randomSecondPosNumbers = this.getRandomNumbers(pairsCount);
        }

        const randomSrcCopy = this.cloneArray(randomSrcNumbers);
        const randomSrcCopyClone = this.cloneArray(randomSrcNumbers);

        for (let i = 0; i < pairsCount; i++) {
            const src = `src/images/${difficulty}/0${randomSrcCopy.pop()}.png`;
            const position = randomPosNumbers.pop();
            const card = new SingleCard(Math.random().toString(), src, position, 0);
            this.cardsStorage.push(card);
        }

        this.cardsStorage.forEach((_) => {
            const src = `src/images/${difficulty}/0${randomSrcCopyClone.pop()}.png`;
            const clonePosition = randomSecondPosNumbers.pop();
            const cardClone = new SingleCard(Math.random().toString(), src, clonePosition, 0);
            this.cardsStorage.push(cardClone);
        });
    }

    private matchCards() {
        )
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

    // private renderCards(quantity: number) {}

    private cloneArray(array: any[]) {
        let clonedArray = [];

        for (let i = 0; i < array.length; i++) {
            clonedArray.push(array[i]);
        }

        return clonedArray;
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

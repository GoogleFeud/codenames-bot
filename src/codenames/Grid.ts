
import {Canvas, CanvasRenderingContext2D, registerFont} from "canvas";
import fs from "fs";

registerFont("./assets/font.otf", {family: "codenames"});

export interface Coordinate {
    x: number,
    y: number,
    wordColor: string
}

export class Grid {
    canvas: Canvas
    context: CanvasRenderingContext2D
    squares: Map<string, Coordinate>
    private buffer?: Buffer
    constructor() {
        this.canvas = new Canvas(1200, 1200);
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#4a4a4a";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.squares = new Map();
    }

    draw(words: Array<string>) : void {
        this.context.strokeStyle = "grey";
        this.context.beginPath();
        this.context.moveTo(240, 0);
        this.context.lineTo(240, 1200);
        this.context.moveTo(480, 0);
        this.context.lineTo(480, 1200);
        this.context.moveTo(720, 0);
        this.context.lineTo(720, 1200);
        this.context.moveTo(960, 0);
        this.context.lineTo(960, 1200);
        let i=0;
        for (let x=0; x <= 1000; x += 240) {
            for (let y=0; y <= 1000; y += 240) {
                this.context.font = this.sizeWord(words[i]);
                this.context.fillStyle = "white";
                this.context.textAlign = "center"; 
                this.context.fillText(words[i], x + 120, y + 120);
                this.squares.set(words[i], {x, y, wordColor: "white"});
                this.context.rect(x, y, 240, 240);
                i++;
            }
        }
        this.context.stroke();
    }

    colorBox(word: string, color: string) : void {
        const square = this.squares.get(word);
        if (!square) return;
        this.context.fillStyle = color;
        this.context.fillRect(square.x, square.y, 240, 240);
        this.context.strokeStyle = "black";
        this.context.strokeRect(square.x, square.y, 240, 240);
        this.context.font = this.sizeWord(word);
        this.context.textAlign = "center";
        this.context.fillStyle = square.wordColor;
        this.context.fillText(word, square.x + 120, square.y + 120);
        delete this.buffer;
    }

    colorWord(word: string, color: string) : void {
        const square = this.squares.get(word);
        if (!square) return;
        this.context.fillStyle = color;
        square.wordColor = color;
        this.context.font = this.sizeWord(word);
        this.context.textAlign = "center";
        this.context.fillText(word, square.x + 120, square.y + 120);
        delete this.buffer;
    }

    getBuffer() : Buffer {
        if (this.buffer) return this.buffer;
        this.buffer = this.canvas.toBuffer();
        return this.buffer;
    }

    saveAsImage(path: string) : void {
        fs.writeFileSync(path, this.getBuffer());
    } 

    sizeWord(word: string) : string {
        let fontSize = 43;
        do {
            this.context.font = `bold ${fontSize -= 5}px codenames`;
        }while(this.context.measureText(word).width > 240);
        return this.context.font;
    }

}
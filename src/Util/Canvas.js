const canvas = require("canvas");
const fs = require("fs");
const {MessageAttachment} = require("discord.js");

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.word = null;
        this.wordColor = "white";
        this.boxColor = "#4a4a4a";
    }
}

class Canvas {
    constructor() {
        canvas.registerFont("./assets/myfont.otf", {family: "myfontNew-A"})
        this.canvas = new canvas.Canvas(1200, 1200, "png");
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#4a4a4a";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.rects = [];
        this.defaultGlobalAlpha = this.context.globalAlpha;
        this.defaultCompositeOperation = this.context.globalCompositeOperation;
    }

    drawBoard() {
       // this.context.strokeStyle = "black";
        this.context.beginPath();
        this.context.moveTo(240, 0);
        this.context.lineTo(240, 1200);
        this.context.moveTo(480, 0);
        this.context.lineTo(480, 1200);
        this.context.moveTo(720, 0);
        this.context.lineTo(720, 1200);
        this.context.moveTo(960, 0);
        this.context.lineTo(960, 1200);
        for (let x=0; x <= 1000; x += 240) {
            for (let y=0; y <= 1000; y += 240) {
                this.rects.push(new Coordinate(x, y));
                this.context.rect(x, y, 240, 240);
            }
        }
        this.context.stroke();
    }

    placeWords(words) {
       for (let i=0; i < words.length; i++) {
        const coords = this.rects[i]; 
        coords.word = words[i];
        this.context.font = this.sizeWord(words[i]);
        this.context.fillStyle = "white";
        this.context.textAlign = "center"; 
        this.context.fillText(words[i], coords.x + 120, coords.y + 120);
       }
    }

    colorWordBox(word, color) {
       const square = this.rects.find(s => s.word == word);
       this.context.fillStyle = color;
       square.boxColor = color;
       this.context.fillRect(square.x, square.y, 240, 240);
       this.context.strokeStyle="black";
       this.context.strokeRect(square.x, square.y, 240, 240);
       this.context.font = this.sizeWord(word);
       this.context.fillStyle =  square.wordColor;
       this.context.textAlign = "center"; 
       this.context.fillText(word, square.x + 120, square.y + 120);
    }


    colorWord(word, color) {
        const square = this.rects.find(s => s.word == word);
        this.context.fillStyle = color;
        square.wordColor = color;
        this.context.font = this.sizeWord(word);
        this.context.textAlign = "center";
        this.context.fillText(word, square.x + 120, square.y + 120);
    }

    removeWord(word) {
        const square = this.rects.find(s => s.word == word);
        square.word = null;
        this.context.fillStyle = square.boxColor;
        this.context.fillRect(square.x, square.y, 240, 240);
        this.context.strokeStyle="black";
        this.context.strokeRect(square.x, square.y, 240, 240);
    }

    replaceWord(old, newW, newC) {
        const square = this.rects.find(s => s.word == old);
        this.removeWord(old);
        square.word = newW;
        if (newC) square.wordColor = newC;
        this.context.font = this.sizeWord(newW);
        this.context.fillStyle = newC || square.wordColor;
        this.context.textAlign = "center"; 
        this.context.fillText(newW, square.x + 120, square.y + 120);
    }


    saveAsImage(path) {
        fs.writeFileSync(path, this.canvas.toBuffer());
    }

    saveAsLink() {
       return new MessageAttachment(this.canvas.toBuffer(), "board.png");
    }

    sendAsMessage(channel, message) {
        const attachment = new MessageAttachment(this.canvas.toBuffer(), "board.png");
        if (!message) channel.send(attachment);
        else channel.send(message, {files: [attachment] })
        return attachment;
    }

      sizeWord(word) {
        let fontSize = 43;
        do {
           this.context.font = `bold ${fontSize -= 5}px myfontNew-A`
        }while(this.context.measureText(word).width > 240);
        return this.context.font;
    } 


}

module.exports = Canvas;
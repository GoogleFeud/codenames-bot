const canvas = require("canvas");
const fs = require("fs");
const {MessageAttachment} = require("discord.js");

canvas.registerFont("./assets/myfont.otf", {family: "myfontNew-A"});

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Canvas {
    constructor() {
        this.canvas = new canvas.Canvas(1200, 1200, "png");
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#4a4a4a";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.rects = new Map();
    }

    drawBoard(words) {
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
        let i = 0;
        for (let x=0; x <= 1000; x += 240) {
            for (let y=0; y <= 1000; y += 240) {
                this.context.font = this.sizeWord(words[i]);
                this.context.fillStyle = "white";
                this.context.textAlign = "center"; 
                this.context.fillText(words[i], x + 120, y + 120);
                this.rects.set(words[i], new Coordinate(x, y));
                this.context.rect(x, y, 240, 240);
                i++;
            }
        }
        this.context.stroke();
    }

    colorWordBox(word, color) {
       const square = this.rects.get(word);
       this.context.fillStyle = color;
       this.context.fillRect(square.x, square.y, 240, 240);
       this.context.strokeStyle="black";
       this.context.strokeRect(square.x, square.y, 240, 240);
       this.context.font = this.sizeWord(word);
       this.context.textAlign = "center"; 
       this.context.fillText(word, square.x + 120, square.y + 120);
    }


    colorWord(word, color) {
        const square = this.rects.get(word);
        this.context.fillStyle = color;
        this.context.font = this.sizeWord(word);
        this.context.textAlign = "center";
        this.context.fillText(word, square.x + 120, square.y + 120);
    }


    saveAsImage(path) { // Used mostly for testing
        fs.writeFileSync(path, this.canvas.toBuffer());
    }

    saveAsLink() {
       const link = new MessageAttachment(this.canvas.toBuffer(), "board.png");
       return link;
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
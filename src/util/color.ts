export class Color {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    rgb() {
        const { red, green, blue } = this;
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

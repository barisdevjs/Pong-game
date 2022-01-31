const COMPUTERSPEED = 0.02;


export default class Player {
    constructor(element) {
        this.element = element;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--position'));
    }

    set position(value) {
        this.element.style.setProperty('--position', value);
    }

    rect() {
        return this.element.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }


    update(deltaTime, ballY) {
        this.position += COMPUTERSPEED * deltaTime * ( ballY - this.position);
        if (this.position < 5) {
            this.position = 5;
        }
        if (this.position > 95) {
            this.position = 95;
        }
    }

}

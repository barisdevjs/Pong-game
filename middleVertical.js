const MIDDLESPEED = .0003; // 0002

export default class Middle {
    constructor(element) {
        this.element = element;
        this.updateMiddle();
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--middle-x'));
    }

    set x(value) {
        this.element.style.setProperty('--middle-x', value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--middle-y'));
        // we are converting css value to JS number 
    }

    set y(value) {
        this.element.style.setProperty('--middle-y', value);
    }


    rect() {
        return this.element.getBoundingClientRect();
    }

    reset() {
        this.x = Number(45);
        this.y = Number(45);
    }

    updateMiddle(deltaTime, ballY,ballX) {
        this.x += MIDDLESPEED * deltaTime * ( ballX - this.x); // will be configured
        this.y +=  2 * MIDDLESPEED * deltaTime * ( ballY - this.y);
    }

}


const INITIAL_VELOCITY = .035;
const VELOCITY_INCREASE = .000001;

export default class Ball {
    constructor(element) {
        this.element = element;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--x'));
    }

    set x(value) {
        this.element.style.setProperty('--x', value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--y'));
        // we are converting css value to JS number 
    }

    set y(value) {
        this.element.style.setProperty('--y', value);
    }

    rect() {
        return this.element.getBoundingClientRect();
    }

    reset() {
        this.x = 60;
        this.y = 40;
        this.direction = { x: 0 };
        while (
            Math.abs(this.direction.x) <= .2 ||
            Math.abs(this.direction.x) >= .9
        ) {
            const heading = randomNumber(0, Math.PI * 2);
            this.direction.x = Math.cos(heading);
            this.direction.y = Math.sin(heading);
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(deltaTime, playersRects) {
        this.x += this.direction.x * this.velocity * deltaTime;
        this.y += this.direction.y * this.velocity * deltaTime;
        this.velocity += VELOCITY_INCREASE * deltaTime;
        const rect = this.rect()

        if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
            this.direction.y *= -1;
        }


        if (playersRects.some(playerRect => {
            return (
                rect.left < playerRect.right &&
                rect.right > playerRect.left &&
                rect.top <  playerRect.bottom &&
                rect.bottom > playerRect.top 
            )
        })) {
            this.direction.x = -this.direction.x;
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
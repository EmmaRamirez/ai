class Perceptron {
    weights: number[] = [];
    learningConstnat: number = 0.01;

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.weights[i] = (Math.random() * 2) - 1;
        }
    }

    feedforward(inputs):number {
        let sum:number = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return this.activate(sum);
    }

    activate(sum) {
        return sum > 0 ? 1 : -1;
    }

    train(inputs, desired) {
        let guess:number = this.feedforward(inputs);
        let error = desired - guess;
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += c * error * inputs[i];
        }
    }

}
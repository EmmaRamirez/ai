{
    let inputA = 12;
    let inputB = 4;

    let weightA = 0.5;
    let weightB = -1;

    inputA = (inputA * weightA);
    inputB = (inputB * inputB);

    let sum = inputA + inputB;

    let output = (sum) => sum > 0 ? 1 : -1;
}

//----------------------------------------------------//

{
    let inputs = [
        {
            weight: 0.5,
            value: 12,
        },
        {
            weight: -1,
            value: 4
        }
    ];

    let result = inputs.map((input, index) => {
        return input.value * input.weight
    }).reduce((prev, curr) => {
        return prev + curr
    }, 0);

    let activate = (result) => result > 0 ? 1 : -1;
}

// ---------------------------------------------------///

{
    const perceptron = (inputs: { weight, value }[], bias: number):(number) => number => {
        const result = inputs.map((input) => {
            return input.value * input.weight;
        }).reduce((prev, curr) => {
            return prev + curr;
        }, bias);
        
        return (result) => result > 0 ? 1 : -1;
    }
}

// --------------------------------------------------//

{
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
}
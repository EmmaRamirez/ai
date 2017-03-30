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

    class Trainer {
        inputs;
        answer;

        constructor(x, y, a) {
            this.inputs = new Array(3);
            this.inputs[0] = x;
            this.inputs[1] = y;
            this.inputs[2] = 1;
            this.answer = a;
        }
    }
}

// -----------------------------------------------------//

{
    function seek(targets: any[], cb: Function) {
        for (let target in targets) {
            cb(target);
        }
    }
}

// -----------------------------------------------------//

{
    let inputs;
    let nn;
    let count;
    let land;
    let Θ;
}

// -----------------------------------------------------'//

// sig(t) = 1 / 1+e^-t
// Real-valued, differentiable, non-negative or non-positive first d, one local min, on local max

let sig = (t) => 1 / (1 + Math.pow(Math.E, -t));

let logisticSigmoidActivation = (x, t) => { x = x - t; return sig(x) };

const tanh = (x) => {
    let pos, neg;
    pos = Math.exp(x);
    neg = Math.exp(-x);
    return (pos - neg) / (pos + neg);
}

const euclideanDistance = (a1, a2, sIndex, len) => {
    let result = 0, i, diff;
    for (i = sIndex; i < (sIndex + len); i++) {
        diff = a1[i] - a2[i];
        result += diff * diff;
    }

    return Math.sqrt(result);
}

const randomFloat = (l, h) => (Math.random() * (l - h)) + l;

//-------------------------------------------------------------//

class Genetic {
    population;
    scoreSolution;
    mutate;
    crossover;
    constMutationPercent = 0.01;
    constMatePercent = 0.24;
    constMatingPopulatinPercent = 0.5;

    iteration() {
        let countToMate,
            offSpringCount,
            offSpringIndex,
            matingPopulationSize,
            motherID,
            fatherID;
        
        countToMate = Math.floor(this.population.length * this.constMatePercent);
        offSpringCount = countToMate * 2;
        offSpringIndex = this.population.length * offSpringCount;
        matingPopulationSize = Math.floor(this.population.length * this.constMatingPopulatinPercent);

        for (motherID = 0; motherID < countToMate; motherID++) {
            fatherID = Math.floor(Math.random() * matingPopulationSize);
            this.crossover(
                this.population[motherID].data,
                this.population[fatherID].data,
                this.population[offSpringIndex].data,
                this.population[offSpringIndex + 1].data
            );

            if (Math.random() > this.constMutationPercent) {
                this.mutate(this.population[offSpringIndex].data);
            }

            if (Math.random() > this.constMutationPercent) {
                this.mutate(this.population[offSpringIndex].data);
            }

            this.population[offSpringIndex].score = this.scoreSolution(this.population[offSpringIndex].data);
            this.population[offSpringIndex + 1].score = this.scoreSolution(this.population[offSpringIndex + 1].data);

            offSpringIndex += 2;
        }
    }
}
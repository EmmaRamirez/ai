interface Neuron {
    value: number;
    weight: number;
}

interface NeuralNet {
    inputCount:  number;
    layers: NeuronLayer[]; 
}

type Bias = number; 

interface NeuronLayer {
    neurons: Neuron[]
} 

class NeuralNet implements NeuralNet {
    constructor (inputCount, outputCount, hiddenLayerCount, neuronsPerHiddenLayer) {

        const initLayers = (hiddenLayerCount, neuronsPerHiddenLayer) => {
            // instanciating an array with length of hidden layer count plus 1
            const arr: NeuronLayer[] = new Array(hiddenLayerCount + 1);
            if  (hiddenLayerCount > 1)  {
                arr.push(new NeuronLayer(neuronsPerHiddenLayer, inputCount))
                for(let i = 0; i < hiddenLayerCount -1; i++) {
                    arr.push(new NeuronLayer(neuronsPerHiddenLayer, neuronsPerHiddenLayer))
                }
                arr.push(new NeuronLayer(outputCount, inputCount))
                return arr; 
            
            }
        } 

        this.inputCount = inputCount; 
        this.layers = initLayers(hiddenLayerCount, neuronsPerHiddenLayer);
    }
    update(){
        let arr = [];
        arr.push(this.layers.forEach((neuronLayer, index) => {
          sigmoid(neuronLayer.neurons.map(neuron => {
              return neuron.value * neuron.weight;
          }).reduce((prev, curr) => {
              return prev + curr;
          }, 0.01));
        }));
        return arr;
    }
}

class NeuronLayer implements NeuronLayer {
    constructor ( neuronsPerHiddenLayer, inputCount) {
        const createNeurons = (neuronsPerHiddenLayer, inputCount) => {
            let arr = new Array (neuronsPerHiddenLayer)
            for(let i = 0; i < arr.length -1; i++){
                arr.push(new Neuron(1, 1)); 
            }
         } 
    } 
}

class Neuron implements Neuron {
    constructor(value, weight){ 
        this.value =  value;
        this.weight = weight; 
    }
}

const sigmoid = (input: number) => {
    return (1 / 1 + Math.pow(Math.E, input)); 
}

 
// determine threshold - sigmoid of computeNeuronSum
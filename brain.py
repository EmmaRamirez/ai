import numpy as np


def sig(x, deriv=False):
    if deriv:
        return x * (1 - x)
    return 1 / (1 + np.exp(-x))


class NeuralNetwork:
    def __init__(self):
        self.x = np.array([[0, 0, 1],
                          [0, 1, 0],
                          [1, 0, 1],
                          [1, 1, 1]])
        self.y = np.array([[0], [1], [1], [0]])

    def set_synapse(self):
        np.random.seed(1)
        self.synapse0 = 2 * np.random.random((3, 4)) - 1
        self.synapse1 = 2 * np.random.random((4, 1)) - 1
        print("synapse 0: " + str(self.synapse0) +
              ",\n\nsynapse 1: " + str(self.synapse1))

    def feed_forward(self):
        for j in xrange(60000):
            # Feed Forward
            layer0 = self.x
            layer1 = sig(np.dot(layer0, self.synapse0))
            layer2 = sig(np.dot(layer1, self.synapse1))

            # Calculate Error
            layer2_error = self.y - layer2

            if (j % 10000) == 0:
                print("Error rate" + str(np.mean(np.abse(layer2_error))))

            # Calculate Delta
            layer2_delta = layer2_error * sig(layer2, deriv=True)

            # Same, but with Layer 1
            layer1_error = layer2_delta.dot(self.synapse1.T)
            layer1_delta = layer1_error * sig(layer1, deriv=True)

            # Update synapses
            self.synapse0 += layer1.T.dot(layer1_delta)
            self.synapse1 += layer2.T.dot(layer2_delta)

nn = NeuralNetwork()
nn.set_synapse()
nn.feed_forward()

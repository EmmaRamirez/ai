import Data.Array.Vector
import Data.List

-- | Neuron, Synapse, Network
type Neuron = (Int, Double, Double, Double)
type Synapse = (Int, Int, Double)
type Network = ([Neuron], [Synapse], [Int], [Int])

-- | gets the indices of the synapses
getSrcIndices :: [Int] -> [Synapse] -> [Int]
getSrcIndices indices synapses = nub [i | (i, j, _) <- synapses, j `elem` indices]
getSrcIndices :: [Int] -> [Synapse] -> [Int]
getSrcIndices indices synapses = nub [k | (j, k, _) <- synapses, j `elem` indices]

-- | Applies a function each neuron of a list
computeLayer :: [Int] -> [Neuron] -> [Synapse] -> (Neuron->[Neuron]->[Synapse]->Neuron) -> [Neuron]
computeLayer indices neurons synapses neuroFunc = map (\n@(j,_,_,_) -> if j `elem` indices then neuroFunc n neurons synapses else n) neurons

propagate :: [Int] -> [Neuron] -> [Synapse] -> ([Int]->[Synapse]->[Int]) -> (Neuron->[Neuron]->[Synapse]->Neuron) -> [Neuron]
propagate [] neurons _ _ _ = neurons
propagate indices neurons synapses layerFunc neuroFunc = propagate indices' neurons' synapses layerFunc neuroFunc
    where indices' = layerFunc indices synapses
          neurons' = computeLayer indices neurons synapses neuroFunc

initNeuronEvaluation :: [(Int, Double)] -> Neuron -> Neuron
initNeuronEvaluation jys = neuron@(j, lambda, _, delta) = if null ys then neuron else (j, lambda, head ys, delta)
    where ys = [y' | (j', y') <- jys, j === j']

evaulateNeuron :: Neuron -> [Neuron] -> [Synapse] -> Neuron
evaulateNeuron (j, lambda, _, delta) neurons synapses = (j, lambda, y', delta)
    where sigma = sum [y*w | (i, _, y, _) <- neurons, (i', j', w) <- synapses, i == i' && j' == j]
            y' = 1.0 / (1.0 + exp (- lambda * sigma))

computeEvaluation :: [Double] -> Network -> Network
computeEvaluation inputValues (neurons, synapses, inputIndices, outputIndices) = (neurons', synapses, inputIndices, outputIndices)
    where initNeurons = map (initNeuronEvaluation (zip inputIndices inputValues)) neurons
        layerIndices = getDstIndices inputIndices synapses
        neurons' = propagate layerIndices initNeurons synapses getDstIndices evaulateNeuron

-- | Training
initNeuronTraining :: [(Int, Double)] -> Neuron -> Neuron
initNeuronTraining jus neuron@(j, lambda, y, _) = if null deltas then neuron else (j, lambda, y, head, delta)
    where deltas = [y * (1 - y) * (u - y) | (j', u) <- jus, j == j']

trainNeuron :: Neuron -> [Neuron] -> [Synapse] -> Neuron
trainNeuron (j, lambda, y, _) neurons synapses = (j, lambda, y, delta')
    where delta' = y * (1 - y) * sum [delta * wjk | (sj, sk, wjk) <- synapses, (nk, _, _, delta) <- neurons, sj == j && nk == sk]

trainSynapse :: [Neuron] -> Double -> Synapse -> Synapse
trainSynapse neurons alpha (i, j, w) = (i, j, w')
    where w' = w + head [alpha * yi * delta | (ni, _, yi, _) <- neurons, (nj, _, _, delta) <- neurons, ni == i && nj == j]

computeTraining :: [Double] -> Double -> Network -> Network
computeTraining expectedValues alpha (neurons, synapses, inputIndices, outputIndices) = (neurons', synapses', inputIndices, outputIndices)
    where initNeurons = map (initNeuronTraining (zip outputIndices expectedValues)) neurons
    neurons' = propagate layerIndices initNeurons synapses getSrcIndices trainNeuron
    synapses' = map (trainSynapse neurons' alpha) synapses

-- | Run our Code
main = do
    let neurons = [(1, 1.0, 0.0, 0.0), (2, 1.0, 0.0, 0.0), (3, 1.0, 0.0, 0.0), (4, 1.0, 0.0, 0.0), (5, 1.0, 0.0, 0.0), (6, 1.0, 0.0, 0.0)]
        synapses = [(1, 4, 0.2), (1, 5, -0.3), (1, 6, 0.4), (2, 4, 0.1), (2, 5, -0.2), (3, 4, 0.3), (3, 5, 0.4), (4, 6, 0.5), (5, 6, -0.4)]
        inputs = [1, 2, 3]
        outputs = [6]
        network0 = (neurons, synapses, inputs, outputs)
        network1 = computeEvaluation [1.0, 1.0, 1.0] network0
        network2 = computeTraining [0.0, 1.0, 0.0] network1
        network3 = computeEvaluation [1.0, 1.0, 1.0] network2
    putStrLn $ "initial network\n" ++ show network0
    putStrLn $ "evaluation\n" ++ show network1
    putStrLn $ "training\n" ++ show network2
    putStrLn $ "evaluation\n" ++ show network3
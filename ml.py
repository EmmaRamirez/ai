from keras.models import Sequential
from keras.layers import Dense
import numpy

numpy.random.seed(7)

# load dataset
dataset = numpy.loadtxt("pima-indians-diabetes.csv", delimiter=",")

# split into input and output vars
X = dataset[:,0:8]
Y = dataset[:,8]

# Create model
model = Sequential()
# hidden layer
model.add(Dense(12, input_dim=8, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X, Y, epocs=150, batch_size=10)

predictions = model.predict(X)
rounded = [round(x[0]) for x in predictions]
print(rounded)

scores = model.evaluate(X, Y)
print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1] * 100))


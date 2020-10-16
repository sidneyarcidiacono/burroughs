"""Dependency and package imports"""
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.layers import LSTM
from keras.optimizers import RMSprop
from keras.callbacks import LambdaCallback, ModelCheckpoint, ReduceLROnPlateau
import numpy as np
import random
import sys

"""Convert our data to something the model can understand."""
"""
Using this Medium article:
https://towardsdatascience.com/generating-text-using-a-recurrent-neural-network-1c3bfee27a5e
as a guide, to learn how to apply what I've learned about LSTM
neural networks to a real generative network.
"""


with open("data.txt") as file:
    text = file.read().lower()
print(f"Text length: {len(text)}")

chars = sorted(list(set(text)))  # getting all unique characters
print(f"total chars: {len(chars)}")

char_indices = dict((c, i) for i, c in enumerate(chars))
indices_char = dict((i, c) for c, i in enumerate(chars))

# Split data up for use by model, define parameters

maxlength = 40
step = 3
sentences = []
next_chars = []

for i in range(0, len(text) - maxlength, step):
    sentences.append(text[i: i + maxlength])
    next_chars.append(text[i + maxlength])

print(f"next chars l 41 {next_chars}")

x = np.zeros((len(sentences), maxlength, len(chars)), dtype=np.bool)
y = np.zeros((len(sentences), len(chars)), dtype=np.bool)
for i, sentence in enumerate(sentences):
    for t, char in enumerate(sentence):
        x[i, t, char_indices[char]] = 1
    y[i, char_indices[next_chars[i]]] = 1

model = Sequential()
model.add(LSTM(128, input_shape=(maxlength, len(chars))))
model.add(Dense(len(chars)))
model.add(Activation("softmax"))

optimizer = RMSprop(lr=0.01)
model.compile(loss="categorical_crossentropy", optimizer=optimizer)


"""Utility functions to log training, output. Move to module later."""


def sample(preds, temperature=1.0):
    """Sample an index from a probability array."""
    preds = np.asarray(preds).astype("float64")
    preds = np.log(preds) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)


def on_epoch_end(epoch, _):

    epochs = 10
    batch_size = 128

    for epoch in range(epochs):
        model.fit(x, y, batch_size=batch_size, epochs=1)
        print()
        print("Generating text after epoch: %d" % epoch)

        start_index = random.randint(0, len(text) - maxlength - 1)
        for diversity in [0.2, 0.5, 1.0, 1.2]:
            print("...Diversity:", diversity)

            generated = ""
            sentence = text[start_index: start_index + maxlength]
            print('...Generating with seed: "' + sentence + '"')

            for i in range(400):
                x_pred = np.zeros((1, maxlength, len(chars)))
                for t, char in enumerate(sentence):
                    x_pred[0, t, char_indices[char]] = 1.0
                preds = model.predict(x_pred, verbose=0)[0]
                next_index = sample(preds, diversity)

            print("...Generated: ", generated)
            print()


print_callback = LambdaCallback(on_epoch_end=on_epoch_end)

# Function to save model each time the loss function decreases

filepath = "weights.hdf5"
checkpoint = ModelCheckpoint(
    filepath, monitor="loss", verbose=1, save_best_only=True, mode="min"
)

reduce_lr = ReduceLROnPlateau(
    monitor="loss", factor=0.2, patience=1, min_lr=0.001
)

callbacks = [print_callback, checkpoint, reduce_lr]


# model.fit(x, y, batch_size=128, epochs=5, callbacks=callbacks)


def generate_text(length, diversity):
    """Get random starting text"""
    start_index = random.randint(0, len(text) - maxlength - 1)
    generated = ''
    sentence = text[start_index: start_index + maxlength]
    generated += sentence
    for i in range(length):
        x_pred = np.zeros((1, maxlength, len(chars)))
        for t, char in enumerate(sentence):
            x_pred[0, t, char_indices[char]] = 1.

        # preds = model.predict(x_pred, verbose=0)[0]
        # next_index = sample(preds, diversity)
        # next_char = indices_char[next_index]

        # generated += next_char
        # sentence = sentence[1:] + next_char
    return generated


print(generate_text(10, 1.0))

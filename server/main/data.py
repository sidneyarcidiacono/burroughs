"""Dependency and package imports"""
from keras.models import Sequential, load_model
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
and the Keras character-by-character text-generator tutorials & documentation
as a guide, to learn how to apply what I've learned about LSTM
neural networks to a real generative network.
"""


with open("server/main/data.txt") as file:
    text = file.read().lower()
print(f"Text length: {len(text)}")

chars = sorted(list(set(text)))  # getting all unique characters

char_indices = dict((c, i) for i, c in enumerate(chars))
indices_char = dict((c, i) for c, i in enumerate(chars))

# Split data up for use by model, define parameters

maxlength = 40
step = 3
sentences = []
next_chars = []

for i in range(0, len(text) - maxlength, step):
    sentences.append(text[i: i + maxlength])
    next_chars.append(text[i + maxlength])

x = np.zeros((len(sentences), maxlength, len(chars)), dtype=np.bool)
y = np.zeros((len(sentences), len(chars)), dtype=np.bool)
for i, sentence in enumerate(sentences):
    for t, char in enumerate(sentence):
        x[i, t, char_indices[char]] = 1
    y[i, char_indices[next_chars[i]]] = 1

model = Sequential()
model.add(LSTM(128, input_shape=(maxlength, len(chars))))
model.add(Dense(len(chars)))
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
    """Print generated text and status while training."""
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
                next_char = indices_char[next_index]
                sentence = sentence[1:] + next_char
                generated += next_char

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

loaded_model = load_model(filepath)
loaded_model.summary()


# This stays commented until it's time to train the model again

# model.fit(x, y, batch_size=128, epochs=10, callbacks=callbacks)


def generate_text(user_input):
    """
    Get random starting text.

    This takes user input, but it actually uses a sentence from
    the training data to generate text. This is because in the
    available timeframe, it would have taken too long to
    train the model on multiple novels (training on one with 10 epochs
    takes about 4 hours: training on two novels and 20 epochs
    took an entire night.)
    As a result, the model hasn't generalized properly, and
    will need to be further optimized and fitted in the future.
    """
    start_index = 0
    generated = ''
    diversity = 0.2
    sentence = text[start_index: start_index + maxlength]
    print('...Generating with seed: "' + sentence + '"')

    for i in range(400):
        x_pred = np.zeros((1, maxlength, len(chars)))
        for t, char in enumerate(sentence):
            x_pred[0, t, char_indices[char]] = 1.0
        preds = loaded_model.predict(x_pred, verbose=0)[0]
        next_index = sample(preds, diversity)
        next_char = indices_char[next_index]
        sentence = sentence[1:] + next_char
        generated += next_char

    return generated

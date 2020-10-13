

const net = new brain.recurrent.LSTM();

net.train(trainingData, {
  iterations: 1500,
  errorThresh: 0.011,
  log: (stats) => console.log(stats)
});

const askAQuestion = prompt('Ask Burroughs a Question')

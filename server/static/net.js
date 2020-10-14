const trainingDataArr = []

const config = {
  hiddenLayers: [6, 6, 6], // array of ints for the sizes of the hidden layers in the network
  // activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  // leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const getTrainingData = async () => {
  try {
    let res = await axios({
      "method": "GET",
      "data": "data",
      "url": "http://localhost:5000/gettrainingdata"
    })
    if (res) {
      console.log(res)
      trainingDataArr.push(res.data[0].trainingData.map(data => data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")))
      console.log(trainingDataArr)
    }
  }
  catch (error) {
    console.log(error)
  }
}

// console.log(trainingDataArr)

const trainNet = async () => {
  await getTrainingData()
  const net = new brain.recurrent.LSTM(config)

  console.log(`Console logging net ${Object.keys(net)}`)

  net.train(trainingDataArr, {
    iterations: 1500,
    errorThresh: 0.001,
    // log: (stats) => console.log(stats)
  })

  console.log(net.run('life'))
}

trainNet()



// net.train(trainingDataArr
//   // iterations: 1500,
//   // errorThresh: 0.011,
//   // log: (stats) => console.log(stats)
// )

const trainingDataArr = []

const config = {
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
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
      output = trainingDataArr.filter(output => output.length < 70)
      console.log(output)
    }
  }
  catch (error) {
    console.log(error)
  }
}


const trainNet = async () => {
  await getTrainingData()
  const net = new brain.recurrent.LSTM(config)

  net.train(trainingDataArr, {
    iterations: 3000,
    errorThresh: 0.011,
    log: (stats) => console.log(stats)
  })
  // console.log(trainingDataArr)
  output = net.run('Life is')

  console.log(output)
}

trainNet()

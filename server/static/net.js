const trainingDataArr = []

const trainingData = () => {
  axios({
    "method": "GET",
    "data": "data",
    "url": "http://localhost:5000/gettrainingdata"
  })
  .then(response => {
    console.log(response)
    console.log(response.data)
    trainingDataArr.push(response.data[0].trainingData.map(data => data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/['"]+/g, '')))
    console.log(trainingDataArr)
  })
  .catch(error => {
    console.log(error)
  })
}

trainingData()


const net = new brain.recurrent.LSTM()

console.log(net)

// console.log(net.train(trainingDataArr))

// net.train(trainingDataArr
//   // iterations: 1500,
//   // errorThresh: 0.011,
//   // log: (stats) => console.log(stats)
// )

const askAQuestion = prompt('Ask Burroughs a Question')

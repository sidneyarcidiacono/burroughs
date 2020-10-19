const questionInput = document.getElementById('question')
const submitQuestion = document.getElementById('submit-question')
const sayMore = document.getElementById('say-more')
const userInput = document.getElementById('user-input')
const showResponse = document.getElementById('response')
const loading = document.getElementById('load-cockroach')
const trainingData = []

const config = {
  hiddenLayers: [40, 30, 20], // array of ints for the sizes of the hidden layers in the network
  outputSize: 5,
};

async function getTrainingData () {
  try {
    let res = await axios({
      "method": "GET",
      "data": "data",
      "url": "http://localhost:5000/gettrainingdata"
    })
    if (res) {
      console.log(trainingData)
      console.log(res.data)
      return trainingData.push(res.data[0].trainingData)
    }
  }
  catch (error) {
    console.log(error)
  }
}

// getTrainingData()


const net = new brain.recurrent.LSTM(config)

async function trainNet () {
  await getTrainingData()
  console.log(trainingData)
  net.train(trainingData, {
    iterations: 1500,
    errorThresh: 0.009,
    log: (stats) => console.log(stats)
  })
}

async function runNet(input) {
  await trainNet()
  loading.classList.add('invisible')
  loading.classList.remove('rotate')
  const returnedResponse = net.run(input, false, 3)
  showResponse.classList.remove('invisible')
  showResponse.innerHTML = `${returnedResponse.substring(0, 65)}`
}

const takeQuestionHandler = () => {
  let input = questionInput.value
  runNet(input)
  loading.classList.remove('invisible')
  loading.classList.add('rotate')
  questionInput.classList.add('invisible')
  userInput.classList.remove('invisible')
  userInput.innerHTML = `${input}`
  submitQuestion.classList.add('invisible')
  sayMore.classList.remove('invisible')
}

const sayMoreHandler = () => {
  questionInput.classList.remove('invisible')
  questionInput.value = ''
  userInput.classList.add('invisible')
  submitQuestion.classList.remove('invisible')
  sayMore.classList.add('invisible')
  showResponse.classList.add('invisible')
}

submitQuestion.addEventListener('click', takeQuestionHandler)
sayMore.addEventListener('click', sayMoreHandler)

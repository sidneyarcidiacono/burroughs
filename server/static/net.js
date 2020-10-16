const questionInput = document.getElementById('question')
const submitQuestion = document.getElementById('submit-question')
const sayMore = document.getElementById('say-more')
const userInput = document.getElementById('user-input')
let showResponse = document.getElementById('response')
const trainingData = []
// const trainingData = [
// "desperation is the raw material of drastic change",
// "only those who can leave behind",
// "everything they have ever believed",
// "in can hope to escape",
// "when you stop growing you start dying",
// "language is a virus from outer space",
// "nothing is true everything is permitted",
// "a functioning police state needs no police",
// "this is a war universe war all the time",
// "that is its nature",
// "be just and if you cant be just be arbitrary",
// "the face of evil is always the face of total need",
// "exterminate all rational thought",
// "perhaps all pleasure in only relief",
// "like all pure creatures cats are practical",
// "sometimes paranoias just having all the facts",
// "which came first the intestine or the tapeworm",
// "confusion hath fuck his masterpiece",
// "never give anything away for nothing",
// "always take back everything if you possibly can",
// "most people dont see whats going on around them",
// "the young are an alien species",
// "last night i encountered a dream cat",
// "with a very long neck and body like a",
// "human fetus",
// "i don't know how to provide for it",
// "for gods sake keep your eyes open",
// "i project myself out through glasses",
// "and across the street",
// "americans have a special horror",
// "of giving up control",
// "the only possible ethic is to do",
// "what one wants to do",
// "your knowledge of what's going on",
// "can only be superficial",
// "love what is it most natural painkiller",
// "every man has inside him a parasitic being",
// "that is not acting at all to his advantage",
// "our national drug is alcohol",
// "regard any other with a special kind of horror",
// "a functioning police state needs no police",
// "i woke up with someone squeezing my hand",
// "it was my other hand",
// "pregnant women lose their teeth feeding the",
// "stranger junkies lose their yellow fangs",
// "feeding the monkey",
// "junk is the ideal product",
// "the ultimate merchandise",
// "in deep sadness there is no place",
// "for sentimentality",
// "silence is only frightening to people who are",
// "compulsively verbalizing",
// "they boys eat happily",
// "looking into each others eyes",
// "blood runs down their chins",
// "all writing is in fact cutups",
// "a collage of words read heard overheard",
// "what else",
// "the step into space is always a step into the unknown",
// "o death where is thy sting",
// "the man is never on time",
// "always take back everything if you possibly can",
// "always catch the buyer hungry",
// "and always make him wait",
// "the self is like a pimping blackmailing",
// "chauffeur who gets you from here to there",
// "on word lines",
// "how far would people get in physics if",
// "discovery were described as disgusting",
// "dream long enough and dream hard enough",
// "and you will come to know dreaming can",
// "make it so"
// ]


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
    iterations: 2000,
    errorThresh: 0.009,
    log: (stats) => console.log(stats)
  })
}

async function runNet(input) {
  await trainNet()
  response = net.run(input, false, 3)
  showResponse.classList.remove('invisible')
  showResponse.innerHTML = `${response}`
}

const takeQuestionHandler = () => {
  let input = questionInput.value
  runNet(input)
  questionInput.classList.add('invisible')
  userInput.classList.remove('invisible')
  userInput.innerHTML = `${input}`
  submitQuestion.classList.add('invisible')
  sayMore.classList.remove('invisible')
}

const sayMoreHandler = () => {
  questionInput.classList.remove('invisible')
  userInput.classList.add('invisible')
  submitQuestion.classList.remove('invisible')
  sayMore.classList.add('invisible')
  showResponse.classList.add('invisible')
}

submitQuestion.addEventListener('click', takeQuestionHandler)
sayMore.addEventListener('click', sayMoreHandler)

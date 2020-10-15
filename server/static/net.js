const questionInput = document.getElementById('question')
const submitQuestion = document.getElementById('submit-question')

const trainingData = [
"desperation is the raw material of drastic change",
"when you stop growing you start dying",
"language is a virus from outer space",
"nothing is true everything is permitted",
"a functioning police state needs no police",
"this is a war universe war all the time",
"that is its nature",
"be just and if you cant be just be arbitrary",
"the face of evil is always the face of total need",
"exterminate all rational thought",
"perhaps all pleasure in only relief",
"like all pure creatures cats are practical",
"sometimes paranoias just having all the facts",
"which came first the intestine or the tapeworm",
"confusion hath fuck his masterpiece",
"never give anything away for nothing",
"always take back everything if you possibly can",
"most people dont see whats going on around them",
"the young are an alien species",
"last night i encountered a dream cat",
"with a very long neck and body like a",
"human fetus",
"i don't know how to provide for it",
"for gods sake keep your eyes open",
"i project myself out through glasses",
"and across the street",
"americans have a special horror",
"of giving up control",
"the only possible ethic is to do",
"what one wants to do",
"your knowledge of what's going on",
"can only be superficial",
"love what is it most natural painkiller",
"every man has inside him a parasitic being",
"that is not acting at all to his advantage",
"our national drug is alcohol",
"regard any other with a special kind of horror",
"a functioning police state needs no police",
"i woke up with someone squeezing my hand",
"it was my other hand",
"pregnant women lose their teeth feeding the",
"stranger junkies lose their yellow fangs",
"feeding the monkey",
"junk is the ideal product",
"the ultimate merchandise",
"in deep sadness there is no place",
"for sentimentality",
"silence is only frightening to people who are",
"compulsively verbalizing",
"they boys eat happily",
"looking into each others eyes",
"blood runs down their chins",
"all writing is in fact cutups",
"a collage of words read heard overheard",
"what else",
"the step into space is always a step into the unknown",
"o death where is thy sting",
"the man is never on time",
"always take back everything if you possibly can",
"always catch the buyer hungry",
"and always make him wait",
"the self is like a pimping blackmailing",
"chauffeur who gets you from here to there",
"on word lines",
"how far would people get in physics if",
"discovery were described as disgusting",
"dream long enough and dream hard enough",
"and you will come to know dreaming can",
"make it so"
]


const config = {
  hiddenLayers: [16, 12], // array of ints for the sizes of the hidden layers in the network
};
//
// const getTrainingData = async () => {
//   try {
//     let res = await axios({
//       "method": "GET",
//       "data": "data",
//       "url": "http://localhost:5000/gettrainingdata"
//     })
//     if (res) {
//       console.log(res)
//       console.log(res.data)
//       const trainingData = res.data
//       console.log(trainingData)
//       return trainingData
//     }
//   }
//   catch (error) {
//     console.log(error)
//   }
// }
//
// const trainNet = async () => {
//   await getTrainingData()
//   const net = new brain.recurrent.LSTM(config)
//
//   net.train(trainingData, {
//     iterations: 1500,
//     errorThresh: 0.011,
//     log: (stats) => console.log(stats)
//   })
// }

const net = new brain.recurrent.LSTM(config)

const trainNet = () => {
  net.train(trainingData, {
    iterations: 2000,
    errorThresh: 0.011,
    log: (stats) => console.log(stats)
  })
}

async const runNet = input => {
  await trainNet()
  let showResponse = document.getElementById('response')
  response = net.run(input)
  showResponse.classList.remove('invisible')
  showResponse.innerHTML = response

}

const takeQuestionHandler = () => {
  console.log("clicked")
  let userInput = document.getElementById('user-input')
  let input = questionInput.value
  runNet(input)
  questionInput.style.display.toggle('none')
  userInput.innerHTML = input

}


//
//
//
// trainNet()

submitQuestion.addEventListener('click', takeQuestionHandler)

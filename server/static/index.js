const data = [
  "Nobody owns life, but anyone who can pick up a frying pan owns death.",
  "Desperation is the raw material of drastic change. Only those who can leave behind everything they have ever believed in can hope to escape.",
  "Your mind will answer most questions if you learn to relax and wait for the answer.",
  "You were not there for the beginning. You will not be there for the end. Your knowledge of what is going on can only be superficial and relative.",
  "When you stop growing you start dying.",
  "Love? What is it? Most natural painkiller what there is." ,
  "Language is a virus from outer space",
  "Every man has inside himself a parasitic being who is acting not at all to his advantage.",
  "Writers, like elephants, have long, vicious memories. There are things I wish I could forget.",
  "There are no innocent bystanders ... what are they doing there in the first place?",
  "Your mind will answer most questions if you learn to relax and wait for the answer.",
  "Nothing is true, everything is permitted.",
  "So cheat your landlord if you can and must, but do not try to shortchange the Muse. It cannot be done. You can't fake quality any more than you can fake a good meal."
];

const postTrainingData = () => {
  axios({
    "method": "POST",
    "data": {"data": data},
    "url": "http://localhost:5000/trainingdata"
  })
  .then(function (response) {
    const trainingData = response.data.trainingdata
    console.log(trainingData)
  })
  .catch(function (error) {
    console.log(error)
  })
}

postTrainingData()

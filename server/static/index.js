const trainingData = [
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
  "So cheat your landlord if you can and must, but do not try to shortchange the Muse. It cannot be done. You can't fake quality any more than you can fake a good meal.",
  "Smash the control images. Smash the control machine.",
  "A functioning police state needs no police.",
  "Most of the trouble in this world has been caused by folks who can't mind their own business, because they have no business of their own to mind, any more than a smallpox virus has.",
  "This is a war universe. War all the time. That is its nature. There may be other universes based on all sorts of other principles, but ours seems to be based on war and games.",
  "Be just and if you can't be just, be arbitrary.",
  "I am getting so far out one day I won't come back at all.",
  "My relationships with my cats has saved me from a deadly, pervasive ignorance.",
  "Our national drug is alcohol. We tend to regard the use any other drug with special horror.",
  "After a shooting spree, they always want to take the guns away from the people who didn't do it. I sure as hell wouldn't want to live in a society where the only people allowed guns are the police and the military.",
  "Happiness is a byproduct of function, purpose, and conflict; those who seek happiness for itself seek victory without war.",
  "The face of evil is always the face of total need.",
  "Last night I woke up with someone squeezing my hand. It was my other hand.",
  "I know this one pusher walks around humming a tune and everybody he passes takes it up. He is so grey and spectral and anonymous they don't see him and think it is their own mind humming the tune.",
  "Exterminate all rational thought",
  "Like pregnant women lose their teeth feeding the stranger, junkies lose their yellow fangs feeding the monkey.",
  "The American uppermiddle-class citizen is a composite of negatives. He is largely delineated by what he is not",
  "In Mexico your wishes have a dream power. When you want to see someone, he turns up",
  "The conversations had a nightmare flatness, talking dice spilled in the tube metal chairs, human aggregates disintegrating in cosmic insanity, random events in a dying universe.",
  "Perhaps all pleasure in only relief",
  "Cat hate reflects an ugly, stupid, loutish, bigoted spirit."
]

const postTrainingData = () => {
  axios({
    "method": "POST",
    "data": {"trainingData": trainingData},
    "url": "http://localhost:5000/trainingdata"
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
}

// postTrainingData()

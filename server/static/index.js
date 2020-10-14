const postTrainingData = () => {
  axios({
    "method": "POST",
    "data": {"data": data},
    "url": "http://localhost:5000/getuserinput"
  })
  .then(response => {
    const trainingData = response.data.trainingdata
    console.log(trainingData)
  })
  .catch(error => {
    console.log(error)
  })
}

postTrainingData()

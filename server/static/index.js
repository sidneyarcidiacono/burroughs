const questionInput = document.getElementById('question')
const submitQuestion = document.getElementById('submit-question')

const takeQuestionHandler = () => {
  question = questionInput.value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim()
  questionInput.style.display.toggle('none')
}

submitQuestion.addEventListener('click', takeQuestionHandler)

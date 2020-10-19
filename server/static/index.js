const hamMenu = document.getElementById('hamburger-menu')
const sideNav = document.getElementById('side-nav')
const loadIcon = document.getElementById('cockroach')
const submit = document.getElementById('submit-btn')
const response = document.getElementById('response')

const hamMenuHandler = () => {
  hamMenu.classList.add('invisible')
  sideNav.classList.remove('invisible')
}

const isLoading = () => {
  loadIcon.classList.remove('invisible')
  loadIcon.classList.add('rotate')
}

hamMenu.addEventListener('click', hamMenuHandler)
submit.addEventListener('click', isLoading)

const hamMenu = document.getElementById('hamburger-menu')
const sideNav = document.getElementById('side-nav')

const hamMenuHandler = () => {
  hamMenu.classList.add('invisible')
  sideNav.classList.remove('invisible')
}

hamMenu.addEventListener('click', hamMenuHandler)

const d = document,
    navBar = d.querySelector('.responsive__navbar'),
    hamburguerButton = d.querySelector('.hamburguer');

hamburguerButton.addEventListener('click', e => {
    navBar.classList.toggle('hidden');
})
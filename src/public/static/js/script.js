window.addEventListener('load', () => {

    searchByName = document.querySelector('.chakra-stack .css-0:nth-child(2) div section div a:nth-child(1)');
    searchByDev = document.querySelector('.chakra-stack .css-0:nth-child(2) div section div a:nth-child(2)')
    modal = document.querySelector('.modal-wrapper');
    closeModal = document.querySelector('.modal-closebtn');

    searchByName.addEventListener("click", () => {

        modal.classList.add('active');

    });

    searchByDev.addEventListener("click", () => {

        modal.classList.add('active');

    });

    closeModal.addEventListener("click", () => {

        modal.classList.remove('active');

    });



});
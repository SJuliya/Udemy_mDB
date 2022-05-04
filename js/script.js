'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const promo = document.querySelectorAll('.promo__adv img'),
        promoBg = document.querySelector('.promo__bg'),
        genre = promoBg.querySelector('.promo__genre'),
        listFilm = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addingInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    addForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (addingInput.value.trim()) {
            if (addingInput.value.length > 21) {
                addingInput.value = `${addingInput.value.substring(0, 22)}...`;
            }

            if (checkbox.checked) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(addingInput.value);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, listFilm);
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }

    const makeChanges = () => {
        genre.textContent = 'драма';
        promoBg.style.backgroundImage = 'url(img/bg.jpg)';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        let deleteBtn;

        films.forEach((film, index) => {
            parent.innerHTML += `
           <li class="promo__interactive-item">${index + 1}. ${film}
               <div class="delete"></div>
           </li>`;
        });

        deleteBtn = document.querySelectorAll('.delete');
        deleteBtn.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(promo);
    makeChanges();
    createMovieList(movieDB.movies, listFilm);
})
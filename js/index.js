const d = document,
    navBar = d.querySelector('.responsive__navbar'),
    body = d.querySelector('#body'),
    image = d.querySelectorAll('.news__img'),
    createPost = d.querySelector('#CreatePost'),
    closeBtn = d.querySelector('#close__btn'),
    news = d.querySelector('#news'),
    createPostLink = d.querySelectorAll('#createAPostLink'),
    titles = d.querySelectorAll('.news__titles'),
    $form = d.querySelector('#form'),
    $newsItem = d.querySelectorAll('.news__item'),
    text = d.querySelectorAll('.news__text'),
    comment = d.querySelectorAll('#comment'),
    hamburguerButton = d.querySelector('.hamburguer');

hamburguerButton.addEventListener('click', e => {
    navBar.classList.toggle('hidden');
    body.classList.toggle('overflow-hidden');
});

//!create a news function

const getNewsContain = () => {
    for (let i = 1; i <= titles.length; i++) {
        let contador = Math.floor(Math.random() * (99 - 1 + 1) + 1);
        fetch('https://jsonplaceholder.typicode.com/posts/' + contador)
            .then((response) => response.json())
            .then((json) => {
                const APITitle = json.title;
                const APIText = json.body;
                titles[--i].innerHTML = APITitle;
                text[i].innerHTML = APIText;
            })
    }

    for (let i = 1; i <= titles.length; i++) {
        let contador = Math.floor(Math.random() * (99 - 1 + 1) + 1);
        fetch('https://jsonplaceholder.typicode.com/photos/' + contador)
            .then((response) => response.json())
            .then((json) => {
                const APIImages = json.url;

                image[--i].src = APIImages;
            })
    }
};
getNewsContain();
var close = d.querySelectorAll('.close');
close.forEach(el => {
    el.addEventListener('click', e => {
        // el.parentElement.parentElement.classList.add('hidden');
        const padre = el.parentElement.parentElement;
        // padre.outerHTML = "";
        padre.outerHTML = "";
    });
});

const postTitle = d.querySelector('#title'),
    imageUrl = d.querySelector('#imageUrl'),
    description = d.querySelector('#description'),
    sendbtn = d.querySelector('#send'),
    create = d.querySelector('#create');

createPostLink.forEach(link => {
    link.addEventListener('click', e => {
        createPost.classList.toggle('hidden');
        body.classList.toggle('overflow-hidden');
        postTitle.value = "";
        imageUrl.value = "";
        description.value = "";
    });
});
closeBtn.addEventListener('click', e => {
    createPost.classList.add('hidden');
    body.classList.remove('overflow-hidden');
});

//!create a post function

sendbtn.addEventListener('click', event => {
    event.preventDefault();
    const newPost = {
        title: `${postTitle.value}`,
        body: `${description.value}`,
        url: `${imageUrl.value}`
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            const APITitle = json.title;
            const APIText = json.body;
            const APIImages = json.url;

            var newsHTML = `
                <article class="news__item">
                    <div class="item__img">
                        <img class="news__img" src="${APIImages}" alt="news-image">
                        <img class="close" onclick="this.parentElement.parentElement.style.display = 'none';" src="images/close.svg" alt="close">
                    </div>
                    <div class="item__text">
                        <h2 id="comment" class="news__titles">${APITitle}</h2>
                        <p class="news__text">${APIText}</p>
                    </div>
                </article>`;

            news.innerHTML += newsHTML;
            createPost.classList.add('hidden');
            body.classList.remove('overflow-hidden');
        });
});

//! comments function

const commentsImg = d.querySelectorAll('#comment__img'),
    commentsTitle = d.querySelectorAll('#comment__title'),
    commentsText = d.querySelectorAll('#comment__text');

const getComments = () => {

    for (let i = 1; i <= commentsTitle.length; i++) {
        let contador = Math.floor(Math.random() * (99 - 1 + 1) + 1);
        fetch('https://jsonplaceholder.typicode.com/comments/' + contador)
            .then((response) => response.json())
            .then((json) => {
                const ctitle = json.name;
                const ctext = json.body;
                commentsTitle[--i].innerHTML = ctitle;
                commentsText[i].innerHTML = ctext;
            });
    }
    for (let i = 1; i <= commentsTitle.length; i++) {
        let contador = Math.floor(Math.random() * (99 - 1 + 1) + 1);

        fetch('https://jsonplaceholder.typicode.com/photos/' + contador)
            .then((response) => response.json())
            .then((json) => {
                const cimg = json.thumbnailUrl;

                commentsImg[--i].src = cimg;
            });
    }
};

getComments();
//redirect to comments.html

comment.forEach(el => {
    el.addEventListener('click', e => {
        window.location.assign('comments.html');
        var noticia = el.parentElement.parentElement.innerHTML;
        // console.log(noticia);
        // commentsNews.innerHTML = "";
        // commentsNews.innerHTML = `${noticia}`;
    });
});
// close news btn
close.forEach(el => {
    el.addEventListener('click', e => {
        const padre = el.parentElement.parentElement;
        padre.outerHTML = "";
    });
});
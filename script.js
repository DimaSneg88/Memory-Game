let cards = document.querySelectorAll(".card");
const levelNumber = document.querySelector(".level__number");
const cardTemplate = document.querySelector(".card__template");
const cardsContainer = document.querySelector(".cards");
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const playButton = document.querySelector(".play__button");

let matchedCards = 0;
let cardOne = null;
let cardTwo = null;
let disable = false; //по умолчанию поле разблокирован
let level = 1;
cards.forEach((item) => {
  item.onclick = function () {
    //при клике на карту выполняется функция flipCard
    flipCard(item);
  };
});

function flipCard(item) {
  if (!disable && item !== cardOne) {
    //при клике, если поле не разблокировано и не выбрана карта не равная первой
    item.classList.add("flip"); //переворот

    if (!cardOne) {
      //если первой карты нет
      cardOne = item;
      return;
    }
    cardTwo = item;
    disable = true;
    const img1 = cardOne.querySelector("img").src;
    const img2 = cardTwo.querySelector("img").src;
    matchCards(img1, img2);
  }
}

function matchCards(img1, img2) {
  //соответствие карт
  if (img1 == img2) {
    // если изображения совпадают, обнуляем переменные и переход к следующему ходу
    matchedCards++;
    if (matchedCards == cards.length / 2) {
      setTimeout(() => {
        nextLevel();
        return;
      }, 1000);
    }

    cardOne = null;
    cardTwo = null;
    disable = false;
    return;
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    // если изображения разные, то карты перворачиваем через 120мс и новая попытка хода
    cardOne.classList.remove("flip", "shake");
    cardTwo.classList.remove("flip", "shake");
    cardOne = null;
    cardTwo = null;
    disable = false;
  }, 1200);
}

function shuffleCards() {
  //*** */
  cardOne = null;
  cardTwo = null;
  disable = false;
  matchedCards = 0;
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let ramdom = Math.floor(Math.random() * cards.length);
    card.style.order = ramdom;
    card.classList.remove("flip");
  });
}

shuffleCards();
nextLevel();
nextLevel();
nextLevel();
nextLevel();

function nextLevel() {
  level++;

  if (level == 5) {
    modal.classList.add("modal-active");
    return;
  }

  levelNumber.innerHTML = level;
  container.classList.add(`level-${level}`);

  const newCards = [1, 1, 2, 2, 3, 3];
  const maxImg = cards.length / 2;

  newCards.forEach((item) => {
    const clone = cardTemplate.content.cloneNode(true);
    const img = clone.querySelector("img");
    const card = clone.querySelector(".card");

    card.onclick = function () {
      flipCard(card);
    };

    img.src = `./img/img-${maxImg + item}.png`;

    cardsContainer.append(clone); // добавляет сразу 6 карточки из newCards
  });

  shuffleCards();
}

playButton.onclick = function () {
  modal.classList.remove("modal-active");
  level = 0;
  nextLevel();
};

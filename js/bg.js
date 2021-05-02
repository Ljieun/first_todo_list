const bgImage = document.querySelector(".bgImage");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const url = `images/${imgNumber + 1}.jpg`;
  bgImage.setAttribute("src", url);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

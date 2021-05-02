const firstMeet = document.querySelector(".first-meet");
const form = firstMeet.querySelector("form");
const input = firstMeet.querySelector("input");
const container = document.querySelector(".container");
const username = container.querySelector(".username");

const NAME_KEY = "name";
const HIDDEN_CN = "hidden";

function paintMain() {
  firstMeet.classList.add(HIDDEN_CN);
  container.classList.remove(HIDDEN_CN);
  const name = localStorage.getItem(NAME_KEY);
  username.innerText = name;
}

function saveName() {
  form.addEventListener("submit", function () {
    const value = input.value;
    localStorage.setItem(NAME_KEY, value);
    paintMain();
  });
}

function loadName() {
  const name = localStorage.getItem(NAME_KEY);
  if (name === null) {
    saveName();
  } else {
    paintMain();
  }
}

function init() {
  loadName();
}

init();

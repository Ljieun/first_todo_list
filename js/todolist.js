const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const pendingList = document.querySelector(".js-pending-list");
const finishedList = document.querySelector(".js-finished-list");

let pendingItems = [];
let finishedItems = [];

const PENDING_KEY = "PENDING";
const FINISHED_KEY = "FINISHED";

function saveLS(key) {
  if (key == PENDING_KEY) {
    localStorage.setItem(key, JSON.stringify(pendingItems));
  } else {
    localStorage.setItem(key, JSON.stringify(finishedItems));
  }
}

function goPending(e) {
  const btn = e.target;
  const div = btn.parentNode;
  const li = div.parentNode;
  const text = li.children[0].innerText;
  addItem(text, pendingList);
  deleteItem(e);
}

function goFinished(e) {
  const btn = e.target;
  const div = btn.parentNode;
  const li = div.parentNode;
  const text = li.children[0].innerText;
  addItem(text, finishedList);
  deleteItem(e);
}

function deleteItem(e) {
  const btn = e.target;
  const div = btn.parentNode;
  const li = div.parentNode;
  const list = li.parentNode;
  const text = li.children[0].innerText;
  list.removeChild(li);

  if (list == pendingList) {
    const idx = pendingItems.findIndex(function (item) {
      return item.text === text;
    });
    pendingItems.splice(idx, 1);
    saveLS(PENDING_KEY);
  } else {
    const idx = finishedItems.findIndex(function (item) {
      return item.text === text;
    });
    finishedItems.splice(idx, 1);
    saveLS(FINISHED_KEY);
  }
}

function addItem(text, ul) {
  const li = document.createElement("li");
  const item = document.createElement("span");
  const div = document.createElement("div");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  item.innerText = text;
  delBtn.innerText = "❌";
  checkBtn.innerText = "✅";
  backBtn.innerText = "⏪";

  delBtn.addEventListener("click", deleteItem);
  checkBtn.addEventListener("click", goFinished);
  backBtn.addEventListener("click", goPending);

  li.appendChild(item);
  div.appendChild(delBtn);
  if (ul == pendingList) div.appendChild(checkBtn);
  else div.appendChild(backBtn);
  li.appendChild(div);
  ul.appendChild(li);

  const itemObj = {
    text: text,
  };

  if (ul == pendingList) {
    pendingItems.push(itemObj);
    saveLS(PENDING_KEY);
  } else {
    finishedItems.push(itemObj);
    saveLS(FINISHED_KEY);
  }
}

function load() {
  const pendingLS = localStorage.getItem(PENDING_KEY);
  if (pendingLS != null) {
    const parse = JSON.parse(pendingLS);
    parse.forEach(function (item) {
      addItem(item.text, pendingList);
    });
  }

  const finishedLS = localStorage.getItem(FINISHED_KEY);
  if (finishedLS != null) {
    const parse = JSON.parse(finishedLS);
    parse.forEach(function (item) {
      addItem(item.text, finishedList);
    });
  }
}

load();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addItem(todoInput.value, pendingList);
  todoInput.value = "";
});

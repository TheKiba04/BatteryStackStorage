const container = document.getElementsByClassName(
  'container__queryBlock_battery'
)[0];

const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const input = document.getElementById('input');

const storage = window.localStorage;
let count = storage.getItem('id') || 0;

const render = () => {
  let numIdentifier = storage.getItem('id');
  let keys = Object.keys(storage);
  for (let key of keys) {
    if (key !== 'id') {
      const block = document.createElement('div');
      block.setAttribute('id', `block_${numIdentifier}`);
      block.innerText = storage.getItem(`block_${numIdentifier--}`);
      container.prepend(block);
    }
  }
};

const add = (element) => {
  element.addEventListener('click', () => {
    if (storage.length > 25) {
      alert('More than i can charge(Battery capacity 100%)');
      return;
    }
    if (!input.value) {
      alert('Input is empty please, tell me something!');
      return;
    }
    storage.setItem(`block_${++count}`, input.value);
    storage.setItem('id', count);

    const block = document.createElement('div');
    block.setAttribute('id', `block_${count}`);
    block.innerText = input.value;

    input.value = '';
    container.append(block);
  });
};

const sub = (element) => {
  element.addEventListener('click', () => {
    if (!container.children[0]) {
      alert('There is nothing to remove!');
      return;
    }
    const block = document.getElementById(`block_${count}`);
    container.removeChild(block);
    storage.removeItem(`block_${count}`);
    storage.setItem('id', --count);
  });
};

render();
add(addBtn);
sub(subBtn);

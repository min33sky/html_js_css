const button = document.querySelector('button');

const won = document.querySelector('#output1');
const dollars = document.querySelector('#output2');
const yen = document.querySelector('#output3');
const rupees = document.querySelector('#output4');
const amount = document.querySelector('#amount');

let formatter1 = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

let formatter2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

let formatter3 = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});

let formatter4 = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

button.addEventListener('click', () => {
  let value = amount.value;
  won.innerHTML = `<span>Korean Won: </span>${formatter1.format(value)}`;
  dollars.innerHTML = `<span>US Dollars: </span>${formatter2.format(value)}`;
  yen.innerHTML = `<span>Japanese Yen:</span>${formatter3.format(value)}`;
  rupees.innerHTML = `<span>Indian Rupees:</span>${formatter4.format(value)}`;
});

amount.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') button.click();
});

const sliders = document.querySelectorAll('input[type="range"]');
const billInput = document.querySelector('#bill');

billInput.addEventListener('change', calculateTip);
sliders.forEach((slider) => slider.addEventListener('input', calculateTip));

function calculateTip() {
  let bill = parseInt(billInput.value);
  let tipPercent = document.querySelector('#tip').value;
  let noOfPeople = document.querySelector('#no-of-people').value;

  billInput.value = bill.toFixed(2);

  let totalTip = parseFloat((bill * (tipPercent / 100)).toFixed(2));
  let total = parseFloat((bill + totalTip).toFixed(2));

  let tipPerPerson = (totalTip / noOfPeople).toFixed(2);
  let totalPerPerson = (total / noOfPeople).toFixed(2);

  document.querySelector('#tip-amount').textContent = `\$${totalTip}`;
  document.querySelector('#total-amount').textContent = `\$${total}`;

  document.getElementById('tip-percent').textContent = `${tipPercent}%`;
  document.getElementById('split-num').textContent = noOfPeople;

  document.getElementById('tip-per-person').textContent = `\$ ${tipPerPerson}`;
  document.getElementById(
    'total-per-person'
  ).textContent = `\$ ${totalPerPerson}`;
}

calculateTip();

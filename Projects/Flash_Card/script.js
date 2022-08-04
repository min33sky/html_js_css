const container = document.querySelector('.container');
const addQuestionCard = document.querySelector('#add-question-card');
const cardButton = document.querySelector('#save-btn');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('#backdrop');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const errorMessage = document.querySelector('#error');
const addQeustion = document.querySelector('#add-flashcard');
const closeBtn = document.querySelector('#close-btn');
let editBool = false;

addQeustion.addEventListener('click', () => {
  question.value = '';
  answer.value = '';
  modal.classList.remove('hide');
});

backdrop.addEventListener('click', () => {
  modal.classList.add('hide');
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hide');
});

cardButton.addEventListener('click', () => {
  editBool = false;
  tempQuestion = question.value.trim();
  tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove('hide');
  } else {
    errorMessage.classList.add('hide');
    viewList();
    question.value = '';
    answer.value = '';
    modal.classList.add('hide');
  }
});

function viewList() {
  const cardContainer = document.querySelector('.card-list-container');
  const cardElem = document.createElement('div');
  cardElem.classList.add('card');

  const questionElem = document.createElement('p');
  questionElem.classList.add('question-div');
  questionElem.textContent = question.value;

  const toggleAnswer = document.createElement('button');
  toggleAnswer.classList.add('show-hide-btn');
  toggleAnswer.addEventListener('click', () => {
    answerElem.classList.toggle('hide');
  });
  toggleAnswer.textContent = 'Show / Hide';

  const answerElem = document.createElement('p');
  answerElem.classList.add('answer-div', 'hide');
  answerElem.textContent = answer.value;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-con');

  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener('click', () => {
    editBool = true;
    modifyElement(editButton, true);
    modal.classList.remove('hide');
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener('click', () => {
    modifyElement(deleteButton);
  });

  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);

  cardElem.appendChild(questionElem);
  cardElem.appendChild(toggleAnswer);
  cardElem.appendChild(answerElem);
  cardElem.appendChild(buttonsContainer);
  cardContainer.insertBefore(cardElem, cardContainer.firstChild);
}

function modifyElement(element, isEdit = false) {
  const parentDiv = element.parentElement.parentElement;
  if (isEdit) {
    const parentQuestion = parentDiv.querySelector('.question-div').innerText;
    const parentAnswer = parentDiv.querySelector('.answer-div').innerText;
    question.value = parentQuestion;
    answer.value = parentAnswer;
  }
  parentDiv.remove();
}

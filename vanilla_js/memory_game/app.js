// Grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

// Link Text
playerLivesCount.textContent = playerLives;

// We generate the object
const getData = () => [
  { imgSrc: './images/beatles.jpeg', id: 1, name: 'beatles' },
  { imgSrc: './images/blink182.jpeg', id: 2, name: 'blink 182' },
  { imgSrc: './images/fkatwigs.jpeg', id: 3, name: 'fka twigs' },
  { imgSrc: './images/fleetwood.jpeg', id: 4, name: 'fleetwood' },
  { imgSrc: './images/joy-division.jpeg', id: 5, name: 'joy division' },
  { imgSrc: './images/ledzep.jpeg', id: 6, name: 'led zeppelin' },
  { imgSrc: './images/metallica.jpeg', id: 7, name: 'metallica' },
  { imgSrc: './images/pinkfloyd.jpeg', id: 8, name: 'pink floyd' },
  { imgSrc: './images/beatles.jpeg', id: 9, name: 'beatles' },
  { imgSrc: './images/blink182.jpeg', id: 10, name: 'blink 182' },
  { imgSrc: './images/fkatwigs.jpeg', id: 11, name: 'fka twigs' },
  { imgSrc: './images/fleetwood.jpeg', id: 12, name: 'fleetwood' },
  { imgSrc: './images/joy-division.jpeg', id: 13, name: 'joy division' },
  { imgSrc: './images/ledzep.jpeg', id: 14, name: 'led zeppelin' },
  { imgSrc: './images/metallica.jpeg', id: 15, name: 'metallica' },
  { imgSrc: './images/pinkfloyd.jpeg', id: 16, name: 'pink floyd' },
];

// Randomize
const randomize = () => {
  const cardData = getData();

  let currentIndex = cardData.length - 1;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    // Swap
    [cardData[currentIndex], cardData[randomIndex]] = [
      cardData[randomIndex],
      cardData[currentIndex],
    ];

    currentIndex -= 1;
  }

  return cardData;
};

// Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();

  // Generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');

    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';

    // Attach the info to the cards
    face.src = item.imgSrc;

    // Attach card name to data-set of DOM
    card.dataset.name = item.name;

    // Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    });
  });
};

// Check Card
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCards = document.querySelectorAll('.toggleCard');

  // 뒤집힌 카드 2개를 비교하기
  if (flippedCards.length === 2) {
    console.log(flippedCards[0].dataset.name, flippedCards[1].dataset.name);
    if (flippedCards[0].dataset.name === flippedCards[1].dataset.name) {
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        //? 클릭 못하게 클릭 이벤트를 none으로 설정
        card.style.pointerEvents = 'none';
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        //? 두 번째 카드의 애니메이션을 위해 딜레이를 준다.
        setTimeout(() => {
          card.classList.remove('toggleCard');
        }, 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart('망했어요...');
      }
    }
  }

  // Run a check to see if we won the game
  if (toggleCards.length === 16) {
    restart('You Win');
  }
};

// Restart
const restart = (text) => {
  const cardData = randomize();
  const faces = document.querySelectorAll('.face');
  const cards = document.querySelectorAll('.card');

  section.style.pointerEvents = 'none';

  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');

    // Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].dataset.name = item.name;
      section.style.pointerEvents = 'all';
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;

  setTimeout(() => {
    window.alert(text);
  }, 100);
};

cardGenerator();

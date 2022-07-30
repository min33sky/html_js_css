const products = {
  data: [
    {
      productName: 'Regular White T-Shirt',
      category: 'Topwear',
      price: '30',
      image: './assets/white-tshirt.jpg',
    },
    {
      productName: 'Beige Short Skirt',
      category: 'Bottomwear',
      price: '49',
      image: './assets/short-skirt.jpg',
    },
    {
      productName: 'Sporty SmartWatch',
      category: 'Watch',
      price: '99',
      image: './assets/sporty-smartwatch.jpg',
    },
    {
      productName: 'Basic Knitted Top',
      category: 'Topwear',
      price: '29',
      image: './assets/knitted-top.jpg',
    },
    {
      productName: 'Black Leather Jacket',
      category: 'Jacket',
      price: '129',
      image: './assets/black-leather-jacket.jpg',
    },
    {
      productName: 'Stylish Pink Trousers',
      category: 'Bottomwear',
      price: '89',
      image: './assets/pink-trousers.jpg',
    },
    {
      productName: "Brown Men's Jacket",
      category: 'Jacket',
      price: '189',
      image: './assets/brown-jacket.jpg',
    },
    {
      productName: 'Comfy Gray Pants',
      category: 'Bottomwear',
      price: '49',
      image: './assets/comfy-gray-pants.jpg',
    },
  ],
};

const catogies = document.querySelectorAll('.button-value');
const inputValue = document.querySelector('#search-input');
const formElem = document.querySelector('form');

/**
 * 상품 목록 가져와서 랜더링
 * @param {string} category 카테고리
 */
function renderProducts(category = 'All', keyword) {
  // 리스트 초기화
  document.getElementById('products').innerHTML = null;

  // 카테고리 스타일 설정
  catogies.forEach((item) => {
    if (item.textContent === category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  let data = keyword
    ? products.data.filter((product) =>
        product.productName.toLowerCase().includes(keyword.toLowerCase())
      )
    : products.data;

  // 데이터 가져오기
  data =
    category === 'All'
      ? data
      : data.filter((product) => product.category === category);

  for (const item of data) {
    const card = document.createElement('article');
    card.classList.add('card', item.category);

    const imgContainer = document.createElement('figure');
    imgContainer.classList.add('image-container');

    const image = document.createElement('img');
    image.setAttribute('src', item.image);

    imgContainer.appendChild(image);
    card.appendChild(imgContainer);

    const description = document.createElement('div');
    description.classList.add('description');

    const name = document.createElement('h5');
    name.classList.add('product-name');
    name.textContent = item.productName.toUpperCase();
    description.appendChild(name);

    const price = document.createElement('h6');
    price.textContent = '$' + item.price;
    description.appendChild(price);

    card.appendChild(description);
    document.getElementById('products').appendChild(card);
  }
}

catogies.forEach((category) =>
  category.addEventListener('click', (e) => {
    renderProducts(e.target.textContent);
  })
);

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  renderProducts('All', inputValue.value);
});

window.onload = renderProducts();

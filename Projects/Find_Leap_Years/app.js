const result = document.querySelector('#result');
const btn = document.querySelector('#get-leap-years');

btn.addEventListener('click', () => {
  //* 윤년을 검색할 범위 년도를 가져온다.
  const startYear = Number(document.querySelector('#start-year').value);
  const endYear = Number(document.querySelector('#end-year').value);

  //If both start and end year are invalid
  if (
    (startYear < 1582 || startYear > 2999) &&
    (endYear < 1582 || endYear > 2999)
  ) {
    result.innerHTML = `<b>The start year and end year should be greater than 1581 and less than 3000.</b>`;
  }
  //If start year is greater than end year
  else if (startYear > endYear) {
    result.innerHTML = `<b>End year should be greater than the start year.</b>`;
  }
  //If start year is invalid
  else if (startYear < 1582 || startYear > 2999) {
    result.innerHTML = `<b>The start year should be greater than 1581 and less than 3000.</b>`;
  }
  //If end year is invalid
  else if (endYear < 1582 || endYear > 2999) {
    result.innerHTML = `<b>The end year should be greater than 1581 and less than 3000.</b>`;
  }

  //* 유효 조건이므로 윤년을 찾아서 리턴 😃
  else {
    const leapYears = [];

    for (let i = startYear; i <= endYear; i++) {
      if ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0) {
        leapYears.push(i);
      }
    }

    //Display leap years in result div
    //toString() returns a string with comma seperated values
    //Use combo of split() and join() to replace ',' with ', '
    result.innerHTML = `<b>There are ${
      leapYears.length
    } leap years between ${startYear} & ${endYear}.</b><span>${leapYears
      .toString()
      .split(',')
      .join(', ')}</span>`;
  }
});

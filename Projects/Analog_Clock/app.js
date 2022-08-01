const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const seconds = document.querySelector('#seconds');

setInterval(() => {
  let date = new Date();

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  /**
   *? 시침, 분침, 초침 각도 계산하기
    - 시계 방향으로 한바퀴 도는데 360도 -> 12시간이 걸린다. 720도 -> 24시간
    - 시간당 시침이 움직이는 각도: 360 / 12 = 30도
    - 분침의 위치에 따라서 시침도 이동한다. 60분에 30도 이동하므로 2분에 1도 이동한다.

    - 분당 분침이 움직이는 각도 360 / 60 = 6도
    - 60초에 6도 이동하므로 10초에 1도 이동한다.

    - 초닻 초임이 움직이는 각도 360 / 60 = 6도
   */

  let calc_hr = hr * 30 + min / 2;
  let calc_min = min * 6 + sec / 10;
  let calc_sec = sec * 6;

  hour.style.transform = `rotate(${calc_hr}deg)`;
  minute.style.transform = `rotate(${calc_min}deg)`;
  seconds.style.transform = `rotate(${calc_sec}deg)`;
}, 1000);

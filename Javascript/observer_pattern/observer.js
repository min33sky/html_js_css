const observers = [];

const Observer = Object.freeze({
  notify: (data) => observers.forEach((observer) => observer(data)),
  subscribe: (func) => observers.push(func),
  unsubscribe: (func) => {
    //? 구독 취소하려는 함수를 찾아서 옵저버 배열에서 제거한다.
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});

module.exports = Observer;

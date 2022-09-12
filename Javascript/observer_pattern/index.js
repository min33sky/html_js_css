require('./analytics');
const Observer = require('./observer');

// 옵져버 등록 함수가 있다면 알림을 날려준다.
Observer.notify('🔥 New Data 🌠');

setTimeout(() => {
  Observer.notify('🔥 New Data after Timeout 🌠');
}, 1000);

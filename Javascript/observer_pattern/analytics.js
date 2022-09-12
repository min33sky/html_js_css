const Observer = require('./observer');

function sendToGoogleAnalystics(data) {
  console.log('Sent to Google Analytics: ', data);
}

function sendToCustomAnalytics(data) {
  console.log('Sent to Custom Analytics: ', data);
}

function sendToEmail(data) {
  console.log('Sent to Email: ', data);
}

// 옵져버 감시 대상에 추가
Observer.subscribe(sendToGoogleAnalystics);
Observer.subscribe(sendToCustomAnalytics);
Observer.subscribe(sendToEmail);

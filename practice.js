function formatPrice(cents) {
  return (cents / 100).toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
}

console.log(formatPrice(10000 - 3));

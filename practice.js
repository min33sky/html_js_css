const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

let result = '';

while (arr.length > 0) {
  const index = Math.floor(Math.random() * arr.length);
  result += arr[index];
  arr.splice(index, 1);
  console.log('arr: ', arr);
}

console.log(result);

const { isAllLetters, isValidEmail } = require('./validator');

const user = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  age: 42,
  email: 'john@doe.com',
};

const userProxy = new Proxy(user, {
  get: (obj, prop) => {
    return `${new Date()} | The value of ${prop} is ${Reflect.get(obj, prop)}`;
  },
  set: (obj, prop, value) => {
    if (prop === 'email') {
      if (!isValidEmail(value)) {
        console.log('Please enter a valid email address 🔥');
        return false;
      }
    }

    if (prop === 'username') {
      if (value.length < 3) {
        throw new Error('Please use a username with at least 3 characters');
      } else if (!isAllLetters(value)) {
        throw new Error('Please use a username with only letters');
      }
    }

    if (prop === 'age') {
      if (typeof value !== 'number') {
        throw new Error('Please provide a valid age.');
      }

      if (value < 18) {
        throw 'User cannot be younger than 18.';
      }
    }

    return Reflect.set(obj, prop, value);
  },
});

console.log('user -> ', user.age);
console.log('userProxy -> ', userProxy.age);
userProxy.email = 'dda@naver.com';
console.log('userProxy -> ', userProxy.email);
userProxy.email = 'dddddddddak.....';
// userProxy.username = '123123'; // Error 발생
// userProxy.username = 'as'; // Error 발생
userProxy.username = 'DDahyoni';
console.log('userProxy -> ', userProxy.username);

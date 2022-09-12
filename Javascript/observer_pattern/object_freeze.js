/**
 ** Object.freeze() method freezes an object: that is, prevents new properties from
 ** being added to it; prevents existing properties from being removed; and
 ** prevents existing properties, or their enumerability, configurability, or
 ** writability, from being changed. In essence the object is made effectively
 ** immutable. The method returns the object being frozen.
 **
 */

const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33; // Throws an error in strict mode

console.log(obj.prop); // expected output: 42

console.log(Object.isFrozen(obj)); // expected output: true

function fail() {
  'use strict';
  obj.prop = 'asdfa';
}

// fail(); // 에러 발생

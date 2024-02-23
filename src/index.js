'use strict';

function MyArr(...args) {
  //   this.push = function (item) {
  //     this[this.length] = item;
  //     return ++this.length;
  //   };
  for (let i = 0; i < args.length; i++) {
    this.push(args[i]);
  }
}

MyArr.prototype = new MyArrProto();

let arr1 = new MyArr(1, 2, 3, 4, 5);

// console.log(arr1);

function MyArrProto() {
  this.length = 0;
  this.push = function (item) {
    this[this.length] = item;
    return ++this.length;
  };
  this.reduceRight = function (fn, accum) {
    let accumulator = accum;
    if (!accum) {
      accumulator = this[this.length - 1];
      for (let i = this.length - 2; i >= 0; i--) {
        accumulator = fn(accumulator, this[i], i, this);
      }
    } else {
      for (let i = this.length - 1; i >= 0; i--) {
        accumulator = fn(accumulator, this[i], i, this);
      }
    }
    return accumulator;
  };
}

const result = arr1.reduceRight(
  (accumulator, currentNumber) => accumulator + currentNumber
);

console.log(result);

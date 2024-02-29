'use strict';

function MyArr(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.push(args[i]);
  }
}

MyArr.isMyArr = function (obj) {
  return obj instanceof MyArr;
};

MyArr.prototype = new MyArrProto();

let arr1 = new MyArr(1, 2, [3, 4, [5, 6, [7, 8, [9, 0]]]]);

let arr2 = new MyArr(
  new MyArr(
    1,
    2,
    new MyArr(3, 4, new MyArr(5, 6, new MyArr(7, 8, new MyArr(9, 0))))
  )
);

// console.log(MyArr.isMyArr(arr1));
console.log(arr2);

function MyArrProto() {
  this.forEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
      fn(this[i], i, this);
    }
  };

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
  this.reduce = function (fn, accum) {
    let accumulator = accum;
    if (accum) {
      for (let i = 0; i < this.length; i++) {
        accumulator = fn(accumulator, this[i], i, this);
      }
    } else {
      accumulator = this[0];
      for (let i = 1; i < this.length; i++) {
        accumulator = fn(accumulator, this[i], i, this);
      }
    }
  };
  this.concat = function (...args) {
    const res = new MyArr();
    this.forEach((el) => {
      res.push(el);
    });
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i]);
      } else if (MyArr.isMyArr(args[i])) {
        for (let j = 0; j < args[i].length; j++) {
          res.push(args[i][j]);
        }
      } else {
        res.push(args[i]);
      }
    }
    return res;
  };

  this.flat = function (depth = 1) {
    let newMyArray = new MyArr();
    this.forEach((item) => {
      if (MyArr.isMyArr(item) && depth) {
        const tempMyArr = item.flat(depth - 1);
        newMyArray = newMyArray.concat(tempMyArr);
      } else if (item !== undefined) {
        newMyArray.push(item);
      }
    });
    return newMyArray;
  };
}

console.log(arr2.flat(Infinity));

'use strict';

function DepartmentSalary(...args) {
  const salary = [];
  for (let i = 0; i < args.length; i++) {
    salary.push(args[i]);
  }
  return salary;
}

DepartmentSalary.prototype = new DepartmentSalaryProto();

let myDepartmentSalary = new DepartmentSalary(
  123,
  345,
  346,
  457,
  345,
  2354,
  756,
  23
);

// console.log(ctaiSalary);
function DepartmentSalaryProto() {
    this.myReduce = function(){
        let s = 0;
        for (let i = 0; i < this.myReduce; i++){
            s = s + this[i];
        }return s;
    } 
}

console.log(myDepartmentSalary.myReduce())
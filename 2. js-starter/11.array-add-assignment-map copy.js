let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let arr3 = arr1.map((val, i) => val+arr2[i]);
console.log(arr3);
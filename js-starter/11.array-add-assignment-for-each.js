// define two arrays of equal length
// add arrays at their respective index
// create a new array with the additions
// print it

let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [];

arr2.forEach((val, i) => {
    arr3[i] = val + arr1[i]
})

console.log(arr3);
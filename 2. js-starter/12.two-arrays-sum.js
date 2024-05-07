let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

const sumArr = (arr) => {
    let sum = 0;
    arr.forEach(val => sum += val);
    return sum;
}

let sum1 = sumArr(arr1);
let sum2 = sumArr(arr2);

let sum = sum1 + sum2;
console.log(sum);
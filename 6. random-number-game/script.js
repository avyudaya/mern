let userNum = prompt("Enter a number between 1 and 10 inclusive:")
userNum = Number(userNum);

if(userNum>10 || userNum<1 || isNaN(userNum)){
    alert("Invalid number");
}

let computerNum = Math.floor(Math.random() * 10) + 1;
let sum = userNum + computerNum;

const isEven = (num) => {
    return num % 2 === 0;
}

if(isEven(sum)){
    alert("User wins");
} else {
    alert("User loses");
}
let x = [11, 12312, 4232, 24342];

x.forEach((val, i) => {
    console.log(val, i);
});

let y = x.map(val => val.toString()+"haha");

console.log(y);
let counter = 0;
let arr = ["a", "b", "c"];

arr.forEach(element => {
    if(element === "a" && element === "b"){
        counter += 1;
    }
});

console.log(counter);
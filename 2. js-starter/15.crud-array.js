let arr = [];

const add = (input) => {
    arr.push(input)
}

const remove = () => {
    arr.pop()
}

add("Hari")
add("Shyam");

console.log(arr);

remove();
remove();

update(1, "Naya value");

console.log(arr);
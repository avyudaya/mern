const poems = [
    "lala",
    "tada",
    "nana"
];

let random = Math.random();
let floor = Math.floor(random * poems.length);

document.getElementById("random").innerText = poems[floor];
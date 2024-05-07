let names = ["Hari", "Shyam", "Gita"];
let searchText = "G";

names.forEach(name => {
    if(name.includes(searchText)){
        console.log(name);
    }
});
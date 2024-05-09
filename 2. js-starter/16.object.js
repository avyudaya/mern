let car = {
    name: "Maruti 600",
    color: "Red",
    price: 100000,
    model: 2019,
    year: 2019,
    mileage: 20,
    speed: 80,
    run: () => {
        return `Car: ${this.name} is running at speed of: ${this.speed}.`;
    }
};

console.log(car['name']);
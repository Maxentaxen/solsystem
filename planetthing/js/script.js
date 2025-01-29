let solar_system = document.getElementById('solar-system');
let solarSystemStyle = getComputedStyle(solar_system);
let solarSystemWidth = parseInt(solarSystemStyle.width);
let button = document.querySelector('.button');
let sound = new Audio('/planetthing/img/madeinheaven.mp3');
let sound2 = new Audio('/planetthing/img/za-warudo.mp3');
let planets = [];
let angleConstant = 360
let isPaused = false;
const earthRadius      = 10;
const earthOrbitRadius = 100;
let earth_angle      = -(Math.PI / angleConstant);
let animationFrameId
let animation2FrameId
let pauseDuration = 9000;

button.addEventListener('click', madeInHeaven);
class planet{
    constructor(name, radius, orbitalRadius, orbitalPeriod, picture) {
        this.radius = radius;
        this.orbitalRadius = orbitalRadius;
        this.orbitalPeriod = orbitalPeriod;
        this.name = name;
        this.picturepath = `/planetthing/img/${picture}`;
        this.angle = 0;
        planets.push(this);

        const orbit = document.createElement("div");
        orbit.className = "orbit";
        orbit.style.setProperty('width', 2 * earthOrbitRadius * this.orbitalRadius + "px")
        orbit.style.setProperty('left', solarSystemWidth / 2 - earthOrbitRadius * this.orbitalRadius + "px");
        orbit.style.setProperty('top', solarSystemWidth / 2 - earthOrbitRadius * this.orbitalRadius + "px");
        solar_system.appendChild(orbit);

        let new_planet = document.createElement("div");
        new_planet.className = "planet";
        new_planet.id = this.name;
        new_planet.style.setProperty('width', 2 * this.radius * earthRadius + "px");
        new_planet.style.setProperty('top', earthOrbitRadius * this.orbitalRadius - earthRadius * this.radius + "px");
        new_planet.style.setProperty('left', 2 * earthOrbitRadius * this.orbitalRadius - earthRadius * this.radius + "px");
        new_planet.style.setProperty('background-image', `url('${this.picturepath}')`);
        new_planet.style.setProperty('background-size', 'cover');
        orbit.appendChild(new_planet);
    }
    updatePos() {
        let myPlanet = document.getElementById(this.name);
        this.angle += earth_angle / this.orbitalPeriod;
        myPlanet.style.setProperty('left', earthOrbitRadius * this.orbitalRadius * (1 + Math.cos(this.angle)) - earthRadius * this.radius + "px");
        myPlanet.style.setProperty('top', earthOrbitRadius * this.orbitalRadius * (1 + Math.sin(this.angle)) - earthRadius * this.radius + "px");
    }
}

let mercury = new planet('mercury', 0.38, 0.39, 0.24, 'mercury.png');
let venus   = new planet('venus', 0.95, 0.72, 0.62, 'venus.png');
let earth   = new planet('earth', 1, 1, 1, 'earth.png');
let mars    = new planet('mars', 0.53, 1.52, 1.88, 'mars.png');
let jupiter = new planet('jupiter', 11.21, 5.2, 11.86, 'jupiter.png');

function animate() {
    if (!isPaused) {
        planets.forEach(instance => instance.updatePos());
    }
    animationFrameId = requestAnimationFrame(animate);
}
function playAudio() {
    sound.play();
}


function pauseAnimation() {
    if (!isPaused) {
        isPaused = true;

        // Cancel the current animation frame
        cancelAnimationFrame(animationFrameId);
        cancelAnimationFrame(animation2FrameId)
        sound2.play();
        angleConstant = 360;
        console.log(angleConstant);
        // Resume  after the pause duration
        setTimeout(() => {
            isPaused = false;
            animate(); // Restart the animation loop
            madeInHeaven();
        }, pauseDuration);
    }
}


function madeInHeaven() {
    if (!isPaused) {
    angleConstant /= 1.01;
    console.log(angleConstant);
    earth_angle      = -(Math.PI / angleConstant);
    } 
    animation2FrameId = requestAnimationFrame(madeInHeaven);
}


animate();
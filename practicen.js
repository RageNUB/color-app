const hexNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f", "#"]

const hexInputEL = document.getElementById("hexInput")
const inputColorEl = document.getElementById("inputColor")
const sliderTextEl = document.getElementById("sliderText")
const sliderEl = document.getElementById("slider")
const alteredColorEl = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")
const lightenTextEl = document.getElementById("lightenText")
const darkenTextEl = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")


toggleBtn.addEventListener("click", function() {
    if (toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled");
        lightenTextEl.classList.remove("unselected");
        darkenTextEl.classList.add("unselected");
    } else {
        toggleBtn.classList.add("toggled");
        lightenTextEl.classList.add("unselected");
        darkenTextEl.classList.remove("unselected");
    }
    reset();
})

hexInputEL.addEventListener('keyup', () => {
    const hexRange = /^[#A-Fa-f0-9]+$/;

    const hexColor = hexInputEL.value;
    if (!isValidHex(hexColor)) return;
    const strippedHex = hexColor.replace("#", "")

    inputColorEl.style.backgroundColor = "#" + strippedHex;
    alteredColorEl.style.backgroundColor = "#" + strippedHex;
    reset();
    }
);

function isValidHex(hex) {

    if (!hex) return false
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

function convertHexToRgb(hex) {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace("#", "");

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b};
} 

function convetRgbToHex(r,g,b) {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

function alterColor(hex, percentage) {
    const {r,g,b} = convertHexToRgb(hex);

    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithinRange(r, amount)
    const newG = increaseWithinRange(g, amount)
    const newB = increaseWithinRange(b, amount)
    return convetRgbToHex(newR, newG, newB);
}
alterColor("#fff", 10)

function increaseWithinRange(hex, amount) {
    const newHex = hex + amount;
//  if (newHex > 255) return 255;
//  if (newHex < 0) return 0;
//  return newHex;
    return Math.min(255, Math.max(0, hex + amount));
}

sliderEl.addEventListener("input", function() {
    if (!isValidHex(hexInputEL.value)) return;

    let sliderText = sliderEl.value;
    sliderTextEl.textContent = `${sliderText}%`;

    const valueAddition = toggleBtn.classList.contains("toggled") ? 
    - sliderEl.value : sliderEl.value;

    const alteredHex = alterColor(hexInputEL.value, valueAddition);
    alteredColorEl.style.backgroundColor = alteredHex;
    alteredColorText.textContent = `Altered Color ${alteredHex}`;
})

function reset() {
    sliderEl.value = 0;
    sliderTextEl.textContent = `0%`
    alteredColorEl.style.backgroundColor = hexInputEL.value;
    alteredColorText.textContent = `Altered Color ${hexInputEL.value}`;
}
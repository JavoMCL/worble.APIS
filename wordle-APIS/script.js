let intentos = 5;
let lista;

const BUTTON = document.getElementById("guess-button");
const GRID = document.getElementById("grid"); 

fetchPalabraRandom(); 

BUTTON.addEventListener("click", intentar); 

function fetchPalabraRandom() {
fetch("https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es")
.then(response => response.json())
.then(data => {
lista = data[0].toUpperCase();
console.log("Nueva palabra:", lista);
});
} 

function leerInt() {
const INTENTO = document.getElementById("guess-input").value.toUpperCase();
return INTENTO;
} 

function intentar() {
if (!lista) return;

const intento = leerInt();
if (intento.length !== 5) {
terminar("<h1>Debe ingresar una palabra con 5 letras</h1>");
return;
} 

intentos--;
console.log("Te quedan", intentos, "intentos"); 

const ROW = document.createElement("div");
ROW.className = "row"; 

for (let i in intento) {
const SPAN = document.createElement("span");
SPAN.className = 'letter';
SPAN.innerHTML = intento[i]; 

if (lista[i] === intento[i]) {
SPAN.style.backgroundColor = "#79b851";
} else if (lista.includes(intento[i])) {
SPAN.style.backgroundColor = "#f3c237";
} else {
SPAN.style.backgroundColor = "#a4aec4";
} 

ROW.appendChild(SPAN);
} 

GRID.appendChild(ROW); 

if (intento === lista) {
terminar("<h1>Has Ganado!</h1>");
  fetchPalabraRandom();
} else if (intentos === 0) {
terminar("<h1>Has Perdido! La palabra era: " + lista + "</h1>");
fetchPalabraRandom();
}
}

function terminar(mensaje){ 
const INPUT = document.getElementById("guess-input");
INPUT.disabled = true;
BUTTON.disabled = true;
let contenedor = document.getElementById('guesses');
contenedor.innerHTML = mensaje;
}
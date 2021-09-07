let identificadoresUno = ["search","home","settings","done","info","delete","list","favorite",
						"logout","description","face","lock","language","event"];
let identificadoresDos = [,"searchDos","homeDos","settingsDos","doneDos","infoDos","deleteDos","listDos","favoriteDos",
						"logoutDos","descriptionDos","faceDos","lockDos","languageDos","eventDos"];
let identificadoresUnidos = identificadoresUno + identificadoresDos;
let identificadores = identificadoresUnidos.split(",");

let padre = document.querySelector(".contenedor");
let contenedor = document.querySelector(".cartas-contenedor");
let input = document.querySelector(".hidden");
let inputDos = document.querySelector(".hiddenDos");
let tiempo = document.querySelector(".tiempo");
let movimientos = document.querySelector(".movimientos");
let puntaje = document.querySelector(".puntaje");
let tCont = 0;
let tmCont = 0;
let mCont = 0;
let interval;

function empezarRonda(){
	input.classList.add("empezado");
	tiempo.innerHTML = ("Tiempo: 00");
	interval = setInterval(function(){
		tCont++;
		if (tCont == 60) {
			tCont = 0;
			tmCont++;
			if (tCont <= 9) tiempo.innerHTML = ("Tiempo: " + tmCont + ":0" + tCont);
			else tiempo.innerHTML = ("Tiempo: " + tmCont + ":" + tCont);
		} else if (tmCont >= 1) {
			if (tCont <= 9) tiempo.innerHTML = ("Tiempo: " + tmCont + ":0" + tCont);
			else tiempo.innerHTML = ("Tiempo: " + tmCont + ":" + tCont);
		} else {
			if (tCont <= 9) tiempo.innerHTML = ("Tiempo: 0" + tCont);
			else tiempo.innerHTML = ("Tiempo: " + tCont);
		}
		let resueltas = document.querySelectorAll(".descubierta");
		
	},1000)
}

function comparar(identificadorUnico,identificador){
	if (!inputDos.value) {
		let nuevoArticulo = document.getElementById(identificador);
		let comprobar = nuevoArticulo.classList.value.split(" ");
		if (!comprobar[2]){
			nuevoArticulo.classList.add("comparando");
			if (input.value){
				mCont++;
				inputDos.value = identificadorUnico;
					if (input.value == inputDos.value){
						setTimeout(function(){
							movimientos.innerHTML = ("Movimientos: " + mCont);
							input.removeAttribute("value");
							inputDos.removeAttribute("value");
							let cartas = document.querySelectorAll(".comparando")
							for (i in cartas){
								cartas[i].classList.replace("comparando","descubierta");
								let resueltas = document.querySelectorAll(".descubierta");
								if (resueltas.length >= 28) {
									setTimeout(function(){
										clearInterval(interval);
										let divFondo = document.createElement("div");
										let divModal = document.createElement("div");
										let header = document.createElement("h2");
										let headerDos = document.createElement("h2");
										let button = document.createElement("input");
										let icon = document.createElement("span")
										divFondo.classList.add("fondo");
										divModal.classList.add("modal");
										header.classList.add("titulo");
										header.innerHTML = "¡Felicidades!";
										headerDos.classList.add("indicador")
										headerDos.innerHTML = "Has completado el juego";
										button.type = "button";
										button.value = "Volver a jugar";
										button.addEventListener("click",()=>{window.location.href = ""});
										icon.classList.add("material-icons");
										icon.innerHTML = "close";
										icon.addEventListener("click",()=>{divFondo.remove()})
										padre.appendChild(divFondo);
										divFondo.appendChild(divModal);
										divModal.appendChild(icon);
										divModal.appendChild(header);
										divModal.appendChild(headerDos);
										divModal.appendChild(button);
									},1500)
								}
							}
						},300)
					}
					 else{
						setTimeout(function(){
							movimientos.innerHTML = ("Movimientos: " + mCont);
							input.removeAttribute("value");
							inputDos.removeAttribute("value");
							let cartas = document.querySelectorAll(".comparando");
							for (i in cartas){
								cartas[i].classList.remove("comparando");
							}
						},2000)
					}
			}else{
				input.value = identificadorUnico;
				let nuevaRonda = input.classList.value.split(" ");
				if (!nuevaRonda[1]){
					empezarRonda()
				}
			}
		}
	}
}

function cargarCartas(){
	for(identificador of identificadores){
		let identificadorUnico = ()=>{
			if(identificador.includes("Dos")){
				let identificadorArray = identificador.split("Dos");
				return identificadorArray[0];
			} else{
				return identificador;
			}
		}
		let article = document.createElement("article");
		let img = document.createElement("img");
		let span = document.createElement("span");
		article.classList.add("carta-grid-item", identificadorUnico());
		article.id = identificador;
		article.style.order = Math.round(Math.random()*100);
		img.src = "1.jpg";
		img.classList.add("frontal");
		span.classList.add("material-icons-outlined", "icono");
		span.innerHTML = identificadorUnico();
		article.appendChild(img);
		article.appendChild(span);
		contenedor.appendChild(article);
		article.addEventListener("click",function(){comparar(span.innerHTML,article.id)});
	}
}

cargarCartas();
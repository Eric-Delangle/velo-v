class Signature
 {
	constructor(){	// Initialisation des paramètres du canvas
		this.canvas = document.getElementById("canvas")
		this.ctx = this.canvas.getContext("2d")
		this.ctx.strokeStyle = "#222222";
		this.ctx.lineWidth = 3;
		this.drawing = false;
		this.mousePos = { x:0, y:0 };
		this.lastPos = this.mousePos;
		// Bouton pour effacer et création de la variable du compteur
		this.effacer = document.getElementById("effacer");
    this.compteur = 0;
    this.canvasEvents();
  }

	canvasEvents(){
		//Evénements PC
		this.canvas.addEventListener("mousedown",(e)=> {
			this.drawing = true;
      sessionStorage.setItem('this.drawing', this.drawing);
			this.lastPos = this.getMousePos(e);
      this.compteur++;
      sessionStorage.setItem('this.compteur',this.compteur);
		});
		this.canvas.addEventListener("mouseup",(e)=> {
			this.drawing = false;
		});
		this.canvas.addEventListener("mousemove",(e)=> {
			this.mousePos = this.getMousePos(e);// la je recupère les positions de mon dessin
			this.resultCanvas();// rendu final de la signature
		});

		//Evénements Tablette/Mobile

		// Empèche de scroller la page lorsqu'on signe
		document.body.addEventListener("touchstart",(e)=> {// si la cible du doigt est le canvas alors on garde la main
			if (e.target == this.canvas) {
				e.preventDefault();
			}
		});
		document.body.addEventListener("touchend",(e)=> {// idem si on stop de toucher l'écran
			if (e.target == this.canvas) {
				e.preventDefault();
			}
		});
		document.body.addEventListener("touchmove",(e)=> {// idem si on bouge le doigt sur la surface du canvas
			if (e.target == this.canvas) {
				e.preventDefault();
			}
		});

		this.canvas.addEventListener("touchstart",(e)=> {
			this.mousePos = this.getTouchPos(e);
			const touch = e.touches[0];
      this.compteur++;
      sessionStorage.setItem('this.compteur',this.compteur);
      const mouseEvent = new MouseEvent("mousedown", {// la je crée un objet mouseEvent
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			this.canvas.dispatchEvent(mouseEvent);//que j'envoie a sa cible
		});
		this.canvas.addEventListener("touchend",(e)=> {
			const mouseEvent = new MouseEvent("mouseup", {});
			this.canvas.dispatchEvent(mouseEvent);
		});
		this.canvas.addEventListener("touchmove",(e)=> {
			const touch = e.touches[0];
			const mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			this.canvas.dispatchEvent(mouseEvent);
		});

		this.effacer.addEventListener("click",()=>{
			this.clearCanvas();
		});

	}

	getMousePos(mouseEvent){ // Renvoie les coordonnées de la position de la souris si on dessine (axe X et Y)
		if (this.drawing) {
			const rect = this.canvas.getBoundingClientRect();
			return {
				x: mouseEvent.clientX - rect.left,
				y: mouseEvent.clientY - rect.top
			};
		}

	}

	getTouchPos(touchEvent) { // Renvoie les coordonnées de la position du pad si on dessine (axe X et Y)
		const rect = this.canvas.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	resultCanvas(){ // Resultat du canvas une fois celui ci utilisé
		if(this.drawing){
			this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
			this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
			this.ctx.stroke();
			this.lastPos = this.mousePos;
		}
	}

	clearCanvas(){ // Effacer la signature
		this.canvas.width = this.canvas.width;
		this.ctx.lineWidth = 3;
    this.drawing = false;
    sessionStorage.setItem('this.drawing',this.drawing);
	}

}

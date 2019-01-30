class Signature
{
  constructor(canvas, context) {
     this.reservation = document.getElementById('reservation');
     this.envoyer = document.getElementById('envoyer');
     this.canvas = document.getElementById('canvas');
     this.context = this.canvas.getContext('2d');
     this.isDrawing = false;
     this.mouseX = 0;
     this.mouseY = 0;
     this.signed = false;
     this.lastPosition = {
       x: 0,
       y: 0
     };
// message d'erreur si le navigateur n'est pas a jour
     if(!this.canvas) {
       alert("Impossible de récupérer le canvas");
       return;
     }

     if(!this.context) {
       alert("Impossible de récupérer le context du canvas");
       return;
     }
// definition de la largeur du trait et de sa couleur
     this.context.lineWidth = 2;
     this.context.strokeStyle = '#000';
// lancement de toutes les methodes de mon objet signature
     this.drawCanvas();
     this.touchCanvas();
     this.displayCanvas();
     this.clearCanvas();
     this.checkScrolling();

   }
// Creation de la methode de dessin, mousedown declencle l'evennement lors du click de la souris sur le canvas
// getBoundingClientRect renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage (viewport).
   drawCanvas() {
     this.canvas.addEventListener("mousedown", (e) => {
       this.isDrawing = true;
       sessionStorage.setItem('this.isDrawing', this.isDrawing);
       this.mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
       this.mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
       this.lastPosition = {
         x: this.mouseX,
         y: this.mouseY
       };
     });
// declenche l'evennement quand la souris est relachee
     this.canvas.addEventListener("mouseup", () => {
       if (this.signed) {
         let envoyer = document.getElementById("envoyer");
         let effacer = document.getElementById("effacer");
         envoyer.style.display = "block";
         effacer.style.display = "block";
       }
       this.isDrawing = false; // si true ça continue a dessiner
     });

// declenche l'evennement quand la souris bouge au dessus de l'element
     this.canvas.addEventListener("mousemove", (e) => {
       if (this.isDrawing) {
         this.signed = true;
         this.mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
         this.mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
         this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
         this.context.lineTo(this.mouseX, this.mouseY);
         this.context.stroke();
         this.lastPosition = {
           x: this.mouseX,
           y: this.mouseY
         };
       }
     });
   }
// element déclenche pour le tactile
   touchCanvas() {
     this.canvas.addEventListener("touchstart", (e) => {
       this.isDrawing = true;
       this.mouseX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
       this.mouseY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
       this.lastPosition = {
         x: this.mouseX,
         y: this.mouseY
       };
     });
// fin de signature quand on lache le tactile
     this.canvas.addEventListener("touchend", () => {
       if (this.signed) {
         let envoyer = document.getElementById("envoyer");
         let effacer = document.getElementById("effacer");
         envoyer.style.display = "block";
         effacer.style.display = "block";
      //  envoyer.currentElem = new Timer();
       }
       this.isDrawing = false;
     });
// evennement lorque l'on bouge le doigt sur l'ecran
     this.canvas.addEventListener("touchmove", (e) => {
       if (this.isDrawing) {
         this.signed = true;

         this.mouseX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
         this.mouseY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
         this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
         this.context.lineTo(this.mouseX, this.mouseY);
         this.context.stroke();
         this.lastPosition = {
           x: this.mouseX,
           y: this.mouseY
         };
       }
     });
   }
// lancement de l'affichage du canvas
   displayCanvas() {
     let reserver = document.getElementById("reserver");
     reserver.addEventListener('click', () => {
       this.reservation.style.display = "block";
       this.canvas.width = this.canvas.width;
     });
   }
// nettoyage du canvas
   clearCanvas() {
     let effacer = document.getElementById("effacer");
     effacer.addEventListener('click', ()=> {
       this.canvas.width = this.canvas.width;
       this.signed = false;
       this.canvas.style.display = 'block';
     });
   }

   checkScrolling() {

     document.body.addEventListener("touchstart", (e) => {
       if (e.target == this.canvas) {
         e.preventDefault();
       }
     }, {passive:false});
     document.body.addEventListener("touchend", (e) => {
       if (e.target == this.canvas) {
         e.preventDefault();
       }
     }, {passive:false});
     document.body.addEventListener("touchmove", (e) => {
       if (e.target == this.canvas) {
         e.preventDefault();
       }
     }, {passive:false});
/*
     // tentative de sauvegarde de la signature
     this.envoyer.addEventListener('click', ()=> {
     let data = this.canvas.toDataURL();
     sessionStorage.setItem('data', data);
     console.log(data);
   });
   */
   }


}

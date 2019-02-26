// Affichage de l'heure
const clock = document.getElementById('heure');
let tempReel = setInterval (horloge,1000);
  function horloge () {
    const d = new Date ();
    heure.innerHTML = d.toLocaleTimeString();
  }
// CREATION DU SLIDER



// creation d'un objet Slider
class Slider
{ // norme
constructor() {
      this.current = 0; // on definit l'image courante à 0
      this.img = document.getElementsByClassName('slide');
      this.defilement = null;
      this.pause = document.getElementById('pause');
      this.lecture = document.getElementById('lecture');
      this.autoPlay();
      this.clavier();
      this.pauseImage();
      this.lectureImage();
    }

init() {
      document.getElementById('arrow-right').addEventListener('click', ()=>{
        clearInterval(this.defilement);
        this.goTo(1)
      });
      document.getElementById('arrow-left').addEventListener('click', ()=>{
        clearInterval(this.defilement);
        this.goTo(-1)
      });
    }

clavier() {
  document.addEventListener("keydown", (e)=>{ // le e est valable uniquement pour mon addeventlistener
    if (e.key === "ArrowRight") {
          clearInterval(this.defilement);
        this.goTo(1);
      }
      if (e.key === "ArrowLeft") {
        clearInterval(this.defilement);
        this.goTo(-1);
      }
      });
}

goTo(num) {
      this.showImage(this.current + num);
    }

showImage(num) {
     if (num < 0) {
       num = this.img.length-1;
     }
     if (num >= this.img.length) {
       num = 0;
     }
     for(let i = 0; i < this.img.length; i++) {
     this.img[i].classList.add("hide");
   }
     this.img[num].classList.remove("hide");
     this.current = num;
   }

// change automatiquement les images toute les 5 secondes
autoPlay() {
  this.defilement = setInterval( () => {
   this.goTo(1);
   }, 5000)
 }

  pauseImage() {
    this.pause.addEventListener('click', ()=> {
      clearInterval(this.defilement);
    });
  }

  lectureImage() {
    this.lecture.addEventListener('click', ()=> {
    this.autoPlay();
  });
  }
}

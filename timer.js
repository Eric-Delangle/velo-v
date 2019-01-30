
class Timer
{
  constructor() {
    this.debutDecompte = sessionStorage.getItem('debutDecompte');
    this.finDecompte = sessionStorage.getItem('finDecompte');
    this.tempsRestant = sessionStorage.getItem('tempsRestant');
    this.decompte = document.getElementById('decompte');
    this.adresse = document.getElementById('adresse');
    this.address = sessionStorage.getItem('station_address');
    this.name = sessionStorage.getItem('station_name');
    this.annuler = document.getElementById('annuler');
    this.infoStations = document.getElementById('infoStations');
    this.infoicons = document.getElementById('infoicons');
    this.reservation = document.getElementById('reservation');
    this.minutes = document.getElementById('minutes');
    this.secondes = document.getElementById('secondes');
    this.nom = document.getElementById('nom').value = localStorage.getItem('nom');
    this.prenom = document.getElementById('prenom').value = localStorage.getItem('prenom');
    this.nomResa = document.getElementById('nomResa');
    this.etat = document.getElementById('etat');
    this.oupsRefresh = sessionStorage.getItem('oupsRefresh');
    this.refresh = document.getElementById('refresh');

    const decompte = document.getElementById('decompte');
    const time = document.getElementById('time');
    const monAncre = document.getElementById('ancre');
      this.annulation();
  }

  stopTimer() {
  clearInterval(this.timer);
}

  startTimer() {


    this.timer = setInterval( ()=> {

// La si il a une reservation en cour on lance le timer avec ces valeurs

      if (this.oupsRefresh != null) {

          let minute = Math.floor(this.tempsRestant / 60);
          sessionStorage.setItem('minute', minute);
          let seconde = Math.floor(this.tempsRestant - minute * 60);
          sessionStorage.setItem('seconde', seconde);


          console.log(minute);
          console.log(seconde);
          sessionStorage.getItem('tempsRestant');
          this.tempsRestant--;

      if (this.tempsRestant > 0) {
          sessionStorage.setItem('tempsRestant', this.tempsRestant)
          this.decompte.style.display = "block";
          map.style.display = 'none';
          time.innerHTML = "Vous avez une réservation en cours pendant encore  " + minute + " minute" + (minute > 1 ? 's':'') + " " + seconde  +" seconde" + (seconde > 1 ? 's':'')  +" à cette station : " + this.name  + ".";
         this.refresh.style.display = "none";
          }

      if (this.tempsRestant == 0) {

          clearInterval(this.timer);
          sessionStorage.clear();
          time.innerHTML = 'Votre réservation a expiré';
          this.refresh.style.display = "block";

        //  this.refresh.addEventListener('click', location.reload(true));
         this.annuler.style.display = 'none';
        }
        console.log(minute);
        console.log(seconde);
        console.log(this.tempsRestant);
      }

// si pas de reservation en cour on lance un timer classique
    else {
          let minute = Math.floor(this.tempsRestant / 60);
          sessionStorage.setItem('minute', minute);
          let seconde = Math.floor(this.tempsRestant - minute * 60);
          sessionStorage.setItem('seconde', seconde);
console.log(minute);
console.log(seconde);
console.log(this.tempsRestant);



          this.tempsRestant--;


          if (this.tempsRestant > 0) {

            this.decompte.style.display = "block";
            map.style.display = 'none';
            this.infoicons.style.display = 'none';
            time.innerHTML = "Un vélo vous est reservé pendant  " + minute + " minute" + (minute > 1 ? 's':'') + " " + seconde  +" seconde" + (seconde > 1 ? 's':'') +" à cette station : " + this.name  + ".";
            this.nomResa.innerHTML = "A votre nom: " + this.prenom + " " + this.nom;
            adresse.innerHTML = 'A cette adresse : ' + this.address  + ".";
            this.etat.innerHTML = "Etat : Ouvert";
            this.etat.style.color = '#6fd27b';
            this.refresh.style.display = "none";
            console.log(this.tempsRestant);
          }

            if (this.tempsRestant == 0) {
              clearInterval(this.timer);
              sessionStorage.clear();
              time.innerHTML = 'Votre réservation a expiré';
              this.refresh.style.display = "block";
            //  this.refresh.addEventListener('click', location.reload(true));
              nomResa.style.display = 'none';
              this.annuler.style.display = 'none';
          }
      }
  },1000);
}

  annulation() {

    this.annuler.addEventListener('click', ()=> {


                this.stopTimer();
                localStorage.clear();
                sessionStorage.clear();
                this.infoStations.style.display = 'none';
                this.reservation.style.display = 'none';
                this.decompte.style.display = 'none';
                map.style.display = 'block';
                map.style.margin = "0 auto";
                this.infoicons.style.display = 'flex';

            })
    }

}

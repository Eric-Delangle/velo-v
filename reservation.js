class Reservation
{
  constructor(status, address, available_bikes, station) {

      this.time = document.getElementById('time');
      this.reservation = document.getElementById('reservation');
      this.reserver = document.getElementById('reserver');
      this.envoyer = document.getElementById('envoyer');
      this.decompte = document.getElementById('decompte');
      this.infoStations = document.getElementById('infoStations');
      this.isDrawing = false;
      this.nom = document.getElementById('nom');
      this.prenom = document.getElementById('prenom');
      this.formulaire = document.getElementById('formulaire');
      this.erreur = document.getElementById('erreur');
      this.debutDecompte = sessionStorage.getItem('debutDecompte');
      this.finDecompte = sessionStorage.getItem('finDecompte');
      this.tempsRestant = sessionStorage.getItem('tempsRestant');
      this.map = document.getElementById('map');
      this.restartChrono()
      this.verifForm();
      this.chrono();



}

//Vérification du formulaire, tous les champs doivent être remplis

    verifForm() {

      this.formulaire.addEventListener('submit', (event) => {

        let regex = /^[a-zA-Z_-éè]{2,40}$/;
        let erreur = [
                      'Veuiller signer votre reservation!',
                      'Veuiller utiliser au moins deux caractères !',
                      'Veuiller ne pas utiliser plus de quarante caractères !',
                      'Veuiller n\'utiliser que des lettres !',
                    ];
/*
       let erreurStyle = [document.getElementById('erreur').style.color = 'orange',
                      document.getElementById('erreur').style.fontFamily = 'arial',
                      document.getElementById('erreur').style.fontSize = '0.5em']

        const nomVide = document.getElementById('nom_vide');
        const prenomVide = document.getElementById('prenom_vide');
        const signature = document.getElementById('signature_vide');
        const canvas = document.getElementById('canvas');
*/
        this.isDrawing = sessionStorage.getItem('this.isDrawing');

                if(this.isDrawing === false) {
                  event.preventDefault();

                  this.erreur.textContent = erreur[0];
                  document.getElementById('erreur').style.color = 'orange';
                  document.getElementById('erreur').style.fontFamily = 'arial';
                  document.getElementById('erreur').style.fontSize = '0.5em';
                }else{

                }
/*
                if (!regex.test(this.nom.value.length) < 2 || !regex.test(this.prenom.value.length < 2)) {
                  console.log(this.nom.value.length);
                  event.preventDefault();
                  this.erreur.textContent = erreur[1];
                  document.getElementById('erreur').style.color = 'orange';
                  document.getElementById('erreur').style.fontFamily = 'arial';
                  document.getElementById('erreur').style.fontSize = '0.5em';
                }else{

                }
                if (this.nom.value.length > 40 || this.prenom.value.length > 40) {
                  event.preventDefault();
                  this.erreur.textContent = erreur[2];
                  document.getElementById('erreur').style.color = 'orange';
                  document.getElementById('erreur').style.fontFamily = 'arial';
                  document.getElementById('erreur').style.fontSize = '0.5em';
                }else{


}
                if (!regex.test(this.prenom.value) || !regex.test(this.nom.value)) {
                  event.preventDefault();
                  this.erreur.innerHTML = erreur[3];
                  document.getElementById('erreur').style.color = 'orange';
                  document.getElementById('erreur').style.fontFamily = 'arial';
                  document.getElementById('erreur').style.fontSize = '0.5em';
                }else{

                }
*/
          })
}



// Ici je relance mon chrono si un rafraichissement de la page a eu lieu par mégarde

 restartChrono() {

 window.addEventListener('load',  ()=> { // pour relancer ma resa au rafraichissement

console.log(this.finDecompte);

      if (this.finDecompte != null) {


          let finDecompte = new Date(sessionStorage.getItem('finDecompte'));
          let oupsRefresh = new Date();
            sessionStorage.setItem('oupsRefresh', oupsRefresh);
          let tempsRestant = Math.floor((finDecompte - oupsRefresh) / 1000);
            sessionStorage.setItem('tempsRestant', tempsRestant);
          let minute = sessionStorage.getItem('minute');
          let seconde = sessionStorage.getItem('seconde');

                this.timer = new Timer().startTimer();


                this.infoStations.style.display = 'none';
                this.reservation.style.display = 'none';
                this.reserver.style.display = 'none';
                this.map.style.display = 'none';

      }
    });
   }


// si pas de resa en cours on envoie le timer de 20 mn

    chrono() {

      nom.value = localStorage.getItem('nom');
      prenom.value = localStorage.getItem('prenom');

      this.formulaire.addEventListener('submit', (e)=> {

       e.preventDefault();// la je garde la main.

              let debutDecompte = new Date();
              sessionStorage.setItem('debutDecompte', debutDecompte);
              let finDecompte = new Date (debutDecompte);
              finDecompte.setMinutes ( debutDecompte.getMinutes() + 20 );
              sessionStorage.setItem('finDecompte', finDecompte);
              let tempsRestant = (finDecompte - debutDecompte) / 1000; // pour avoir mon tempsRestant en secondes
              sessionStorage.setItem('tempsRestant', tempsRestant);

                localStorage.setItem('nom', nom.value);
                localStorage.setItem('prenom', prenom.value);

                   this.timer = new Timer().startTimer();
                  //  this.timer.startTimer();

                    this.infoStations.style.display = 'none';
                    this.reservation.style.display = 'none';
                    this.reserver.style.display = 'none';
                    this.map.style.display = 'none';


            });
}



  jouerSon() {
              this.envoyer.addEventListener('click', ()=> {
              let son = document.getElementById("dring");
              son.play();
              })
          }

}


// MAINTENANT MON OBJET TIMER //


class Timer
{
  constructor() {
    this.nom = document.getElementById('nom').value = localStorage.getItem('nom');
    this.prenom = document.getElementById('prenom').value = localStorage.getItem('prenom');
    this.debutDecompte = sessionStorage.getItem('debutDecompte');
    this.finDecompte = sessionStorage.getItem('finDecompte');
    this.tempsRestant = sessionStorage.getItem('tempsRestant');
    this.address = sessionStorage.getItem('station_address');
    this.name = sessionStorage.getItem('station_name');
    this.oupsRefresh = sessionStorage.getItem('oupsRefresh');
    this.decompte = document.getElementById('decompte');
    this.adresse = document.getElementById('adresse');
    this.annuler = document.getElementById('annuler');
    this.infoStations = document.getElementById('infoStations');
    this.infoicons = document.getElementById('infoicons');
    this.reservation = document.getElementById('reservation');
    this.minutes = document.getElementById('minutes');
    this.secondes = document.getElementById('secondes');
    this.nomResa = document.getElementById('nomResa');
    this.etat = document.getElementById('etat');
    this.refresh = document.getElementById('refresh');
    const decompte = document.getElementById('decompte');
    const time = document.getElementById('time');
      this.annulation();
  }

  stopTimer() {
  clearInterval(this.startTimer);
}

  startTimer() {

    this.startTimer = setInterval( ()=> {


          let minute = Math.floor(this.tempsRestant / 60);
          sessionStorage.setItem('minute', minute);
          let seconde = Math.floor(this.tempsRestant - minute * 60);
          sessionStorage.setItem('seconde', seconde);


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

          }

            if (this.tempsRestant == 0) {
              clearInterval(this.startTimer);
              sessionStorage.clear();
              time.innerHTML = 'Votre réservation a expiré';

              this.refresh.style.display = "block";
              nomResa.style.display = 'none';
              this.annuler.style.display = 'none';
          }
    //  }
  },1000);
}

  annulation() {

    this.annuler.addEventListener('click', ()=> {


                this.stopTimer();
                clearInterval(this.startTimer);
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

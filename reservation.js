class Reservation
{
  constructor(status, address, available_bikes, station) {

      this.time = document.getElementById('time');
      this.reservation = document.getElementById('reservation');
      this.reserver = document.getElementById('reserver');
      this.envoyer = document.getElementById('envoyer');
      this.decompte = document.getElementById('decompte');
      this.infoStations = document.getElementById('infoStations');
      this.isDrawing = sessionStorage.getItem('this.isDrawing');
  //    this.isDrawing = false;
      this.nom = document.getElementById('nom');
      this.prenom = document.getElementById('prenom');
      this.formulaire = document.getElementById('formulaire');
      this.erreur = document.getElementById('erreur');
      this.erreur.className = "erreur_form";
      this.debutDecompte = sessionStorage.getItem('debutDecompte');
      this.finDecompte = sessionStorage.getItem('finDecompte');
      this.tempsRestant = sessionStorage.getItem('tempsRestant');
      this.map = document.getElementById('map');
  //   this.restartChrono()
      this.verifForm();
      this.chrono();
//window.addEventListener('load', this.restartChrono());


}

//Vérification du formulaire, tous les champs doivent être remplis

    verifForm() {

      this.envoyer.addEventListener('click', (event) => {

        let regex = new RegExp("[a-zA-Z_-éè ]{2,40}");

        let erreurs = []; // tableau vide d'erreur pour les inserer au fur et a mesure
        for (erreurs = 0; erreurs < erreurs.length; erreurs++) {
            erreurs.push(erreur);
            console.log(erreurs);
          }
// verifier la signature

              let isDrawing = sessionStorage.getItem('this.isDrawing');

                if(isDrawing == false || isDrawing == null) {
                  event.preventDefault();
                  this.erreur.textContent = 'Veuillez signer votre réservation !';
                }else{};

// Vérifier que les champs ne soient pas vides

                if (this.prenom.length < 0 || this.nom.length < 0) {
                  event.preventDefault();
                  console.log(this.prenom.value);
                  this.erreur.textContent = 'Veuillez remplir tous les champs !';
                  }else{};

// Vérifier que l'utilisateur n'entre que des lettres

                if (!regex.test(this.prenom.value) || !regex.test(this.nom.value)) {
                  event.preventDefault();
                  console.log(this.prenom.value);
                  this.erreur.textContent = 'Veuillez n\'utiliser que des lettres !';
                  }else{};

// vérifier que la valeur fasse au moins deux caractères

                if (this.nom.value.length < 2  || this.prenom.value.length < 2) {
                  console.log(this.nom.value.length);
                 event.preventDefault();
                  this.erreur.textContent = 'Veuillez entrer au moins deux caractères !';
                }else{};

// vérifier que la valeur ne fasse pas plus de quarante caractères

                if (this.nom.value.length > 40 || this.prenom.value.length > 40) {
                  event.preventDefault();
                  this.erreur.textContent = 'Veuillez ne pas dépasser 40 caractères !';
                }else{};

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

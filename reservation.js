// CREATION DE MON OBJET RESERVATION
class Reservation
{
  constructor(status, address, available_bikes, station) {

      this.time = document.getElementById('time');
      this.reservation = document.getElementById('reservation');
      this.reserver = document.getElementById('reserver');
      this.envoyer = document.getElementById('envoyer');
      this.decompte = document.getElementById('decompte');
      this.infoStations = document.getElementById('infoStations');
    //  this.boolen = sessionStorage.getItem('this.boolean');
      this.compteur = sessionStorage.getItem('compteur');
      this.nom = document.getElementById('nom');
      this.prenom = document.getElementById('prenom');
      this.formulaire = document.getElementById('formulaire');
      this.erreurDiv = document.getElementById('erreur');
      this.erreurDiv.classList.add("erreur_form");
      this.debutDecompte = sessionStorage.getItem('debutDecompte');
      this.finDecompte = sessionStorage.getItem('finDecompte');
      this.tempsRestant = sessionStorage.getItem('tempsRestant');
      this.map = document.getElementById('map');
      this.canvas = document.getElementById('canvas');
      this.verifForm();
      this.chrono();
}
// VERIFICATION DU FORMULAIRE

verifForm() {

  this.envoyer.addEventListener('click', (event) => {

    const regex = new RegExp("[a-zA-Z_-éè ]{2,40}");
    const erreurs = []; // tableau vide d'erreur pour les inserer au fur et a mesure

// Vérifier que les champs ne soient pas vides

    if (this.prenom.value =='' || this.nom.value == '') {
      event.preventDefault();
      erreurs.push('Veuillez remplir tous les champs !');
    };

// vérifier que la valeur fasse au moins deux caractères

    if (this.nom.value.length <= 1 || this.prenom.value.length <= 1 ) {
      console.log(this.nom.value.length);
      event.preventDefault();
      erreurs.push('Veuillez entrer au moins deux caractères !');
    };

// vérifier que la valeur ne fasse pas plus de vingt cinq caractères

    if (this.nom.value.length > 25 || this.prenom.value.length > 25) {
      event.preventDefault();
      erreurs.push('Veuillez ne pas dépasser 25 caractères !');
    };

// Vérifier que l'utilisateur n'entre que des lettres

    if (!regex.test(this.prenom.value) || !regex.test(this.nom.value)) {
       event.preventDefault();
       erreurs.push('Veuillez n\'utiliser que des lettres !');
    };

// verifier la signature

    if(sessionStorage.getItem('this.compteur') <= 0) {
      event.preventDefault();
      erreurs.push('Veuillez signer votre réservation !');
    };

    this.erreurDiv.innerHTML = erreurs[0];
  });
}

// SI PAS DE RESERVATION EN COURS ON ENVOIE UN DECOMPTE DE 20 MINUTES

chrono() {

  nom.value = localStorage.getItem('nom');
  prenom.value = localStorage.getItem('prenom');

  this.formulaire.addEventListener('submit', (e)=> { // lorsque je soumet mon formulaire
    e.preventDefault();// la je garde la main.
    const debutDecompte = new Date();
        sessionStorage.setItem('debutDecompte', debutDecompte);//sauvegarde de la date de début de reservation
    const finDecompte = new Date (debutDecompte);
      finDecompte.setMinutes ( debutDecompte.getMinutes() + 20 );
        sessionStorage.setItem('finDecompte', finDecompte);//sauvegarde de la date de fin de reservation
    const tempsRestant = (finDecompte - debutDecompte) / 1000; // pour avoir mon tempsRestant en secondes
        sessionStorage.setItem('tempsRestant', tempsRestant);//sauvegarde du temps restant a décompter

    localStorage.setItem('nom', nom.value);
    localStorage.setItem('prenom', prenom.value);

    this.timer = new Timer().startTimer();// création d'un nouveau decompte
    this.infoStations.style.display = 'none';
    this.reservation.style.display = 'none';
    this.reserver.style.display = 'none';
    this.map.style.display = 'none';
  });
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
    this.adresse = document.getElementById('adresse');
    this.address = sessionStorage.getItem('station_address');
    this.name = sessionStorage.getItem('station_name');
    this.oupsRefresh = sessionStorage.getItem('oupsRefresh');
    this.decompte = document.getElementById('decompte');
    this.annuler = document.getElementById('annuler');
    this.infoStations = document.getElementById('infoStations');
    this.infoicons = document.getElementById('infoicons');
    this.reservation = document.getElementById('reservation');
    this.nomResa = document.getElementById('nomResa');
    this.etat = document.getElementById('etat');
    this.time = document.getElementById('time');
    this.refresh = document.getElementById('refresh');
    this.map = document.getElementById('map');
    this.envoyer = document.getElementById('envoyer');
    this.ancreARetirer = document.getElementById('ancreMilieu');
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
        this.map.style.display = 'none';
        this.infoicons.style.display = 'none';
        this.time.innerHTML = "Un vélo vous est reservé pendant  " + minute + " minute" + (minute > 1 ? 's':'') + " " + seconde  +" seconde" + (seconde > 1 ? 's':'') +" à cette station : " + this.name  + ".";
        this.nomResa.innerHTML = "A votre nom: " + this.prenom + " " + this.nom;
        this.adresse.innerHTML = 'A cette adresse : ' + this.address  + ".";
        this.etat.innerHTML = "Etat : Ouvert";
        this.etat.style.color = '#6fd27b';
        this.refresh.style.display = "none";
        this.annuler.style.display = 'block';
        this.infoicons.style.display = 'flex';
        this.ancreARetirer.style.display = 'none';
      }
      if (this.tempsRestant == 0) {
        clearInterval(this.startTimer);
        sessionStorage.clear();
        this.time.innerHTML = 'Votre réservation a expiré';
        this.refresh.style.display = "block";
        this.nomResa.style.display = 'none';
        this.annuler.style.display = 'none';
        this.map.style.display = 'block';
      }
  },1000);
}

annulation() {
    this.annuler.addEventListener('click', ()=> {
      this.stopTimer();
      clearInterval(this.startTimer);
      sessionStorage.clear();
      window.location.reload();
      this.decompte.style.display = 'block';
      this.refresh.style.display = "block";
      this.etat.style.display = 'none';
      this.nomResa.style.display = 'none';
      this.adresse.style.display = 'none';
      this.annuler.style.display = 'none';
      this.map.style.display = 'block';
      this.infoicons.style.display = 'flex';
   })
 }
}

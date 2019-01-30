class Reservation
{
  constructor(status, address, available_bikes, station) {

      this.time = document.getElementById('time');
      this.reservation = document.getElementById('reservation');
      this.reserver = document.getElementById('reserver');
      this.envoyer = document.getElementById('envoyer');
      this.decompte = document.getElementById('decompte');
      this.etat = document.getElementById('etat');
      this.adresse = document.getElementById('adresse');
      this.nameStation = document.getElementById('nameStation');
      this.infoStations = document.getElementById('infoStations');
      this.annuler = document.getElementById('annuler');
      this.isDrawing = false;
      this.name = sessionStorage.getItem('station_name');
      this.status = sessionStorage.getItem('station_status');
      this.address = sessionStorage.getItem('station_address');
      this.nom = document.getElementById('nom');
      this.prenom = document.getElementById('prenom');
      this.formulaire = document.getElementById('formulaire');
      this.canvas = document.getElementById('canvas');
      this.debutDecompte = sessionStorage.getItem('debutDecompte');
      this.finDecompte = sessionStorage.getItem('finDecompte');
      this.tempsRestant = sessionStorage.getItem('tempsRestant');
      this.tempsRestantRefresh = sessionStorage.getItem('tempsRestantRefresh');
      let nameStation = document.getElementById('nameStation');
      let minutes = document.getElementById('minutes');
      let secondes = document.getElementById('secondes');

      this.verifForm();
      this.chrono();
      this.restartChrono()


}

//Vérification du formulaire, tous les champs doivent être remplis

    verifForm() {

      this.envoyer.addEventListener('click', event => {

        let regex = /a-z-A-Z/i;
        let erreur;
        const nomVide = document.getElementById('nom_vide');
        const prenomVide = document.getElementById('prenom_vide');
        const signature = document.getElementById('signature_vide');
        const canvas = document.getElementById('canvas');

        this.isDrawing = sessionStorage.getItem('this.isDrawing');
        console.log(this.isDrawing);
                if(this.isDrawing === null) {

        console.log(this.isDrawing);
                  erreur = 'Veuiller signer votre reservation!';
                }

                if(!this.prenom.value && !regex.test(prenom.value)) {
                  erreur = 'Veuiller entrer votre prénom !';
                }

                if(!this.nom.value && !regex.test(nom.value)) {
                  erreur = 'Veuiller entrer votre nom !';
                }

                if (erreur) {
                  event.preventDefault();
                  document.getElementById('erreur').innerHTML = erreur;
                  document.getElementById('erreur').style.color = 'orange';
                  document.getElementById('erreur').style.fontFamily = 'arial';
                  document.getElementById('erreur').style.fontSize = '0.5em';
                }
              })
}

// Ici je relance mon chrono si un rafraississement de la page a eu lieu par mégarde

  restartChrono() {

      if (this.finDecompte != null) {

          let finDecompte = new Date(sessionStorage.getItem('finDecompte'));
                let oupsRefresh = new Date();
                sessionStorage.setItem('oupsRefresh', oupsRefresh);
                let tempsRestant = Math.floor((finDecompte - oupsRefresh) / 1000);
                sessionStorage.setItem('tempsRestant', tempsRestant);
                let minute = sessionStorage.getItem('minute');
                let seconde = sessionStorage.getItem('seconde');

                this.timer = new Timer();
                this.timer.startTimer();
      }
}

// si pas de resa en cour on envoie le timer de 20 mn
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

console.log(debutDecompte);
console.log(finDecompte);
console.log(tempsRestant);

          localStorage.setItem('nom', nom.value);
          localStorage.setItem('prenom', prenom.value);

              this.timer = new Timer();
              this.timer.startTimer();
              this.infoStations.style.display = 'none';
              this.reservation.style.display = 'none';
              this.decompte.style.display = 'block';
              this.reserver.style.display = 'none';


            });

  }


  jouerSon() {
              this.envoyer.addEventListener('click', ()=> {
              let son = document.getElementById("dring");
              son.play();
              })
          }

}

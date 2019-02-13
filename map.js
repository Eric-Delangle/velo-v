// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}
// Creation de l'objet maMap
class Mamap
{
    constructor () {
      this.finDecompte = sessionStorage.getItem('finDecompte');
      this.infoStations = document.getElementById('infoStations');
      this.reservation = document.getElementById('reservation');
      this.reserver = document.getElementById('reserver');
      this.map = document.getElementById('map');
      window.addEventListener('load', this.restartChrono());
      }
      // Ici je relance mon chrono si un rafraichissement de la page a eu lieu par mégarde pendant une reservation

       restartChrono() {

            if (this.finDecompte != null) {


                let finDecompte = new Date(sessionStorage.getItem('finDecompte'));
                console.log(finDecompte);
                let oupsRefresh = new Date();
                  sessionStorage.setItem('oupsRefresh', oupsRefresh);
                this.tempsRestant = Math.floor((finDecompte - oupsRefresh) / 1000);
                  sessionStorage.setItem('tempsRestant', this.tempsRestant);

                      this.timer = new Timer().startTimer();
                      this.infoStations.style.display = 'none';
                      this.reservation.style.display = 'none';
                      this.reserver.style.display = 'none';
                      this.map.style.display = 'none';

            }

         }

      // Initialisation de la carte
 initMap() {

   //setInterval( ()=> {
        // je definis la position a Lyon
            let lyon = {lat: 45.750000, lng: 4.850000};
            // La carte centree a Lyon
            let map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: lyon
            });

       ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=7f9b27baaf886205613fd37511619e7599ac0466&callback=initMap",
               function (reponse) {
               // Transforme la reponse en tableau d'objets JavaScript
                       let stations = JSON.parse(reponse);
                       let markers = [];

                           stations.forEach((elem)=> { // elem correspond a une station


              // Initialise un marker
            let statuStation = function initMarkers() {
                 // Icone en fonction de l'ouverture ou non de la station
                 if (elem.status === "OPEN" && elem.available_bikes > 0) {
                   elem.icon = "images/bike-icon.png";
                 } else if (elem.status === "OPEN" && elem.available_bikes === 0) {
                   elem.icon = "images/pasdevelo.png";
                 } else {
                   elem.icon = "images/ferme.png";
                 }

                }


                statuStation();

                       let marker = new google.maps.Marker({
                         position: elem.position,
                         map: map,
                         icon: elem.icon
                       }); // fin de la variable de creation de marker

                       markers.push(marker);

// au click sur un marker j'affiche les infos grace a l'objet mestations

    marker.addListener('click', ()=> {



        if (elem.status === "OPEN") {

          document.getElementById('stationFermee').innerHTML = "";
          infoStations.style.display = "block";
          reserver.style.display = 'block';
          marker.currentElem = new Mestations(elem.status, elem.name, elem.address, elem.available_bike_stands, elem.available_bikes);
          marker.currentElem.displayElem();
          }

           if (elem.available_bikes === 0) {
             reserver.style.display = 'none';
            }

            if (elem.status === "CLOSED") {
              let etatStation = document.getElementById('etatStation');
              infoStations.style.display = "none";
              etatStation.innerHTML = "Etat : Fermé";
              etatStation.style.color = 'red';
              console.log(etat);
              reserver.style.display = "none";
            }

      })

  })// fin de la methode foreach


  let markerCluster = new MarkerClusterer(map, markers,
           {
            imagePath : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
         });// fin de ma variable de regroupement de markers

       })// fin ajaxGet
//setInterval(this.ajaxget,10000);
       // ces setintervals me donnent les infos en temps reel


  //console.log(this.statuStation());
  //setInterval(statuStation,10000);
//  console.log(statuStation());




     }// fin initmap

}

// CREATION DE L'OBJET STATIONS //

class Mestations
{

  constructor (status, name, address, available_bike_stands, available_bikes) {
    this.status = status;
    this.name = name;
    this.address = address;
    this.available_bike_stands = available_bike_stands;
    this.available_bikes = available_bikes;
    this.reservation = document.getElementById('reservation');
    this.map = document.getElementById('map');
    let reserver = document.getElementById('reserver');
    let reservation = document.getElementById('reservation');
    this.resaVelo();

  }

  resaVelo() {

    let reserver = document.getElementById('reserver');

        reserver.addEventListener('click', ()=> {

                reservation.style.display = "block";
                reserver.style.display = 'none';
                reserver.currentElem = new Reservation(this.status, this.address, this.name, this.available_bikes);

                sessionStorage.setItem('station_status',  this.status);
                sessionStorage.setItem('station_name',  this.name);
                sessionStorage.setItem('station_address',  this.address);
                sessionStorage.setItem('station_available_bikes',  this.available_bikes);

              });
        }

  displayElem() {

  let name =  this.name;
  let address = this.address;
  let available_bike_stands = this.available_bike_stands;
  let available_bikes = this.available_bikes;



      this.map.style.margin = "0 10px";
      nomStation.innerHTML = "Station: " +  name;
      adressStation.innerHTML = "Adresse: " +  address;
      attachesDispos.innerHTML = "Places disponibles: " + available_bike_stands;
      bikesAvailable.innerHTML = "Vélos disponibles: " + available_bikes;
      this.reservation.style.display = 'none';


console.log(this.status);
console.log(name);
console.log(available_bike_stands);
console.log(available_bikes);




       if (this.status === 'OPEN') {
             etatStation.innerHTML = "Etat : Ouvert";
             etatStation.style.color = '#6fd27b';
           }
       if (this.status === 'CLOSED') {
            etatStation.innerHTML = "Etat : Fermé";
            etatStation.style.color = 'red';
            document.getElementById('stationFermee').innerHTML = "Cette station est fermée !";
          }

}
}

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    const req = new XMLHttpRequest();
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
// CREATION DE L'OBJET MAMAP
class Mamap
{
  constructor () {
    this.finDecompte = sessionStorage.getItem('finDecompte');
    this.infoStations = document.getElementById('infoStations');
    this.reservation = document.getElementById('reservation');
    this.reserver = document.getElementById('reserver');
    this.map = document.getElementById('map');
    this.time = document.getElementById('time');
    this.decompte = document.getElementById('decompte');
    this.annuler = document.getElementById('annuler');
    this.refresh = document.getElementById('refresh');
    window.addEventListener('load', this.restartChrono());
  }

// Ici je relance mon chrono si un rafraichissement de la page a eu lieu par mégarde pendant une reservation
 restartChrono() {
   if (this.finDecompte != null) {
    const finDecompte = new Date(sessionStorage.getItem('finDecompte'));
    const oupsRefresh = new Date();
      sessionStorage.setItem('oupsRefresh', oupsRefresh);
    this.tempsRestant = Math.floor((finDecompte - oupsRefresh) / 1000);
      sessionStorage.setItem('tempsRestant', this.tempsRestant);

    this.timer = new Timer().startTimer();
    this.infoStations.style.display = 'none';
    this.reservation.style.display = 'none';
    this.reserver.style.display = 'none';
    this.map.style.display = 'none';
  }
  if(this.findecompte == null) {
    this.decompte.style.display = "block";
    this.time.innerHTML = "Vous n'avez aucune réservation en cours.";
    this.annuler.style.display = 'none';
    this.refresh.style.display = 'none';
  }
}

// Initialisation de la carte
 initMap() {
// je definis la position a Lyon
    const lyon = {lat: 45.750000, lng: 4.850000};
// La carte centree a Lyon
    const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: lyon
  });
// maintenant j'appelle les infos de l'api
  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=7f9b27baaf886205613fd37511619e7599ac0466&callback=initMap",
    function (reponse) {
// Transforme la reponse en tableau d'objets JavaScript
     const stations = JSON.parse(reponse);
     const markers = [];
     stations.forEach((elem)=> { // elem correspond a une station
// Initialise un marker
     const statuStation = function initMarkers() {// si je ne met pas ça dans une variable ça marche pas
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

      const marker = new google.maps.Marker({
        position: elem.position,
        map: map,
        icon: elem.icon,
        label:  {
                	text: String(elem.available_bikes),
                	fontSize: "10px",
                	color: "#ffffff",
                  fontWeight: "bold"
                }

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
      const etatStation = document.getElementById('etatStation');
      infoStations.style.display = "none";
      etatStation.innerHTML = "Etat : Fermé";
      etatStation.style.color = 'red';
      console.log(etat);
      reserver.style.display = "none";
    }
  })
 })// fin de la methode foreach
 const markerCluster = new MarkerClusterer(map, markers,
    {
     imagePath : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });// fin de ma variable de regroupement de markers
  })// fin ajaxGet
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

    const reserver = document.getElementById('reserver');
    const reservation = document.getElementById('reservation');
    this.resaVelo();
  }

  resaVelo() {
    const reserver = document.getElementById('reserver');
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

  displayElem() {// pour faire apparaitre les infos des stations

    nomStation.innerHTML = "Station: " +  this.name;
    adressStation.innerHTML = "Adresse: " +  this.address;
    sessionStorage.setItem('stationAddress',this.address);
    attachesDispos.innerHTML = "Places disponibles: " + this.available_bike_stands;
    bikesAvailable.innerHTML = "Vélos disponibles: " + this.available_bikes;
    this.reservation.style.display = 'none';

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

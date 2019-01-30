
// Creation de l'objet maMap
class Mamap
{
    constructor () {

      }
      // Initialisation de la carte
 initMap() {
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

             //let statuStation = elem.status === "OPEN" ? elem.icon = "images/bike-icon.png" : elem.icon = "images/ferme.png";
              //   let avaBike = elem.available_bikes > 0 ? elem.icon = "images/bike-icon.png" : elem.icon = "images/pasdevelo.png";



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
                       //console.log(elem.icon);

                       markers.push(marker);



    marker.addListener('click', ()=> {



        if (elem.status === "OPEN") {

        //  elem.icon = statuStation();
          console.log(statuStation);
          document.getElementById('stationFermee').innerHTML = "";
          infoStations.style.display = "block"; // au click j'affiche les infos grace a l'objet mestations
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

                  // fin test
  })// fin de la methode foreach

  let markerCluster = new MarkerClusterer(map, markers,
           {
            imagePath : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
         });// fin de ma variable de regroupement de markers
       })// fin ajaxGet

     }// fin initmap
}

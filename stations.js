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

      this.map.style.margin = "0 10px";
      nomStation.innerHTML = "Station: " +  this.name;
      adressStation.innerHTML = "Adresse: " +  this.address;
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

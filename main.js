
// dans cet objet j'appele toutes mes classes
class Main {
  constructor() {
    this.slider = new Slider();
    this.mamap = new Mamap();
    this.signature = new Signature();
    this.reservation = new Reservation();
  //  this.timer = new Timer();
  //  this.timer = new Timer();
   //this.mestations = new Mestations(elem.status, elem.contract_name, elem.name, elem.address, elem.bike_stands, elem.available_bike_stands, elem.available_bikes);

    this.mamap.initMap();

  //  this.reservation.reserver();
    this.slider.init();
    this.signature.drawCanvas();
    this.signature.touchCanvas();
    this.signature.displayCanvas();
    this.signature.clearCanvas();
  //  this.timer.startTimer();
    //this.mestations.assignStation()
    //this.mestations.stationInfos();
  }

}

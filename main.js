
// dans cet objet j'appele toutes mes classes
class Main
{
  constructor() {
    this.slider = new Slider();
    this.mamap = new Mamap();
    this.signature = new Signature();
    this.mamap.initMap();
    this.slider.init();
  //  this.signature.drawCanvas();
  //  this.signature.touchCanvas();
  //  this.signature.displayCanvas();
  //  this.signature.clearCanvas();
  }
}

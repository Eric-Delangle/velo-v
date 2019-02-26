
// dans cet objet j'appele toutes mes classes et certaines méthodes
class Main
{
  constructor() {
    this.slider = new Slider();
    this.mamap = new Mamap();
    this.signature = new Signature();
    this.mamap.initMap();
    this.slider.init();
  }
}

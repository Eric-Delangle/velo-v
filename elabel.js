// ELabel.js
//
// Ce Javascript est fourni par Mike Williams
// Équipe Javascript de l'église de communauté
// http://www.bisphamchurch.org.uk/
// http://econym.org.uk/gmap/
//
// Ce travail est sous licence Creative Commons
// http://creativecommons.org/licenses/by/2.0/uk/
//
// Version 0.2 les paramètres .copy () étaient incorrects
// version 1.0 ajoutée .show () .hide () .setContents () .setPoint () .setOpacity () .overlap
// version 1.1 Fonctionne avec GMarkerManager en v2.67, v2.68, v2.69, v2.70 et v2.71
// version 1.2 fonctionne avec GMarkerManager en v2.72, v2.73, v2.74 et v2.75
// version 1.3 ajoute .isHidden ()
// la version 1.4 permet l'utilisation de .hide et .show avant addOverlay ()
// la version 1.5 corrige un bogue de positionnement alors que l'étiquette est masquée
// version 1.6 ajoutée .supportsHide ()
// version 1.7 corrige .supportsHide ()
// la version 1.8 supprime l'ancien support de GMarkerManager en raison de conflits avec la v2.143


class ELabel (point, html, nom de classe, pixelOffset, percentOpacity, chevauchement) {

  constructor() {
        // paramètres obligatoires
        this.point = point;
        this.html = html;

        // paramètres optionnels
        this.classname = nom de classe || "";
        this.pixelOffset = pixelOffset || new GSize (0,0);
        if (percentOpacity) {
          if (percentOpacity <0) {percentOpacity = 0;}
          si (percentOpacity> 100) {percentOpacity = 100;}
        }
        this.percentOpacity = percentOpacity;
        this.overlap = overlap || false;
        this.hidden = false;
      }

      ELabel.prototype = new GOverlay ();

      ELabel.prototype.initialize = function (map) {
        var div = document.createElement ("div");
        div.style.position = "absolute";
        div.innerHTML = '<div class = "' + this.classname + '">' + this.html + '</ div>';
        map.getPane (G_MAP_FLOAT_SHADOW_PANE) .appendChild (div);
        this.map_ = map;
        this.div_ = div;
        if (this.percentOpacity) {
          if (typeof (div.style.filter) == 'chaîne') {div.style.filter = 'alpha (opacité:' + this.percentOpacity + ')';}
          if (typeof (div.style.KHTMLOpacity) == 'chaîne') {div.style.KHTMLOpacity = this.percentOpacity / 100;}
          if (typeof (div.style.MozOpacity) == 'chaîne') {div.style.MozOpacity = this.percentOpacity / 100;}
          if (typeof (div.style.opacity) == 'chaîne') {div.style.opacity = this.percentOpacity / 100;}
        }
        if (this. overlap) {
          var z = GOverlay.getZIndex (this.point.lat ());
          this.div_.style.zIndex = z;
        }
        if (this.hidden) {
          this.hide ();
        }
      }

      ELabel.prototype.remove = function () {
        this.div_.parentNode.removeChild (this.div_);
      }

      ELabel.prototype.copy = function () {
        renvoyer new ELabel (this.point, this.html, this.nomclasse, this.pixelOffset, this.percentOpacity, this. overlap);
      }

      ELabel.prototype.redraw = fonction (force) {
        var p = this.map_.fromLatLngToDivPixel (this.point);
        var h = parseInt (this.div_.clientHeight);
        this.div_.style.left = (px + this.pixelOffset.width) + "px";
        this.div_.style.top = (py + this.pixelOffset.height - h) + "px";
      }

      ELabel.prototype.show = function () {
        if (this.div_) {
          this.div_.style.display = "";
          this.redraw ();
        }
        this.hidden = false;
      }

      ELabel.prototype.hide = function () {
        if (this.div_) {
          this.div_.style.display = "none";
        }
        this.hidden = true;
      }

      ELabel.prototype.isHidden = function () {
        retournez this.hidden;
      }

      ELabel.prototype.supportsHide = function () {
        retourne vrai;
      }

      ELabel.prototype.setContents = fonction (html) {
        this.html = html;
        this.div_.innerHTML = '<div class = "' + this. nom_classe + '">' + this.html + '</ div>';
        this.redraw (true);
      }

      ELabel.prototype.setPoint = fonction (point) {
        this.point = point;
        if (this. overlap) {
          var z = GOverlay.getZIndex (this.point.lat ());
          this.div_.style.zIndex = z;
        }
        this.redraw (true);
      }

      ELabel.prototype.setOpacity = fonction (percentOpacity) {
        if (percentOpacity) {
          if (percentOpacity <0) {percentOpacity = 0;}
          si (percentOpacity> 100) {percentOpacity = 100;}
        }
        this.percentOpacity = percentOpacity;
        if (this.percentOpacity) {
          if (typeof (this.div_.style.filter) == 'chaîne') {this.div_.style.filter = 'alpha (opacité:' + this.percentOpacity + ')';}
          if (typeof (this.div_.style.KHTMLOpacity) == 'chaîne') {this.div_.style.KHTMLOpacity = this.percentOpacity / 100;}
          if (typeof (this.div_.style.MozOpacity) == 'chaîne') {this.div_.style.MozOpacity = this.percentOpacity / 100;}
          if (typeof (this.div_.style.opacity) == 'chaîne') {this.div_.style.opacity = this.percentOpacity / 100;}
        }
      }

      ELabel.prototype.getPoint = function () {
        retournez this.point;
      }
    }

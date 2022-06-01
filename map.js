function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(46.48283784969777, 30.735491658207195),
      zoom:14,
  };

  window.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  window.polygons = [];

  const predefinedPolygonsData = [
      {

          id: 0,
          tooltipText: '<h3>Title P1</h3><div>qweiuy</div',
          coords: [
              { lat: 46.47540839002595, lng: 30.733516309954016 },
              { lat: 46.47528101786862, lng: 30.73555527386255 },
              { lat: 46.4735133853299, lng: 30.735275563790676 },
              { lat: 46.4737059907512, lng: 30.733250196039005 },
          ]
      },
      {

          id: 1,
          tooltipText: '<h3>Title P2</h3><div>aslkdlkasjd</div>',
          coords: [
              { lat: 46.48581797299432, lng: 30.73927872746029 },
              { lat: 46.485744090278494, lng: 30.740512548909482 },
              { lat: 46.48515311346601, lng: 30.740491073918214 },
              { lat: 46.48521960891503, lng: 30.739257265782843 },
          ]
      }
  ];

  function createPolygon(idx) {
      const poly = new google.maps.Polygon({
          paths: predefinedPolygonsData[idx].coords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          id: predefinedPolygonsData[idx].id
      });
      polygons.push(poly)
  }

  function getPolygon(idx) {
      return window.polygons[idx]
  }

  document.getElementById("add-all").addEventListener("click", () => setAllPolygons());
  document.getElementById("remove-all").addEventListener("click", () => removeAllPolygons());

  predefinedPolygonsData.forEach(
      ({id}) => {
          document.getElementById(`add-p${id}`).addEventListener("click", () => setPolygon(id));
          document.getElementById(`remove-p${id}`).addEventListener("click", () => removePolygon(id));
      }
  )

  function setPolygon(idx) {
      createPolygon(idx)
      setTimeout(() => {
          let polygon = getPolygon(idx);
          polygon.setMap(window.map);
          setTimeout(() => addTooltip(polygon), 0);
      }, 0);
  }

  function removePolygon(idx) {
      getPolygon(idx).setMap(null);
  }

  function setAllPolygons() {
      removeAllPolygons();
      predefinedPolygonsData.forEach(polyData => setPolygon(polyData.id));
  }

  function removeAllPolygons() {
      window.polygons.forEach(poly => poly.setMap(null));
      window.polygons = [];
  }

  function getPolygonCenter(polygon) {
      const coordinatesArray = polygon?.getPath()?.getArray();
      const latCenter = (coordinatesArray[0].lat() + coordinatesArray[1].lat())/2;
      const lngCenter = (coordinatesArray[0].lng() + coordinatesArray[1].lng())/2;
      return {lat: latCenter, lng: lngCenter}
  };

  function generateTooltip(polygon) {
      let tooltip = new google.maps.InfoWindow({
          content: predefinedPolygonsData.find(p => p.id === polygon.id).tooltipText,
          id: polygon.id
      });
      tooltip.setPosition(getPolygonCenter(polygon))
      tooltip.open({map, shouldFocus: false});
  }

  function addTooltip(polygon) {                 
      polygon.addListener("click", () => {
          generateTooltip(polygon)
      });
  }
}
function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(46.48283784969777, 30.735491658207195),
      zoom:14,
  };

  window.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  window.polygons = [];
  window.customPolygon = {markers: [], tooltipText: '<h3>Custom Poly</h3>'};

  document.getElementById("add-all").addEventListener("click", () => setAllPolygons());
  document.getElementById("remove-all").addEventListener("click", () => removeAllPolygons());
  document.getElementById("remove-markers").addEventListener("click", () => removeAllMarkers());
  document.getElementById("create-polygon").addEventListener("click", () => createCustomPolygon());


  predefinedPolygonsData.forEach(
      ({id}) => {
        generateButton(id, id+1);
        setTimeout(() => {
          document.getElementById(`add-btn-${id}`).addEventListener("click", () => setPolygon(id));
          document.getElementById(`remove-btn-${id}`).addEventListener("click", () => removePolygon(id));
        }, 50);
      }
  )

  map.addListener("click", (mapsMouseEvent) => {
    let marker = new google.maps.Marker({
        map: window.map,
        position: mapsMouseEvent.latLng,
        label: { 
            text: `${window.customPolygon.markers.length+1}`,
        }
    });
    window.customPolygon.markers.push(marker);
  });

}
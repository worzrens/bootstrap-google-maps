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
    poly.tooltipText = predefinedPolygonsData[idx].tooltipText;
    window.polygons.push(poly)
}

function getPolygon(idx) {
    return window.polygons[idx]
}

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

function removeAllMarkers() {
    window.customPolygon.markers.forEach(marker => marker.setMap(null));
    window.customPolygon.markers = [];
}

function createCustomPolygon() {
    const poly = new google.maps.Polygon({
        paths: window.customPolygon.markers.map(marker => marker.getPosition()),
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        id: window.polygons.length
    });
    poly.tooltipText = window.customPolygon.tooltipText;
    polygons.push(poly)

    setTimeout(() => {
        poly.setMap(window.map);
        setTimeout(() => {
            addTooltip(poly);
            
            removeAllMarkers();
            window.customPolygon.tooltipText = "";
        }, 0);
    }, 0);
}
function getPolygonCenter(polygon) {
    const coordinatesArray = polygon?.getPath()?.getArray();
    const latCenter = (coordinatesArray[0].lat() + coordinatesArray[1].lat())/2;
    const lngCenter = (coordinatesArray[0].lng() + coordinatesArray[1].lng())/2;
    return {lat: latCenter, lng: lngCenter}
};

function generateTooltip(polygon) {
    let tooltip = new google.maps.InfoWindow({
        content: window.polygons.find(p => p.id === polygon.id).tooltipText,
        id: polygon.id
    });
    tooltip.setPosition(getPolygonCenter(polygon))
    tooltip.open({map: window.map, shouldFocus: false});
};

function addTooltip(polygon) {     
    if (!polygon?.has_tooltip) { 
        polygon.addListener("click", () => {
            generateTooltip(polygon)
        });
        polygon.has_tooltip = true;
    }
};
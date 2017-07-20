function initMap() {
    let options = {
        zoom: 8,
        center: { lat: 42.698334, lng: 23.319941 }
    }

    // new map
    const map = new google.maps.Map(document.getElementById('map'), options);

    // Add marker
    const marker = new google.maps.Marker({
        position: { lat: 42.698334, lng: 23.319941 },
        map: map
    });

    const infoWindow = new google.maps.InfoWindow({
        constnt: '<h1>Current Position</h1>'
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function initMap() {
    let options = {
        zoom: 12,
        center: { lat: 42.698334, lng: 42.698334 }
    }

    // new map
    const map = new google.maps.Map(document.getElementById('map'), options);

    // Add marker
    addMarker(map, {
        coords: { lat: 42.698334, lng: 42.698334 },
        content: '<h3>Current position</h3>'
    });

    // search box 
    const searchBox = new google.maps.places.SearchBox(document.getElementById('address'));
    google.maps.event.addListener(searchBox, 'places_changed', () => {
        const places = searchBox.getPlaces();

        const bounds = new google.maps.LatLngBounds();
        let i, place;

        for (i = 0; place = places[i]; i++) {

            bounds.extend(place.geometry.location);
            addMarker(map, {
                coords: place.geometry.location,
                content: `<div><strong>${place.name}</strong><br>
                ${place.formatted_address}</div>`
            });
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });

    // add marker
    function addMarker(map, props) {
        const marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            draggable: true
        });

        const infoWindow = new google.maps.InfoWindow({ content: props.content });

        document.getElementById('long-map').value = marker.getPosition().lng();
        document.getElementById('lat-map').value = marker.getPosition().lat();

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }

    $('a[href="#tab-location"]').on('shown.bs.tab', function(e) {
        var target = $(e.target).attr("href") // activated tab
        alert(target);
    });
}


google.maps.event.addDomListener(window, "load", initMap);

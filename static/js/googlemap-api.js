jQuery(function($) {
    let mapIndex = 1;

    function initMap($map, coords) {
        $map = $map || $('#map-location');
        const options = {
            zoom: 12,
            center: new google.maps.LatLng(42.698334, 42.698334)
        }

        const drawingManager = new google.maps.drawing.DrawingManager();
        const map = new google.maps.Map($map[0], options);
        drawingManager.setMap(map);


        if ($map[0].id === 'map-location') {
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
                    document.getElementById('long-map').value = place.geometry.location;
                }

                map.fitBounds(bounds);
                map.setZoom(15);

            });
        }

        if (coords) {
            console.log(coords)
            addMarker(map, {
                coords: coords
            });
        }

        // add marker
        function addMarker(map, props) {
            const marker = new google.maps.Marker({
                position: props.coords,
                map: map,
                draggable: true
            });

            const infoWindow = new google.maps.InfoWindow({ content: props.content });
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }

    }


    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        const target = $(e.target).attr("href");



        if ((target == '#tab-location')) {
            mapIndex++;
            let coords = $(this).data('coords');
            let locationToStringed = coords;
            let input = locationToStringed.replace('(', '');
            let latlngStr = input.split(",", 2);
            let lat = parseFloat(latlngStr[0]);
            let lng = parseFloat(latlngStr[1]);
            let parsedPosition = new google.maps.LatLng(lat, lng);


            $('.maps').html('').append('<div class="map-' + mapIndex + '" style="width: 800px; height: 500px;"></div>');
            initMap($('.map-' + mapIndex), parsedPosition);
        }

    });

    initMap();
});
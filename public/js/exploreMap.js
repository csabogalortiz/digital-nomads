// const { default: axios } = require("axios")

let exploreMap

function initMap() {
    renderMap()
    getPlaces()
}


// Get Places For Markers

function getPlaces() {
    axios
        .get('/api/places')
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}

function setMarkers(places) {
    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: exploreMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}

// Render Map
function renderMap() {
    exploreMap = new google.maps.Map(
        document.querySelector('#exploreMap'),
        {
            zoom: 4,
            center: { lat: 0, lng: 0 }
        }
    )
}
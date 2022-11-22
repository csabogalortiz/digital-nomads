let exploreMap
let markers = []
let infowindow

function initMap() {
    let params = (new URL(document.location)).searchParams
    let type = params.get('type')
    renderMap()
    getPlaces(type)
}

function getPlaces(type) {
    axios
        .get(`/api/places?type=${type}`)
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}


function setMarkers(places) {

    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        markers.push(
            new google.maps.Marker({
                map: exploreMap,
                position: { lat, lng },
                title: elm.name
            }))
    })


    markers.forEach(elm => {

        elm.addListener("click", () => {

            infowindow = new google.maps.InfoWindow({
                content: elm.title
            })

            infowindow.open({
                anchor: elm,
                map: exploreMap,
            })

            initialize()
        })
    })
}


function renderMap() {
    exploreMap = new google.maps.Map(
        document.querySelector('#exploreMap'),
        {
            zoom: 4,
            center: { lat: 0, lng: 0 }
        }
    )
}
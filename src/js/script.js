const inputText = document.querySelector(".input-text")
const inputBtn = document.querySelector(".input-btn")
const details = document.querySelectorAll(".details-item")
// starter location your location
searchIP("")

inputBtn.addEventListener("click", () => {
    console.log(inputText.value)
    searchIP(inputText.value);
    inputText.value = null
})

function searchIP(enteredIP) {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=6ceb4f9b56924867806657fd437ced6e&ip=${enteredIP}`,{ mode: "no-cors" }).then(res => res.json())
        .then((data) => {
            console.log(data)
            displayMap(data.longitude, data.latitude)
            dataList = [data.ip, data.city, `UTC ${data.time_zone.offset}:00`, data.isp.split(" ")[0]]
            displayDetailRender(dataList)
        })

}
function displayDetailRender(dataList) {
    console.log(dataList)
    let i = 0;
    details.forEach(element => {
        element.children[1].innerText = dataList[i]
        i++;
    });

}
function displayMap(lon, lat) {    
    const map = new maplibregl.Map({
        container: 'map', // container's id or the HTML element in which MapLibre GL JS will render the map
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=NUM6lvvkg7XBwD5YnmuO`, // style URL
        center: [lon, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
    });
    const marker = new maplibregl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);

}

let main = document.querySelector("#main")
let cells = document.querySelectorAll("td")

const paint = () => {
    for(let i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = (i % 2 ? "#769656": "#EEEED2")
    }
}

const adapt = () => {
    let size = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) * 0.9
    console.log(size)
    main.style.width = String(size) + "px"
    main.style.height = String(size) + "px"
    cells.forEach(element => {
        element.style.width = String(size / 9.5) + "px"
        element.style.height = String(size / 9.5) + "px"
        element.style.outlineOffset = String(-size * 0.3 / 9.5) + "px"
        element.style.outlineWidth = String(size * 0.1 / 9.5) + "px"
        element.style.outlineStyle = "inset"
    });
}

paint()
setInterval(adapt, 2000)
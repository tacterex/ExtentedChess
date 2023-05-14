const EmptyPiece = {
    type: "none",
    color: "none"
}

const is_none = (element) => {
    return element.type == "none" && element.color == "none"
}

const load_path = (element) => {
    return is_none(element) ? "" : "url('Pieces/" + element.color[0] + element.type[0] + ".png')"
}

let table = document.querySelector("table")
let cells_ = document.querySelectorAll("td")



move = "white"
selected = EmptyPiece
selected_position = {x: -1, y: -1}

const change_move = () => {
    move = (move == "white" ? "black" : "white") 
    selected = EmptyPiece
    selected_position = {x: -1, y: -1}
}


let Board = new Array(9)
for(let i = 0; i < 9; i++){
    let row = new Array(9)
    for(let j = 0; j < 9; j++){
        if(i === 0 || i === 8){
            if(j === 0 || j === 8){row[j] = {type: "rook", color: (i < 4 ? "black" : "white")}}
            if(j === 1 || j === 7){row[j] = {type: "night", color: (i < 4 ? "black" : "white")}}
            if(j === 2 || j === 6){row[j] = {type: "bishop", color: (i < 4 ? "black" : "white")}}
            if(j === 3 || j === 5){row[j] = {type: "queen", color: (i < 4 ? "black" : "white")}}
            if(j === 4){row[j] = {type: "king", color: (i < 4 ? "black" : "white")}}
        }
        else if(i === 1 || i === 7){
            row[j] = {type: "pawn", color: (i < 4 ? "black": "white")}
        }
        else{
            row[j] = EmptyPiece
        }
    }
    Board[i] = row
}

const update_board = () => {
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            cells_[9 * i + j].style.backgroundImage = load_path(Board[i][j])
            cells_[9 * i + j].style.outlineColor = "rgba(0, 0, 0, 0)"
        }
    }
}

//element.style.outlineColor = "rgba(0, 0, 0, 0.4)"


const OnClickElement = (i, j) =>{
    let res = () => {
        console.log("Clicked")
    let element = Board[i][j]
    if(cells_[9 * i + j].style.outlineColor == "rgba(0, 0, 0, 0.4)"){
        Board[i][j] = selected
        Board[selected_position.x][selected_position.y] = EmptyPiece
        change_move()
        update_board()
        return
    }

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            cells_[9 * i + j].style.outlineColor = "rgba(0, 0, 0, 0)"
        }
    }

    if(is_none(element) || move != element.color){
        selected = EmptyPiece
        selected_position = {x: -1, y: -1}
        return
    }

    selected = Board[i][j]
    selected_position = {x: i, y: j}
    if(element.type == "pawn"){
        max_ = 1
        direction = 0
        if(element.color == "white"){
            direction = -1
            if(i === 7){
                max_ = 2
            }
            else{
                max_ = 1
            }
        }
        else{
            direction = 1
            if(i === 1){
                max_ = 2
            }
            else{
                max_ = 1
            }
        }
        let x = i + direction
        while (x <= i + max_ && x >= i - max_ && is_none(Board[x][j])){
            cells_[9 * x + j].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x += direction
        }

        let possible_capture = []
        if(element.color == "white"){
            possible_capture = [{x: i - 1, y: j - 1}, {x: i - 1, y: j + 1}]
        }
        else{
            possible_capture = [{x: i + 1, y: j - 1}, {x: i + 1, y: j + 1}]
        }
        possible_capture.forEach((f) => {
            if(f.x >= 0 && f.x < 9 && f.y >= 0 && f.y <9) if(
            Board[f.x][f.y].color == (move == "white" ? "black" : "white")){
                cells_[9 * f.x + f.y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            }
        })
    }
    if(element.type == "rook"){
        let x = i + 1
        let y = j
        while (x < 9 && is_none(Board[x][j])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x++
        }
        if(x < 9) if(Board[x][j].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j
        while (x >= 0 && is_none(Board[x][j])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x--
        }
        if(x >= 0) if(Board[x][j].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i
        y = j - 1
        while (y >= 0 && is_none(Board[i][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y--
        }
        if(y >= 0) if(Board[i][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i
        y = j + 1
        while (y < 9 && is_none(Board[i][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y++
        }
        if(y < 9) if(Board[i][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
    }
    if(element.type == "night"){
        const possible = [{x: i + 2, y: j + 1}, {x: i + 1, y: j + 2},
            {x: i - 2, y: j + 1}, {x: i - 1, y: j + 2},
            {x: i + 2, y: j - 1}, {x: i + 1, y: j - 2},
            {x: i - 2, y: j - 1}, {x: i - 1, y: j - 2},]
        possible.forEach((f) => {
            if(f.x >= 0 && f.x < 9 && f.y >= 0 && f.y <9) if(
                Board[f.x][f.y].color != move){
                    cells_[9 * f.x + f.y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
                }
        })
    }
    if(element.type == "bishop"){
        let x = i + 1
        let y = j + 1
        while (x < 9 && y < 9 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x++
            y++
        }
        if(x < 9 && y < 9) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j - 1
        while (x >= 0 && y >= 0 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x--
            y--
        }
        if(x >= 0 && y >= 0) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i + 1
        y = j - 1
        while (y >= 0 && x < 9 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y--
            x++
        }
        if(y >= 0 && x < 9) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j + 1
        while (y < 9 && x >= 0 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y++
            x--
        }
        if(y < 9 && x >= 0) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
    }
    if(element.type == "queen"){
        let x = i + 1
        let y = j
        while (x < 9 && is_none(Board[x][j])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x++
        }
        if(x < 9) if(Board[x][j].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j
        while (x >= 0 && is_none(Board[x][j])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x--
        }
        if(x >= 0) if(Board[x][j].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i
        y = j - 1
        while (y >= 0 && is_none(Board[i][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y--
        }
        if(y >= 0) if(Board[i][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i
        y = j + 1
        while (y < 9 && is_none(Board[i][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y++
        }
        if(y < 9) if(Board[i][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i + 1
        y = j + 1
        while (x < 9 && y < 9 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x++
            y++
        }
        if(x < 9 && y < 9) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j - 1
        while (x >= 0 && y >= 0 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            x--
            y--
        }
        if(x >= 0 && y >= 0) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i + 1
        y = j - 1
        while (y >= 0 && x < 9 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y--
            x++
        }
        if(y >= 0 && x < 9) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
        x = i - 1
        y = j + 1
        while (y < 9 && x >= 0 && is_none(Board[x][y])){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
            y++
            x--
        }
        if(y < 9 && x >= 0) if(Board[x][y].color == move){
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0)" 
        }
        else{
            cells_[9 * x + y].style.outlineColor = "rgba(0, 0, 0, 0.4)"
        }
    }

    }
    return res
}

update_board()
for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        cells_[9 * i + j].onclick = OnClickElement(i, j)
        cells_[9 * i + j].style.outlineColor = "rgba(0, 0, 0, 0)"
    }
}
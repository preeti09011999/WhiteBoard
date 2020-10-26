let isPenDown = false;
let undoArr = [];
let redoArr = [];
// press mouse -> event listener
board.addEventListener("mousedown",function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y)-top;
    ctx.moveTo(x, y);
    isPenDown = true;
    let mdn = {
        x,
        y,
        id:"md",
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    undoArr.push(mdn);
    // point => realtime draw
    socket.emit("md",mdn);
})

// on move
board.addEventListener('mousemove',function(e){
    if(isPenDown){
        // line to
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y)-top;
        ctx.lineTo(x,y);
        // stroke
        ctx.stroke();
        let mmp = {
            x,
            y,
            id:"mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(mmp);
        // point => realtime draw
        socket.emit("mm",mmp);
    }
})
// close path
board.addEventListener('mouseup',function(e){
    // ctx.closePath();
    isPenDown = false;
})

function getLocation() {
    let {top} = board.getBoundingClientRect();
    return top;
}

// undo 
function undoLast(){
    // pop the last the point
    if(undoArr.length >= 2){
        let tempArr = [];
        for(let i=undoArr.length-1;i>=0;i--){
            let {id} = undoArr[i];
            if(id == "md"){
                tempArr.unshift(undoArr.pop());
                break;
            }else{
                tempArr.unshift(undoArr.pop());
            }
        }
        redoArr.push(tempArr);
        // clear the canvas
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}
function redraw(){
    
    for(let i=0;i<undoArr.length;i++){
        let {x, y, id, color, width} = undoArr[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if(id == "md"){
            ctx.beginPath();
            ctx.moveTo(x, y);
        }else if(id == "mm"){
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    
}

// redo
function redoLast() {
    if(redoArr.length > 0){
        let undoPath = redoArr.pop();   
        for(let i=0;i<undoPath.length;i++){
            undoArr.push(undoPath[i]);
        }
        // clear canvas
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}
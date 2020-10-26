function createBox() {
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    let closeIcon = document.createElement("i");
    let minimizeIcon = document.createElement("i");

    // add classes
    stickyPad.setAttribute("class","stickyPad");
    navBar.setAttribute("class","nav-bar");
    close.setAttribute("class","close");
    minimize.setAttribute("class","minimize");
    textbox.setAttribute("class","textbox");
    closeIcon.setAttribute("class","fa fa-close");
    minimizeIcon.setAttribute("class","fa fa-window-minimize");

    // create subtree -> DOM Object
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(close);
    navBar.appendChild(minimize);
    close.appendChild(closeIcon);
    minimize.appendChild(minimizeIcon);
    // add subtree to page
    document.body.appendChild(stickyPad);

    // move
    let initialX = null;
    let initialY = null;
    isStickyDown = false;
    navBar.addEventListener("mousedown",function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    
    navBar.addEventListener("mousemove",function (e) {
        if(isStickyDown == true){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dX = finalX - initialX;
            let dY = finalY - initialY;
            let {top, left} = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dY + "px";
            stickyPad.style.left = left + dX + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })

    navBar.addEventListener("mouseup",function(e){
        isStickyDown = false;
    })
    navBar.addEventListener("mouseleave",function(e){
        isStickyDown = false;
    })
    // close
    close.addEventListener("click",function(){
        stickyPad.remove();
    })
    //minimize
    let isOpen = true;
    minimize.addEventListener("click",function(){
        if(isOpen){
            textbox.style.display = "none";
        }else{
            textbox.style.display = "block";
        }
        isOpen = !isOpen;
    })
    return textbox;
}
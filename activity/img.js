let imgInput = document.querySelector("#acceptImg");
function uploadFile() { 
        // dialog box
        imgInput.click();
    imgInput.addEventListener("change",function(){
        let imgObj = imgInput.files[0]; // this will give me first image from the image array
        // create a random URL for this given url
        let imgLink = URL.createObjectURL(imgObj);
        let img = document.createElement("img");
        img.setAttribute("class","upload-img");
        img.src = imgLink;
        document.body.appendChild(img);
        let textbox = createBox();
        textbox.appendChild(img);
    })
}

function downloadBoard() {
    // create an anchor
    let a = document.createElement("a");
    // set filename to it's download attribute
    a.download = "file.png";
    // convert board to url
    let url = board.toDataURL("image/png;base64");
    // set as href of anchor
    a.href = url;
    // click the anchor
    a.click();
    // reload behaviour doesnot get triggered
    a.remove();
}
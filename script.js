const fileInput = document.getElementById("image-input");
const imageArea = document.getElementById("image-area");
const previewImage = document.getElementById("preview-image");
const placeholder = document.querySelector(".placeholder");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const blur = document.getElementById("blur");
const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const hue = document.getElementById("hue");
const invert = document.getElementById("invert");

const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");

const rotateLeft = document.getElementById("rotate-left");
const rotateRight = document.getElementById("rotate-right");
const flipH = document.getElementById("flip-h");
const flipV = document.getElementById("flip-v");

const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");

const compareBtn = document.getElementById("compare-btn");
const autoEdit = document.getElementById("auto-edit");

let rotate = 0;
let flipHVal = 1;
let flipVVal = 1;
let zoom = 1;



imageArea.onclick = () => fileInput.click();



fileInput.addEventListener("change", () => {

let file = fileInput.files[0];
if(!file) return;

let reader = new FileReader();

reader.onload = () => {

previewImage.src = reader.result;
previewImage.style.display="block";
placeholder.style.display="none";

}

reader.readAsDataURL(file);

});



function applyFilters(){

previewImage.style.filter =

`brightness(${brightness.value}%)
contrast(${contrast.value}%)
saturate(${saturation.value}%)
blur(${blur.value}px)
grayscale(${grayscale.value}%)
sepia(${sepia.value}%)
hue-rotate(${hue.value}deg)
invert(${invert.value}%)`;

previewImage.style.transform =

`rotate(${rotate}deg)
scale(${flipHVal*zoom},${flipVVal*zoom})`;

}



document.querySelectorAll("input").forEach(slider=>{
slider.addEventListener("input",applyFilters)
});



rotateLeft.onclick=()=>{rotate-=90;applyFilters();}
rotateRight.onclick=()=>{rotate+=90;applyFilters();}

flipH.onclick=()=>{flipHVal*=-1;applyFilters();}
flipV.onclick=()=>{flipVVal*=-1;applyFilters();}

zoomIn.onclick=()=>{zoom+=0.1;applyFilters();}
zoomOut.onclick=()=>{zoom-=0.1;applyFilters();}



autoEdit.onclick=()=>{

brightness.value=120
contrast.value=130
saturation.value=120
sepia.value=10

applyFilters()

}



resetBtn.onclick=()=>{

brightness.value=100
contrast.value=100
saturation.value=100
blur.value=0
grayscale.value=0
sepia.value=0
hue.value=0
invert.value=0

rotate=0
flipHVal=1
flipVVal=1
zoom=1

applyFilters()

}



/* PRESETS */

document.querySelectorAll(".preset").forEach(btn=>{

btn.onclick=()=>{

let type=btn.dataset.filter

if(type==="vintage"){
sepia.value=40
contrast.value=120
}

if(type==="warm"){
sepia.value=20
saturation.value=130
}

if(type==="cool"){
hue.value=180
saturation.value=110
}

if(type==="dramatic"){
contrast.value=160
}

if(type==="bw"){
grayscale.value=100
}

applyFilters()

}

})



compareBtn.onmousedown=()=>previewImage.style.filter="none"
compareBtn.onmouseup=()=>applyFilters()



downloadBtn.onclick=()=>{

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=previewImage.naturalWidth
canvas.height=previewImage.naturalHeight

ctx.filter=previewImage.style.filter

ctx.translate(canvas.width/2,canvas.height/2)
ctx.rotate(rotate*Math.PI/180)
ctx.scale(flipHVal,flipVVal)

ctx.drawImage(
previewImage,
-previewImage.naturalWidth/2,
-previewImage.naturalHeight/2
)

let link=document.createElement("a")
link.download="edited-image.png"
link.href=canvas.toDataURL()

link.click()

}

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
document.body.classList.toggle("light");
});

let cropper;
const image = document.getElementById("preview-image");

const startCrop = document.getElementById("crop-start");
const applyCrop = document.getElementById("crop-apply");

startCrop.addEventListener("click", () => {

if(cropper){
cropper.destroy();
}

cropper = new Cropper(image, {
aspectRatio: NaN,
viewMode: 1,
movable: true,
zoomable: true,
scalable: true,
rotatable: true
});

});

applyCrop.addEventListener("click", () => {

if(!cropper) return;

const canvas = cropper.getCroppedCanvas();

image.src = canvas.toDataURL();

cropper.destroy();
cropper = null;

});
////////////////////////////////////////////////////////////////////////////////
// Panolens
////////////////////////////////////////////////////////////////////////////////

let panorama, viewer, container, panel;

container = document.querySelector('#pano-container');

// panorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');
panorama = new PANOLENS.ImagePanorama('img/eso0932a.jpg');

viewer = new PANOLENS.Viewer({
  container: container,
  autoRotate: true,
  autoRotateSpeed: 0.2,
  autoRotateActivationDuration: 1,
  horizontalView: true,
  cameraFov: 80,
  controlBar: false
});
viewer.OrbitControls.noZoom = true;
viewer.OrbitControls.noRotate = true;

viewer.add(panorama);

////////////////////////////////////////////////////////////////////////////////
// Typing animation
////////////////////////////////////////////////////////////////////////////////

let i = 0;
let text_01 = "Afdzal was not The Impostor.";
let typingSpeed = 150;

const typing = () => {
  if(i < text_01.length) {
    document.getElementById("type-28").innerHTML += text_01.charAt(i);
    i++;
    setTimeout(typing, typingSpeed);
  }
} 

////////////////////////////////////////////////////////////////////////////////
// Run function at specific css animation keyframe
////////////////////////////////////////////////////////////////////////////////

const fn_runAtKeyframe = (DOMElement, keyframe, callback) => {
  const animationDuration = window.getComputedStyle(DOMElement).animationDuration;
  // animationDuration returns string, e.g. "5s" or "500ms", so need to parseInt()
  // if it is in seconds, change it to milliseconds
  let animationKeyframe 
  if (animationDuration.replace(/[0-9]/g, '') === "s") {
    animationKeyframe = parseInt(animationDuration) * keyframe * 1000
  } else {
    animationKeyframe = parseInt(animationDuration) * keyframe
  }

  const doStuff = (e) => {
    setTimeout(() => {
      console.log(`Function "${callback.name}" is running at ${keyframe*100}% keyframe`)
      callback();
    }, animationKeyframe)
  }
  DOMElement.addEventListener("animationiteration", doStuff); 
}

const DOMElement = document.querySelector("#impostor")
const keyframe = 0.5
fn_runAtKeyframe(DOMElement, keyframe, typing)
// fn_runAtKeyframe(DOMElement, 0, () => {
//   document.getElementById("type-28").innerHTML = "";
// })


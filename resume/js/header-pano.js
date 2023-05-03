////////////////////////////////////////////////////////////////////////////////
// Panolens
////////////////////////////////////////////////////////////////////////////////

let panorama, viewer, container;

container = document.querySelector('#header-pano');

// panorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');
panorama = new PANOLENS.ImagePanorama('img/eso0932a.jpg');

viewer = new PANOLENS.Viewer({
  container: container,
  autoRotate: true,
  autoRotateSpeed: 0.2,
  autoRotateActivationDuration: 1,
  horizontalView: true,
  cameraFov: 60,
  controlBar: false
});
viewer.OrbitControls.noZoom = true;
viewer.OrbitControls.noRotate = true;

viewer.add(panorama);

////////////////////////////////////////////////////////////////////////////////
// Function to run callback at specific css animation keyframe
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

////////////////////////////////////////////////////////////////////////////////
// Impostor animation
////////////////////////////////////////////////////////////////////////////////

const DOMElement = document.querySelector("#impostor")
const keyframe = 0.5
fn_runAtKeyframe(DOMElement, keyframe, typing)
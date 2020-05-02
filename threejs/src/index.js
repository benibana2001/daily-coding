const THREE = require("three");

const scene = new THREE.Scene();

const windowSize = {
  w: window.innerWidth,
  h: window.innerHeight,
};

const cameraOptions = {
  fieldOfView: 75,
  aspectRatio: windowSize.w / windowSize.h,
  clippingPlane: [0.1, 1000],
};

const camera = new THREE.PerspectiveCamera(
    cameraOptions.fieldOfView,
    cameraOptions.aspectRatio,
    ...cameraOptions.clippingPlane
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowSize.w, windowSize.h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animate();

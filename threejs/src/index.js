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

const box = {
  w: 1,
  h: 1,
  depth: 1,
};

const geometry = new THREE.BoxGeometry(box.w, box.h, box.depth);
const simpleCube = makeCube(scene);
const cubes = [
  simpleCube(geometry, 0x44aa88, -1),
  simpleCube(geometry, 0x8844aa, 1),
];

const lightOptions = {
  color: 0xffffff,
  intensity: 1,
};

const light = new THREE.DirectionalLight(
  lightOptions.color,
  lightOptions.intensity
);
light.position.set(-1, 2, 4);

scene.add(light);
camera.position.z = 8;

let rot = 0;
const animate = function () {
  rot += 0.01;

  cubes.forEach((cube) => {
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

//
function makeCube(scene) {
  return (geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  };
}

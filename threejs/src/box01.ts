import {
  Mesh,
  MeshPhongMaterial,
  Scene,
  BoxGeometry,
  PerspectiveCamera,
  DirectionalLight,
} from "three";

const box01 = (renderer: THREE.WebGLRenderer) => {
  const scene = new Scene();
  const box = {
    w: 1,
    h: 1,
    depth: 1,
  };

  const boxGeometry = new BoxGeometry(box.w, box.h, box.depth);
  const simpleCube = makeCube(scene);
  const cubes = [simpleCube(boxGeometry, 0x8844aa, 1)];

  const light = createLight();

  light.position.set(-1, 2, 4);

  scene.add(light);
  const camera = createCamera();
  camera.position.z = 8;
  let rot = 0;

  // renderを実行
  animate();

  function animate() {
    rot += 0.01;

    cubes.forEach((cube) => {
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
};

//
function makeCube(scene: THREE.Scene) {
  return (geometry: THREE.Geometry, color: THREE.Colors, x: number) => {
    const material = new MeshPhongMaterial({ color });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  };
}

function createCamera() {
  const windowSize = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  const cameraOptions = {
    fieldOfView: 75,
    aspectRatio: windowSize.w / windowSize.h,
    clippingPlane: [0.1, 1000],
  };

  const camera = new PerspectiveCamera(
    cameraOptions.fieldOfView,
    cameraOptions.aspectRatio,
    ...cameraOptions.clippingPlane
  );

  return camera;
}

function createLight() {
  const lightOptions = {
    color: 0xffffff,
    intensity: 1,
  };

  const light = new DirectionalLight(
    lightOptions.color,
    lightOptions.intensity
  );

  return light;
}

export default box01;

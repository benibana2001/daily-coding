import * as THREE from "three";

function main() {
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const objects = [];

  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 50);

  const color = 0x000000;
  const intensity = 3;
  const light = new THREE.PointLight(color, intensity);
  light.position.set(0, 0, 0);
  scene.add(light);

  const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 15, 25, 25);
  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    // blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  scene.add(cylinderMesh);
  objects.push(cylinderMesh);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
  }

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    objects.forEach((obj) => {
    //   obj.rotation.y = time;
      renderer.render(scene, camera);
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

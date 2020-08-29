import * as THREE from "three";

function main() {
  // set renderer
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  // set camera
  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120;

  // set scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  const objects = [];
  const spread = 15;

  // add light
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  {
    const boxWidth = 30;
    const boxHeight = 30;
    const boxDepth = 30;
    addSolidGeometry(
      0,
      0,
      new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth)
    );
  }

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    //  This tells three to draw both sides of the triangles that make up a shape.
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function animate() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.x += 0.01;
      obj.rotation.y += 0.01;
      renderer.render(scene, camera);
    });
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

main();

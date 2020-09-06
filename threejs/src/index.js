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
    const boxWidth = 8;
    const boxHeight = 8;
    const boxDepth = 8;
    addSolidGeometry(
      -2,
      2,
      new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth)
    );
  }
  {
    const radius = 7;
    const segments = 24;
    addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(radius, segments));
  }
  {
    const radius = 6;
    const height = 8;
    const segments = 16;
    addSolidGeometry(
      0,
      2,
      new THREE.ConeBufferGeometry(radius, height, segments)
    );
  }
  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    addSolidGeometry(
      1,
      2,
      new THREE.CylinderBufferGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments
      )
    );
  }
  //   正十二面体
  {
    const radius = 7;
    addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(radius));
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };

    addSolidGeometry(
      -2,
      1,
      new THREE.ExtrudeBufferGeometry(shape, extrudeSettings)
    );
  }
  //   正二十面体
  {
    const radius = 7;
    addSolidGeometry(-1, 1, new THREE.IcosahedronBufferGeometry(radius));
  }
  //   A shape generated by spinning a line.
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
    }
    addSolidGeometry(0, 1, new THREE.LatheBufferGeometry(points));
  }
  //   正八面体
  {
    const radius = 7;
    addSolidGeometry(1, 1, new THREE.OctahedronBufferGeometry(radius));
  }
  {
    const width = 9;
    const height = 9;
    const widthSegments = 2;
    const heightSegments = 2;
    addSolidGeometry(
      -2,
      0,
      new THREE.PlaneBufferGeometry(
        width,
        height,
        widthSegments,
        heightSegments
      )
    );
  }
  //   Takes a set of triangles centered around a point and projects them onto a sphere
  {
    const verticesOfCube = [
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      1,
      1,
      -1,
      1,
      1,
    ];
    const indicesOfFaces = [
      2,
      1,
      0,
      0,
      3,
      2,
      0,
      4,
      7,
      7,
      3,
      0,
      0,
      1,
      5,
      5,
      4,
      0,
      1,
      2,
      6,
      6,
      5,
      1,
      2,
      3,
      7,
      7,
      6,
      2,
      4,
      5,
      6,
      6,
      7,
      4,
    ];
    const radius = 7;
    const detail = 2;
    addSolidGeometry(
      -1,
      0,
      new THREE.PolyhedronBufferGeometry(
        verticesOfCube,
        indicesOfFaces,
        radius,
        detail
      )
    );
  }
  {
    const innerRadius = 2;
    const outerRadius = 7;
    const segments = 18;
    addSolidGeometry(
      0,
      0,
      new THREE.RingBufferGeometry(innerRadius, outerRadius, segments)
    );
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    addSolidGeometry(1, 0, new THREE.ShapeBufferGeometry(shape));
  }
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    addSolidGeometry(
      2,
      0,
      new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments)
    );
  }
  //   正四面体
  {
    const radius = 7;
    addSolidGeometry(-2, -1, new THREE.TetrahedronBufferGeometry(radius));
  }
  {
    const radius = 5;
    const tubeRadius = 2;
    const radialSegments = 8;
    const tubularSegments = 24;
    addSolidGeometry(
      0,
      -1,
      new THREE.TorusBufferGeometry(
        radius,
        tubeRadius,
        radialSegments,
        tubularSegments
      )
    );
  }
  {
    const radius = 3.5;
    const tube = 0.5;
    const radialSegments = 8;
    const tubularSegments = 64;
    const p = 5;
    const q = 3;
    addSolidGeometry(
      1,
      -1,
      new THREE.TorusKnotBufferGeometry(
        radius,
        tube,
        tubularSegments,
        radialSegments,
        p,
        q
      )
    );
  }
  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }
  {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    addSolidGeometry(
      2,
      -1,
      new THREE.TubeBufferGeometry(
        path,
        tubularSegments,
        radius,
        radialSegments,
        closed
      )
    );
  }
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    const thresholdAngle = 15;
    addLineGeometry(
      -1,
      -2,
      new THREE.EdgesGeometry(
        new THREE.BoxBufferGeometry(width, height, depth),
        thresholdAngle
      )
    );
  }
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    addLineGeometry(
      1,
      -2,
      new THREE.WireframeGeometry(
        new THREE.BoxBufferGeometry(width, height, depth)
      )
    );
  }
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    const geometry = new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const material = new THREE.PointsMaterial({
      color: "red",
      sizeAttenuation: false,
      size: 10, 
    });
    const points = new THREE.Points(geometry, material);
    addObject(0, -2, points);
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

  function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.LineSegments(geometry, material);
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

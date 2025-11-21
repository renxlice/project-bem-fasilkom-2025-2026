import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import AssetEys from '../assets/vw.gif'
import AssetTarget from "../assets/target.gif"
import Hero from "../Components/Hero";
import Anggota from "../Components/AngotaList";

function Cloud(canvas) {
  const canvas2 = canvas
  let ambientLight = new THREE.AmbientLight(0xffffff, 2);
  const scenecloud = new THREE.Scene();
  const textureLoaders = new THREE.TextureLoader();
  const cameracloud = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const bgCloud = textureLoaders.load('/bg4.png')
  const renderercloud = new THREE.WebGLRenderer({
    canvas: canvas2,
    antialias: true
  });

  renderercloud.setSize(window.innerWidth, window.innerHeight);

  const mtlLoader = new MTLLoader();
  let plane = null;

  mtlLoader.load('/pesawat.mtl', function (materials) {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('/pesawat.obj', function (object) {
      object.scale.set(0.03, 0.02, 0.03);
      object.position.set(0, -5, 30);
      object.rotation.y = Math.PI;
      object.rotation.x = Math.PI / 2;
      object.rotation.z = Math.PI / 2;
      plane = object;
      scenecloud.add(plane);
      renderercloud.render(scenecloud, cameracloud);
    });
  });

  scenecloud.background = bgCloud;
  scenecloud.opacity = 0.2;
  scenecloud.add(ambientLight);

  let pointLight = new THREE.PointLight(0xffffff, 0, 0);
  pointLight.position.set(5, 5, 5);
  scenecloud.add(pointLight);

  const textureLoader = new THREE.TextureLoader();
  const cloudTexture = textureLoader.load('/cloud2.png', () => {
    renderercloud.render(scenecloud, cameracloud);
  });

  const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 10
  });

  scenecloud.traverse((object) => {
    if (object.isMesh && object.material) {
      object.material.opacity = 0.2;
      object.material.transparent = true;
    }
  });

  function createCloud() {
    const cloudGroup = new THREE.Group();
    const sphereGeometry2 = new THREE.SphereGeometry(2, 18, 18);

    for (let i = 0; i < 30; i++) {
      const cloudMesh = new THREE.Mesh(sphereGeometry2, cloudMaterial);
      cloudMesh.position.set(
        Math.random() * 5 - 2.5,
        Math.random() * 3 - 2.5,
        Math.random() * 2 - 8
      );
      const scale = Math.random() * 2 + 2;
      cloudMesh.scale.set(scale, scale, scale);
      cloudGroup.add(cloudMesh);
    }
    return cloudGroup;
  }

  const cloud1 = createCloud();
  const cloud2 = createCloud();
  const cloud3 = createCloud();
  const cloud4 = createCloud();
  const cloud5 = createCloud();
  const cloud6 = createCloud();

  cloud1.position.set(-12, 4, 10);
  cloud2.position.set(-1, 3, 10);
  cloud3.position.set(11, 2, 10);
  cloud4.position.set(-8, 1, 10);
  cloud5.position.set(-9, 5, 10);
  cloud6.position.set(5, 6, 10);

  scenecloud.add(cloud1);
  scenecloud.add(cloud2);
  scenecloud.add(cloud3);
  scenecloud.add(cloud4);
  scenecloud.add(cloud5);
  scenecloud.add(cloud6);

  cameracloud.position.z = 35;

  window.addEventListener('resize', () => {
    cameracloud.aspect = window.innerWidth / window.innerHeight;
    cameracloud.updateProjectionMatrix();
    renderercloud.setSize(window.innerWidth, window.innerHeight);
  });

  let cameraSpeed = 0.4;
  let resetPositionZ = -200;
  let initialPositionZ = cameracloud.position.z;

  function animatecloud(time) {
    requestAnimationFrame(animatecloud);
    if (plane) {
      let easedSpeed = easeInOutQuad(cameraSpeed);
      plane.rotation.y += 0.007;
      plane.position.z -= easedSpeed;

      if (plane.position.z < resetPositionZ) {
        plane.position.z = initialPositionZ;
      }
    }

    renderercloud.render(scenecloud, cameracloud);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  animatecloud();
}
function Members(canvas) {
  const members = canvas
  const scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer({
    canvas: members,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pointLight = new THREE.PointLight(0xffffff, 21, 10);
  pointLight.position.set(0, -105, 95);
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    fog: true
  });
  const starCount = 10000;
  const positions = [];
  const starColors = [];
  const color = new THREE.Color();
  for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.3) * 900);
    positions.push((Math.random() - 0.3) * 900);
    positions.push((Math.random() - 0.3) * 900);
    color.setHSL(Math.random(), 10, 0.3);
    starColors.push(color.r, color.g, color.b);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  renderer = new THREE.WebGLRenderer({ canvas: members, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 5, -1);
  RectAreaLightUniformsLib.init();
  const rectLight1 = new THREE.RectAreaLight('#793FDF', 8, 2, 11);
  rectLight1.position.set(- 3.2, 5, 5);
  scene.add(rectLight1);
  const rectLight2 = new THREE.RectAreaLight('#6499E9', 8, 2, 11);
  rectLight2.position.set(0, 5, 5);
  scene.add(rectLight2);
  const rectLight3 = new THREE.RectAreaLight("#FEF9D9", 8, 2, 11);
  rectLight3.position.set(3.2, 5, 5);
  scene.add(rectLight3);
  scene.add(pointLight);
  scene.add(new RectAreaLightHelper(rectLight1));
  scene.add(new RectAreaLightHelper(rectLight2));
  scene.add(new RectAreaLightHelper(rectLight3));
  const geoFloor = new THREE.BoxGeometry(20000, 0.1, 2000);
  const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 0.9, metalness: 1 });
  const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
  scene.add(mshStdFloor);
  const geoKnot = new THREE.TorusKnotGeometry(0, 0, 0, 0);
  const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
  const meshKnot = new THREE.Mesh(geoKnot, matKnot);
  meshKnot.position.set(0, 5, 0);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.target.copy(meshKnot.position);
  controls.update();
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stars.rotation.y += 0.001;
    stars.rotation.x += 0.001;
    stars.rotation.z += 0.001;

  }
  animate();

}
export default function About() {
  const CloudCanvas = useRef(null);
  const MemebersCanvas = useRef(null);
  useEffect(() => {
    Cloud(CloudCanvas.current)
    Members(MemebersCanvas.current)
  });


  return (
    <MainLayout>
      <Hero />
      <section className="d-flex flex-column sectionabout">
        <canvas id="cloudCanvas" className="canvas" ref={CloudCanvas}></canvas>
        <div className="aboutsection">
          <div className="container">
            <div className="row d-flex flex-row ">
              <div className="col-4 d-flex justify-content-center align-items-center align-content-center flex-column">
                <img srcSet="/logo_fasilkom.png" alt="" />
              </div>
              <div className="col-8 d-flex justify-content-center align-items-center align-content-center">
                <p>
                  Kabinet <i>VERITAS STATERA</i> Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Mercu Buana 2024/2025 berfokus pada nilai kebenaran (Veritas) dan keseimbangan (Statera). Kami berkomitmen menjadi wadah aspirasi mahasiswa serta mendorong sinergi positif dalam teknologi, akademik, dan pengembangan karakter. Melalui program inovatif dan kegiatan sosial, kami percaya bahwa keseimbangan ilmu pengetahuan dan kepedulian sosial adalah kunci untuk membentuk mahasiswa yang kompeten dan berdaya saing, serta memperjuangkan hak-hak mereka dalam kegiatan akademis maupun non-akademis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex p-4" id="vision" style={{ backgroundImage: `url('/bg2.png')` }} >
          <div className="col-12 p-4 d-flex align-items-center justify-content-center">
            <img srcSet={AssetEys} alt="" />
            <div className="card visicard w-60 mb-3 p-4 ">
              <div className="card-body">
                <h5 className="card-title">Visi</h5>
                <p className="card-text">Mewujudkan BEM Fasilkom Sebagai wadah mahasiswa untuk berkarya dan
                  berperan pemanfaatan teknologi informasi, serta berkolaborasi secara
                  inklusif untuk mewadahi mahasiswa</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="card visicard w-60 mb-3 p-4">
              <div className="card-body">
                <h5 className="card-title">Misi</h5>
                <p className="card-text">
                  Kami berkomitmen untuk meningkatkan kesejahteraan mahasiswa serta responsif terhadap isu-isu teknologi dan sosial. Membangun serta menjalin hubungan harmonis dan kolaborasi yang baik dijalin dengan seluruh organisasi mahasiswa, baik di dalam Universitas Mercu Buana maupun di luar kampus. Selain itu, kami secara aktif melaksanakan penelitian, menyebarkan ilmu pengetahuan dan teknologi,
                  serta melakukan pengabdian kepada masyarakat untuk membantu meningkatkan taraf hidup mereka. Kami juga berfokus pada peningkatan pemahaman mahasiswa tentang pentingnya pengembangan intelektual yang kritis sebagai upaya untuk meningkatkan kualitas Fakultas Ilmu Komputer.
                </p>
              </div>
            </div>
            <img srcSet={AssetTarget} alt="" />
          </div>
        </div>
        <div className="members d-flex">
          <canvas id="members" ref={MemebersCanvas}>
          </canvas>
          <div className="swiper mySwiper members-list">
          <Anggota/>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
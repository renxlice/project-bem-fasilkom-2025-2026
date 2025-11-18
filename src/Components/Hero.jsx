import React,{useEffect,useRef,useState} from "react"
import LogoFasilkom from '../assets/logo_fasilkom.png'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import BgHero from '../assets/bg2.png'
import Globe from'../assets/globe.png'
import Globe2 from'../assets/globe3.png'
import { useLocation } from 'react-router-dom';
export default function Hero(){
    const location = useLocation();
    const canvasRef = useRef(null);
    const aboutRef=useRef(null)
useEffect(() => {
  if (location.pathname !== '/' && location.pathname !== '/login') return;
        const canvas=canvasRef.current;
  if (!canvas) {
    console.warn("❗ Canvas belum tersedia");
    return;
  }
        const renderer=new THREE.WebGLRenderer({ canvas });
        const scene= new THREE.Scene()
        const bgTexture = new THREE.TextureLoader().load(BgHero);
        const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1000);
        const sphereGeometry = new THREE.SphereGeometry(2.8, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(Globe);
        renderer.setSize(window.innerWidth, window.innerHeight);
        scene.background = bgTexture;
        camera.position.z = 11;
      const sphereMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: 0xffffff,
        emissiveIntensity: 0,
        shininess: 900,
      });
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(0, 0.0, 0);
      scene.add(sphere);
      const ringGeometry = new THREE.TorusGeometry(5.2, 0.03, 100, 100);
      const colors = [];
      const totalVertices = ringGeometry.attributes.position.count;
      for (let i = 0; i < totalVertices; i++) {
        const angle = Math.atan2(
          ringGeometry.attributes.position.getY(i),
          ringGeometry.attributes.position.getX(i)
        );
        if (angle > 0) {
          colors.push(1, 0.992, 0.720);
        } else {
          colors.push(0.5, 0, 0.5);
        }
      }
      ringGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const ringMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 1.67;
      ring.rotation.y = Math.PI / -1.1;
      ring.position.set(0, 0.8, 0);
      scene.add(ring);
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1, 0);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        fog: true
      });
      const starCount = 8000;
      const positions = [];
      const starColors = [];
      const color = new THREE.Color();
      for (let i = 0; i < starCount; i++) {
        positions.push((Math.random() - 0.5) * 900);
        positions.push((Math.random() - 0.5) * 900);
        positions.push((Math.random() - 0.5) * 900);
        color.setHSL(Math.random(), 10, 0.8);
        starColors.push(color.r, color.g, color.b);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      const fontLoader = new FontLoader();
      fontLoader.load('/font2.json', (font) => {
        const textGeometryBEM = new TextGeometry('B E M', {
          font: font,
          size: 0.6,
          depth: 0,
        });
        const textMaterialBEM = new THREE.MeshStandardMaterial({
          color: '#000000',
          metalness: 0,
          roughness: 0,
          emissive: '#000000',
          emissiveIntensity: 1,
        });
        const textMeshBEM = new THREE.Mesh(textGeometryBEM, textMaterialBEM);
        textMeshBEM.position.set(2.9, 1.18, 1.2);
        scene.add(textMeshBEM);
        const textGeometryMercu = new TextGeometry('Universitas Mercu Buana', {
          font: font,
          size: 0.25,
          depth: 0,
        });
        const textMaterialMercu = new THREE.MeshStandardMaterial({
          color: '#780C28',
          metalness: 0,
          roughness: 0,
          emissive: '#780C28',
          emissiveIntensity: 1,
        });
        const textMeshMercu = new THREE.Mesh(textGeometryMercu, textMaterialMercu);
        textMeshMercu.position.set(-1.40, -0.54, 6.2);
        scene.add(textMeshMercu);
        const text = 'FASILKOM';
        const letterSpacing = 0.2;
        let currentX = -1.5;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const textGeometryFASILKOM = new TextGeometry(char, {
            font: font,
            size: 0.45,
            depth: 0,
          });
          textGeometryFASILKOM.computeBoundingBox();
          const textMaterialFASILKOM = new THREE.MeshStandardMaterial({
            color: '#F9E400',
            metalness: 0,
            roughness: 0,
            emissive: '#F9E400',
            emissiveIntensity: 4,
          });
          const textMeshFASILKOM = new THREE.Mesh(textGeometryFASILKOM, textMaterialFASILKOM);
          textMeshFASILKOM.position.set(currentX, -0.2, 6.2);
          if (textGeometryFASILKOM.boundingBox) {
            const charWidth = textGeometryFASILKOM.boundingBox.max.x - textGeometryFASILKOM.boundingBox.min.x;
            currentX += charWidth + letterSpacing;
          }
          scene.add(textMeshFASILKOM);
        }
      });
      camera.position.z = 11;
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.enableZoom  = false; 
      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        ring.rotation.z += 0.02;
        stars.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
      const textureTimeout = setTimeout(() => {
        const texture = textureLoader.load(Globe2);
        const textureMaterial = new THREE.MeshPhongMaterial({ map: texture });
        sphere.material = textureMaterial;
      }, 10000);
      window.addEventListener('resize', onWindowResize);
      return () => {
        clearTimeout(textureTimeout);
        window.removeEventListener('resize', onWindowResize);
        renderer.dispose();
      };
   }, [location.pathname]);

    return(
    <>
     {location.pathname === '/' ||location.pathname === '/login' && (
    <div className="hero d-flex flex-column ">
        <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
    )}
    {location.pathname === '/About' && (
    <div className="row abouthero d-flex flex-row align-items-center align-content-center justify-content-bettwen" style={{ backgroundImage: `url('/bg2.png')` }} ref={aboutRef}>
        <div className="col d-flex flex-column p-5 text-white hero-text">
            <h4>Kolaborasi & Inovasi Menuju Prestasi!</h4>
            <h5>Badan Esekutif Mahasiswa Fakultas Ilmu Komputer</h5>
            <h5>Universitas Mercu Buana 2024/2025</h5>
        </div>
        <div className="col d-flex">
            <img  alt="" srcSet={LogoFasilkom}/>
        </div>
    </div>
    )}
    </>
    );
}
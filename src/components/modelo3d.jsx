import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "../styles/estilos3dComponent.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);

  const urlModel = "./modelos3D/chozita.gltf";
  useEffect(() => {
    let scene, camera, renderer, model, controls;
    // CREACIÓN DE LA ESCENA ====================================
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd4d4d4);

    // CREACIÓN DE LA CÁMARA ===================================
    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.5,
      1000
    );
    camera.position.set(0, 12, 13);

    // CREACIÓN DEL RENDERIZADOR ================================
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // CREACIÓN DE LUCES =======================================
    const luz = new THREE.DirectionalLight(0xffffff, 3, 10);
    luz.position.set(-4, 9, 5);
    luz.castShadow = true;
    scene.add(luz);

    // CREACIÓN DE CONTROLES ===================================
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.update();

    // CARGA DEL MODELO 3D =====================================
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(urlModel, (gltf) => {
      model = gltf.scene;
      model.castShadow = true;
      model.scale.set(1, 1, 1);
      model.position.set(0, 1, 0);
      const rotationRadians = Math.PI / -6;
      model.rotation.x = rotationRadians;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      // Animación del modelo
      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.001;
        renderer.render(scene, camera);
      };
      animate();
      scene.add(model);
      modelRef.current = model;
    });

    // Actualización de escala del modelo basado en el tamaño del viewport
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        const scaleFactor = containerRef.current.clientWidth/ containerRef.current.clientWidth; // Ajustar según tus necesidades
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      }
      
      renderer.render(scene, camera);
    };
    animate();


    // CREACIÓN DE LUZ AMBIENTE ==================================
    const ambientLight = new THREE.AmbientLight(0xe3e3e3, 1, 10);
    scene.add(ambientLight);

    // Función de redimensionamiento
    const handleResize = () => {
      const scaleSum = containerRef.current.clientWidth;

      const width = containerRef.current.clientWidth + scaleSum;
      const height = containerRef.current.clientWidth + 100;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      if (
        containerRef.current &&
        containerRef.current.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return(
      <div className="three-padre-conteiner">
      
        <div className="three-container" ref={containerRef} />
      </div>
  ) 
};

export default ThreeScene;

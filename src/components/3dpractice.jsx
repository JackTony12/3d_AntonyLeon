import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {AiOutlineDownload} from 'react-icons/ai'
import {BiLogoBlender} from 'react-icons/bi'
import {LuRotate3D} from 'react-icons/lu'
import '../styles/estilos3dComponent.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const ModeloCard = ({modelo}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, model, controls;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE3E3E3);

    camera = new THREE.PerspectiveCamera(30, 1, 0.5, 1000);
    camera.position.set(0, 1, 13);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(200,200); // Tamaño del canvas para el modelo 3D
    // renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // const luz3 = new THREE.PointLight(0xffffff, 300, 200);
    // luz3.position.set(0, -6, 8);
    // luz3.castShadow = true;
    // scene.add(luz3);

    // const lightHelper3 = new THREE.PointLightHelper(luz3);
    // scene.add(lightHelper3);
    const light= new THREE.DirectionalLight(0xffffff,6);
    light.position.set(0,8,5);
    scene.add(light);
    // const directionLightHelper = new THREE.DirectionalLightHelper(light)
    // scene.add(directionLightHelper)
    const ambiente = new THREE.AmbientLight(0xfcffd6,1)
    scene.add(ambiente);



    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelo.ruta, (gltf) => {
      model = gltf.scene;
      model.castShadow = true;
      model.scale.set(1, 1, 1);
      model.position.set(0, -1, 0);
      scene.add(model);

      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.001;
        renderer.render(scene, camera);
      };
      animate();
    });
    //CONTROLES
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    // controls.maxDistance = 16;
    // controls.update();

    const handleResize = () => {
      const width = 200;
      const height = 200;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelo.ruta]);

  return (
      <>
      <div className="modelo-card">
        <h3>{modelo.nombre}</h3>
        <p>{modelo.descripcion}</p>
        <div className="canvas-container" ref={containerRef} />
          <div className='rotate-icon'>
            <LuRotate3D/>
          </div>
        <div className='modelo-download'>
          <a download={`${modelo.nombre}.blend`} href={modelo.blender}><BiLogoBlender /> descargar para blender</a>
          <a download={`${modelo.nombre}.gltf`} href={modelo.ruta}> <AiOutlineDownload/> Descargar gltf + bin</a>
        </div>
      </div>
      </>
        )
  
  
};

export default ModeloCard;
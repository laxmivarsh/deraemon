'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Zap, Sun, Volume2 } from 'lucide-react';
import { sounds } from '@/lib/audio';

interface Gadget3DProps {
  modelType: 'door' | 'copter' | 'light' | 'cannon' | 'bell';
  gadgetName: string;
}

export default function GadgetVisualizer3D({ modelType, gadgetName }: Gadget3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightColor, setLightColor] = useState<'cyan' | 'gold' | 'pink'>('cyan');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06182e);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(
      lightColor === 'pink' ? 0xff2d92 : lightColor === 'gold' ? 0xffd200 : 0x38bdf8,
      2,
      20
    );
    pointLight.position.set(-3, 2, 4);
    scene.add(pointLight);

    // Group to hold the 3D Gadget geometry
    const gadgetGroup = new THREE.Group();
    scene.add(gadgetGroup);

    // Procedural 3D Models
    let propeller: THREE.Mesh | null = null;
    let doorLeaf: THREE.Group | null = null;

    if (modelType === 'door') {
      // Pink Anywhere Door Model
      // Outer Frame
      const frameGeo = new THREE.BoxGeometry(2.4, 3.8, 0.2);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xc7006e,
        roughness: 0.3,
        metalness: 0.2,
        wireframe,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      gadgetGroup.add(frame);

      // Door Leaf
      doorLeaf = new THREE.Group();
      doorLeaf.position.set(-1, 0, 0); // hinge on left

      const leafGeo = new THREE.BoxGeometry(2.0, 3.4, 0.15);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0xff2d92,
        roughness: 0.2,
        metalness: 0.1,
        wireframe,
      });
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.position.set(1, 0, 0);
      doorLeaf.add(leafMesh);

      // Brass Doorknob
      const knobGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const knobMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        metalness: 0.8,
        roughness: 0.2,
      });
      const knob = new THREE.Mesh(knobGeo, knobMat);
      knob.position.set(1.8, 0, 0.12);
      doorLeaf.add(knob);

      gadgetGroup.add(doorLeaf);
    } else if (modelType === 'copter') {
      // Take-copter Model
      // Suction Cup
      const cupGeo = new THREE.CylinderGeometry(0.6, 0.9, 0.3, 32);
      const cupMat = new THREE.MeshStandardMaterial({
        color: 0x008cd7,
        roughness: 0.3,
        wireframe,
      });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.y = -1.2;
      gadgetGroup.add(cup);

      // Propeller Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 16);
      const shaftMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        roughness: 0.2,
        metalness: 0.5,
        wireframe,
      });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.position.y = -0.4;
      gadgetGroup.add(shaft);

      // Propeller Hub
      const hubGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0xffd200 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.y = 0.3;
      gadgetGroup.add(hub);

      // Propeller Blades
      const bladeGeo = new THREE.BoxGeometry(3.2, 0.05, 0.4);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        roughness: 0.3,
        wireframe,
      });
      propeller = new THREE.Mesh(bladeGeo, bladeMat);
      propeller.position.y = 0.35;
      gadgetGroup.add(propeller);
    } else if (modelType === 'light') {
      // Small Light / Torch
      const bodyGeo = new THREE.CylinderGeometry(0.4, 0.5, 2.2, 32);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x008cd7,
        metalness: 0.5,
        roughness: 0.2,
        wireframe,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      gadgetGroup.add(body);

      // Flared Torch Head
      const headGeo = new THREE.ConeGeometry(0.9, 0.8, 32);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        metalness: 0.6,
        roughness: 0.3,
        wireframe,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.3;
      gadgetGroup.add(head);

      // Glowing Lens
      const lensGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
      const lensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.y = 1.7;
      gadgetGroup.add(lens);
    } else if (modelType === 'cannon') {
      // Air Cannon Tube
      const cannonGeo = new THREE.CylinderGeometry(0.6, 0.8, 2.4, 32, 1, true);
      const cannonMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.7,
        roughness: 0.3,
        side: THREE.DoubleSide,
        wireframe,
      });
      const cannon = new THREE.Mesh(cannonGeo, cannonMat);
      gadgetGroup.add(cannon);

      const ringGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xff3b3b,
        metalness: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 1.0;
      ring.rotation.x = Math.PI / 2;
      gadgetGroup.add(ring);
    } else {
      // Doraemon Collar Bell
      const bellGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const bellMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        metalness: 0.8,
        roughness: 0.15,
        wireframe,
      });
      const bell = new THREE.Mesh(bellGeo, bellMat);
      gadgetGroup.add(bell);

      // Collar Strap
      const strapGeo = new THREE.TorusGeometry(1.3, 0.15, 16, 40);
      const strapMat = new THREE.MeshStandardMaterial({ color: 0xee3b3b, roughness: 0.4 });
      const strap = new THREE.Mesh(strapGeo, strapMat);
      strap.rotation.x = Math.PI / 2;
      gadgetGroup.add(strap);
    }

    // Drag Interaction (Orbiting)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      gadgetGroup.rotation.y += deltaX * 0.01;
      gadgetGroup.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging) {
        gadgetGroup.rotation.y += 0.012;
      }

      if (propeller) {
        propeller.rotation.y += 0.25; // Propeller spins!
      }

      if (doorLeaf) {
        // Gentle swinging door cycle
        doorLeaf.rotation.y = -Math.sin(elapsedTime * 1.5) * 0.6 - 0.3;
      }

      // Gentle floating levitation
      gadgetGroup.position.y = Math.sin(elapsedTime * 2) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js Geometries & Materials
      gadgetGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [modelType, wireframe, autoRotate, lightColor]);

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] rounded-3xl bg-[#06182E] border border-sky-500/30 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing"></div>

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 backdrop-blur-md text-xs font-bold text-sky-300 flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time 3D WebGL: {gadgetName}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playPop();
              setWireframe(!wireframe);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
              wireframe
                ? 'bg-amber-500 text-slate-950 border-amber-300'
                : 'bg-sky-950/80 text-sky-200 border-sky-500/30 hover:bg-sky-900'
            }`}
          >
            {wireframe ? 'Solid View' : 'Wireframe'}
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setAutoRotate(!autoRotate);
            }}
            className={`p-1.5 rounded-full border transition-colors ${
              autoRotate
                ? 'bg-sky-600 text-white border-sky-400'
                : 'bg-sky-950/80 text-slate-400 border-sky-500/30'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs text-sky-200/80 bg-sky-950/70 border border-sky-500/20 backdrop-blur-md rounded-2xl px-4 py-2">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>Drag to inspect 360° angle</span>
        </span>

        {/* Ambient lighting color presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">Light:</span>
          {(['cyan', 'gold', 'pink'] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                sounds.playPop();
                setLightColor(c);
              }}
              className={`w-3.5 h-3.5 rounded-full border ${
                lightColor === c ? 'scale-125 border-white ring-2 ring-sky-400' : 'border-transparent'
              } ${
                c === 'cyan' ? 'bg-sky-400' : c === 'gold' ? 'bg-amber-400' : 'bg-pink-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

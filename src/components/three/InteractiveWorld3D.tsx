'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, MapPin, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/audio';

export interface Hotspot {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  lore: string;
}

export const worldHotspots: Hotspot[] = [
  {
    id: 'nobi-house',
    name: "Nobita's House (2nd Floor Room)",
    position: [-2.5, 1.2, -1],
    description: "The two-story Nobi residence in Nerima Ward, Tokyo.",
    lore: "In Nobita's study room, the top desk drawer conceals the hyper-space portal to the Time Machine. This room is where Doraemon sleeps inside the closet (oshiire) on his futon."
  },
  {
    id: 'vacant-lot',
    name: "The Vacant Lot (Concrete Pipes)",
    position: [2.5, 0.4, 1.5],
    description: "The iconic neighborhood playground with three stacked concrete pipes.",
    lore: "The central gathering spot for the neighborhood children. Gian uses the stacked pipes as his performance stage for his agonizing open-air concerts, and the gang plans secret adventures here."
  },
  {
    id: 'anywhere-door-hill',
    name: "Anywhere Door Gateway",
    position: [0, 1.0, -2.5],
    description: "The 22nd century pink dimensional doorway perched atop the grassy hill.",
    lore: "A wormhole portal capable of folding spacetime across 10 light-years. Step through to visit prehistoric ages or distant extraterrestrial planets."
  },
  {
    id: 'sky-takecopters',
    name: "Sky Flight Waypoint",
    position: [1.5, 3.2, 0],
    description: "Anti-gravity cruising altitude powered by the Take-copter.",
    lore: "Cruising 100 meters above Tokyo, Nobita and Doraemon avoid morning school traffic and enjoy serene panoramic vistas of Mount Fuji."
  }
];

export default function InteractiveWorld3D({
  onSelectHotspot,
}: {
  onSelectHotspot: (hotspot: Hotspot) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string>('nobi-house');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06182e);
    scene.fog = new THREE.FogExp2(0x06182e, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff5db, 1.6);
    sun.position.set(8, 14, 8);
    sun.castShadow = true;
    scene.add(sun);

    // 3. Terrain: Grassy Floating Island
    const islandGeo = new THREE.CylinderGeometry(8, 7.2, 1.2, 32);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e, // Bright anime green
      roughness: 0.6,
      metalness: 0.1,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -0.6;
    island.receiveShadow = true;
    scene.add(island);

    // Earth Sub-layer
    const earthGeo = new THREE.CylinderGeometry(7.2, 5.5, 2, 32);
    const earthMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.9 });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.y = -2.1;
    scene.add(earth);

    // 4. Nobita's House
    const houseGroup = new THREE.Group();
    houseGroup.position.set(-2.5, 0.6, -1);

    // 1st Floor
    const floor1Geo = new THREE.BoxGeometry(2.4, 1.2, 2.0);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 });
    const floor1 = new THREE.Mesh(floor1Geo, wallMat);
    houseGroup.add(floor1);

    // 2nd Floor (Nobita's Bedroom)
    const floor2Geo = new THREE.BoxGeometry(2.0, 1.0, 1.6);
    const floor2 = new THREE.Mesh(floor2Geo, wallMat);
    floor2.position.set(0, 1.1, 0);
    houseGroup.add(floor2);

    // Red Roof
    const roofGeo = new THREE.ConeGeometry(2.0, 0.9, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xee3b3b, roughness: 0.4 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 2.0, 0);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    scene.add(houseGroup);

    // 5. Vacant Lot: Stacked Concrete Pipes
    const pipeGroup = new THREE.Group();
    pipeGroup.position.set(2.5, 0.3, 1.5);

    const pipeGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.6, 16, 1, true);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });

    // Bottom left pipe
    const pipe1 = new THREE.Mesh(pipeGeo, pipeMat);
    pipe1.rotation.z = Math.PI / 2;
    pipe1.position.set(0, 0, -0.4);
    pipeGroup.add(pipe1);

    // Bottom right pipe
    const pipe2 = new THREE.Mesh(pipeGeo, pipeMat);
    pipe2.rotation.z = Math.PI / 2;
    pipe2.position.set(0, 0, 0.4);
    pipeGroup.add(pipe2);

    // Top stacked pipe
    const pipe3 = new THREE.Mesh(pipeGeo, pipeMat);
    pipe3.rotation.z = Math.PI / 2;
    pipe3.position.set(0, 0.6, 0);
    pipeGroup.add(pipe3);

    scene.add(pipeGroup);

    // 6. The Anywhere Door on the Hill
    const doorGroup = new THREE.Group();
    doorGroup.position.set(0, 1.0, -2.5);

    const doorFrameGeo = new THREE.BoxGeometry(1.2, 2.0, 0.15);
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0xc7006e, roughness: 0.3 });
    const doorFrame = new THREE.Mesh(doorFrameGeo, doorFrameMat);
    doorGroup.add(doorFrame);

    const doorLeafGeo = new THREE.BoxGeometry(1.0, 1.8, 0.1);
    const doorLeafMat = new THREE.MeshStandardMaterial({ color: 0xff2d92, roughness: 0.2 });
    const doorLeafMesh = new THREE.Mesh(doorLeafGeo, doorLeafMat);
    doorGroup.add(doorLeafMesh);

    scene.add(doorGroup);

    // 7. Flying Take-copter in the Sky
    const copterGroup = new THREE.Group();
    copterGroup.position.set(1.5, 3.2, 0);

    const copterBladeGeo = new THREE.BoxGeometry(1.4, 0.04, 0.18);
    const copterBladeMat = new THREE.MeshStandardMaterial({ color: 0xffd200 });
    const flyingBlade = new THREE.Mesh(copterBladeGeo, copterBladeMat);
    copterGroup.add(flyingBlade);

    const copterShaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8);
    const flyingShaft = new THREE.Mesh(copterShaftGeo, copterBladeMat);
    flyingShaft.position.y = -0.2;
    copterGroup.add(flyingShaft);

    scene.add(copterGroup);

    // 8. Clouds
    const cloudsGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const cloudGeo = new THREE.DodecahedronGeometry(0.8 + Math.random() * 0.5, 1);
      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
      });
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 14,
        4 + Math.random() * 2,
        (Math.random() - 0.5) * 14
      );
      cloudsGroup.add(cloud);
    }
    scene.add(cloudsGroup);

    // 9. Hotspot Markers (Glowing Spheres)
    const markerMeshes: { mesh: THREE.Mesh; hotspot: Hotspot }[] = [];
    worldHotspots.forEach((spot) => {
      const markerGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const markerMat = new THREE.MeshStandardMaterial({
        color: 0xffd200,
        emissive: 0xffa000,
        emissiveIntensity: 0.8,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(...spot.position);
      scene.add(marker);
      markerMeshes.push({ mesh: marker, hotspot: spot });
    });

    // 10. Drag & Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX + deltaY * 0.008));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Click Detection for Hotspots
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerMeshes.map((m) => m.mesh));

      if (hits.length > 0) {
        const found = markerMeshes.find((m) => m.mesh === hits[0].object);
        if (found) {
          sounds.playBellChime();
          setActiveHotspotId(found.hotspot.id);
          onSelectHotspot(found.hotspot);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('click', onClick);

    // 11. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Spin take-copter propeller
      flyingBlade.rotation.y += 0.3;

      // Orbit clouds gently
      cloudsGroup.rotation.y = elapsedTime * 0.03;

      // Pulse hotspot beacons
      markerMeshes.forEach((item, idx) => {
        item.mesh.position.y =
          item.hotspot.position[1] + Math.sin(elapsedTime * 3 + idx) * 0.1;
      });

      // Smooth camera orbit
      if (!isDragging) {
        targetRotationY += 0.003;
      }

      const radius = 13;
      camera.position.x = Math.sin(targetRotationY) * radius;
      camera.position.z = Math.cos(targetRotationY) * radius;
      camera.position.y = 6 + targetRotationX * 5;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 520;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
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
  }, [onSelectHotspot]);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] rounded-3xl bg-[#06182E] border border-sky-500/30 overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing"></div>

      {/* Top Overlay Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/30 backdrop-blur-md text-xs font-bold text-sky-200 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive 3D Nerima Neighborhood Island</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/20 text-[11px] text-slate-300 backdrop-blur-md">
          <Eye className="w-3 h-3 text-sky-400" />
          <span>Click glowing golden beacons to inspect</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 self-center px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 backdrop-blur-md text-xs font-semibold text-sky-300 shadow-md">
        <span>Drag to orbit camera 360° around the neighborhood</span>
      </div>
    </div>
  );
}

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Define types
type DataPoint = {
  x: number;
  y: number;
  z: number;
  value: number;
  color: string;
};

type SceneProps = {
  data: DataPoint[];
  type: '3d-bar' | '3d-scatter';
};

// 3D Bar Box
const AnimatedBox: React.FC<{
  position: [number, number, number];
  scale: number;
  color: string;
}> = ({ position, scale, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Box ref={meshRef} position={position} scale={[0.5, scale, 0.5]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};

// 3D Sphere (Scatter Point)
const AnimatedSphere: React.FC<{
  position: [number, number, number];
  scale: number;
  color: string;
}> = ({ position, scale, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} scale={scale * 0.3}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

// 3D Scene Logic
const Scene3DContent: React.FC<SceneProps> = ({ data, type }) => {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <gridHelper args={[20, 20, '#444444', '#222222']} />

      {data.map((point, index) => {
        const normalizedValue = point.value / maxValue;
        const position: [number, number, number] = [point.x, point.y, point.z];

        if (type === '3d-bar') {
          return (
            <AnimatedBox
              key={index}
              position={[position[0], normalizedValue * 2, position[2]]}
              scale={normalizedValue * 4}
              color={point.color}
            />
          );
        } else if (type === '3d-scatter') {
          return (
            <AnimatedSphere
              key={index}
              position={position}
              scale={normalizedValue * 2}
              color={point.color}
            />
          );
        }

        return null;
      })}

      <Text position={[0, -2, 10]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
        X Axis
      </Text>
      <Text
        position={[-10, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        Y Axis
      </Text>
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 2, 0, 0]}
      >
        Z Axis
      </Text>

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

// Main 3D Canvas Component
export const Scene3D: React.FC<SceneProps> = ({ data, type }) => {
  return (
    <div className="w-full h-96 bg-black/20 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
        <Scene3DContent data={data} type={type} />
      </Canvas>
    </div>
  );
};

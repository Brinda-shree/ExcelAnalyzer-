// src/components/Excel3D.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

const ExcelSheet = () => {
  return (
    <group>
      {/* Base Excel sheet */}
      <mesh rotation-x={-0.3} rotation-y={0.4}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Simulated bar chart */}
      {[0, 1, 2, 3].map((i) => (
        <mesh position={[0.6 - i * 0.4, 0.2 + i * 0.05, 0.01]} key={i}>
          <boxGeometry args={[0.1, 0.3 + i * 0.1, 0.05]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      ))}

      {/* .XLSX tag */}
      <Html position={[0.9, 0.8, 0.05]} transform>
        <div style={{
          background: '#22c55e',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          .XLSX
        </div>
      </Html>
    </group>
  );
};

export const Excel3D = () => {
  return (
    <div style={{ height: 300 }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} />
        <ExcelSheet />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

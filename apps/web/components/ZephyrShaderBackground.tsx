'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

// Vertex shader for the background mesh
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment shader with cinematic wave patterns
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Noise function
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Smooth noise
  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // Fractal noise
  float fractalNoise(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * smoothNoise(st * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  void main() {
    vec2 st = vUv;
    vec2 pos = st - 0.5;
    
    // Create flowing wave effect
    float wave1 = sin(st.x * 8.0 + uTime * 2.0) * 0.1;
    float wave2 = sin(st.y * 6.0 + uTime * 1.5) * 0.1;
    float wave3 = sin((st.x + st.y) * 4.0 + uTime) * 0.1;
    
    // Add noise for organic feel
    float noiseValue = fractalNoise(st * 3.0 + uTime * 0.1);
    
    // Combine waves and noise
    float pattern = wave1 + wave2 + wave3 + noiseValue * 0.2;
    
    // Create radial gradient from center
    float dist = length(pos);
    float radial = 1.0 - smoothstep(0.0, 0.8, dist);
    
    // Zephyr color palette
    vec3 color1 = vec3(10.0/255.0, 16.0/255.0, 26.0/255.0); // Deep ocean
    vec3 color2 = vec3(0.0/255.0, 123.0/255.0, 154.0/255.0); // Aqaba azure
    vec3 color3 = vec3(64.0/255.0, 224.0/255.0, 208.0/255.0); // Zephyr teal
    vec3 color4 = vec3(255.0/255.0, 127.0/255.0, 127.0/255.0); // Coral accent
    
    // Mix colors based on pattern and position
    vec3 finalColor = mix(color1, color2, pattern + 0.3);
    finalColor = mix(finalColor, color3, radial * 0.3 + sin(uTime * 0.5) * 0.1);
    finalColor = mix(finalColor, color4, max(0.0, pattern - 0.7) * 0.2);
    
    // Add subtle brightness variation
    float brightness = 0.6 + 0.4 * (pattern + radial * 0.5);
    finalColor *= brightness;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function ShaderBackground() {
  const meshRef = useRef<Mesh>(null)
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: [window?.innerWidth || 1920, window?.innerHeight || 1080] },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      if (material.uniforms && material.uniforms['uTime']) {
        material.uniforms['uTime'].value = state.clock.elapsedTime
      }
    }
  })

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function ZephyrShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'transparent' }}
      >
        <ShaderBackground />
      </Canvas>
    </div>
  )
}
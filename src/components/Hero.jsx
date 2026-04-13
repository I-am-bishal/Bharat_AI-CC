import React, { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import styles from './Hero.module.css'

// ── Destination pins positioned on the globe ─────────────────────
const PINS = [
  { lat: 15.3, lng: 74.1,  color: 0x00f5d4, label: 'Goa' },
  { lat: 32.0, lng: 77.1,  color: 0x7b2fff, label: 'Himachal' },
  { lat: 26.9, lng: 75.8,  color: 0xff6b35, label: 'Rajasthan' },
  { lat: 10.5, lng: 76.5,  color: 0x00f5d4, label: 'Kerala' },
  { lat: 30.3, lng: 78.9,  color: 0xffd166, label: 'Uttarakhand' },
  { lat: 19.0, lng: 72.8,  color: 0xff6b35, label: 'Mumbai' },
]

function latLngToXYZ(lat, lng, r = 1) {
  const phi   = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z:  r * Math.sin(phi) * Math.sin(theta),
  }
}

// ── Component ─────────────────────────────────────────────────────
export default function Hero({ onPlanClick, onChatClick }) {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x: 0, y: 0 })
  const frameRef   = useRef(null)

  // Stable mouse handler
  const handleMouseMove = useCallback((e) => {
    mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    // ── Scene + Camera ──
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 3.6)

    // ── Globe ──
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x0a1628,
        emissive: 0x001122,
        specular: 0x00f5d4,
        shininess: 30,
      })
    )
    scene.add(globe)

    // ── Wireframe overlay ──
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.42, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x00f5d4, wireframe: true, opacity: 0.07, transparent: true })
    ))

    // ── Orbital rings ──
    const makeRing = (r, tilt, rotY, color, opacity) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008, 8, 80),
        new THREE.MeshBasicMaterial({ color, opacity, transparent: true })
      )
      m.rotation.x = tilt
      m.rotation.y = rotY
      return m
    }
    const ring1 = makeRing(1.85, Math.PI / 4,  0,            0x7b2fff, 0.45)
    const ring2 = makeRing(2.05, -Math.PI / 3, Math.PI / 6,  0x00f5d4, 0.28)
    scene.add(ring1, ring2)

    // ── Destination pins ──
    PINS.forEach(({ lat, lng, color }) => {
      const pos = latLngToXYZ(lat, lng, 1.43)

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      )
      dot.position.set(pos.x, pos.y, pos.z)

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.065, 0.007, 6, 20),
        new THREE.MeshBasicMaterial({ color, opacity: 0.55, transparent: true })
      )
      ring.position.set(pos.x, pos.y, pos.z)
      ring.lookAt(0, 0, 0)

      globe.add(dot, ring)
    })

    // ── Star field ──
    const starGeo = new THREE.BufferGeometry()
    const starCount = 600
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 14
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xaaddff, size: 0.018, opacity: 0.6, transparent: true })
    )
    scene.add(stars)

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x112244, 1.6))
    const dl1 = new THREE.DirectionalLight(0x00f5d4, 1.1)
    dl1.position.set(5, 3, 5)
    const dl2 = new THREE.DirectionalLight(0x7b2fff, 0.8)
    dl2.position.set(-5, -2, -3)
    scene.add(dl1, dl2)

    // ── Resize handler ──
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', handleMouseMove)

    // ── Animation loop ──
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      globe.rotation.y += 0.0025
      ring1.rotation.z += 0.004
      ring2.rotation.z -= 0.003
      stars.rotation.y  += 0.0005

      camera.position.x += (mouseRef.current.x * 0.5  - camera.position.x) * 0.02
      camera.position.y += (-mouseRef.current.y * 0.3 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
    }
  }, [handleMouseMove])

  return (
    <section className={styles.hero} id="hero">
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Particle overlay */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.badge}>
          <div className="pulse-dot" />
          AI-POWERED TRAVEL OS · INDIA EDITION
        </div>

        <h1 className={styles.headline}>
          <span className="text-gradient font-display">Your AI Travel</span>
          <br />
          Companion<br />for India
        </h1>

        <p className={styles.sub}>
          Don&apos;t search for trips — let the AI understand you and build the
          perfect Indian journey. From the Himalayas to the backwaters, your
          ideal adventure is one conversation away.
        </p>

        <div className={styles.buttons}>
          <button className="btn btn-primary" onClick={onPlanClick}>
            ⚡ Plan My Trip Instantly
          </button>
          <button className="btn btn-outline" onClick={onChatClick}>
            🤖 Talk to AI Guide
          </button>
        </div>
      </div>

      {/* Floating stat cards */}
      <div className={styles.stats} aria-label="Platform statistics">
        {[
          { num: '₹850',  label: 'Avg daily budget saved' },
          { num: '2.4 M', label: 'Trips planned by AI' },
          { num: '98 %',  label: 'Satisfaction rate' },
        ].map(({ num, label }) => (
          <div key={label} className={styles.statCard}>
            <div className={styles.statNum}>{num}</div>
            <div className={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

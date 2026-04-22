"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

const PORTS = [
  { main: "Cloud Services", tag: "Cloud · Migration · Security", color: [0x1C, 0x4E, 0x8A] },
  { main: "Staff Augmentation", tag: "On-demand · Scalable", color: [0x2A, 0x7E, 0x9E] },
  { main: "Datacenter Infrastructure", tag: "Design · Deploy · Optimize", color: [0xB8, 0x87, 0x3E] },
  { main: "IT Support Services", tag: "24/7 · Enterprise SLA", color: [0x1A, 0x7A, 0x54] },
];

interface SwitchState {
  hoveredPort: number;
  cablePositions: number[];
}

export default function NetworkSwitch3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<SwitchState>({ hoveredPort: -1, cablePositions: [0, 0, 0, 0] });
  const [hoveredPort, setHoveredPort] = useState(-1);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cables: THREE.Group[];
    leds: THREE.Mesh[];
    portHitAreas: THREE.Mesh[];
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    animId: number;
  } | null>(null);

  const getColors = useCallback((dark: boolean) => ({
    blue: dark ? 0x5E9FCC : 0x1C4E8A,
    cyan: dark ? 0x4AA0BE : 0x2A7E9E,
    green: dark ? 0x3EC8A0 : 0x1A7A54,
    amber: dark ? 0xD4A55A : 0xB8873E,
    bg: dark ? 0x0E1720 : 0xECEDF1,
    switchBody: dark ? 0x1A2A3E : 0x2A3A4E,
    switchGlass: dark ? 0x162335 : 0x1E2E42,
    portInner: dark ? 0x0A1018 : 0x0E1720,
    cable: dark ? 0x2A3A4E : 0x1E2E40,
    floor: dark ? 0x111C2A : 0xE0E2E8,
  }), []);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const obs = new MutationObserver(() => {
      const d = document.documentElement.classList.contains("dark");
      setIsDark(d);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const colors = getColors(isDark);
    const W = container.clientWidth;
    const H = Math.min(container.clientWidth * 0.55, 520);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 100);
    camera.position.set(0, 3.5, 8);
    camera.lookAt(0, 0.2, 0);

    /* ─── Lights ─── */
    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.3 : 0.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.8 : 1.0);
    keyLight.position.set(5, 8, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(colors.blue, 0.3);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(colors.cyan, isDark ? 0.6 : 0.3, 15);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    const underGlow = new THREE.PointLight(colors.blue, isDark ? 0.4 : 0.15, 8);
    underGlow.position.set(0, -1, 2);
    scene.add(underGlow);

    /* ─── Floor plane ─── */
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: colors.floor,
      roughness: 0.85,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.62;
    scene.add(floor);

    /* ─── Switch body ─── */
    const switchW = 7.2, switchH = 0.65, switchD = 2.2;

    const bodyGeo = new THREE.BoxGeometry(switchW, switchH, switchD);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: colors.switchGlass,
      metalness: 0.15,
      roughness: 0.2,
      transmission: isDark ? 0.15 : 0.08,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
      envMapIntensity: 1.0,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0;
    scene.add(body);

    // Top panel accent strip
    const stripGeo = new THREE.BoxGeometry(switchW - 0.2, 0.015, switchD - 0.4);
    const stripMat = new THREE.MeshStandardMaterial({ color: colors.blue, emissive: colors.blue, emissiveIntensity: 0.15, metalness: 0.8, roughness: 0.3 });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    strip.position.y = switchH / 2 + 0.008;
    scene.add(strip);

    // Front panel bezel
    const bezelGeo = new THREE.BoxGeometry(switchW + 0.08, switchH + 0.08, 0.06);
    const bezelMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x243444 : 0x3A4A5E, metalness: 0.6, roughness: 0.35 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.z = switchD / 2 + 0.03;
    scene.add(bezel);

    // Side vents
    for (let side = -1; side <= 1; side += 2) {
      for (let v = 0; v < 6; v++) {
        const ventGeo = new THREE.BoxGeometry(0.04, 0.06, 1.2);
        const ventMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x0A1218 : 0x151E2A, roughness: 0.8 });
        const vent = new THREE.Mesh(ventGeo, ventMat);
        vent.position.set(side * (switchW / 2 + 0.02), -0.08 + v * 0.11, 0);
        scene.add(vent);
      }
    }

    /* ─── Ports ─── */
    const portW = 0.52, portH = 0.36, portDepth = 0.4;
    const portSpacing = 1.5;
    const portStartX = -((PORTS.length - 1) * portSpacing) / 2;
    const portZ = switchD / 2;

    const portHitAreas: THREE.Mesh[] = [];
    const cables: THREE.Group[] = [];
    const leds: THREE.Mesh[] = [];

    PORTS.forEach((port, i) => {
      const px = portStartX + i * portSpacing;
      const portColor = (port.color[0] << 16) | (port.color[1] << 8) | port.color[2];

      // Port housing (outer frame)
      const housingGeo = new THREE.BoxGeometry(portW + 0.12, portH + 0.12, 0.08);
      const housingMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x2E4056 : 0x3A4A5E, metalness: 0.7, roughness: 0.3 });
      const housing = new THREE.Mesh(housingGeo, housingMat);
      housing.position.set(px, 0, portZ + 0.04);
      scene.add(housing);

      // Port cavity (recessed hole)
      const cavityGeo = new THREE.BoxGeometry(portW, portH, portDepth);
      const cavityMat = new THREE.MeshStandardMaterial({ color: colors.portInner, roughness: 0.95, metalness: 0.05 });
      const cavity = new THREE.Mesh(cavityGeo, cavityMat);
      cavity.position.set(px, 0, portZ - portDepth / 2 + 0.06);
      scene.add(cavity);

      // Inner metallic contacts (depth detail)
      for (let pin = 0; pin < 4; pin++) {
        const pinGeo = new THREE.BoxGeometry(0.03, 0.22, 0.02);
        const pinMat = new THREE.MeshStandardMaterial({ color: 0xC0C8D0, metalness: 0.9, roughness: 0.2 });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.set(px - 0.15 + pin * 0.1, 0, portZ - portDepth + 0.12);
        scene.add(pinMesh);
      }

      // LED indicator
      const ledGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const ledMat = new THREE.MeshStandardMaterial({
        color: portColor,
        emissive: portColor,
        emissiveIntensity: 0.4,
        roughness: 0.2,
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(px + portW / 2 + 0.14, portH / 2 + 0.04, portZ + 0.06);
      scene.add(led);
      leds.push(led);

      // Cable group
      const cableGroup = new THREE.Group();

      // RJ45 connector head
      const connGeo = new THREE.BoxGeometry(0.38, 0.26, 0.55);
      const connMat = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x3A4858 : 0x2A3A4E,
        roughness: 0.35,
        metalness: 0.3,
        clearcoat: 0.5,
      });
      const connector = new THREE.Mesh(connGeo, connMat);
      connector.position.z = 0.28;
      cableGroup.add(connector);

      // Connector clip/tab
      const clipGeo = new THREE.BoxGeometry(0.22, 0.04, 0.35);
      const clipMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x4A5868 : 0x3A4A5E, roughness: 0.4, metalness: 0.4 });
      const clip = new THREE.Mesh(clipGeo, clipMat);
      clip.position.set(0, 0.15, 0.22);
      cableGroup.add(clip);

      // Boot (strain relief)
      const bootGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.3, 8);
      const bootMat = new THREE.MeshStandardMaterial({
        color: portColor,
        roughness: 0.6,
        metalness: 0.1,
      });
      const boot = new THREE.Mesh(bootGeo, bootMat);
      boot.rotation.x = Math.PI / 2;
      boot.position.z = 0.7;
      cableGroup.add(boot);

      // Cable body (extends backward)
      const cablePath = new THREE.CurvePath<THREE.Vector3>();
      cablePath.add(new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0.85),
        new THREE.Vector3(0, -0.15, 1.8)
      ));
      cablePath.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, -0.15, 1.8),
        new THREE.Vector3(0, -0.5, 2.4),
        new THREE.Vector3(0, -0.55, 3.2)
      ));
      const tubeGeo = new THREE.TubeGeometry(cablePath as any, 20, 0.065, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x2A3848 : 0x1E2E3E,
        roughness: 0.5,
        metalness: 0.15,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      cableGroup.add(tube);

      // Glow tube (overlay, hidden until hover)
      const glowMat = new THREE.MeshStandardMaterial({
        color: portColor,
        emissive: portColor,
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
        roughness: 0.3,
      });
      const glowTube = new THREE.Mesh(tubeGeo.clone(), glowMat);
      glowTube.scale.set(1.15, 1.15, 1.0);
      glowTube.name = "glow";
      cableGroup.add(glowTube);

      cableGroup.position.set(px, 0, portZ - portDepth + 0.08);
      scene.add(cableGroup);
      cables.push(cableGroup);

      // Invisible hit area for raycasting
      const hitGeo = new THREE.BoxGeometry(portW + 0.4, portH + 0.3, portDepth + 1.2);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitArea = new THREE.Mesh(hitGeo, hitMat);
      hitArea.position.set(px, 0, portZ + 0.2);
      hitArea.userData = { portIndex: i };
      scene.add(hitArea);
      portHitAreas.push(hitArea);
    });

    // Port labels (main titles) below each port
    // We use CSS overlays for these — tracked via state

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);

    sceneRef.current = { renderer, scene, camera, cables, leds, portHitAreas, raycaster, mouse, animId: 0 };

    /* ─── Animation loop ─── */
    const clock = new THREE.Clock();

    function animate() {
      const id = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animId = id;

      const t = clock.getElapsedTime();
      const st = stateRef.current;

      // Cable animations
      cables.forEach((cableGroup, i) => {
        const targetZ = st.hoveredPort === i ? 0.65 : 0;
        const currentZ = st.cablePositions[i];
        st.cablePositions[i] += (targetZ - currentZ) * 0.08;
        cableGroup.position.z = (portZ - portDepth + 0.08) + st.cablePositions[i];

        // Glow effect
        const glowChild = cableGroup.children.find(c => c.name === "glow") as THREE.Mesh | undefined;
        if (glowChild) {
          const mat = glowChild.material as THREE.MeshStandardMaterial;
          const targetOp = st.hoveredPort === i ? 0.35 : 0;
          const targetEmit = st.hoveredPort === i ? 0.6 + Math.sin(t * 4) * 0.3 : 0;
          mat.opacity += (targetOp - mat.opacity) * 0.1;
          mat.emissiveIntensity += (targetEmit - mat.emissiveIntensity) * 0.1;
        }
      });

      // LED pulse
      leds.forEach((led, i) => {
        const mat = led.material as THREE.MeshStandardMaterial;
        if (st.hoveredPort === i) {
          mat.emissiveIntensity = 1.2 + Math.sin(t * 6) * 0.5;
        } else {
          mat.emissiveIntensity = 0.3 + Math.sin(t * 2 + i) * 0.1;
        }
      });

      // Subtle switch breathing
      body.position.y = Math.sin(t * 0.8) * 0.008;

      renderer.render(scene, camera);
    }

    animate();

    /* ─── Resize ─── */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.min(w * 0.55, 520);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (sceneRef.current) cancelAnimationFrame(sceneRef.current.animId);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [isDark, getColors]);

  /* ─── Mouse interaction ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const sc = sceneRef.current;
    const canvas = canvasRef.current;
    if (!sc || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    sc.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    sc.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    sc.raycaster.setFromCamera(sc.mouse, sc.camera);
    const hits = sc.raycaster.intersectObjects(sc.portHitAreas);

    const idx = hits.length > 0 ? hits[0].object.userData.portIndex : -1;
    stateRef.current.hoveredPort = idx;
    setHoveredPort(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.hoveredPort = -1;
    setHoveredPort(-1);
  }, []);

  const handleClick = useCallback(() => {
    if (stateRef.current.hoveredPort >= 0) {
      router.push("/solutions");
    }
  }, [router]);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ cursor: hoveredPort >= 0 ? "pointer" : "default" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Port labels — HTML overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {PORTS.map((port, i) => {
          const xPercent = 18.5 + i * 20.8;
          const isHovered = hoveredPort === i;
          return (
            <div
              key={i}
              className="absolute transition-all duration-500"
              style={{
                left: `${xPercent}%`,
                bottom: "8%",
                transform: "translateX(-50%)",
              }}
            >
              {/* Main label */}
              <div
                className="text-center whitespace-nowrap transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div
                  className="text-[11px] sm:text-[13px] font-bold tracking-tight"
                  style={{ color: "var(--white)" }}
                >
                  {port.main}
                </div>
              </div>

              {/* Tag tooltip — appears on hover */}
              <div
                className="absolute left-1/2 transition-all duration-400"
                style={{
                  bottom: "100%",
                  transform: `translateX(-50%) translateY(${isHovered ? "-12px" : "0px"})`,
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: "none",
                }}
              >
                <div
                  className="px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-bold tracking-wider uppercase whitespace-nowrap"
                  style={{
                    background: "var(--glass-card)",
                    border: "1px solid var(--glass-card-border)",
                    color: "var(--blue)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  {port.tag}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WebGL fallback */}
      <noscript>
        <div className="flex items-center justify-center p-10 text-center" style={{ color: "var(--w55)" }}>
          Enable JavaScript to view the interactive 3D switch.
        </div>
      </noscript>
    </div>
  );
}

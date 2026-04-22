"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const PORTS = [
  { main: "Cloud Services", tag: "Cloud · Migration · Security", color: [0x1C, 0x4E, 0x8A] },
  { main: "Staff Augmentation", tag: "On-demand · Scalable", color: [0x2A, 0x7E, 0x9E] },
  { main: "Datacenter Infrastructure", tag: "Design · Deploy · Optimize", color: [0xB8, 0x87, 0x3E] },
  { main: "IT Support Services", tag: "24/7 · Enterprise SLA", color: [0x1A, 0x7A, 0x54] },
];

function getColors(dark: boolean) {
  return {
    blue: dark ? 0x5E9FCC : 0x1C4E8A,
    cyan: dark ? 0x4AA0BE : 0x2A7E9E,
    green: dark ? 0x3EC8A0 : 0x1A7A54,
    amber: dark ? 0xD4A55A : 0xB8873E,
    switchGlass: dark ? 0x162335 : 0x1E2E42,
    portInner: dark ? 0x0A1018 : 0x0E1720,
    floor: dark ? 0x111C2A : 0xE0E2E8,
  };
}

export default function NetworkSwitch3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef(-1);
  const cablePosRef = useRef([0, 0, 0, 0]);
  const animIdRef = useRef(0);
  const sceneDataRef = useRef<any>(null);
  const [hoveredPort, setHoveredPort] = useState(-1);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const isDark = document.documentElement.classList.contains("dark");
      const colors = getColors(isDark);
      const W = container.clientWidth;
      const H = Math.min(W * 0.55, 520);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 100);
      camera.position.set(0, 3.5, 8);
      camera.lookAt(0, 0.2, 0);

      /* Lights */
      scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.3 : 0.5));
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

      /* Floor */
      const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshStandardMaterial({ color: colors.floor, roughness: 0.85, metalness: 0.05 })
      );
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.y = -0.62;
      scene.add(floorMesh);

      /* Switch body */
      const SW = 7.2, SH = 0.65, SD = 2.2;
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(SW, SH, SD),
        new THREE.MeshPhysicalMaterial({
          color: colors.switchGlass, metalness: 0.15, roughness: 0.2,
          transmission: isDark ? 0.15 : 0.08, thickness: 0.8,
          clearcoat: 1.0, clearcoatRoughness: 0.15, reflectivity: 0.6,
        })
      );
      scene.add(body);

      // Top accent strip
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(SW - 0.2, 0.015, SD - 0.4),
        new THREE.MeshStandardMaterial({ color: colors.blue, emissive: colors.blue, emissiveIntensity: 0.15, metalness: 0.8, roughness: 0.3 })
      );
      strip.position.y = SH / 2 + 0.008;
      scene.add(strip);

      // Bezel
      const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(SW + 0.08, SH + 0.08, 0.06),
        new THREE.MeshStandardMaterial({ color: isDark ? 0x243444 : 0x3A4A5E, metalness: 0.6, roughness: 0.35 })
      );
      bezel.position.z = SD / 2 + 0.03;
      scene.add(bezel);

      // Side vents
      for (let side = -1; side <= 1; side += 2) {
        for (let v = 0; v < 6; v++) {
          const vent = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.06, 1.2),
            new THREE.MeshStandardMaterial({ color: isDark ? 0x0A1218 : 0x151E2A, roughness: 0.8 })
          );
          vent.position.set(side * (SW / 2 + 0.02), -0.08 + v * 0.11, 0);
          scene.add(vent);
        }
      }

      /* Ports */
      const portW = 0.52, portH = 0.36, portDepth = 0.4;
      const portSpacing = 1.5;
      const portStartX = -((PORTS.length - 1) * portSpacing) / 2;
      const portZ = SD / 2;

      const cables: any[] = [];
      const leds: any[] = [];
      const hitAreas: any[] = [];

      PORTS.forEach((port, i) => {
        const px = portStartX + i * portSpacing;
        const portColor = (port.color[0] << 16) | (port.color[1] << 8) | port.color[2];

        // Housing
        const housing = new THREE.Mesh(
          new THREE.BoxGeometry(portW + 0.12, portH + 0.12, 0.08),
          new THREE.MeshStandardMaterial({ color: isDark ? 0x2E4056 : 0x3A4A5E, metalness: 0.7, roughness: 0.3 })
        );
        housing.position.set(px, 0, portZ + 0.04);
        scene.add(housing);

        // Cavity
        const cavity = new THREE.Mesh(
          new THREE.BoxGeometry(portW, portH, portDepth),
          new THREE.MeshStandardMaterial({ color: colors.portInner, roughness: 0.95, metalness: 0.05 })
        );
        cavity.position.set(px, 0, portZ - portDepth / 2 + 0.06);
        scene.add(cavity);

        // Pins
        for (let pin = 0; pin < 4; pin++) {
          const p = new THREE.Mesh(
            new THREE.BoxGeometry(0.03, 0.22, 0.02),
            new THREE.MeshStandardMaterial({ color: 0xC0C8D0, metalness: 0.9, roughness: 0.2 })
          );
          p.position.set(px - 0.15 + pin * 0.1, 0, portZ - portDepth + 0.12);
          scene.add(p);
        }

        // LED
        const led = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 12, 12),
          new THREE.MeshStandardMaterial({ color: portColor, emissive: portColor, emissiveIntensity: 0.4, roughness: 0.2 })
        );
        led.position.set(px + portW / 2 + 0.14, portH / 2 + 0.04, portZ + 0.06);
        scene.add(led);
        leds.push(led);

        // Cable group
        const cableGroup = new THREE.Group();

        const connector = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.26, 0.55),
          new THREE.MeshPhysicalMaterial({ color: isDark ? 0x3A4858 : 0x2A3A4E, roughness: 0.35, metalness: 0.3, clearcoat: 0.5 })
        );
        connector.position.z = 0.28;
        cableGroup.add(connector);

        const clip = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.04, 0.35),
          new THREE.MeshStandardMaterial({ color: isDark ? 0x4A5868 : 0x3A4A5E, roughness: 0.4, metalness: 0.4 })
        );
        clip.position.set(0, 0.15, 0.22);
        cableGroup.add(clip);

        const boot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.14, 0.3, 8),
          new THREE.MeshStandardMaterial({ color: portColor, roughness: 0.6, metalness: 0.1 })
        );
        boot.rotation.x = Math.PI / 2;
        boot.position.z = 0.7;
        cableGroup.add(boot);

        // Cable tube
        const cablePath = new (THREE.CurvePath as any)();
        cablePath.add(new THREE.LineCurve3(new THREE.Vector3(0, 0, 0.85), new THREE.Vector3(0, -0.15, 1.8)));
        cablePath.add(new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, -0.15, 1.8), new THREE.Vector3(0, -0.5, 2.4), new THREE.Vector3(0, -0.55, 3.2)
        ));
        const tubeGeo = new THREE.TubeGeometry(cablePath as any, 20, 0.065, 8, false);
        cableGroup.add(new THREE.Mesh(tubeGeo, new THREE.MeshStandardMaterial({ color: isDark ? 0x2A3848 : 0x1E2E3E, roughness: 0.5, metalness: 0.15 })));

        // Glow overlay
        const glowMat = new THREE.MeshStandardMaterial({ color: portColor, emissive: portColor, emissiveIntensity: 0, transparent: true, opacity: 0, roughness: 0.3 });
        const glowTube = new THREE.Mesh(tubeGeo.clone(), glowMat);
        glowTube.scale.set(1.15, 1.15, 1.0);
        glowTube.name = "glow";
        cableGroup.add(glowTube);

        cableGroup.position.set(px, 0, portZ - portDepth + 0.08);
        scene.add(cableGroup);
        cables.push(cableGroup);

        // Hit area
        const hitArea = new THREE.Mesh(
          new THREE.BoxGeometry(portW + 0.4, portH + 0.3, portDepth + 1.2),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hitArea.position.set(px, 0, portZ + 0.2);
        hitArea.userData = { portIndex: i };
        scene.add(hitArea);
        hitAreas.push(hitArea);
      });

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(-10, -10);

      sceneDataRef.current = { renderer, scene, camera, cables, leds, hitAreas, raycaster, mouse, THREE };
      setReady(true);

      /* Animation */
      const clock = new THREE.Clock();
      const baseZ = portZ - portDepth + 0.08;

      function animate() {
        if (disposed) return;
        animIdRef.current = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const hovered = hoveredRef.current;
        const cablePos = cablePosRef.current;

        cables.forEach((cg, i) => {
          const target = hovered === i ? 0.65 : 0;
          cablePos[i] += (target - cablePos[i]) * 0.08;
          cg.position.z = baseZ + cablePos[i];

          const glow = cg.children.find((c: any) => c.name === "glow") as any;
          if (glow) {
            const mat = glow.material;
            mat.opacity += ((hovered === i ? 0.35 : 0) - mat.opacity) * 0.1;
            mat.emissiveIntensity += ((hovered === i ? 0.6 + Math.sin(t * 4) * 0.3 : 0) - mat.emissiveIntensity) * 0.1;
          }
        });

        leds.forEach((led, i) => {
          const mat = led.material as any;
          mat.emissiveIntensity = hovered === i ? 1.2 + Math.sin(t * 6) * 0.5 : 0.3 + Math.sin(t * 2 + i) * 0.1;
        });

        body.position.y = Math.sin(t * 0.8) * 0.008;
        renderer.render(scene, camera);
      }
      animate();

      /* Resize */
      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = Math.min(w * 0.55, 520);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      /* Theme observer */
      const obs = new MutationObserver(() => {
        // Full re-init on theme change by forcing remount
      });
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      // Store cleanup ref
      sceneDataRef.current._cleanup = () => {
        window.removeEventListener("resize", onResize);
        obs.disconnect();
        cancelAnimationFrame(animIdRef.current);
        renderer.dispose();
        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
            else obj.material.dispose();
          }
        });
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animIdRef.current);
      if (sceneDataRef.current?._cleanup) sceneDataRef.current._cleanup();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const sd = sceneDataRef.current;
    const canvas = canvasRef.current;
    if (!sd || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    sd.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    sd.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    sd.raycaster.setFromCamera(sd.mouse, sd.camera);
    const hits = sd.raycaster.intersectObjects(sd.hitAreas);
    const idx = hits.length > 0 ? hits[0].object.userData.portIndex : -1;
    hoveredRef.current = idx;
    setHoveredPort(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = -1;
    setHoveredPort(-1);
  }, []);

  const handleClick = useCallback(() => {
    if (hoveredRef.current >= 0) router.push("/solutions");
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

      {ready && (
        <div className="absolute inset-0 pointer-events-none">
          {PORTS.map((port, i) => {
            const xPercent = 18.5 + i * 20.8;
            const isHovered = hoveredPort === i;
            return (
              <div
                key={i}
                className="absolute transition-all duration-500"
                style={{ left: `${xPercent}%`, bottom: "8%", transform: "translateX(-50%)" }}
              >
                <div
                  className="text-center whitespace-nowrap transition-all duration-300"
                  style={{ opacity: isHovered ? 1 : 0.7, transform: isHovered ? "translateY(-4px)" : "translateY(0)" }}
                >
                  <div className="text-[11px] sm:text-[13px] font-bold tracking-tight" style={{ color: "var(--white)" }}>
                    {port.main}
                  </div>
                </div>
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
                      background: "var(--glass-card)", border: "1px solid var(--glass-card-border)",
                      color: "var(--blue)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow-lg)",
                    }}
                  >
                    {port.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

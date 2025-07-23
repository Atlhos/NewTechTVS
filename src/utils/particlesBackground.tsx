import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // Pega a cor principal da variável CSS --main
  const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main').trim();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
    },
    particles: {
      color: { value: mainColor },
      links: { enable: true, color: mainColor, distance: 150, opacity: 0.1, width: 1 },
      move: { enable: true, speed: 2 },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.1 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  }), [mainColor]);

  return (
    init ? (
      <Particles
        id="tsparticles"
        options={options}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
    ) : null
  );
}

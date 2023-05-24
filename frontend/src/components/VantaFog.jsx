import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

import "../styles/VantaFog.css";

export default function VantaFog() {
  const myRefDiv = useRef(null);

  useEffect(() => {
    if (!myRefDiv.current) return () => {};

    const vantaEffect = FOG({
      el: myRefDiv.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: 0x525252,
      midtoneColor: 0x3c3c3c,
      lowlightColor: 0xdcdcdc,
      baseColor: 0x0,
      blurFactor: 0.31,
      speed: 0.3,
      zoom: 1.3,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={myRefDiv} className="vantaEffect" />;
}

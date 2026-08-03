import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './Clubs.css';

const clubsData = [
  {
    id: "01",
    title: "Aero Modelling Club",
    tag: "CLUB 01 // AEROSPACE",
    desc: "Design, build, and fly model aircraft while exploring aerodynamics, propulsion, and flight engineering.",
    logo: "https://picsum.photos/seed/aero/300/300"
  },
  {
    id: "02",
    title: "Astronomy Club",
    tag: "CLUB 02 // COSMOS",
    desc: "Explore astronomy through telescope observations, astrophysics discussions, and skywatching sessions.",
    logo: "https://picsum.photos/seed/astro/300/300"
  },
  {
    id: "03",
    title: "Business Club",
    tag: "CLUB 03 // ENTREPRENEURSHIP",
    desc: "Develop business acumen through case competitions, consulting, finance, startups, and leadership initiatives.",
    logo: "https://picsum.photos/seed/business/300/300"
  },
  {
    id: "04",
    title: "Club Of Programmers",
    tag: "CLUB 04 // SOFTWARE",
    desc: "Competitive programming, software development, open-source contributions, and hackathons.",
    logo: "https://picsum.photos/seed/cop/300/300"
  },
  {
    id: "05",
    title: "Club of Sustainability and Innovation",
    tag: "CLUB 05 // SUSTAINABILITY",
    desc: "Drive innovative solutions for environmental challenges through sustainability-focused projects and initiatives.",
    logo: "https://picsum.photos/seed/csi/300/300"
  },
  {
    id: "06",
    title: "Robotics Club",
    tag: "CLUB 06 // ROBOTICS",
    desc: "Build intelligent robots, autonomous systems, drones, and embedded hardware for competitions and research.",
    logo: "https://picsum.photos/seed/robotics/300/300"
  },
  {
    id: "07",
    title: "The Quant Club",
    tag: "CLUB 07 // QUANTITATIVE FINANCE",
    desc: "Explore quantitative finance, algorithmic trading, machine learning, and mathematical modeling.",
    logo: "https://picsum.photos/seed/quant/300/300"
  },
  {
    id: "08",
    title: "Society of Automotive Engineering Collegiate Club",
    tag: "CLUB 08 // AUTOMOTIVE",
    desc: "Design, manufacture, and test innovative vehicles while gaining hands-on automotive engineering experience.",
    logo: "https://picsum.photos/seed/sae/300/300"
  }
];

const angleStep = 20;

export default function Clubs() {
  const canvasRef = useRef(null);
  const wheelDialRef = useRef(null);
  const itemRefs = useRef([]);
  const textRefs = useRef([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const rotationObj = useRef({ rot: 0 }); // Proxy object for GSAP to tween

  const updateWheelLayout = useCallback(() => {
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const baseAngle = index * angleStep;
      let relativeAngle = baseAngle + rotationObj.current.rot;
      relativeAngle = ((relativeAngle + 180) % 360) - 180;
      const distance = Math.abs(relativeAngle);
      
      const rotateXVal = (distance / 20) * 4;
      const translateZVal = -Math.pow(distance / 20, 1.3) * 18;
      const scaleVal = Math.max(0.7, 1 - (distance / 20) * 0.05);
      const blurVal = Math.min(6, (distance / 20) * 2);
      const opacityVal = distance < 1 ? 1 : Math.max(0, 1 - (distance / 70));

      item.style.transform = `
        rotate(${baseAngle}deg)
        translateX(calc(var(--wheel-orbit) + 8vh))
        rotate(${-baseAngle - rotationObj.current.rot}deg)
        translateZ(${translateZVal}px)
        rotateX(${rotateXVal}deg)
        scale(${scaleVal})
      `;
      
      // Clear any stuck pointer-events from previous HMR states
      item.style.pointerEvents = "";

      if (textRefs.current[index]) {
        gsap.set(textRefs.current[index], {
          opacity: opacityVal,
          filter: `blur(${blurVal}px)`
        });
        
        if (distance < 5) {
          textRefs.current[index].style.color = "#ffffff";
          textRefs.current[index].style.fontWeight = "900";
          textRefs.current[index].style.textShadow = "0 0 20px rgba(201,168,76,0.6)";
        } else {
          textRefs.current[index].style.color = "rgba(255,255,255,0.28)";
          textRefs.current[index].style.fontWeight = "900";
          textRefs.current[index].style.textShadow = "none";
        }
      }
    });
  }, []);

  const wheelSceneRef = useRef(null);
  const isDraggingRef = useRef(false);
  const wasPointerDraggingRef = useRef(false);
  const dragStartAngleRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const lastHapticIndexRef = useRef(0);

  const triggerHaptic = useCallback(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch (e) {
        // ignore if unsupported
      }
    }
  }, []);

  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const rotateTo = useCallback((index, duration = 0.6) => {
    const clampedIndex = Math.max(0, Math.min(clubsData.length - 1, index));
    if (clampedIndex !== currentIndexRef.current) {
      triggerHaptic();
    }
    setCurrentIndex(clampedIndex);
    currentIndexRef.current = clampedIndex;
    const targetRotation = -clampedIndex * angleStep;
    
    gsap.to(rotationObj.current, {
      rot: targetRotation,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (wheelDialRef.current) {
          wheelDialRef.current.style.transform = `rotate(${rotationObj.current.rot}deg)`;
        }
        updateWheelLayout();
      }
    });

    gsap.to(".card-content-anim", { 
      opacity: 0, 
      y: -6, 
      duration: 0.15, 
      onComplete: () => {
        gsap.to(".card-content-anim", { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 });
      }
    });
  }, [updateWheelLayout, triggerHaptic]);

  const handlePointerDown = (e) => {
    if (!wheelSceneRef.current) return;
    const rect = wheelSceneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    dragStartAngleRef.current = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    dragStartRotRef.current = rotationObj.current.rot;
    isDraggingRef.current = true;
    wasPointerDraggingRef.current = true;
    lastHapticIndexRef.current = currentIndexRef.current;

    if (e.target.setPointerCapture && e.pointerId !== undefined) {
      try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !wheelSceneRef.current) return;
    const rect = wheelSceneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    let deltaAngle = currentAngle - dragStartAngleRef.current;
    
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    let newRot = dragStartRotRef.current + deltaAngle;
    const minRot = -(clubsData.length - 1) * angleStep;
    const maxRot = 0;
    newRot = Math.max(minRot - 10, Math.min(maxRot + 10, newRot));

    rotationObj.current.rot = newRot;
    if (wheelDialRef.current) {
      wheelDialRef.current.style.transform = `rotate(${newRot}deg)`;
    }
    updateWheelLayout();

    const nearestIndex = Math.max(0, Math.min(clubsData.length - 1, Math.round(-newRot / angleStep)));
    if (nearestIndex !== lastHapticIndexRef.current) {
      lastHapticIndexRef.current = nearestIndex;
      triggerHaptic();
    }
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setTimeout(() => {
      wasPointerDraggingRef.current = false;
    }, 350);
    
    const nearestIndex = Math.max(0, Math.min(clubsData.length - 1, Math.round(-rotationObj.current.rot / angleStep)));
    rotateTo(nearestIndex, 0.4);

    if (e.target.releasePointerCapture && e.pointerId !== undefined) {
      try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };

  // Handle wheel scrolling + mobile horizontal touch swipe
  useEffect(() => {
    let lastWheelTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartIndex = currentIndexRef.current;

    const handleWheel = (e) => {
      const now = Date.now();
      // Fast PC mouse wheel response (70ms throttle, 5px min delta)
      if (now - lastWheelTime < 70) return;
      
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 5) return;

      const activeIdx = currentIndexRef.current;
      if (delta > 0 && activeIdx < clubsData.length - 1) {
        lastWheelTime = now;
        rotateTo(activeIdx + 1, 0.25);
      } else if (delta < 0 && activeIdx > 0) {
        lastWheelTime = now;
        rotateTo(activeIdx - 1, 0.25);
      }
    };

    const handleTouchStart = (e) => {
      if (isDraggingRef.current || wasPointerDraggingRef.current) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartIndex = currentIndexRef.current;
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current || wasPointerDraggingRef.current) return;
      const deltaX = touchStartX - e.touches[0].clientX;
      const deltaY = touchStartY - e.touches[0].clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
        const step = Math.round(deltaX / 50);
        const targetIdx = Math.max(0, Math.min(clubsData.length - 1, touchStartIndex + step));
        if (targetIdx !== currentIndexRef.current) {
          rotateTo(targetIdx, 0.35);
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (isDraggingRef.current || wasPointerDraggingRef.current) return;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [rotateTo]);

  // Initial layout calculation - run only once on mount
  useEffect(() => {
    rotateTo(0);
  }, []);

  // Canvas Stars Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Static film grain — drawn once per resize, no animation loop needed
    const drawGrain = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() > 0.97 ? Math.floor(Math.random() * 180 + 60) : 0;
        data[i] = data[i+1] = data[i+2] = v;
        data[i+3] = v > 0 ? Math.floor(Math.random() * 40 + 10) : 0;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', drawGrain);
    drawGrain();

    return () => {
      window.removeEventListener('resize', drawGrain);
    };
  }, []);

  return (
    <div className="clubs-container">
      <canvas ref={canvasRef} className="clubs-star-canvas" />
      <div className="clubs-ambient-glow" />

      <div 
        ref={wheelSceneRef} 
        className="wheel-scene"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'none' }}
      >
        <div className="dial-container">
          <div className="physical-base">
            <div className="center-logo-wrapper">
              {clubsData.map((club, index) => (
                <img
                  key={`logo-${club.id}`}
                  src={club.logo}
                  alt={club.title}
                  className={`center-logo ${currentIndex === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="physical-rim" />
          
          <div ref={wheelDialRef} className="wheel-dial">
            {/* Generate Ticks */}
            {Array.from({ length: 120 }).map((_, i) => {
              const deg = i * 3;
              const isMajor = deg % 15 === 0;
              return (
                <div
                  key={`tick-${i}`}
                  className={`wheel-tick ${isMajor ? 'major' : 'minor'}`}
                  style={{
                    transform: `rotate(${deg}deg) translateX(calc(var(--wheel-orbit) + 2vh)) translateZ(0px)`
                  }}
                />
              );
            })}

            {/* Generate Text Items */}
            {clubsData.map((club, index) => (
              <div
                key={club.id}
                ref={el => itemRefs.current[index] = el}
                className="wheel-dial-item"
                onClick={() => rotateTo(index)}
              >
                <div ref={el => textRefs.current[index] = el} className="wheel-item-text">
                  <span>{club.id}</span><span className="club-title-text">{club.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-bg-gradient" />
        <div className="card-content">
          <div className="card-tag card-content-anim">{clubsData[currentIndex]?.tag}</div>
          <h2 className="card-title card-content-anim">{clubsData[currentIndex]?.title}</h2>
          <p className="card-desc card-content-anim">{clubsData[currentIndex]?.desc}</p>
          <button type="button" className="cta-button card-content-anim">Explore Club</button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './Clubs.css';

const clubsData = [
  { id: "01", title: "Programming Club", tag: "CLUB 01 // SOFTWARE", desc: "Competitive programming, open-source development, and hackathons." },
  { id: "02", title: "Robotics Club", tag: "CLUB 02 // HARDWARE", desc: "Autonomous robots, drones, and electro-mechanical systems engineering." },
  { id: "03", title: "AI Club", tag: "CLUB 03 // INTELLIGENCE", desc: "Deep learning, neural networks, and artificial intelligence research." },
  { id: "04", title: "Aero-modeling", tag: "CLUB 04 // AEROSPACE", desc: "Aircraft design, flight dynamics, and aerospace engineering." },
  { id: "05", title: "Astronomy", tag: "CLUB 05 // SPACE", desc: "Stargazing, astrophysics, and cosmology discussions." },
  { id: "06", title: "Business Club", tag: "CLUB 06 // VENTURES", desc: "Entrepreneurship, finance, and building the next big startups." },
  { id: "07", title: "Design Club", tag: "CLUB 07 // CREATIVE", desc: "UI/UX, graphic design, and aesthetic digital experiences." },
  { id: "08", title: "Hardware Club", tag: "CLUB 08 // ELECTRONICS", desc: "Embedded systems, IoT, and custom circuit design." }
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
          textRefs.current[index].style.color = "var(--text-primary)";
          textRefs.current[index].style.fontWeight = "400";
          textRefs.current[index].style.textShadow = "0 0 30px var(--light-blue)";
        } else {
          textRefs.current[index].style.color = "var(--text-muted)";
          textRefs.current[index].style.fontWeight = "200";
          textRefs.current[index].style.textShadow = "none";
        }
      }
    });
  }, []);

  const rotateTo = useCallback((index) => {
    setCurrentIndex(index);
    const targetRotation = -index * angleStep;
    
    gsap.to(rotationObj.current, {
      rot: targetRotation,
      duration: 0.8,
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
      y: -10, 
      duration: 0.2, 
      onComplete: () => {
        gsap.to(".card-content-anim", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
      }
    });
  }, [updateWheelLayout]);

  // Handle wheel scrolling + mobile touch swipe
  useEffect(() => {
    let isScrolling = false;
    let touchStartY = 0;

    const handleWheel = (e) => {
      // Ignore tiny touchpad wiggles
      if (Math.abs(e.deltaY) < 20) return;
      
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0 && currentIndex < clubsData.length - 1) {
        rotateTo(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        rotateTo(currentIndex - 1);
      }

      // Slightly longer debounce so touchpads don't scroll multiple items at once
      setTimeout(() => { isScrolling = false; }, 600);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      // Ignore tiny swipes (< 30px)
      if (Math.abs(deltaY) < 30) return;

      isScrolling = true;

      if (deltaY > 0 && currentIndex < clubsData.length - 1) {
        // Swipe up → next item
        rotateTo(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down → previous item
        rotateTo(currentIndex - 1);
      }

      setTimeout(() => { isScrolling = false; }, 700);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, rotateTo]);

  // Initial layout calculation
  useEffect(() => {
    rotateTo(0);
  }, [rotateTo]);

  // Canvas Stars Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.005 + 0.002
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 0.6 || star.alpha < 0.1) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="clubs-container">
      <canvas ref={canvasRef} className="clubs-star-canvas" />
      <div className="clubs-ambient-glow" />

      <div className="wheel-scene">
        <div className="dial-container">
          <div className="physical-base" />
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
                  <span>{club.id}</span>{club.title}
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

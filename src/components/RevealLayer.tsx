import { useEffect, useRef } from 'react';

const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

export default function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef    = useRef<HTMLDivElement>(null);

  /* Size canvas to viewport on mount + resize */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sync = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  /* Paint mask on every cursorX/Y change */
  useEffect(() => {
    const canvas = canvasRef.current;
    const div    = divRef.current;
    if (!canvas || !div) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createRadialGradient(
      cursorX, cursorY, 0,
      cursorX, cursorY, SPOTLIGHT_R,
    );
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.4,  'rgba(255,255,255,1)');
    grad.addColorStop(0.6,  'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataUrl = canvas.toDataURL();
    div.style.maskImage         = `url(${dataUrl})`;
    div.style.webkitMaskImage   = `url(${dataUrl})`;
    div.style.maskSize          = '100% 100%';
    (div.style as CSSStyleDeclaration & { webkitMaskSize: string }).webkitMaskSize = '100% 100%';
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Off-screen canvas used only as mask source */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />

      {/* Reveal image — masked to the spotlight circle */}
      <div
        ref={divRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

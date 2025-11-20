'use client';

import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WaveConfig {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
}

interface LineConfig {
  spring: number;
  friction: number;
  nodes: NodePoint[];
}

interface CanvasConfig {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

class Wave {
  private phase: number;
  private offset: number;
  private frequency: number;
  private amplitude: number;
  private currentValue: number = 0;

  constructor(config: WaveConfig) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.currentValue;
  }

  value(): number {
    return this.currentValue;
  }
}

class Line {
  private spring: number;
  private friction: number;
  private nodes: NodePoint[];

  constructor(config: { spring: number }, globalConfig: CanvasConfig, position: Position) {
    this.spring = config.spring + 0.1 * Math.random() - 0.05;
    this.friction = globalConfig.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];

    for (let i = 0; i < globalConfig.size; i++) {
      this.nodes.push({
        x: position.x,
        y: position.y,
        vx: 0,
        vy: 0,
      });
    }
  }

  update(position: Position, globalConfig: CanvasConfig): void {
    let spring = this.spring;
    const firstNode = this.nodes[0];

    firstNode.vx += (position.x - firstNode.x) * spring;
    firstNode.vy += (position.y - firstNode.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      const currentNode = this.nodes[i];

      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        currentNode.vx += (prevNode.x - currentNode.x) * spring;
        currentNode.vy += (prevNode.y - currentNode.y) * spring;
        currentNode.vx += prevNode.vx * globalConfig.dampening;
        currentNode.vy += prevNode.vy * globalConfig.dampening;
      }

      currentNode.vx *= this.friction;
      currentNode.vy *= this.friction;
      currentNode.x += currentNode.vx;
      currentNode.y += currentNode.vy;
      spring *= globalConfig.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.nodes.length === 0) return;

    let currentX = this.nodes[0].x;
    let currentY = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const current = this.nodes[i];
      const next = this.nodes[i + 1];
      currentX = (current.x + next.x) * 0.5;
      currentY = (current.y + next.y) * 0.5;
      ctx.quadraticCurveTo(current.x, current.y, currentX, currentY);
    }

    const secondLast = this.nodes[this.nodes.length - 2];
    const last = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const CONFIG: CanvasConfig = {
  debug: false,
  friction: 0.5,
  trails: 40,
  size: 25,
  dampening: 0.025,
  tension: 0.99,
};

const FPS_LIMIT = 45; // Limit to 45 FPS for better performance
const FPS_INTERVAL = 1000 / FPS_LIMIT;

export default function CanvasTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const linesRef = useRef<Line[]>([]);
  const waveRef = useRef<Wave | null>(null);
  const runningRef = useRef<boolean>(false);
  const frameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    // Initialize wave
    waveRef.current = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 100,
      frequency: 0.0015,
      offset: 240,
    });

    // Resize canvas
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Initialize lines
    const initializeLines = () => {
      linesRef.current = [];
      for (let i = 0; i < CONFIG.trails; i++) {
        linesRef.current.push(
          new Line(
            { spring: 0.45 + (i / CONFIG.trails) * 0.025 },
            CONFIG,
            positionRef.current
          )
        );
      }
    };

    // Handle mouse/touch movement with throttling
    let mouseMoveThrottle: number | null = null;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (mouseMoveThrottle) return;

      mouseMoveThrottle = window.setTimeout(() => {
        mouseMoveThrottle = null;
      }, 16); // Throttle to ~60Hz

      if ('touches' in e && e.touches.length > 0) {
        positionRef.current.x = e.touches[0].pageX;
        positionRef.current.y = e.touches[0].pageY;
      } else if ('clientX' in e) {
        positionRef.current.x = e.clientX;
        positionRef.current.y = e.clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        positionRef.current.x = e.touches[0].pageX;
        positionRef.current.y = e.touches[0].pageY;
      }
    };

    // Animation loop with FPS throttling
    const render = (currentTime: number) => {
      if (!runningRef.current || !ctx || !waveRef.current) return;

      frameIdRef.current = window.requestAnimationFrame(render);

      const elapsed = currentTime - lastFrameTimeRef.current;
      if (elapsed < FPS_INTERVAL) return;

      lastFrameTimeRef.current = currentTime - (elapsed % FPS_INTERVAL);

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(waveRef.current.update())},100%,55%,0.06)`;
      ctx.lineWidth = 8;

      for (const line of linesRef.current) {
        line.update(positionRef.current, CONFIG);
        line.draw(ctx);
      }
    };

    // Start animation on first interaction
    const startAnimation = (e: MouseEvent | TouchEvent) => {
      document.removeEventListener('mousemove', startAnimation);
      document.removeEventListener('touchstart', startAnimation);

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchstart', handleTouchStart);

      handleMove(e);
      initializeLines();
      runningRef.current = true;
      lastFrameTimeRef.current = performance.now();
      frameIdRef.current = window.requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', startAnimation);
    document.addEventListener('touchstart', startAnimation);

    // Visibility change handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        runningRef.current = false;
      } else {
        if (!runningRef.current && linesRef.current.length > 0) {
          runningRef.current = true;
          lastFrameTimeRef.current = performance.now();
          frameIdRef.current = window.requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      runningRef.current = false;
      if (frameIdRef.current) {
        window.cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', startAnimation);
      document.removeEventListener('touchstart', startAnimation);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}

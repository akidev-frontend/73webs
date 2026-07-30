/* ogl ships ESM only — there is no UMD build on the CDN, so it comes in as a
   bundled dependency instead of a global like the other libraries here */
import { Renderer, Program, Mesh, Triangle } from 'ogl';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollToPlugin);

/* ---------- cookie consent banner ---------- */
if(typeof CookieConsent !== 'undefined'){
  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: "box", position: "bottom left", equalWeightButtons: true },
      preferencesModal: { layout: "box", equalWeightButtons: true }
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {}
    },
    language: {
      default: "es",
      translations: {
        es: {
          consentModal: {
            title: "Usamos cookies 🍪",
            description: "Usamos cookies propias y de terceros para que la web funcione bien y, si nos das permiso, para entender cómo la usas. Puedes aceptarlas todas, rechazarlas o elegir cuáles.",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: "Rechazar todas",
            showPreferencesBtn: "Configurar",
            footer: '<a href="politica-privacidad.html">Política de privacidad</a>\n<a href="politica-cookies.html">Política de cookies</a>'
          },
          preferencesModal: {
            title: "Preferencias de cookies",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: "Rechazar todas",
            savePreferencesBtn: "Guardar preferencias",
            closeIconLabel: "Cerrar",
            sections: [
              { title: "Uso de cookies", description: "Usamos cookies para asegurar las funciones básicas de la web y, si lo permites, para entender cómo la usas." },
              { title: "Estrictamente necesarias", description: "Esenciales para el funcionamiento de la web. No se pueden desactivar.", linkedCategory: "necessary" },
              { title: "Analíticas", description: "Nos ayudan a entender cómo interactúan los visitantes con la web, de forma anónima.", linkedCategory: "analytics" },
              { title: "Más información", description: 'Consulta nuestra <a href="politica-cookies.html">política de cookies</a> completa.' }
            ]
          }
        }
      }
    }
  });
}


/* ---------- Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger
   stays perfectly in sync with every animation already on the page ---------- */
let lenis;
if(typeof Lenis !== 'undefined'
   && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
   && window.matchMedia('(pointer: fine)').matches){
  // Lenis is a desktop/mouse enhancement — on touch devices the OS already
  // does smooth momentum scrolling, and layering Lenis on top made it feel
  // "shot" way too fast, fighting the native touch inertia.
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Vanta Fog background for the "pain" section ---------- */
if (typeof VANTA !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  VANTA.FOG({
    el: "#painFog",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 600.00,
    minWidth: 300.00,
    highlightColor: 0xFF8A00,
    midtoneColor: 0x3a352c,
    lowlightColor: 0x0D0F14,
    baseColor: 0x161A22,
    blurFactor: 0.6,
    speed: 1.2,
    zoom: 1
  });
}

const mm = gsap.matchMedia();

/* ---------- PillNav (vanilla port of react-bits PillNav, circle-fill hover reveal) ---------- */
(function initPillNav(){
  const nav = document.querySelector('.pill-nav');
  if(!nav) return;
  const pills = Array.from(nav.querySelectorAll('.pill'));
  const timelines = [];
  const activeTweens = [];

  function layout(){
    pills.forEach((pill, i) => {
      const circle = pill.querySelector('.hover-circle');
      const label = pill.querySelector('.pill-label');
      const hoverLabel = pill.querySelector('.pill-label-hover');
      if(!circle) return;

      const rect = pill.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      if(!w || !h) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = D + 'px';
      circle.style.height = D + 'px';
      circle.style.bottom = -delta + 'px';

      gsap.set(circle, { xPercent:-50, scale:0, transformOrigin:`50% ${originY}px` });
      if(label) gsap.set(label, { y:0 });
      if(hoverLabel) gsap.set(hoverLabel, { y:h + 12, opacity:0 });

      timelines[i]?.kill();
      const tl = gsap.timeline({ paused:true });
      tl.to(circle, { scale:1.2, xPercent:-50, duration:2, ease:"power3.out", overwrite:"auto" }, 0);
      if(label) tl.to(label, { y:-(h + 8), duration:2, ease:"power3.out", overwrite:"auto" }, 0);
      if(hoverLabel){
        gsap.set(hoverLabel, { y:Math.ceil(h + 100), opacity:0 });
        tl.to(hoverLabel, { y:0, opacity:1, duration:2, ease:"power3.out", overwrite:"auto" }, 0);
      }
      timelines[i] = tl;
    });
  }

  layout();
  window.addEventListener('resize', layout);
  if(document.fonts?.ready) document.fonts.ready.then(layout).catch(()=>{});

  pills.forEach((pill, i) => {
    pill.addEventListener('mouseenter', () => {
      const tl = timelines[i]; if(!tl) return;
      activeTweens[i]?.kill();
      activeTweens[i] = tl.tweenTo(tl.duration(), { duration:0.3, ease:"power3.out", overwrite:"auto" });
    });
    pill.addEventListener('mouseleave', () => {
      const tl = timelines[i]; if(!tl) return;
      activeTweens[i]?.kill();
      activeTweens[i] = tl.tweenTo(0, { duration:0.2, ease:"power3.out", overwrite:"auto" });
    });
  });
})();

/* ---------- ShapeGrid (vanilla port of react-bits ShapeGrid, hexagon variant only) ---------- */
function initShapeGrid(canvas, opts){
  const ctx = canvas.getContext('2d');
  const squareSize   = opts.squareSize || 40;
  const speed        = Math.max(opts.speed || 1, 0.1);
  const borderColor  = opts.borderColor || 'rgba(255,255,255,0.15)';
  const hoverFill    = opts.hoverFillColor || 'rgba(255,255,255,0.3)';
  const direction    = opts.direction || 'right';
  const trailAmount  = opts.hoverTrailAmount || 0;

  const hexHoriz = squareSize * 1.5;
  const hexVert  = squareSize * Math.sqrt(3);

  let gridOffset = { x:0, y:0 };
  let hovered = null;
  let trail = [];
  let opacities = new Map();
  let raf = null;

  function resize(){
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawHex(cx, cy, size){
    ctx.beginPath();
    for(let i=0;i<6;i++){
      const angle = (Math.PI/3)*i;
      const vx = cx + size*Math.cos(angle);
      const vy = cy + size*Math.sin(angle);
      if(i===0) ctx.moveTo(vx,vy); else ctx.lineTo(vx,vy);
    }
    ctx.closePath();
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const colShift = Math.floor(gridOffset.x / hexHoriz);
    const offsetX  = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
    const offsetY  = ((gridOffset.y % hexVert)  + hexVert)  % hexVert;
    const cols = Math.ceil(canvas.width / hexHoriz) + 3;
    const rows = Math.ceil(canvas.height / hexVert) + 3;

    for(let col=-2; col<cols; col++){
      for(let row=-2; row<rows; row++){
        const cx = col*hexHoriz + offsetX;
        const cy = row*hexVert + ((col+colShift)%2!==0 ? hexVert/2 : 0) + offsetY;
        const key = col+','+row;
        const alpha = opacities.get(key);
        if(alpha){
          ctx.globalAlpha = alpha;
          drawHex(cx,cy,squareSize);
          ctx.fillStyle = hoverFill;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        drawHex(cx,cy,squareSize);
        ctx.strokeStyle = borderColor;
        ctx.stroke();
      }
    }
  }

  function updateOpacities(){
    const targets = new Map();
    if(hovered) targets.set(hovered.x+','+hovered.y, 1);
    if(trailAmount>0){
      trail.forEach((t,i)=>{
        const key = t.x+','+t.y;
        if(!targets.has(key)) targets.set(key, (trail.length-i)/(trail.length+1));
      });
    }
    targets.forEach((_,key)=>{ if(!opacities.has(key)) opacities.set(key,0); });
    opacities.forEach((op,key)=>{
      const target = targets.get(key) || 0;
      const next = op + (target-op)*0.15;
      if(next < 0.005) opacities.delete(key); else opacities.set(key, next);
    });
  }

  function tick(){
    const wrapX = hexHoriz*2, wrapY = hexVert;
    switch(direction){
      case 'right':    gridOffset.x = (gridOffset.x - speed + wrapX) % wrapX; break;
      case 'left':     gridOffset.x = (gridOffset.x + speed + wrapX) % wrapX; break;
      case 'up':       gridOffset.y = (gridOffset.y + speed + wrapY) % wrapY; break;
      case 'down':     gridOffset.y = (gridOffset.y - speed + wrapY) % wrapY; break;
      case 'diagonal':
        gridOffset.x = (gridOffset.x - speed + wrapX) % wrapX;
        gridOffset.y = (gridOffset.y - speed + wrapY) % wrapY;
        break;
    }
    updateOpacities();
    draw();
    raf = requestAnimationFrame(tick);
  }

  function handleMove(e){
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const colShift = Math.floor(gridOffset.x / hexHoriz);
    const offsetX  = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
    const offsetY  = ((gridOffset.y % hexVert)  + hexVert)  % hexVert;
    const ax = mx - offsetX, ay = my - offsetY;
    const col = Math.round(ax / hexHoriz);
    const rowOffset = (col+colShift)%2!==0 ? hexVert/2 : 0;
    const row = Math.round((ay - rowOffset) / hexVert);
    if(!hovered || hovered.x!==col || hovered.y!==row){
      if(hovered && trailAmount>0){
        trail.unshift({ ...hovered });
        if(trail.length > trailAmount) trail.length = trailAmount;
      }
      hovered = { x:col, y:row };
    }
  }

  function handleLeave(){
    if(hovered && trailAmount>0){
      trail.unshift({ ...hovered });
      if(trail.length > trailAmount) trail.length = trailAmount;
    }
    hovered = null;
  }

  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mouseleave', handleLeave);

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    draw(); // single static frame, no loop, no motion
  } else {
    raf = requestAnimationFrame(tick);
  }

  return {
    destroy(){
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
      if(raf) cancelAnimationFrame(raf);
    }
  };
}

const solutionGridCanvas = document.getElementById('solutionGrid');
if(solutionGridCanvas){
  initShapeGrid(solutionGridCanvas, {
    direction: 'up',
    speed: 0.5,
    squareSize: 42,
    borderColor: 'rgba(255,138,0,0.28)',
    hoverFillColor: 'rgba(255,176,0,0.5)',
    hoverTrailAmount: 6
  });
}

/* ---------- LineWaves (vanilla ogl port of react-bits LineWaves) ---------- */
function initLineWaves(container, opts){
  function hexToVec3(hex){
    const h = hex.replace('#','');
    return [
      parseInt(h.slice(0,2),16)/255,
      parseInt(h.slice(2,4),16)/255,
      parseInt(h.slice(4,6),16)/255
    ];
  }

  const speed              = opts.speed ?? 0.3;
  const innerLineCount     = opts.innerLineCount ?? 32.0;
  const outerLineCount     = opts.outerLineCount ?? 36.0;
  const warpIntensity      = opts.warpIntensity ?? 1.0;
  const rotation            = opts.rotation ?? -45;
  const edgeFadeWidth       = opts.edgeFadeWidth ?? 0.0;
  const colorCycleSpeed     = opts.colorCycleSpeed ?? 1.0;
  const brightness          = opts.brightness ?? 0.2;
  const color1               = opts.color1 ?? '#ffffff';
  const color2               = opts.color2 ?? '#ffffff';
  const color3               = opts.color3 ?? '#ffffff';
  const enableMouseInteraction = opts.enableMouseInteraction ?? true;
  const mouseInfluence      = opts.mouseInfluence ?? 2.0;

  const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

  const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  let program;
  let currentMouse = [0.5, 0.5];
  let targetMouse = [0.5, 0.5];

  function handleMouseMove(e){
    const rect = gl.canvas.getBoundingClientRect();
    targetMouse = [
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height
    ];
  }
  function handleMouseLeave(){ targetMouse = [0.5, 0.5]; }

  function resize(){
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    if(program){
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
    }
  }
  window.addEventListener('resize', resize);
  resize();

  const geometry = new Triangle(gl);
  const rotationRad = (rotation * Math.PI) / 180;
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
      uSpeed: { value: speed },
      uInnerLines: { value: innerLineCount },
      uOuterLines: { value: outerLineCount },
      uWarpIntensity: { value: warpIntensity },
      uRotation: { value: rotationRad },
      uEdgeFadeWidth: { value: edgeFadeWidth },
      uColorCycleSpeed: { value: colorCycleSpeed },
      uBrightness: { value: brightness },
      uColor1: { value: hexToVec3(color1) },
      uColor2: { value: hexToVec3(color2) },
      uColor3: { value: hexToVec3(color3) },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseInfluence: { value: mouseInfluence },
      uEnableMouse: { value: enableMouseInteraction }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });
  container.appendChild(gl.canvas);

  if(enableMouseInteraction){
    gl.canvas.addEventListener('mousemove', handleMouseMove);
    gl.canvas.addEventListener('mouseleave', handleMouseLeave);
  }

  let animationFrameId;
  function update(time){
    animationFrameId = requestAnimationFrame(update);
    program.uniforms.uTime.value = time * 0.001;

    if(enableMouseInteraction){
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
    } else {
      program.uniforms.uMouse.value[0] = 0.5;
      program.uniforms.uMouse.value[1] = 0.5;
    }

    renderer.render({ scene: mesh });
  }
  animationFrameId = requestAnimationFrame(update);

  return {
    destroy(){
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if(enableMouseInteraction){
        gl.canvas.removeEventListener('mousemove', handleMouseMove);
        gl.canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  };
}

const finalWavesEl = document.getElementById('finalWaves');
if(finalWavesEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  initLineWaves(finalWavesEl, {
    speed: 0.3,
    innerLineCount: 24,
    outerLineCount: 28,
    warpIntensity: 1.0,
    rotation: -45,
    edgeFadeWidth: 0.0,
    colorCycleSpeed: 0.6,
    brightness: 0.22,
    color1: '#FF8A00',
    color2: '#FF5B00',
    color3: '#B34400',
    enableMouseInteraction: true,
    mouseInfluence: 1.6
  });
}

mm.add({
  isDesktop: "(min-width: 861px)",
  isMobile: "(max-width: 860px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {

  const { reduceMotion } = context.conditions;

  /* ---------- hero entrance ---------- */
  const heroTl = gsap.timeline({ defaults:{ ease:"power3.out" } });
  heroTl
    .from(".hero h1", { autoAlpha:0, y:26, duration: reduceMotion?0:.9 })
    .from(".hero-sub", { autoAlpha:0, y:20, duration: reduceMotion?0:.8 }, "-=.55")
    .from(".hero-cta", { autoAlpha:0, y:16, duration: reduceMotion?0:.7 }, "-=.5");

  /* ---------- rotating platform name (synced with the "owner" in the subtitle) ---------- */
  (function cyclePlatforms(){
    const platforms = ["Instagram", "Facebook", "Google Maps", "WhatsApp", "TikTok"];
    const owners    = ["Meta", "Meta", "Google", "Meta", "ByteDance"];
    const wordEl = document.getElementById("platformWord");
    const ownerEl = document.getElementById("ownerWord");
    if(!wordEl || !ownerEl) return;

    if(reduceMotion){
      wordEl.textContent = platforms[0];
      ownerEl.textContent = owners[0];
      return;
    }

    let idx = 0;
    // One self-repeating timeline instead of setInterval — each cycle is fully
    // contained, so two swaps can never fire on top of each other.
    const tl = gsap.timeline({ repeat:-1 });
    tl.to({}, { duration:2.3 })
      .to([wordEl, ownerEl], { autoAlpha:0, duration:0.35, ease:"power2.in" })
      .add(() => {
        idx = (idx + 1) % platforms.length;
        wordEl.textContent = platforms[idx];
        ownerEl.textContent = owners[idx];
      })
      .to([wordEl, ownerEl], { autoAlpha:1, duration:0.4, ease:"power2.out" });
  })();

  /* ---------- seam: draws itself as you scroll from hero into "El problema" ---------- */
  gsap.set("#seamStroke", { drawSVG:"0%" });
  gsap.to("#seamStroke", {
    drawSVG:"100%",
    ease:"none",
    scrollTrigger:{
      trigger:".section-seam",
      start:"top 95%",
      end:"top 40%",
      scrub: reduceMotion ? false : 0.6
    }
  });

  /* ---------- pain bento cards reveal ---------- */
  ScrollTrigger.batch(".bento-card", {
    start:"top 88%",
    onEnter:(els) => gsap.to(els, { opacity:1, y:0, stagger:0.1, duration: reduceMotion?0:.7, ease:"power2.out", overwrite:"auto" }),
    onEnterBack:(els) => gsap.to(els, { opacity:1, y:0, stagger:0.1, duration: reduceMotion?0:.7, ease:"power2.out", overwrite:"auto" }),
    onLeaveBack:(els) => gsap.to(els, { opacity:0, y:24, stagger:0.1, duration: reduceMotion?0:.5, ease:"power2.in", overwrite:"auto" })
  });
  if(!reduceMotion){
    document.querySelectorAll(".bento-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity:1, y:0 },
        {
          opacity:0,
          y:-36,
          ease:"none",
          scrollTrigger:{
            trigger:card,
            start:"top -5%",
            end:"top -15%",
            scrub:true
          }
        }
      );
    });
  }
  /* ---------- "Es agotador..." — BlurText-style word reveal (vanilla port) ---------- */
  (function blurTextReveal(){
    const el = document.querySelector(".pain-close");
    if(!el) return;

    if(reduceMotion){
      gsap.set(el, { opacity:1 });
      return;
    }

    const original = el.textContent;
    el.setAttribute("aria-label", original);
    const words = [];

    const walk = (node) => {
      if(node.nodeType === Node.TEXT_NODE){
        const frag = document.createDocumentFragment();
        const parts = node.textContent.split(" ");
        parts.forEach((word, i) => {
          if(word.length){
            const span = document.createElement("span");
            span.className = "blur-word";
            span.setAttribute("aria-hidden", "true");
            span.textContent = word;
            frag.appendChild(span);
            words.push(span);
          }
          if(i < parts.length - 1) frag.appendChild(document.createTextNode(" "));
        });
        node.parentNode.replaceChild(frag, node);
      } else if(node.nodeType === Node.ELEMENT_NODE){
        Array.from(node.childNodes).forEach(walk);
      }
    };
    Array.from(el.childNodes).forEach(walk);

    gsap.set(words, { filter:"blur(10px)", opacity:0, y:-24 });
    gsap.to(words, {
      filter:"blur(0px)", opacity:1, y:0,
      duration:0.6, stagger:0.05, ease:"power2.out",
      scrollTrigger:{ trigger:el, start:"top 88%", toggleActions:"play none none reverse" }
    });
  })();

  /* ---------- signature: house drawing scrubbed by scroll, cold -> gold ---------- */
  const strokes = ["#roof","#walls","#door","#win1","#win2","#chimney"];
  gsap.set(strokes, { drawSVG:"0%" });
  gsap.set("#ground", { drawSVG:"0%" });

  /* ---------- SplitText-style char reveal (vanilla, no GSAP Club plugin), reusable ---------- */
  function splitCharsReveal(el, triggerEl, start){
    if(!el) return;
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const chars = [];
    let wordSpan = null;
    Array.from(text).forEach((ch) => {
      if(ch === " "){
        wordSpan = null;
        el.appendChild(document.createTextNode(" "));
        return;
      }
      if(!wordSpan){
        wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.whiteSpace = "nowrap";
        el.appendChild(wordSpan);
      }
      const span = document.createElement("span");
      span.className = "split-char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch;
      wordSpan.appendChild(span);
      chars.push(span);
    });
    if(reduceMotion){ return; }
    gsap.fromTo(chars,
      { opacity:0, y:40 },
      {
        opacity:1, y:0,
        duration:0.9, ease:"power3.out", stagger:0.035,
        scrollTrigger:{ trigger:triggerEl || el, start: start || "top 82%", once:true }
      }
    );
  }
  splitCharsReveal(document.getElementById("buildIntro"), ".build-pin", "top 75%");
  splitCharsReveal(document.querySelector("#incluye .features-head h2"));

  const buildTl = gsap.timeline({
    scrollTrigger:{
      trigger:".build-pin",
      start:"top top",
      end:"bottom bottom",
      scrub: reduceMotion ? false : 0.6,
    }
  });

  buildTl
    .to("#ground", { drawSVG:"100%", duration:1, ease:"none" })
    .to("#roof", { drawSVG:"100%", duration:2, ease:"none" }, ">-0.3")
    .to("#walls", { drawSVG:"100%", duration:2, ease:"none" }, "<0.4")
    .to(["#roof","#walls"], { stroke:"var(--gold-bright)", duration:2, ease:"none" }, "<")
    .to("#door", { drawSVG:"100%", duration:1.2, ease:"none" }, ">-0.4")
    .to(["#win1","#win2"], { drawSVG:"100%", duration:1.2, ease:"none" }, "<0.2")
    .to("#chimney", { drawSVG:"100%", duration:1, ease:"none" }, "<0.3")
    .to("#buildCap1", { autoAlpha:1, y:0, duration:1.5, ease:"none" }, "<0.2");

  // blue gradient deepens across the whole pinned scroll — faint up top, strongest at the bottom
  buildTl.to("#buildBlue", { opacity:1, duration:buildTl.duration(), ease:"power1.in" }, 0);
  // gold glow lights up under the finished house, peaking right at the end on top of the blue
  buildTl.to("#buildGradient", { opacity:1, duration:buildTl.duration() * 0.55, ease:"power2.in" }, buildTl.duration() * 0.45);

  gsap.set("#buildCap1", { y:16 });

  /* ---------- solution + features reveal ---------- */
  gsap.utils.toArray(".solution-grid .reveal").forEach((el, i) => {
    gsap.to(el, {
      autoAlpha:1, y:0, duration: reduceMotion?0:.8, delay:i*0.08,
      scrollTrigger:{ trigger:el, start:"top 85%", toggleActions:"play none none reverse" }
    });
  });

  /* ---------- "qué incluye" ScrollStack (vanilla GSAP port of react-bits ScrollStack, no React/Lenis needed) ---------- */
  gsap.from("#stackWrap", {
    autoAlpha:0, y:24, duration: reduceMotion?0:.8,
    scrollTrigger:{ trigger:"#stackWrap", start:"top 85%", toggleActions:"play none none reverse" }
  });

  if(!reduceMotion){
    const stackCards = gsap.utils.toArray(".stack-card");
    stackCards.forEach((card, i) => {
      const next = stackCards[i + 1];
      if(!next) return; // last card never gets covered, no shrink needed
      const nextTop = parseFloat(next.style.top) || 130;
      const dir = i % 2 === 0 ? -1 : 1; // alternate fan direction for a natural stacked-deck look

      gsap.fromTo(card,
        { scale:1, rotation:0 },
        {
          scale:0.94,
          rotation: dir * 3,
          ease:"none",
          scrollTrigger:{
            trigger:next,
            start:"top bottom",
            end:"top " + nextTop + "px",
            scrub:true
          }
        }
      );
    });
  }

  /* ---------- objection ---------- */
  gsap.from(".objection blockquote", {
    autoAlpha:0, y:20, duration: reduceMotion?0:.8,
    scrollTrigger:{ trigger:".objection blockquote", start:"top 85%", toggleActions:"play none none reverse" }
  });
  gsap.from(".objection-split > div", {
    autoAlpha:0, y:18, stagger:0.1, duration: reduceMotion?0:.7,
    scrollTrigger:{ trigger:".objection-split", start:"top 88%", toggleActions:"play none none reverse" }
  });

  /* ---------- final CTA pulse ---------- */
  if(!reduceMotion){
    gsap.to(".final .btn-gold", {
      boxShadow:"0 0 0 14px rgba(255,138,0,0)",
      duration:1.8, repeat:-1, ease:"sine.out"
    });
  }
  gsap.from(".final .wrap > *", {
    autoAlpha:0, y:18, stagger:0.08, duration: reduceMotion?0:.7,
    scrollTrigger:{ trigger:".final", start:"top 75%", toggleActions:"play none none reverse" }
  });

  /* ---------- site-wide: paragraphs shrink + fade as they scroll off the top ---------- */
  // on touch devices a fast swipe covers a lot of scroll distance instantly, so give the
  // animation a bit of "catch up" time there instead of snapping through it (scrub:true = 1:1)
  const scrubAmount = window.matchMedia("(pointer: coarse)").matches ? 0.9 : true;
  if(!reduceMotion){
    document.querySelectorAll("p").forEach((p) => {
      // skip tiny UI labels — this is for body copy, not nav/notes
      if(p.closest("nav, footer, .hero-cta-note, .build-caption, #pain, #incluye, #final")) return;
      gsap.set(p, { transformOrigin:"top center" });
      // fromTo with an explicit rest state (not captured from current DOM state) so this
      // never fights with each section's own entrance reveal for control of "opacity"
      gsap.fromTo(p,
        { opacity:1, scale:1 },
        {
          opacity:0,
          scale:0.85,
          ease:"none",
          scrollTrigger:{
            trigger:p,
            start:"top 20%",
            end:"top 90",
            scrub:scrubAmount
          }
        }
      );
    });

    /* ---------- site-wide: headings slide out sideways (alternating L/R) as they scroll off the top ---------- */
    document.querySelectorAll("h1, h2, h3").forEach((h, i) => {
      if(h.closest("nav, footer, .build-caption, #pain, #incluye, #final")) return;
      const dir = i % 2 === 0 ? -1 : 1; // alternate left / right
      gsap.fromTo(h,
        { x:0, opacity:1 },
        {
          x: dir * 130,
          opacity:0,
          ease:"none",
          scrollTrigger:{
            trigger:h,
            start:"top 20%",
            end:"top 90",
            scrub:scrubAmount
          }
        }
      );
    });
  }

  return () => { /* matchMedia cleanup handled by gsap */ };
});

/* ---------- keep ScrollTrigger positions correct after fonts / images / async CDN
   scripts settle the layout — without this, triggers computed at first paint get
   stale and reveals fire late or stay stuck invisible ---------- */
window.addEventListener("load", () => ScrollTrigger.refresh());
if(document.fonts && document.fonts.ready){
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/* ---------- VariableProximity (vanilla port of react-bits VariableProximity, no 'motion' dependency) ---------- */
/* pointer:fine alone isn't enough — some narrow/hybrid devices report a fine pointer too, so gate on width as well */
if(window.matchMedia("(pointer:fine) and (min-width: 821px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){

  const parseVariationSettings = (str) => {
    const map = {};
    if(!str || str === 'normal') return map;
    str.split(',').forEach(pair => {
      const m = pair.trim().match(/'?([a-zA-Z]{4})'?\s+([\-\d.]+)/);
      if(m) map[m[1]] = parseFloat(m[2]);
    });
    return map;
  };

  // how far each axis is allowed to swell on proximity, and its ceiling
  const AXIS_BUMP = {
    wght: { add:130, max:800 },
    opsz: { add:34,  max:96  },
    wdth: { add:6,   max:100 }
  };

  const splitIntoChars = (el) => {
    const originalText = el.textContent;
    el.setAttribute('aria-label', originalText);
    const walk = (node) => {
      if(node.nodeType === Node.TEXT_NODE){
        const frag = document.createDocumentFragment();
        let wordSpan = null;
        Array.from(node.textContent).forEach((ch) => {
          if(ch === ' '){
            wordSpan = null;
            frag.appendChild(document.createTextNode(' '));
          } else {
            if(!wordSpan){
              wordSpan = document.createElement('span');
              wordSpan.className = 'vp-word';
              wordSpan.style.whiteSpace = 'nowrap';
              frag.appendChild(wordSpan);
            }
            const span = document.createElement('span');
            span.className = 'vp-char';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch;
            wordSpan.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if(node.nodeType === Node.ELEMENT_NODE){
        if(node.classList && node.classList.contains('vp-skip')) return; // dynamic content, left untouched
        Array.from(node.childNodes).forEach(walk);
      }
    };
    Array.from(el.childNodes).forEach(walk);
  };

  const proximityChars = []; // { el, fromStr, toStr, fromAxes, toAxes }
  const RADIUS = 130;
  const mouse = { x:-9999, y:-9999 };

  document.querySelectorAll('.vp-target').forEach((headline) => {
    splitIntoChars(headline);
    headline.querySelectorAll('.vp-char').forEach((charEl) => {
      // read each char's own resting axes (inherited from its heading or its <em>)
      const computed = getComputedStyle(charEl).fontVariationSettings;
      const fromAxes = parseVariationSettings(computed);
      const toAxes = {};
      Object.keys(AXIS_BUMP).forEach((axis) => {
        const base = fromAxes[axis] ?? (axis === 'wdth' ? 100 : axis === 'opsz' ? 40 : 500);
        fromAxes[axis] = base;
        toAxes[axis] = Math.min(AXIS_BUMP[axis].max, base + AXIS_BUMP[axis].add);
      });
      proximityChars.push({ el: charEl, fromAxes, toAxes });
    });
  });

  if(proximityChars.length){
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const tick = () => {
      proximityChars.forEach(({ el, fromAxes, toAxes }) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const t = dist >= RADIUS ? 0 : 1 - dist / RADIUS;
        const settings = Object.keys(fromAxes).map((axis) => {
          const v = fromAxes[axis] + (toAxes[axis] - fromAxes[axis]) * t;
          return `'${axis}' ${v.toFixed(1)}`;
        }).join(', ');
        el.style.fontVariationSettings = settings;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

/* ---------- Pain bento cards (vanilla port of MagicBento: border-glow + magnetism + click ripple) ---------- */
if(window.matchMedia("(pointer:fine) and (min-width: 821px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  document.querySelectorAll(".bento-card").forEach((card) => {
    const magnetX = gsap.quickTo(card, "x", { duration:0.35, ease:"power3" });
    const magnetY = gsap.quickTo(card, "y", { duration:0.35, ease:"power3" });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 100;
      const relY = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--glow-x", relX + "%");
      card.style.setProperty("--glow-y", relY + "%");
      card.style.setProperty("--glow-intensity", "1");

      // subtle magnetism toward the cursor
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      magnetX(cx * 0.04);
      magnetY(cy * 0.04);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--glow-intensity", "0");
      magnetX(0);
      magnetY(0);
    });

    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y), Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxDistance*2}px;height:${maxDistance*2}px;border-radius:50%;background:radial-gradient(circle, rgba(255,138,0,0.35) 0%, rgba(255,138,0,0.15) 30%, transparent 70%);left:${x-maxDistance}px;top:${y-maxDistance}px;pointer-events:none;z-index:5;`;
      card.appendChild(ripple);
      gsap.fromTo(ripple, { scale:0, opacity:1 }, {
        scale:1, opacity:0, duration:0.7, ease:"power2.out",
        onComplete: () => ripple.remove()
      });
    });
  });
}

/* ---------- magnetic CTA hover (desktop only, subtle) ---------- */
if(window.matchMedia("(pointer:fine) and (min-width: 821px)").matches){
  document.querySelectorAll(".btn-gold").forEach((btn) => {
    const xTo = gsap.quickTo(btn, "x", { duration:0.4, ease:"power3" });
    const yTo = gsap.quickTo(btn, "y", { duration:0.4, ease:"power3" });
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width/2) * 0.25);
      yTo((e.clientY - r.top - r.height/2) * 0.25);
    });
    btn.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
  });
}

/* ---------- final form -> n8n webhook ---------- */
(function(){
  const N8N_WEBHOOK_URL = "https://n8n.akidojo.dev/webhook/b63f864a-d673-4623-b8ee-bfff1bacb6f2";

  const form = document.getElementById("finalForm");
  const note = document.getElementById("formNote");
  const btn = document.getElementById("finalCta");
  if(!form) return;

  const formLoadedAt = Date.now();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Anti-bot: honeypot. Humano nunca ve/rellena este campo.
    if(form.empresa_web && form.empresa_web.value.trim() !== ""){
      note.textContent = "¡Gracias! Te contactamos en menos de 24h.";
      note.classList.remove("error");
      note.classList.add("ok");
      form.reset();
      return;
    }

    // Anti-bot: time-trap. Envío en <3s = automatizado.
    if(Date.now() - formLoadedAt < 3000){
      note.classList.remove("ok");
      note.classList.add("error");
      note.textContent = "Espera un momento antes de enviar.";
      return;
    }

    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    const payload = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      negocio: form.negocio.value.trim(),
      origen: "73webs.com",
      pagina: window.location.href,
      enviado_en: new Date().toISOString()
    };

    btn.disabled = true;
    note.classList.remove("ok", "error");
    note.textContent = "Enviando...";

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error("respuesta no OK: " + res.status);

      note.textContent = "¡Gracias! Te contactamos en menos de 24h.";
      note.classList.add("ok");
      form.reset();
    } catch(err) {
      note.textContent = "No se pudo enviar. Intenta de nuevo o escríbenos directo.";
      note.classList.add("error");
    } finally {
      btn.disabled = false;
    }
  });
})();

/* ---------- smooth in-page anchor scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        if(lenis){
          lenis.scrollTo(target, { offset:-40, duration:1.2 });
        } else {
          gsap.to(window, { duration:1, scrollTo:{ y:target, offsetY:40 }, ease:"power2.inOut" });
        }
      }
    }
  });
});

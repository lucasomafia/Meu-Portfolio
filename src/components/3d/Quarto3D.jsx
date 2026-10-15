import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const reduzir =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- DADOS DO QUARTO ----------
// Caixas com luz: [largura, altura, profundidade, cor, x, y, z]
const CAIXAS = [
  [6.4, 0.2, 6.4, 0x6b4a3a, 0, -0.1, 0],
  [6.4, 3.5, 0.2, 0x2b2150, 0, 1.75, -3.1],
  [0.2, 3.5, 6.2, 0x261c48, -3.1, 1.75, 0.1],
  [3.2, 0.1, 1.2, 0x1c1b2e, -1, 1, -2.4],
  [0.15, 0.3, 0.1, 0x111118, -1, 1.2, -2.85],
  [1.5, 0.85, 0.05, 0x0a0a10, -1, 1.65, -2.82],
  [0.94, 0.03, 0.32, 0x15141f, -1, 1.077, -2.3],
  [1.5, 0.012, 0.62, 0x2a2350, -0.85, 1.056, -2.3],
  [0.7, 0.1, 0.7, 0x2a2a5a, -1, 0.65, -1.4],
  [0.7, 0.95, 0.1, 0x2a2a5a, -1, 1.15, -1.0],
  [0.08, 0.5, 0.08, 0x111118, -1, 0.35, -1.4],
  [1.8, 1.9, 0.8, 0x2a2347, 1.6, 0.95, -2.55],
  [0.8, 1.7, 0.02, 0x34295c, 1.18, 0.95, -2.145],
  [0.8, 1.7, 0.02, 0x34295c, 2.02, 0.95, -2.145],
  [0.04, 0.3, 0.03, 0x8a86b0, 1.52, 0.95, -2.12],
  [0.04, 0.3, 0.03, 0x8a86b0, 1.68, 0.95, -2.12],
  [0.5, 0.5, 0.5, 0x1c1b2e, -2.72, 0.25, 1.1],
  [0.02, 0.18, 0.4, 0x34295c, -2.46, 0.36, 1.1],
  [0.02, 0.18, 0.4, 0x34295c, -2.46, 0.14, 1.1],
  [0.03, 0.03, 0.12, 0x8a86b0, -2.45, 0.36, 1.1],
  [0.03, 0.03, 0.12, 0x8a86b0, -2.45, 0.14, 1.1],
  [0.12, 0.08, 0.1, 0x15141f, -2.7, 0.54, 0.98],
  [0.2, 0.04, 0.28, 0xe5c07b, -2.75, 0.52, 1.2],
  [0.7, 0.95, 0.04, 0x14121f, -2.4, 2.3, -2.98],
  [0.7, 0.95, 0.04, 0x14121f, 0.3, 2.3, -2.98],
  [1.8, 0.06, 0.3, 0x1c1b2e, 1.6, 2.1, -2.85],
  [1.8, 0.06, 0.3, 0x1c1b2e, 1.6, 2.8, -2.85],
  [0.3, 0.7, 0.5, 0x15141f, -2.15, 1.4, -2.6],
  [0.14, 0.28, 0.14, 0x15141f, 0.38, 1.19, -2.7],
  // Cama maior, com a cabeceira encostada na face interna da parede (x = -3).
  [2.4, 0.2, 1.8, 0x1c1b2e, -1.7, 0.2, 2.25],
  [2.3, 0.2, 1.7, 0xcfc8e8, -1.75, 0.4, 2.25],
  [0.1, 0.8, 1.8, 0x1c1b2e, -2.95, 0.5, 2.25],
  // Cobertor sobre o colchão, com queda nas duas laterais e nos pés.
  [1.3, 0.06, 1.76, 0x5a3fd0, -1.27, 0.53, 2.25],
  [1.3, 0.28, 0.04, 0x5a3fd0, -1.27, 0.39, 1.39],
  [1.3, 0.28, 0.04, 0x5a3fd0, -1.27, 0.39, 3.11],
  [0.04, 0.28, 1.76, 0x5a3fd0, -0.6, 0.39, 2.25],
  [0.4, 0.12, 0.55, 0xf0ecff, -2.6, 0.56, 1.85],
  [0.4, 0.12, 0.55, 0xf0ecff, -2.6, 0.56, 2.65],
  [0.52, 0.72, 0.3, 0x4a3aa8, -1, 1.15, -1.3],
  [0.17, 0.08, 0.3, 0xeeeeee, -1.15, 0.04, -1.95],
  [0.17, 0.08, 0.3, 0xeeeeee, -0.85, 0.04, -1.95],
];

// pernas da mesa
[[-2.5, -2.9], [0.5, -2.9], [-2.5, -1.9], [0.5, -1.9]].forEach(([x, z]) =>
  CAIXAS.push([0.08, 1, 0.08, 0x1c1b2e, x, 0.5, z])
);
// piso de tabuas
const TONS = [0x6b4a3a, 0x75503e, 0x5f4234];
for (let p = 0; p < 12; p++) CAIXAS.push([0.47, 0.012, 6.0, TONS[p % 3], -2.75 + 0.5 * p, 0.006, 0]);
// cortina com dobras
for (let c = 0; c < 15; c++)
  CAIXAS.push([0.08, 2.55, 0.16, c % 2 ? 0x9a3a8a : 0x7e2f72, c % 2 ? -2.9 : -2.84, 1.45, -1.62 + 0.16 * c]);
// livros
const CORES = [0xff3fa0, 0x3fb0ff, 0xe5c07b, 0x98c379, 0xc678dd, 0xe06c75, 0x61afef];
for (let k = 0; k < 7; k++) {
  const alt = 0.25 + 0.1 * (k % 3);
  CAIXAS.push([0.11, alt, 0.2, CORES[k], 0.88 + 0.17 * k, 2.13 + alt / 2, -2.85]);
  if (k < 5) CAIXAS.push([0.11, 0.22 + 0.06 * (k % 2), 0.2, CORES[(k + 3) % 7], 1.0 + 0.2 * k, 2.94, -2.85]);
}

// Caixas que brilham (sem luz)
const BRILHO = [
  [0.04, 0.55, 0.02, 0x40ffd0, -2.15, 1.4, -2.34],
  [0.01, 0.04, 0.07, 0x98ff98, -2.64, 0.54, 0.98],
  [0.08, 0.08, 0.01, 0xff3fa0, 0.38, 1.12, -2.625],
];

// Planos dos posteres: [largura, altura, cor, x, y, z]
const PLANOS = [
  [0.56, 0.8, 0xff3fa0, -2.4, 2.3, -2.95],
  [0.56, 0.25, 0x3fb0ff, -2.4, 2.1, -2.94],
  [0.56, 0.8, 0x40ffd0, 0.3, 2.3, -2.95],
  [0.3, 0.3, 0x2b1a66, 0.3, 2.4, -2.94],
];

// Fitas de neon: [w, h, d, x, y, z, deslocamento da cor]
const TIRAS = [];
for (let i = 0; i < 8; i++) {
  TIRAS.push([0.775, 0.06, 0.06, -2.6125 + 0.775 * i, 3.45, -2.97, i / 16]);
  TIRAS.push([0.06, 0.06, 0.7675, -2.97, 3.45, -2.556 + 0.7675 * i, 0.5 + i / 16]);
}
TIRAS.push([6.2, 0.04, 0.06, 0.1, 0.05, -2.97, 0.7]);
TIRAS.push([0.06, 0.04, 6.14, -2.97, 0.05, 0.13, 0.2]);

// Teclas: [largura, coluna, x, z]
const TECLAS = [];
for (let r = 0; r < 4; r++)
  for (let c = 0; c < 14; c++) TECLAS.push([0.052, c, -1.403 + c * 0.062, -2.41 + r * 0.055]);
for (let c = 0; c < 14; c++) if (c < 3 || c > 9) TECLAS.push([0.052, c, -1.403 + c * 0.062, -2.19]);
TECLAS.push([0.424, 6, -1.403 + 6 * 0.062, -2.19]);

// Bracos e pernas: [de, ate, espessura, cor]
const CALCA = 0x1e2a44;
const MOLETOM = 0x4a3aa8;
const PELE = 0xf1c9a5;
const MEMBROS = [];
[-0.15, 0.15].forEach((dx) => {
  MEMBROS.push([[-1 + dx, 0.78, -1.3], [-1 + dx, 0.78, -1.8], 0.18, CALCA]);
  MEMBROS.push([[-1 + dx, 0.78, -1.8], [-1 + dx, 0.1, -1.85], 0.15, CALCA]);
});
[-1, 1].forEach((s) => {
  const wx = s > 0 ? -0.28 : -1 + s * 0.2;
  MEMBROS.push([[-1 + s * 0.3, 1.4, -1.3], [-1 + s * 0.34, 1.1, -1.65], 0.11, MOLETOM]);
  if (s < 0) MEMBROS.push([[-1 + s * 0.34, 1.1, -1.65], [wx, 1.12, -2.25], 0.1, MOLETOM]);
});

const LINHAS = [[0, 60, "#c678dd"], [1, 90, "#61afef"], [1, 50, "#98c379"], [2, 110, "#e5c07b"],
  [2, 70, "#61afef"], [1, 40, "#c678dd"], [0, 30, "#98c379"], [1, 100, "#e06c75"], [1, 60, "#61afef"], [0, 20, "#c678dd"]];

// ---------- PECAS ----------
function Mat({ cor }) {
  return <meshStandardMaterial color={cor} roughness={0.8} metalness={0.1} />;
}

function Caixa({ d, estrutura }) {
  return (
    <mesh position={[d[4], d[5], d[6]]}>
      <boxGeometry args={[d[0], d[1], d[2]]} />
      {estrutura === undefined ? <Mat cor={d[3]} /> : (
        Array.from({ length: 6 }, (_, face) => (
          face === [2, 4, 0][estrutura]
            ? <meshStandardMaterial key={face} attach={`material-${face}`} color={d[3]} roughness={0.8} metalness={0.1} />
            : <meshBasicMaterial key={face} attach={`material-${face}`} color={estrutura === 0 ? 0x704052 : 0x493181} />
        ))
      )}
    </mesh>
  );
}

function Brilho({ d, materialRef }) {
  return (
    <mesh position={[d[4], d[5], d[6]]}>
      <boxGeometry args={[d[0], d[1], d[2]]} />
      <meshBasicMaterial ref={materialRef} color={d[3]} />
    </mesh>
  );
}

function Membro({ de, ate, w, cor }) {
  const { pos, quat, len } = useMemo(() => {
    const A = new THREE.Vector3(...de);
    const B = new THREE.Vector3(...ate);
    const o = new THREE.Object3D();
    o.position.copy(A).add(B).multiplyScalar(0.5);
    o.lookAt(B);
    return { pos: o.position.toArray(), quat: o.quaternion, len: A.distanceTo(B) };
  }, [de, ate]);
  return (
    <mesh position={pos} quaternion={quat}>
      <boxGeometry args={[w, w, len]} />
      <Mat cor={cor} />
    </mesh>
  );
}

function Camara() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const enquadramento = 10.2;
    // Three.js cameras are mutable objects; resizing updates their projection.
    // eslint-disable-next-line react-hooks/immutability
    camera.zoom = Math.min(size.width, size.height) / enquadramento;
    camera.lookAt(0, 1.3, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

// ---------- CENA ----------
function Quarto({ sala, entrando }) {
  const luzes = useRef();
  const desligamento = useRef(0);
  const monitor = useRef();
  const ledPC = useRef();
  const rato = useRef();
  const maoE = useRef();
  const antebracoD = useRef();
  const pulsoD = useMemo(() => new THREE.Vector3(), []);
  const cotoveloD = useMemo(() => new THREE.Vector3(-0.66, 1.1, -1.65), []);
  const direcaoBracoD = useMemo(() => new THREE.Vector3(), []);
  const eixoBracoD = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const ultimo = useRef(0);

  const matsTira = useMemo(() => TIRAS.map(() => new THREE.MeshBasicMaterial()), []);
  const matsTecla = useMemo(() => Array.from({ length: 14 }, () => new THREE.MeshBasicMaterial()), []);
  const brilhosFixos = useRef([]);

  useLayoutEffect(() => {
    const materiais = new Map();
    sala.current.traverse((objeto) => {
      const lista = Array.isArray(objeto.material) ? objeto.material : [objeto.material];
      for (const material of lista) {
        if (material?.isMeshBasicMaterial && material !== monitor.current &&
            material !== ledPC.current && !matsTira.includes(material) && !matsTecla.includes(material)) {
          materiais.set(material, material.color.clone());
        }
      }
    });
    brilhosFixos.current = [...materiais];
  }, [sala, matsTira, matsTecla]);

  // tela do monitor (codigo sendo digitado)
  const tela = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    const cx = canvas.getContext("2d");
    cx.scale(4, 4);
    const tex = new THREE.CanvasTexture(canvas);
    function desenhar(t, desligado = false) {
      cx.fillStyle = "#0d1117";
      cx.fillRect(0, 0, 256, 144);
      if (desligado) {
        tex.needsUpdate = true;
        return;
      }
      const n = Math.min(Math.floor(t * 1.5) % (LINHAS.length + 4), LINHAS.length);
      for (let i = 0; i < n; i++) {
        cx.fillStyle = LINHAS[i][2];
        cx.fillRect(14 + LINHAS[i][0] * 16, 12 + i * 12, LINHAS[i][1], 6);
      }
      if (Math.floor(t * 3) % 2 === 0) {
        const u = n > 0 ? LINHAS[n - 1] : [0, 0];
        cx.fillStyle = "#ffffff";
        cx.fillRect(14 + u[0] * 16 + u[1] + 4, 11 + n * 12, 3, 8);
      }
      tex.needsUpdate = true;
    }
    desenhar(reduzir ? 6 : 0);
    return { tex, desenhar };
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (entrando) desligamento.current += delta;
    // PC: 0–0.85 s. Room LEDs: 0.95–2.15 s. Lateral page transition starts after 2.2 s.
    const pcAceso = 1 - THREE.MathUtils.smoothstep(desligamento.current, 0, 0.85);
    const ledAceso = 1 - THREE.MathUtils.smoothstep(desligamento.current, 0.95, 2.15);
    monitor.current.color.setScalar(pcAceso);
    ledPC.current.color.setHex(BRILHO[0][3]).multiplyScalar(pcAceso);
    brilhosFixos.current.forEach(([material, cor]) => {
      material.color.copy(cor).multiplyScalar(material.userData.desligarComPC ? pcAceso : ledAceso);
    });
    luzes.current.children.forEach((luz, i) => {
      const intensidade = i === 2 ? pcAceso : ledAceso;
      luz.intensity = [0.9, 1.3, 0.9, 1.1, 0.8][i] * Math.PI * intensidade;
    });
    const t = reduzir ? 0 : clock.elapsedTime;
    TIRAS.forEach((tr, i) => matsTira[i].color.setHSL((t * 0.08 + tr[6]) % 1, 1, 0.55).multiplyScalar(ledAceso));
    matsTecla.forEach((m, i) => m.color.setHSL((t * 0.15 + i / 14) % 1, 1, 0.5).multiplyScalar(pcAceso));
    maoE.current.position.y = 1.13 + Math.max(0, Math.sin(t * 14)) * 0.025;
    const mx = -0.28 + Math.sin(t * 0.9) * 0.04;
    const mz = -2.3 + Math.cos(t * 0.7) * 0.03;
    rato.current.position.x = mx;
    rato.current.position.z = mz;
    pulsoD.set(mx, 1.175, mz + 0.13);
    antebracoD.current.position.copy(cotoveloD).add(pulsoD).multiplyScalar(0.5);
    // Both joints are local to the room; lookAt would interpret the wrist as world coordinates.
    direcaoBracoD.subVectors(pulsoD, cotoveloD).normalize();
    antebracoD.current.quaternion.setFromUnitVectors(eixoBracoD, direcaoBracoD);
    antebracoD.current.scale.z = cotoveloD.distanceTo(pulsoD);
    if (clock.elapsedTime - ultimo.current > 0.15) {
      tela.desenhar(reduzir ? 6 : t, entrando && pcAceso === 0);
      ultimo.current = clock.elapsedTime;
    }
    if (!entrando && !reduzir) {
      // The shared ref points to a Three.js group animated outside React render.
      // eslint-disable-next-line react-hooks/immutability
      sala.current.rotation.y += (pointer.x * 0.55 - sala.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      <group ref={luzes}>
      <ambientLight color={0x3a2a66} intensity={0.9 * Math.PI} />
      <pointLight color={0xff3fd0} intensity={1.3 * Math.PI} distance={9} decay={0} position={[-1, 2, -1.6]} />
      <pointLight color={0x40ffd0} intensity={0.9 * Math.PI} distance={5} decay={0} position={[-1, 1.7, -2.3]} />
      <pointLight color={0xb050ff} intensity={1.1 * Math.PI} distance={7} decay={0} position={[2.4, 1.8, 1.2]} />
      <pointLight color={0x4a7aff} intensity={0.8 * Math.PI} distance={6} decay={0} position={[-2.4, 2, 0.6]} />

      </group>

      <group ref={sala}>
        {CAIXAS.map((d, i) => <Caixa key={"c" + i} d={d} estrutura={i < 3 ? i : undefined} />)}
        {BRILHO.map((d, i) => <Brilho key={"b" + i} d={d} materialRef={i === 0 ? ledPC : undefined} />)}
        {PLANOS.map((p, i) => (
          <mesh key={"p" + i} position={[p[3], p[4], p[5]]}>
            <planeGeometry args={[p[0], p[1]]} />
            <meshBasicMaterial color={p[2]} />
          </mesh>
        ))}
        {TIRAS.map((t, i) => (
          <mesh key={"t" + i} position={[t[3], t[4], t[5]]} material={matsTira[i]}>
            <boxGeometry args={[t[0], t[1], t[2]]} />
          </mesh>
        ))}
        {TECLAS.map((k, i) => (
          <mesh key={"k" + i} position={[k[2], 1.1, k[3]]} material={matsTecla[k[1]]}>
            <boxGeometry args={[k[0], 0.016, 0.044]} />
          </mesh>
        ))}

        {/* tela do monitor */}
        <mesh position={[-1, 1.65, -2.79]}>
          <planeGeometry args={[1.4, 0.75]} />
          <meshBasicMaterial ref={monitor} map={tela.tex} />
        </mesh>

        {/* tapetes */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0.03, 1]}>
          <circleGeometry args={[1.4, 40]} />
          <Mat cor={0x3a1f5c} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0.035, 1]}>
          <ringGeometry args={[1.05, 1.15, 40]} />
          <meshBasicMaterial color={0xb050ff} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 0.03, -1.5]}>
          <circleGeometry args={[0.75, 28]} />
          <Mat cor={0x1a1830} />
        </mesh>

        {/* base da cadeira, varao da cortina e caneca */}
        <mesh position={[-1, 0.05, -1.4]}>
          <cylinderGeometry args={[0.4, 0.4, 0.06, 5]} />
          <Mat cor={0x111118} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-2.85, 2.75, -0.5]}>
          <cylinderGeometry args={[0.025, 0.025, 2.6, 8]} />
          <Mat cor={0xb0aac8} />
        </mesh>
        <mesh position={[0.2, 1.11, -2.6]}>
          <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
          <Mat cor={0xeeeeee} />
        </mesh>

        {/* mouse */}
        <group ref={rato} position={[-0.28, 1.105, -2.3]}>
          <mesh>
            <boxGeometry args={[0.18, 0.08, 0.3]} />
            <meshStandardMaterial color={0xffffff} roughness={0.65} metalness={0} emissive={0xeceaff} emissiveIntensity={0.18} transparent={false} opacity={1} />
          </mesh>
          <mesh position={[-0.045, 0.044, -0.065]}>
            <boxGeometry args={[0.075, 0.008, 0.13]} />
            <Mat cor={0xeceaff} />
          </mesh>
          <mesh position={[0.045, 0.044, -0.065]}>
            <boxGeometry args={[0.075, 0.008, 0.13]} />
            <Mat cor={0xeceaff} />
          </mesh>
          <mesh position={[0, 0.051, -0.07]}>
            <boxGeometry args={[0.02, 0.018, 0.05]} />
            <meshBasicMaterial color={0xff3fa0} userData={{ desligarComPC: true }} />
          </mesh>
          {/* A mão acompanha o mouse sem atravessar a carcaça. */}
          <mesh position={[0, 0.07, 0.07]}>
            <boxGeometry args={[0.11, 0.045, 0.12]} />
            <Mat cor={PELE} />
          </mesh>
        </group>

        {/* pessoa programando */}
        <mesh position={[-1, 1.7, -1.33]}>
          <sphereGeometry args={[0.17, 16, 12]} />
          <Mat cor={PELE} />
        </mesh>
        <mesh position={[-1, 1.74, -1.28]} scale={[1, 0.85, 1]}>
          <sphereGeometry args={[0.18, 16, 12]} />
          <Mat cor={0x1a1020} />
        </mesh>
        <mesh position={[-1, 1.7, -1.33]}>
          <torusGeometry args={[0.2, 0.025, 8, 16, Math.PI]} />
          <meshBasicMaterial color={0x40ffd0} userData={{ desligarComPC: true }} />
        </mesh>
        {[-0.2, 0.2].map((dx) => (
          <mesh key={dx} rotation={[0, 0, Math.PI / 2]} position={[-1 + dx, 1.7, -1.33]}>
            <cylinderGeometry args={[0.075, 0.075, 0.06, 12]} />
            <meshBasicMaterial color={0xff3fa0} userData={{ desligarComPC: true }} />
          </mesh>
        ))}
        {MEMBROS.map((m, i) => (
          <Membro key={"m" + i} de={m[0]} ate={m[1]} w={m[2]} cor={m[3]} />
        ))}
        <mesh ref={maoE} position={[-1.2, 1.13, -2.3]}>
          <boxGeometry args={[0.12, 0.05, 0.14]} />
          <Mat cor={PELE} />
        </mesh>
        <mesh ref={antebracoD}>
          <boxGeometry args={[0.1, 0.1, 1]} />
          <Mat cor={MOLETOM} />
        </mesh>
      </group>
    </>
  );
}

export default function Quarto3D({ entrando = false }) {
  const sala = useRef();
  return (
    <Canvas
      orthographic
      legacy
      linear
      flat
      dpr={[1, 2]}
      camera={{ position: [9, 8.5, 9], near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <Camara />
      <Quarto sala={sala} entrando={entrando} />
    </Canvas>
  );
}

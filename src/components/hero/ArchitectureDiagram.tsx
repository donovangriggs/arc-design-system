import { motion } from 'framer-motion';

const ORBIT_RADIUS = 110;
const NODE_OFFSET = 32;
const PARTICLES_PER_FRAMEWORK = 3;
const PARTICLE_STAGGER_DELAY = 1.5;
const PARTICLE_DURATION = 4;

const CORE_GLOW_BASE = 'rgba(124,58,237,0.35)';
const CORE_GLOW_INNER = 'rgba(124,58,237,0.2)';
const CORE_GLOW_OUTER = 'rgba(124,58,237,0.25)';
const CORE_GLOW_BASE_BRIGHT = 'rgba(124,58,237,0.5)';
const CORE_GLOW_INNER_BRIGHT = 'rgba(124,58,237,0.3)';
const CORE_GLOW_OUTER_BRIGHT = 'rgba(124,58,237,0.35)';

const CORE_BOX_SHADOW_DIM = `0 0 60px ${CORE_GLOW_BASE}, inset 0 0 40px ${CORE_GLOW_INNER}, 0 0 100px ${CORE_GLOW_OUTER}`;
const CORE_BOX_SHADOW_BRIGHT = `0 0 80px ${CORE_GLOW_BASE_BRIGHT}, inset 0 0 60px ${CORE_GLOW_INNER_BRIGHT}, 0 0 120px ${CORE_GLOW_OUTER_BRIGHT}`;

interface FrameworkDef {
  readonly name: string;
  readonly color: string;
  readonly angle: number;
}

export const DIAGRAM_FRAMEWORKS: readonly FrameworkDef[] = [
  { name: 'React', color: '#61DAFB', angle: 315 },
  { name: 'Vue', color: '#42B883', angle: 45 },
  { name: 'Angular', color: '#DD0031', angle: 225 },
  { name: 'Svelte', color: '#FF3E00', angle: 135 },
];

interface ParticleData {
  readonly id: number;
  readonly delay: number;
  readonly duration: number;
  readonly color: string;
  readonly angle: number;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function Particle({ delay, duration, color, angle }: Omit<ParticleData, 'id'>) {
  const endX = Math.cos(toRadians(angle)) * ORBIT_RADIUS;
  const endY = Math.sin(toRadians(angle)) * ORBIT_RADIUS;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        left: '50%',
        top: '50%',
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, endX, 0],
        y: [0, endY, 0],
        opacity: [0, 1, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function ConnectionLine({ angle, color }: { readonly angle: number; readonly color: string }) {
  return (
    <motion.div
      className="absolute origin-left"
      style={{
        left: '50%',
        top: '50%',
        width: ORBIT_RADIUS,
        height: 2,
        background: `linear-gradient(90deg, ${color}80, transparent)`,
        transform: `rotate(${angle}deg)`,
        boxShadow: `0 0 10px ${color}40`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  );
}

function FrameworkNode({
  name,
  color,
  angle,
  index,
}: {
  readonly name: string;
  readonly color: string;
  readonly angle: number;
  readonly index: number;
}) {
  const x = Math.cos(toRadians(angle)) * ORBIT_RADIUS;
  const y = Math.sin(toRadians(angle)) * ORBIT_RADIUS;

  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%', x: x - NODE_OFFSET, y: y - NODE_OFFSET }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="relative w-16 h-16 rounded-xl flex items-center justify-center font-bold cursor-pointer"
        style={{
          backgroundColor: `${color}20`,
          border: `2px solid ${color}`,
          boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
          color: 'var(--arc-color-neutral-900)',
        }}
        animate={{
          boxShadow: [
            `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
            `0 0 50px ${color}60, inset 0 0 30px ${color}30`,
            `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ background: `radial-gradient(circle at center, ${color}30, transparent)` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="relative z-10 text-sm">{name}</span>
      </motion.div>
    </motion.div>
  );
}

function CoreNode() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
    >
      <motion.div
        className="relative w-22 h-22 rounded-2xl flex items-center justify-center font-bold"
        style={{
          backgroundColor: 'var(--arc-color-primary-500)20',
          border: '3px solid var(--arc-color-primary-500)',
          color: 'var(--arc-color-neutral-900)',
          boxShadow: CORE_BOX_SHADOW_DIM,
        }}
        animate={{
          boxShadow: [CORE_BOX_SHADOW_DIM, CORE_BOX_SHADOW_BRIGHT, CORE_BOX_SHADOW_DIM],
        }}
        transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ border: '2px solid var(--arc-color-primary-400)', opacity: 0.3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-2xl"
          style={{ border: '2px solid var(--arc-color-primary-300)', opacity: 0.2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.3), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10 text-center">
          <div className="text-lg">Stencil</div>
          <div className="text-xs opacity-80">Core</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const PARTICLES: readonly ParticleData[] = DIAGRAM_FRAMEWORKS.flatMap((fw, idx) =>
  Array.from({ length: PARTICLES_PER_FRAMEWORK }, (_, i) => ({
    id: idx * PARTICLES_PER_FRAMEWORK + i,
    delay: i * PARTICLE_STAGGER_DELAY,
    duration: PARTICLE_DURATION,
    color: fw.color,
    angle: fw.angle,
  }))
);

export function ArchitectureDiagram() {

  return (
    <div
      className="relative w-full max-w-3xl mx-auto h-[320px] rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--arc-color-primary-200)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {DIAGRAM_FRAMEWORKS.map((fw) => (
          <ConnectionLine key={`line-${fw.name}`} angle={fw.angle} color={fw.color} />
        ))}

        {PARTICLES.map((p) => (
          <Particle key={p.id} delay={p.delay} duration={p.duration} color={p.color} angle={p.angle} />
        ))}

        <CoreNode />

        {DIAGRAM_FRAMEWORKS.map((fw, index) => (
          <FrameworkNode key={fw.name} name={fw.name} color={fw.color} angle={fw.angle} index={index} />
        ))}
      </div>
    </div>
  );
}

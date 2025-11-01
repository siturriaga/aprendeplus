import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useMemo } from 'react';

function getPhase(hour: number) {
  if (hour >= 5 && hour <= 11) return 'morning';
  if (hour >= 12 && hour <= 16) return 'afternoon';
  if (hour >= 17 && hour <= 20) return 'evening';
  return 'night';
}

const phaseConfig = {
  morning: {
    greeting: 'Good Morning',
    gradient: 'from-amber-200/60 via-royal/40 to-slate-900/80',
    icon: 'sun'
  },
  afternoon: {
    greeting: 'Good Afternoon',
    gradient: 'from-sky-200/50 via-royal/30 to-slate-900/80',
    icon: 'sun'
  },
  evening: {
    greeting: 'Good Evening',
    gradient: 'from-orange-300/50 via-royal/30 to-slate-900/80',
    icon: 'sunset'
  },
  night: {
    greeting: 'Good Night',
    gradient: 'from-indigo-400/40 via-royal/50 to-slate-900/90',
    icon: 'moon'
  }
} as const;

const iconMap = {
  sun: (
    <svg viewBox="0 0 120 120" className="h-16 w-16">
      <defs>
        <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F8C53A" />
          <stop offset="100%" stopColor="#FF9248" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="28" fill="url(#sun-gradient)" />
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * Math.PI) / 6;
        const x1 = 60 + Math.cos(angle) * 40;
        const y1 = 60 + Math.sin(angle) * 40;
        const x2 = 60 + Math.cos(angle) * 52;
        const y2 = 60 + Math.sin(angle) * 52;
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F8C53A"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.8}
          />
        );
      })}
    </svg>
  ),
  sunset: (
    <svg viewBox="0 0 120 120" className="h-16 w-16">
      <defs>
        <linearGradient id="sunset-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB75E" />
          <stop offset="100%" stopColor="#ED8F03" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="70" r="28" fill="url(#sunset-gradient)" />
      <rect x="20" y="85" width="80" height="10" rx="5" fill="#F8C53A" opacity={0.7} />
      <rect x="10" y="95" width="100" height="8" rx="4" fill="#5A4BFF" opacity={0.4} />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 120 120" className="h-16 w-16">
      <defs>
        <radialGradient id="moon-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#A3BFFA" />
        </radialGradient>
      </defs>
      <path
        d="M78 20c-20 4-35 21.5-35 42s15 38 35 42c-10 6-22 7-33 2-16-7-26-24-26-42s10-35 26-42c11-5 23-4 33 2z"
        fill="url(#moon-gradient)"
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <circle
          key={index}
          cx={30 + index * 14}
          cy={30 + (index % 2) * 12}
          r={3}
          fill="#fff"
          opacity={0.6}
        />
      ))}
    </svg>
  )
};

export function DynamicWelcome({ displayName }: { displayName: string }) {
  const hour = useMemo(() => new Date().getHours(), []);
  const phase = getPhase(hour);
  const { gradient, greeting, icon } = phaseConfig[phase];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const translate = useMotionTemplate`translate3d(${mouseX.get() * 10}px, ${mouseY.get() * 10}px, 0)`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} px-6 py-4 shadow-glass`}
    >
      <motion.div style={{ transform: translate }} className="absolute -right-6 -top-6 opacity-90">
        {iconMap[icon]}
      </motion.div>
      <div className="relative z-10">
        <motion.p
          key={greeting}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.35em] text-slate-100/80"
        >
          {greeting}
        </motion.p>
        <motion.h1
          key={displayName}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-2xl lg:text-3xl"
        >
          {displayName.includes(' ')
            ? `Hi, ${displayName.split(' ')[0]} 👋`
            : `Hi, ${displayName} 👋`}
        </motion.h1>
      </div>
    </motion.div>
  );
}

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Q = { q: string; a: string[]; correct: number };

const POOLS: Q[][] = [
  [
    { q: "Seleccione el artículo correcto: ___ apple", a: ["a", "an", "the"], correct: 1 },
    { q: "El plural de “book” es…", a: ["books", "bookes", "book"], correct: 0 },
    { q: "“I ___ a student.”", a: ["am", "is", "are"], correct: 0 }
  ],
  [
    { q: "El pasado de “go” es…", a: ["goed", "goes", "went"], correct: 2 },
    { q: "Seleccione el comparativo correcto: “fast” →", a: ["more fast", "faster", "fastest"], correct: 1 },
    { q: "¿Cuál es correcto? “She has lived here ___ 2019.”", a: ["since", "for", "from"], correct: 0 }
  ],
  [
    { q: "El condicional: “If I ___ more time, I would travel.”", a: ["have", "had", "would have"], correct: 1 },
    { q: "Seleccione el “phrasal verb” correcto: “to look ___ information”", a: ["after", "up", "out"], correct: 1 },
    { q: "“Hardly ___ he arrived when it started to rain.”", a: ["had", "has", "did"], correct: 0 }
  ]
];

export default function EnglishTest() {
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const qs = POOLS[level];
  const current = qs[index];

  function answer(i: number) {
    const correct = i === current.correct;
    setScore((s) => s + (correct ? 1 : 0));
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);

    const nextIndex = index + 1;
    if (nextIndex < qs.length) {
      setIndex(nextIndex);
    } else {
      if (newStreak >= 2 && level < POOLS.length - 1) {
        setLevel(level + 1);
        setIndex(0);
      } else if (!correct && level > 0) {
        setLevel(level - 1);
        setIndex(0);
      } else {
        setDone(true);
      }
    }
  }

  const cefr = useMemo(() => {
    const total = score;
    if (total <= 2) return "A1";
    if (total <= 4) return "A2";
    if (total <= 6) return "B1";
    if (total <= 8) return "B2";
    if (total <= 9) return "C1";
    return "C2";
  }, [score]);

  if (done) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl w-full p-8 rounded-3xl border border-amber-400/80 bg-gradient-to-br from-blue-800/90 to-amber-700/90 shadow-lg">
          <h1 className="text-3xl font-extrabold text-amber-200">Resultado del Test</h1>
          <p className="mt-4">Puntaje: <strong>{score}</strong></p>
          <p className="mt-2">Estimación CEFR: <span className="font-bold text-amber-200">{cefr}</span></p>
          <div className="mt-6 flex gap-3">
            <Link to="/" className="px-6 py-3 rounded-2xl border border-amber-400/80 hover:bg-amber-500">Volver al inicio</Link>
            <a href="/#contacto" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110">Quiero clases</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto p-8 rounded-3xl border border-amber-400/80 bg-gradient-to-br from-blue-800/90 to-amber-700/90 shadow-lg">
        <h1 className="text-3xl font-extrabold text-amber-200">Test de nivel de inglés</h1>
        <p className="mt-2 text-amber-100">Dificultad adaptativa: si respondes bien, sube de nivel; si fallas, puede bajar para afinar el estimado.</p>
        <div className="mt-6">
          <p className="text-lg">{current.q}</p>
          <div className="mt-4 grid gap-3">
            {current.a.map((opt, i) => (
              <button key={i} onClick={() => answer(i)} className="px-4 py-3 rounded-xl border border-amber-400/80 hover:bg-amber-500 hover:text-white">
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 text-sm text-amber-100">Nivel actual: {level + 1} / {POOLS.length}</div>
        <div className="mt-1 text-sm text-amber-100">Correctas acumuladas: {score}</div>
        <div className="mt-6"><Link to="/" className="underline decoration-amber-400 underline-offset-4">Volver</Link></div>
      </div>
    </div>
  );
}

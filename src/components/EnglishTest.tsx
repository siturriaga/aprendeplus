// src/components/EnglishTest.tsx
import React, { useMemo, useState } from 'react';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { THEME } from '../data/content';

type Q = { q: string; a: string[]; correct: number };
type EnglishTestProps = { onBack: () => void };

const EnglishTest: React.FC<EnglishTestProps> = ({ onBack }) => {
  const POOLS: Q[][] = useMemo(() => [
    [
      { q: "Seleccione el artículo correcto: ___ apple.", a: ["a", "an", "the"], correct: 1 },
      { q: "El plural de “book” es…", a: ["books", "bookes", "book"], correct: 0 },
      { q: "“I ___ a student.”", a: ["am", "is", "are"], correct: 0 }
    ],
    [
      { q: "El pasado de “go” es…", a: ["goed", "goes", "went"], correct: 2 },
      { q: "Seleccione el comparativo correcto: “fast” →", a: ["more fast", "faster", "fastest"], correct: 1 },
      { q: "Seleccione la opción correcta: “She has lived here ___ 2019.”", a: ["since", "for", "from"], correct: 0 }
    ],
    [
      { q: "El condicional: “If I ___ more time, I would travel.”", a: ["have", "had", "would have"], correct: 1 },
      { q: "Seleccione el “phrasal verb” correcto: “to look ___ information”", a: ["after", "up", "out"], correct: 1 },
      { q: "“Hardly ___ he arrived when it started to rain.”", a: ["had", "has", "did"], correct: 0 }
    ]
  ], []);

  const [level, setLevel] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = useMemo(() => {
    return POOLS[level]?.[questionIndex];
  }, [level, questionIndex, POOLS]);

  const answer = (i: number) => {
    let newCorrect = correct;
    let newIncorrect = incorrect;

    if (current && i === current.correct) {
      newCorrect = newCorrect + 1;
      setCorrect(newCorrect);
    } else {
      newIncorrect = newIncorrect + 1;
      setIncorrect(newIncorrect);
    }

    if (newCorrect > newIncorrect && level < POOLS.length - 1) {
      setLevel(l => l + 1);
      setQuestionIndex(0);
    } else if (newIncorrect >= newCorrect && level > 0) {
      setLevel(l => l - 1);
      setQuestionIndex(0);
    } else {
      if (questionIndex < POOLS[level].length - 1) {
        setQuestionIndex(q => q + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  if (showResult) {
    const score = Math.round((correct / (correct + incorrect)) * 100) || 0;
    let levelText = "";
    if (score >= 80) levelText = "Avanzado";
    else if (score >= 60) levelText = "Intermedio";
    else if (score >= 40) levelText = "Básico";
    else levelText = "Principiante";

    return (
      <div className="min-h-screen bg-white text-gray-900 p-6">
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-amber-400/80 bg-white shadow-lg text-center">
          <CheckCircle2 className="h-16 w-16 mx-auto text-amber-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-amber-800">Test completado</h1>
          <p className="mt-2 text-gray-700">Has respondido a {correct + incorrect} preguntas.</p>
          <div className="mt-6 text-xl font-bold">
            <p className="text-gray-900">Puntuación: {score}%</p>
            <p className="text-amber-600">Nivel estimado: {levelText}</p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors">Volver al inicio</button>
            <a href="#contact" className="px-6 py-3 rounded-2xl bg-amber-400 text-white font-bold hover:brightness-110">Quiero clases</a>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-6 flex items-center justify-center">
        <p className="text-lg">Cargando preguntas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-xl mx-auto p-8 rounded-3xl border border-amber-400/80 bg-white shadow-lg">
        <h1 className="font-serif text-3xl font-extrabold text-amber-800">Test de nivel de inglés</h1>
        <p className="mt-2 text-gray-700">Dificultad adaptativa: si respondes bien, sube de nivel; si fallas, puede bajar para afinar el estimado.</p>
        <div className="mt-6">
          <p className="text-lg">{current.q}</p>
          <div className="mt-4 grid gap-3">
            {current.a.map((opt, i) => (
              <button key={i} onClick={() => answer(i)} className="px-4 py-3 rounded-xl border border-amber-400/80 text-gray-900 hover:bg-amber-400 hover:text-white transition-colors">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishTest;

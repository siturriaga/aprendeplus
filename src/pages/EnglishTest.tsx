import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const questions = useMemo(() => POOLS[Math.min(level, POOLS.length - 1)], [level]);
  const currentQuestion = questions[questionIndex];

  const handleAnswer = (index: number) => {
    setUserAnswer(index);
    const isCorrect = index === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
      setLevel(level + 1);
    } else {
      setLevel(Math.max(0, level - 1));
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setShowResult(false);
      setUserAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const resetTest = () => {
    setLevel(0);
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
    setShowResult(false);
    setUserAnswer(null);
  };

  const getResult = () => {
    if (level === 0) return "A1";
    if (level === 1) return "A2";
    if (level === 2) return "B1";
    if (level === 3) return "B2";
    return "C1";
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-brand-dark text-white p-6 flex flex-col items-center justify-center">
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-brand-amber/80 bg-brand-dark/80 backdrop-blur-sm shadow-2xl text-center animate-fade-in">
          <h2 className="text-4xl font-extrabold text-brand-amber">Test Completado</h2>
          <p className="mt-4 text-xl">Tu nivel estimado de inglés es:</p>
          <p className="text-6xl md:text-8xl font-black text-white mt-4 animate-pulse-light">{getResult()}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={resetTest} className="px-6 py-3 rounded-full border-2 border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-brand-dark transition-colors duration-300">
              Reintentar
            </button>
            <a href="/#contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-amber to-amber-500 hover:from-amber-500 hover:to-brand-amber text-brand-dark font-bold shadow-lg transition-all duration-300 shine-effect">
              Quiero clases
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white p-6 flex items-center justify-center">
      <motion.div
        key={questionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto p-8 rounded-3xl border border-brand-amber/80 bg-brand-dark/80 backdrop-blur-sm shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold text-brand-amber">Test de nivel de inglés</h1>
        <p className="mt-2 text-brand-light">Dificultad adaptativa: si respondes bien, sube de nivel; si fallas, puede bajar para afinar el estimado.</p>
        <div className="mt-6">
          <p className="text-lg text-white font-medium">{currentQuestion.q}</p>
          <div className="mt-4 grid gap-3">
            {currentQuestion.a.map((opt, i) => (
              <motion.button
                key={i}
                onClick={() => !showResult && handleAnswer(i)}
                className={`px-4 py-3 rounded-xl border border-brand-amber/80 text-white transition-all duration-300
                  ${showResult ? (i === currentQuestion.correct ? 'bg-green-500/30' : (userAnswer === i ? 'bg-red-500/30' : 'opacity-50')) : 'hover:bg-brand-amber hover:text-brand-dark'}`}
                disabled={showResult}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl font-semibold text-white ${userAnswer === currentQuestion.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}
            >
              {userAnswer === currentQuestion.correct ? "¡Correcto!" : "Incorrecto."} La respuesta correcta era: **{currentQuestion.a[currentQuestion.correct]}**
              <div className="mt-4 flex justify-center">
                <button onClick={nextQuestion} className="px-6 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-brand-amber hover:text-brand-dark transition-colors">Siguiente Pregunta</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

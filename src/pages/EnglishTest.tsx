import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * Configura en .env:
 * VITE_EMAILJS_SERVICE_ID=xxx
 * VITE_EMAILJS_TEMPLATE_ID=xxx
 * VITE_EMAILJS_PUBLIC_KEY=xxx
 * En tu plantilla usa variables: user_score, user_level, details
 */

type Q = { q: string; a: string[]; correct: number; weight: number };
const qs: Q[] = [
  // A1-A2
  { q: "I ___ a book now.", a: ["am read", "am reading", "readed"], correct: 1, weight: 1 },
  { q: "She ___ to school yesterday.", a: ["goes", "went", "gone"], correct: 1, weight: 1 },
  { q: "Choose the correct article: ___ apple is red.", a: ["A", "An", "The"], correct: 1, weight: 1 },
  { q: "We ___ in Santiago.", a: ["are live", "lives", "live"], correct: 2, weight: 1 },
  // B1
  { q: "If it ___ tomorrow, we'll stay home.", a: ["rains", "will rain", "rained"], correct: 0, weight: 2 },
  { q: "I have lived here ___ 2019.", a: ["since", "for", "from"], correct: 0, weight: 2 },
  // B2
  { q: "Select the correct passive: They built the bridge in 1990.", a: ["The bridge built in 1990.", "The bridge was built in 1990.", "The bridge was build in 1990."], correct: 1, weight: 3 },
  { q: "Choose the best connector: She studied hard; ___, she passed.", a: ["however", "therefore", "despite"], correct: 1, weight: 3 },
  // C1
  { q: "Pick the closest meaning: 'meticulous'", a: ["careless", "thorough", "average"], correct: 1, weight: 4 },
  { q: "Choose the best option: 'Had I known about the class, I ___ earlier.'", a: ["would have enrolled", "will enroll", "enrolled"], correct: 0, weight: 4 },
  // Listening/Reading proxy (cloze/phrase)
  { q: "Complete: 'By no means ___ this easy.'", a: ["is", "it is", "it"], correct: 0, weight: 4 },
  { q: "Which is correct: 'I look forward to ___ from you.'", a: ["hear", "hearing", "to hear"], correct: 1, weight: 3 },
];

const thresholds = [
  { level: "A1", max: 6 },
  { level: "A2", max: 12 },
  { level: "B1", max: 18 },
  { level: "B2", max: 26 },
  { level: "C1", max: 34 },
  { level: "C2", max: 100 },
];

const EnglishTest: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [sent, setSent] = useState<null | { ok: boolean }>(null);

  const current = qs[idx];
  const total = useMemo(() => qs.reduce((s, q) => s + q.weight, 0), []);
  const progress = Math.round((answers.length / qs.length) * 100);

  const select = (i: number) => {
    const correct = i === current.correct;
    setAnswers((a) => [...a, i]);
    if (correct) setScore((s) => s + current.weight);
    setTimeout(() => setIdx((v) => Math.min(v + 1, qs.length)), 120);
  };

  const level = thresholds.find(t => score <= t.max)?.level ?? "C2";

  const sendEmail = async () => {
    try {
      const details = qs.map((q, i) => {
        const pick = answers[i];
        const ok = pick === q.correct ? "✓" : "✗";
        return `${i + 1}. ${q.q} -> ${q.a[pick]} (${ok})`;
      }).join("\n");

      const params = {
        user_score: `${score}/${total}`,
        user_level: level,
        details,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent({ ok: true });
    } catch (e) {
      setSent({ ok: false });
    }
  };

  const finished = answers.length === qs.length;

  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-rose-400">Prueba de Nivel de Inglés</h2>
        <p className="mt-3 text-center text-gray-200">Basada en criterios CEFR (A1–C1). Al finalizar enviaremos tu resultado a nuestro correo y te contactaremos.</p>

        {!finished ? (
          <div className="mt-10 p-8 rounded-3xl card-glass">
            <div className="text-sm opacity-80">Progreso: {progress}%</div>
            <p className="text-xl mt-2">{current.q}</p>
            <div className="mt-6 grid gap-3">
              {current.a.map((ans, i) => (
                <button key={i} onClick={() => select(i)} className="w-full text-left px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20">
                  {ans}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm opacity-80">Pregunta {idx + 1} de {qs.length}</p>
          </div>
        ) : (
          <div className="mt-10 p-8 rounded-3xl card-glass text-center">
            <p className="text-2xl">Puntaje: <strong>{score}</strong> / {total}</p>
            <p className="mt-2">Nivel estimado: <strong>{level}</strong></p>
            <button onClick={sendEmail} className="mt-4 px-6 py-3 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold shadow-lg">
              Enviar resultado por correo
            </button>
            {sent && (
              <p className={`mt-2 text-sm ${sent.ok ? "text-sky-300" : "text-rose-300"}`}>
                {sent.ok ? "¡Enviado! Nos pondremos en contacto." : "No se pudo enviar. Reintenta o escríbenos directamente."}
              </p>
            )}
            <div className="mt-4">
              <a href="/english" className="text-sky-300 hover:underline">Volver a Inglés →</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnglishTest;

import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

type Level = "A1" | "A2" | "B1" | "B2" | "C1";
type Q = { id: string; level: Level; prompt: string; options: string[]; answer: number };

const BANK: Q[] = [
  { id: "a1-1", level: "A1", prompt: "Choose the correct article: __ apple.", options: ["a", "an", "the", "—"], answer: 1 },
  { id: "a1-2", level: "A1", prompt: "He ___ from Chile.", options: ["am", "is", "are", "be"], answer: 1 },
  { id: "a2-1", level: "A2", prompt: "I have lived here ___ 2018.", options: ["for", "since", "during", "from"], answer: 1 },
  { id: "a2-2", level: "A2", prompt: "We ___ lunch when she called.", options: ["have", "were having", "had", "are having"], answer: 1 },
  { id: "b1-1", level: "B1", prompt: "If I ___ more time, I would study French.", options: ["have", "had", "will have", "would have"], answer: 1 },
  { id: "b1-2", level: "B1", prompt: "They suggested ___ earlier.", options: ["to leave", "leaving", "leave", "left"], answer: 1 },
  { id: "b2-1", level: "B2", prompt: "The book, ___ I bought yesterday, is excellent.", options: ["that", "which", "what", "who"], answer: 1 },
  { id: "b2-2", level: "B2", prompt: "Hardly ___ had we arrived when it started to rain.", options: ["never", "scarcely", "hardly", "rarely"], answer: 2 },
  { id: "c1-1", level: "C1", prompt: "His results were ___ expectations.", options: ["beneath", "under", "below", "beyond"], answer: 3 },
  { id: "c1-2", level: "C1", prompt: "Choose the best paraphrase: \"She dismissed the idea out of hand.\"", options: ["considered it carefully", "rejected it immediately", "ignored it later", "accepted it reluctantly"], answer: 1 }
];

const ORDER: Level[] = ["A1","A2","B1","B2","C1"];

// EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

export default function EnglishTest() {
  const groups = useMemo(() => {
    const map: Record<Level, Q[]> = {A1:[],A2:[],B1:[],B2:[],C1:[]};
    BANK.forEach(q => map[q.level].push(q));
    return map;
  }, []);

  const [levelIndex, setLevelIndex] = useState(2); // start at B1
  const [asked, setAsked] = useState<string[]>([]);
  const [current, setCurrent] = useState<Q>(() => groups["B1"][0]);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  const nextQuestion = (lastCorrect: boolean) => {
    const newTotal = total + 1;
    const newCorrect = lastCorrect ? correct + 1 : correct;
    setTotal(newTotal); setCorrect(newCorrect);

    if (newTotal >= 10) { setDone(true); return; }

    let idx = levelIndex + (lastCorrect ? 1 : -1);
    idx = Math.max(0, Math.min(ORDER.length - 1, idx));
    setLevelIndex(idx);

    const lvl = ORDER[idx];
    const pool = groups[lvl].filter(q => !asked.includes(q.id));
    const next = pool[Math.floor(Math.random() * pool.length)] || groups[lvl][0];
    setAsked(a => [...a, next.id]); setCurrent(next);
  };

  const onAnswer = (choice: number) => nextQuestion(choice === current.answer);

  const estimatedLevel = useMemo<Level>(() => {
    const ratio = total ? correct / total : 0;
    const idx = Math.min(ORDER.length - 1, Math.max(0, Math.round(levelIndex + (ratio - 0.5) * 2)));
    return ORDER[idx];
  }, [correct, total, levelIndex]);

  const sendResults = async () => {
    await emailjs.send(
      EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
      {
        to_email: "adaprendemas@outlook.com",
        user_email: email,
        score: `${correct}/${total}`,
        level: estimatedLevel,
        form: "Prueba de Inglés"
      },
      EMAILJS_PUBLIC_KEY
    );
    await fetch("/", {
      method: "POST",
      headers: {"Content-Type":"application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        "form-name":"english-test",
        email,
        score:`${correct}/${total}`,
        level:estimatedLevel
      }).toString()
    });
    alert("Resultados enviados. ¡Gracias!");
  };

  if (!done) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-rose-400">Prueba Adaptativa de Inglés</h1>
        <p className="mt-3 text-gray-300">Responde 10 preguntas. El nivel se ajusta según tu desempeño.</p>
        <div className="card-glass p-6 mt-8">
          <p className="text-lg">{current.prompt}</p>
          <div className="mt-4 grid gap-3">
            {current.options.map((opt, i) => (
              <button key={i} onClick={()=>onAnswer(i)} className="btn-outline text-left">{opt}</button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">Progreso: {total}/10</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-extrabold text-rose-400">Resultado</h2>
      <p className="mt-2">Puntaje: <span className="font-bold">{correct}/{total}</span> • Nivel estimado: <span className="font-bold">{estimatedLevel}</span></p>
      <div className="card-glass p-6 mt-6">
        <label className="text-sm text-gray-300">Correo para enviar tus resultados</label>
        <input className="mt-2 w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950" type="email" placeholder="tu@correo.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button disabled={!email} onClick={sendResults} className="btn-primary mt-4">Enviar resultados</button>
      </div>
    </section>
  );
}

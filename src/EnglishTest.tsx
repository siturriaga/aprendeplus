import React, { useMemo, useState } from "react";

export default function EnglishTest() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="p-8 rounded-3xl border border-amber-400/80 bg-gradient-to-br from-blue-800/90 to-amber-700/90 shadow-lg">
        <h1 className="text-3xl font-extrabold text-amber-200">Test de Inglés</h1>
        <p className="mt-4">Demo page placeholder for adaptive test.</p>
        <button onClick={() => setCount(count + 1)} className="mt-4 px-6 py-3 rounded-xl bg-amber-500">Click {count}</button>
      </div>
    </div>
  );
}

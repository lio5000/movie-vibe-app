"use client";

import { AlertCircle } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="w-12 h-12 text-rose-500" />
      <h2 className="text-xl font-bold">Algo salió mal</h2>
      <p className="text-slate-400 text-sm max-w-md">
        No pudimos obtener la información en este momento.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}

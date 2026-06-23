import Link from "next/link";
import { ArrowRight, Code, MessageSquare, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <MessageSquare className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SPEEK</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/playground"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Playground
            </Link>
            <a
              href="https://github.com/bocchi277/Speek-Scripting-Engine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 py-16">
        <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            Live Web Playground
          </div>

          {/* Hero Section */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
            Speek — Programming in{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              Simple English
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed">
            Write code using natural language and execute it instantly. No brackets, no semicolons, no boilerplate. Just words that execute.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/playground"
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all transform hover:-translate-y-0.5"
            >
              Start Coding
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/bocchi277/Speek-Scripting-Engine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 px-8 text-zinc-300 hover:text-white transition-all"
            >
              <Code className="w-5 h-5" />
              View Source
            </a>
          </div>

          {/* Code Preview Card */}
          <div className="w-full max-w-2xl mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md p-6 md:p-8 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-zinc-500 font-mono">hello_world.speek</span>
            </div>

            <div className="font-mono text-sm md:text-base space-y-2 text-zinc-300">
              <div>
                <span className="text-emerald-400">let</span> score{" "}
                <span className="text-emerald-400">be</span> 85
              </div>
              <div>
                <span className="text-emerald-400">if</span> score is greater than 50{" "}
                <span className="text-emerald-400">then</span>
              </div>
              <div className="pl-6 text-zinc-400 border-l border-zinc-800">
                <span className="text-emerald-400">say</span> &quot;You passed!&quot;
              </div>
              <br />
              <div className="text-zinc-500 font-sans text-xs border-t border-zinc-800/80 pt-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                No boilerplate needed. Standard control flow and assignments work naturally.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-8 text-center text-sm text-zinc-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Speek Scripting Engine. Built from scratch in Java.</p>
          <div className="flex gap-6">
            <Link href="/playground" className="hover:text-zinc-400 transition-colors">
              Playground
            </Link>
            <a
              href="https://github.com/bocchi277/Speek-Scripting-Engine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

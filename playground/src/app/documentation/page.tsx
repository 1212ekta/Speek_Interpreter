import Link from "next/link";
import { SPEEK_DOCS } from "../data/speekData";
import { BookOpen, Terminal, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";

export default function Documentation() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-105">
              <MessageSquare className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SPEEK</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/playground"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Playground
            </Link>
            <Link
              href="/documentation"
              className="text-sm font-medium text-white underline decoration-emerald-500 decoration-2 underline-offset-4"
            >
              Documentation
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="flex items-center gap-2 text-zinc-400 font-semibold text-sm uppercase tracking-wider pb-2 border-b border-zinc-900">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Language Guide
            </div>
            <nav className="flex flex-col gap-1.5">
              {SPEEK_DOCS.map((doc) => (
                <a
                  key={doc.id}
                  href={`#${doc.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-800"
                >
                  {doc.title}
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Docs Content */}
          <div className="flex-1 space-y-16">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Speek Language Reference
              </h1>
              <p className="text-zinc-400 leading-relaxed max-w-2xl">
                Welcome to the Speek documentation! Speek is designed to be read like a sentence. Learn the full syntax of the language in under 5 minutes below.
              </p>
            </div>

            <div className="space-y-16">
              {SPEEK_DOCS.map((doc) => (
                <section
                  key={doc.id}
                  id={doc.id}
                  className="scroll-mt-24 space-y-4 border-t border-zinc-900 pt-10 first:border-0 first:pt-0"
                >
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded bg-emerald-500 inline-block" />
                    {doc.title}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {doc.description}
                  </p>

                  {/* Render Example code block if present */}
                  {doc.code && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="rounded-xl border border-zinc-850 bg-zinc-900/40 p-4 relative">
                        <span className="absolute top-2 right-3 text-[10px] font-mono text-zinc-600 uppercase">
                          Source Code
                        </span>
                        <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap pt-4 leading-relaxed">
                          {doc.code}
                        </pre>
                      </div>

                      <div className="rounded-xl border border-zinc-850 bg-zinc-950 p-4 relative flex flex-col justify-between min-h-[100px]">
                        <span className="absolute top-2 right-3 text-[10px] font-mono text-zinc-600 uppercase">
                          Console Output
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
                          <Terminal className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">console</span>
                        </div>
                        <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                          {doc.output}
                        </pre>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Call to action */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="space-y-1.5 text-center md:text-left">
                <h3 className="font-bold text-white text-lg">Ready to write some Speek?</h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Head over to the playground sandbox and run your scripts instantly against the REST service.
                </p>
              </div>
              <Link
                href="/playground"
                className="flex items-center gap-2 h-11 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0"
              >
                Open Playground Sandbox
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-8 text-center text-sm text-zinc-600 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Speek Scripting Engine. Built from scratch in Java.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-zinc-400 transition-colors">
              Home
            </Link>
            <Link href="/playground" className="hover:text-zinc-400 transition-colors">
              Playground
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

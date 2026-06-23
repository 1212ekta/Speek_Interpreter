"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import { Play, Trash2, ArrowLeft, Terminal as TerminalIcon, Sparkles, AlertCircle, CheckCircle, BookOpen, ChevronRight, HelpCircle } from "lucide-react";
import { SPEEK_EXAMPLES, SPEEK_COMMANDS } from "../data/speekData";

// Default template code
const DEFAULT_CODE = `let age be 20

if age > 18 then
    say "Adult"`;

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSidebar, setShowSidebar] = useState(true);

  // API Response Interface
  interface RunResponse {
    success: boolean;
    output: string;
    errors: string[];
  }

  // Connects to the real Spring Boot API endpoint
  const runCodeOnApi = async (sourceCode: string) => {
    setIsRunning(true);
    setStatus("idle");
    setOutput("");
    setErrors([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    try {
      const response = await fetch(`${apiUrl}/api/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: sourceCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data: RunResponse = await response.json();

      setOutput(data.output);
      setErrors(data.errors);
      setStatus(data.success && data.errors.length === 0 ? "success" : "error");
    } catch (err: any) {
      // Handle network failures, backend unavailable message
      setStatus("error");
      setOutput("");
      setErrors([
        "Network connection failed.",
        `Backend service appears to be unavailable at ${apiUrl}`,
        "Please verify the Spring Boot server is running on port 8080 and CORS is enabled.",
        err.message || String(err)
      ]);
    } finally {
      setIsRunning(false);
    }
  };
  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setOutput("");
    setErrors([]);
    setStatus("idle");
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setErrors([]);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-white uppercase">SPEEK</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Sandbox
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/documentation"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Documentation
          </Link>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
              showSidebar
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showSidebar ? "Hide Help" : "Show Help"}
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Help Sidebar (Examples & Quick Reference) */}
        {showSidebar && (
          <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-zinc-800/80 shrink-0 flex flex-col bg-zinc-950 overflow-y-auto p-5 space-y-6">
            
            {/* Examples Panel */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Load Examples
              </h3>
              <div className="flex flex-col gap-2">
                {SPEEK_EXAMPLES.map((eg) => (
                  <button
                    key={eg.id}
                    onClick={() => loadExample(eg.code)}
                    className="text-left p-3 rounded-lg border border-zinc-900 hover:border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/50 transition-all group"
                  >
                    <div className="font-semibold text-xs text-white group-hover:text-emerald-400 transition-colors">
                      {eg.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                      {eg.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Reference Panel */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                Quick Reference
              </h3>
              <div className="space-y-2">
                {SPEEK_COMMANDS.map((cmd) => (
                  <details
                    key={cmd.name}
                    className="group border border-zinc-900 rounded-lg bg-zinc-900/10 p-2.5 overflow-hidden"
                  >
                    <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-mono font-semibold text-zinc-300 hover:text-white select-none">
                      <span className="text-emerald-400">{cmd.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="mt-2.5 text-[10px] text-zinc-400 space-y-2 leading-relaxed">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Syntax</div>
                      <code className="block bg-zinc-950 p-1.5 rounded border border-zinc-850 font-mono text-zinc-200 text-[10px] break-all">
                        {cmd.syntax}
                      </code>
                      <p>{cmd.description}</p>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Example</div>
                      <pre className="bg-zinc-950 p-2 rounded border border-zinc-850 font-mono text-emerald-500/80 text-[10px] whitespace-pre-wrap">
                        {cmd.example}
                      </pre>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Editor Side */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-zinc-800/80">
          <div className="h-10 bg-zinc-900/50 border-b border-zinc-800/80 px-4 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">sandbox.speek</span>
          </div>
          <div className="flex-1 min-h-[300px] relative">
            {code.trim() === "" && (
              <div className="absolute inset-0 bg-zinc-950/95 z-10 flex flex-col items-center justify-center text-center p-6 gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <TerminalIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white">Empty Code Workspace</h3>
                  <p className="text-xs text-zinc-500 max-w-[260px] leading-relaxed">
                    New to Speek? Load a starting template or browse our reference guide.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadExample(SPEEK_EXAMPLES[0].code)}
                    className="h-9 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  >
                    Load Hello World
                  </button>
                  <Link
                    href="/documentation"
                    className="h-9 px-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold text-xs transition-all flex items-center"
                  >
                    Open Documentation
                  </Link>
                </div>
              </div>
            )}
            <Editor
              height="100%"
              defaultLanguage="plaintext"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              loading={
                <div className="h-full flex items-center justify-center text-xs text-zinc-500 font-mono gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                  Spinning up Monaco Editor...
                </div>
              }
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                automaticLayout: true,
                fontFamily: "Geist Mono, JetBrains Mono, monospace",
                lineDecorationsWidth: 16,
                padding: { top: 12 },
              }}
            />
          </div>
        </div>

        {/* Console/Output Side */}
        <div className="w-full md:w-1/2 flex flex-col bg-zinc-950">
          <div className="h-10 bg-zinc-900/50 border-b border-zinc-800/80 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400">Output Console</span>
            </div>
            
            {/* Status indicator badge */}
            {status !== "idle" && (
              <div className="flex items-center gap-1.5">
                {status === "success" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Success
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    Failed
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Console output display */}
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-4">
            
            {/* Loading state indicator */}
            {isRunning && (
              <div className="text-zinc-500 flex items-center gap-2 animate-pulse">
                <span>$ executing speek hello_world.speek...</span>
              </div>
            )}

            {/* Program outputs */}
            {!isRunning && output && (
              <div className="space-y-1.5">
                <div className="text-xs text-zinc-500 mb-1">$ console output</div>
                <pre className="text-zinc-100 whitespace-pre-wrap font-mono leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
                  {output}
                </pre>
              </div>
            )}

            {/* Error notifications */}
            {!isRunning && errors.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs text-red-500/60 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  $ error diagnostic
                </div>
                <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-xl text-red-400 space-y-1 leading-relaxed">
                  {errors.map((err, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{err}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty placeholder */}
            {!isRunning && !output && errors.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center gap-2 py-20">
                <TerminalIcon className="w-8 h-8 text-zinc-800" />
                <p className="text-xs max-w-[220px]">
                  Write some English scripts on the left and hit the Run button to execute.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Action Toolbar */}
      <footer className="h-16 border-t border-zinc-900 bg-zinc-950 px-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => runCodeOnApi(code)}
            disabled={isRunning}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black text-black" />
                Run
              </>
            )}
          </button>
          
          <button
            onClick={handleClear}
            className="flex h-10 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 px-4 text-zinc-400 hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="text-[10px] font-mono text-zinc-600 hidden sm:block">
          Line endings: LF • Format: Speek Syntax v1
        </div>
      </footer>
    </div>
  );
}

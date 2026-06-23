export interface SpeekExample {
  id: string;
  name: string;
  description: string;
  code: string;
}

export interface SpeekCommand {
  name: string;
  syntax: string;
  description: string;
  example: string;
}

export interface SpeekDocSection {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
}

export const SPEEK_EXAMPLES: SpeekExample[] = [
  {
    id: "hello-world",
    name: "Hello World",
    description: "Print a simple text message to the output console.",
    code: `say "Hello, World!"`,
  },
  {
    id: "variables",
    name: "Variables",
    description: "Declare variables, perform math operations, and display variables.",
    code: `let score be 85
let bonus be 10
let total be score + bonus

say "Total Score:"
say total`,
  },
  {
    id: "conditions",
    name: "Conditions",
    description: "Use conditional logic to execute code blocks depending on comparisons.",
    code: `let score be 85
let passing_grade be 50

if score > passing_grade then
    say "You passed the exam!"
    say "Congratulations."`,
  },
  {
    id: "loops",
    name: "Loops",
    description: "Repeat a block of instructions a fixed number of times.",
    code: `repeat 5 times
    say "Hello from loop!"`,
  },
  {
    id: "calculator",
    name: "Calculator Example",
    description: "Compute arithmetic operations (addition, subtraction, multiplication, division).",
    code: `let num_a be 15
let num_b be 5

let sum be num_a + num_b
let diff be num_a - num_b
let prod be num_a * num_b
let quot be num_a / num_b

say "Addition:"
say sum
say "Multiplication:"
say prod
say "Division:"
say quot`,
  },
  {
    id: "multiplication-table",
    name: "Multiplication Table",
    description: "Generate a multiplication table using loops and variable mutations.",
    code: `let multiplier be 7
let factor be 1

say "Table of 7:"
repeat 10 times
    let result be multiplier * factor
    say result
    let factor be factor + 1`,
  },
];

export const SPEEK_COMMANDS: SpeekCommand[] = [
  {
    name: "say",
    syntax: 'say <expression> | say "<string>"',
    description: "Prints text or variable evaluations directly to the console output.",
    example: 'say "Hello"\nsay score',
  },
  {
    name: "let",
    syntax: "let <variable> be <expression>",
    description: "Creates or binds a value (number, string, or equation) to a variable name.",
    example: "let score be 85\nlet name be \"Sitare\"",
  },
  {
    name: "if",
    syntax: "if <condition> then\\n    <statements>",
    description: "Executes the nested block only if the comparison condition evaluates to true.",
    example: 'if score > 50 then\n    say "Pass"',
  },
  {
    name: "repeat",
    syntax: "repeat <count> times\\n    <statements>",
    description: "Repeats a block of indented statements a fixed number of times.",
    example: 'repeat 3 times\n    say "Hello"',
  },
];

export const SPEEK_DOCS: SpeekDocSection[] = [
  {
    id: "intro",
    title: "Introduction",
    description: "Speek is a simple English-like programming language that allows users to write programs using natural language syntax. It is compiled and run without semicolons, brackets, or heavy boilerplate code.",
    code: "",
    output: "",
  },
  {
    id: "hello",
    title: "Hello World",
    description: "Printing messages to the screen is easy in Speek. Just use the 'say' command followed by your string enclosed in double quotes.",
    code: 'say "Hello World"',
    output: "Hello World",
  },
  {
    id: "vars",
    title: "Variables & Equations",
    description: "Variables are defined using 'let ... be ...'. Values can be numbers or equations with operators (+, -, *, /) respecting standard mathematical precedence.",
    code: `let age be 20
say age`,
    output: "20",
  },
  {
    id: "conds",
    title: "Conditions",
    description: "Conditional blocks are written as 'if ... then'. Indented statements directly following the conditional are executed only if the conditional is true. Indentation is required for blocks.",
    code: `let age be 20

if age > 18 then
    say "Adult"`,
    output: "Adult",
  },
  {
    id: "loops-doc",
    title: "Loops",
    description: "Loop blocks execute instructions a fixed number of times. Use 'repeat N times' followed by an indented statement block.",
    code: `repeat 5 times
    say "Hello"`,
    output: "Hello\nHello\nHello\nHello\nHello",
  },
  {
    id: "errors",
    title: "Error Examples",
    description: "If you call an undefined variable or trigger a syntax error, the compiler and evaluator catch it cleanly and report a diagnostics message.",
    code: "say x",
    output: "Variable not defined: x",
  },
];

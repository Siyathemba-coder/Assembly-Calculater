# Assembly Calculator

A simple browser-based calculator whose arithmetic logic is structured around
x86-64 assembly concepts - each operation maps directly to a simulated CPU
instruction (MOV, ADD, SUB, IMUL, IDIV).

## Features

- Basic operations: addition, subtraction, multiplication, division, modulo
- Division-by-zero error handling
- Backspace (DEL) and full clear (AC)
- Keyboard support
- Clean, minimal UI - no frameworks, no dependencies

## Project structure

```
asm-calculator/
├── index.html       # Markup and button layout
├── style.css        # Styles
├── calculator.js    # Logic with simulated assembly registers
└── README.md
```

## How to run

Just open `index.html` in any modern browser - no build step or server needed.

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

## Keyboard shortcuts

| Key          | Action            |
|--------------|-------------------|
| 0–9          | Enter digit       |
| . (period)   | Decimal point     |
| + - * / %    | Set operator      |
| Enter or =   | Calculate result  |
| Backspace    | Delete last digit |
| Escape       | Clear all (AC)    |

## Assembly register mapping

The JavaScript in `calculator.js` simulates three CPU registers:

| Register | Role                                      |
|----------|-------------------------------------------|
| RAX      | Accumulator - holds operand A and result  |
| RBX      | Base - holds operand B                    |
| RDX      | Data - holds the remainder after IDIV     |

Each arithmetic operation calls a dedicated function that mirrors its x86
assembly counterpart:

```
ASM_MOV  → loads a value into a register
ASM_ADD  → RAX = RAX + RBX
ASM_SUB  → RAX = RAX - RBX
ASM_IMUL → RAX = RAX * RBX
ASM_IDIV → RAX = quotient, RDX = remainder
```

## License

MIT — free to use, modify, and distribute.

@Siyathemba Msimang, to be upgraded wiht more and better functinalities once have full understanding

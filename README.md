# CircuitGuide

**Learn electronics and robotics the connected way.**

From Ohm's Law to building your own lab hardware — short, real, and built for how your brain works.

---

## What it is

CircuitGuide is a single-page learning app covering the full hardware builder path:

1. **Electronics Foundations** — Voltage, current, Ohm's Law, power, AC/DC, ground
2. **Electronic Components** — Resistors, capacitors, transistors, MOSFETs, LEDs, relays
3. **Circuits** — Series/parallel, breadboards, schematics, voltage dividers, Kirchhoff's laws
4. **Signals & Communication** — Analog/digital, PWM, UART, I2C, SPI, interrupts
5. **Microcontrollers** — Arduino, ESP32, Raspberry Pi, GPIO, ADC, timers
6. **Robotics & Control** — Motors, servos, sensors, PID, state machines
7. **Build Your Lab Hardware** — PCB design, power supplies, lab automation
8. **Quick Reference** — Key formulas and lookup tables

Each concept includes:
- A **knowledge chain** showing how ideas connect
- A **plain-English explanation** of how it works
- A **memory anchor** to make it stick
- A **build tip** for practical application
- **Quick facts** in a scannable format

---

## Features

- **Animated particle network** background — circuit nodes connecting in real time
- **Cursor glow** effect that follows your mouse
- **Staggered card animations** on page load
- **Confetti burst** when you mark a concept as learned
- **Animated progress bars** and number counters
- **Ripple effect** on card interactions
- **Toast notifications** for feedback
- **Persistent progress** saved to localStorage
- **Full-text search** across all concepts
- **Responsive** — works on mobile with slide-in sidebar

---

## Tech stack

Plain HTML, CSS, and JavaScript. No build step, no frameworks, no dependencies.

| File | Purpose |
|------|---------|
| `index.html` | App shell and canvas element |
| `style.css` | Dark glassmorphism theme with animations |
| `app.js` | App logic, particle system, and interactions |
| `data.js` | All concept content (~800 lines) |

---

## Running it

```bash
# Any static file server works. For example:
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## Design

Inspired by modern AI product landing pages — dark background, cyan accent, bold typography, and fluid motion. The goal is to make studying electronics feel like using a product you actually want to use.

Color palette:

| Token | Value | Use |
|-------|-------|-----|
| `--cyan` | `#00d4ff` | Primary accent, highlights |
| `--orange` | `#ff7a2f` | Secondary accent, MCU tags |
| `--purple` | `#a78bfa` | Memory tips, progress bar |
| `--green` | `#34d399` | Learned state, robotics tags |
| `--bg` | `#06080f` | Page background |

---

## Progress tracking

Your progress is stored in `localStorage` under the key `circuitguide_learned`. Clearing site data resets it.

---

## License

MIT

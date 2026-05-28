// CircuitGuide concept database
// Each concept: id, title, tags, chain[], blurb, detail, memory, examTip, facts[]

const SECTIONS = [
  {
    id: "electronics-foundations",
    icon: "⚡",
    title: "Electronics Foundations",
    subtitle: "Voltage, current, resistance — the physics that makes everything work",
    concepts: [

      {
        id: "voltage",
        title: "Voltage",
        tags: ["basic"],
        chain: ["Battery has two terminals", "Positive pushes electrons", "Negative pulls them", "Electrons want to flow", "Voltage = the push force"],
        blurb: "Voltage is electrical pressure. It's the force that pushes electrons through a circuit. No voltage = no current = nothing works.",
        detail: `Voltage is the difference in electric potential between two points. Measured in Volts (V).\n\nThink of water in a tank on a hill — the higher the tank, the more pressure at the bottom. That pressure is voltage. Electrons are the water.\n\n<strong>Common voltages you'll encounter:</strong>\n• 1.5V — AA or AAA battery\n• 3.3V — most modern microcontrollers (ESP32, Pi GPIO)\n• 5V — USB power, Arduino Uno logic level\n• 9V — PP3 battery, common wall adapters\n• 12V — car battery, common lab power supply\n• 120V/240V — US/EU wall outlet (AC — dangerous, respect it)\n\nVoltage is ALWAYS measured between two points — it's a relative measurement. That's why "ground" (0V reference) exists. Without a reference, voltage is meaningless.`,
        memory: `Voltage = water pressure in a pipe. A tank on a hill has HIGH pressure at the bottom. Electrons are the water. Voltage is how hard they're being pushed through the wire.\n\nMore voltage = more push = more potential to do work.`,
        examTip: `When two circuits interact, their voltages must be compatible. A 3.3V microcontroller receiving a 5V signal can be permanently damaged. Always check voltage levels before connecting components.`,
        facts: ["V = Volts", "AA = 1.5V", "USB = 5V", "ESP32 = 3.3V", "Always relative to GND", "Higher V = more push"]
      },

      {
        id: "current",
        title: "Current",
        tags: ["basic"],
        chain: ["Voltage pushes", "Electrons flow through conductor", "Flow rate = current", "Measured in Amperes", "More amps = more electrons per second"],
        blurb: "Current is the flow of electrons through a wire. Measured in Amperes (amps, A). Think of it as how many electrons rush past a point every second.",
        detail: `Current = the flow of electric charge. Measured in Amperes (A).\n\nCommon sub-units:\n• 1 mA (milliamp) = 0.001 A\n• 1 μA (microamp) = 0.000001 A\n\n<strong>Typical current draws:</strong>\n• LED — about 20 mA\n• Arduino Uno — about 50 mA\n• Small DC gear motor — 100 mA to 1 A\n• Servo motor under load — 500 mA to 1 A\n• Raspberry Pi 4 — up to 3 A\n\nCurrent is what does the actual work — it spins motors, lights LEDs, heats wires.\n\n<strong>Two types:</strong>\nDC (Direct Current) — flows one direction, like from a battery.\nAC (Alternating Current) — reverses direction, like from a wall outlet.\n\n<strong>Safety:</strong>\nIt's current (not voltage) that stops your heart. 100 mA through the chest can be fatal. Wall outlets are deadly not because of 120V alone, but because they can push lethal current through your body. Respect electricity.`,
        memory: `Current = cars on a highway. Voltage = the speed limit sign (the push). Current = how many cars are actually driving past per second. A wire is the highway. More lanes (thicker wire) = more cars (more current) can flow.`,
        examTip: `GPIO pins have strict current limits. Arduino: 40 mA max per pin. ESP32: 12 mA max per pin. Raspberry Pi: 16 mA per pin. Exceed these and the pin — or the whole chip — dies. Never connect a motor directly to a GPIO pin.`,
        facts: ["A = Amperes", "mA = milliamps (÷1000)", "LED ≈ 20 mA", "Motor = 100 mA–1 A", "Arduino pin max = 40 mA", "ESP32 pin max = 12 mA"]
      },

      {
        id: "resistance-ohms-law",
        title: "Resistance & Ohm's Law",
        tags: ["basic"],
        chain: ["Voltage pushes current", "Resistance fights it", "V = I × R", "More resistance = less current", "Balance creates useful circuits"],
        blurb: "Resistance slows down current flow. Measured in Ohms (Ω). Ohm's Law — V = I × R — connects voltage, current, and resistance. It's the most fundamental equation in all of electronics.",
        detail: `Resistance = opposition to current flow. Every material has some. Copper wire has very low resistance. Plastic has very high resistance (insulator).\n\n<strong>Ohm's Law: V = I × R</strong>\n• V = Voltage in Volts\n• I = Current in Amperes\n• R = Resistance in Ohms (Ω)\n\nRearranged forms:\n• I = V / R (find current)\n• R = V / I (find resistance)\n\n<strong>Examples:</strong>\n9V battery, 100 Ω resistor → I = 9/100 = 90 mA\n5V supply, want 20 mA through an LED → R = 5/0.020 = 250 Ω (use 270 Ω, nearest standard)\n\n<strong>Resistors in series:</strong> Rtotal = R1 + R2 + R3\n<strong>Resistors in parallel:</strong> 1/Rtotal = 1/R1 + 1/R2 (or R1×R2 / R1+R2 for two)`,
        memory: `V = I × R is a triangle. Cover the one you want:\n• Cover V → I × R\n• Cover I → V / R\n• Cover R → V / I\n\nTattoo this triangle on your brain. Every circuit calculation starts here.`,
        examTip: `LED resistor sizing: R = (Vsupply − Vled) / Iled. Red LED Vf ≈ 2V, blue/white Vf ≈ 3.3V, target current ≈ 20 mA. Example from 5V to red LED: R = (5 − 2) / 0.02 = 150 Ω.`,
        facts: ["V=I×R", "Ω = Ohms", "R↑ means I↓", "Series R: add", "Parallel R: decreases", "I=V/R, R=V/I"]
      },

      {
        id: "power",
        title: "Power",
        tags: ["basic"],
        chain: ["Voltage × Current", "Energy rate = Power", "Measured in Watts", "Excess becomes heat", "Components have max wattage ratings"],
        blurb: "Power is how fast energy is used or delivered. P = V × I, measured in Watts (W). Exceed a component's power rating and it heats up, then fails.",
        detail: `Power = V × I (Volts × Amps = Watts)\n\nDerived forms using Ohm's Law:\n• P = I² × R\n• P = V² / R\n\n<strong>Common power values:</strong>\n• Single LED — 0.1 W\n• Arduino Uno — ~0.25 W\n• Raspberry Pi 4 — 3–15 W\n• Servo motor — 1–5 W\n• Laptop charger — 45–90 W\n\n<strong>Power dissipation in resistors:</strong>\nWhen current flows through a resistor, energy converts to heat. Resistors have wattage ratings — ¼W, ½W, 1W. Exceed the rating and it smokes.\n\nExample: 100 Ω resistor with 50 mA flowing through it.\nP = I² × R = (0.05)² × 100 = 0.25 W → need at least a ¼W resistor, ½W for safety.\n\n<strong>Battery capacity:</strong>\nmAh × V = Wh (watt-hours) = total energy stored.\n2000 mAh × 3.7 V = 7.4 Wh. At 1 W draw → lasts ~7.4 hours.`,
        memory: `Power = water wheel turning. Voltage = water height (pressure). Current = flow rate. More of either = more power from the wheel. Excess power you don't use = heat. Heat = wasted energy and dead components.`,
        examTip: `Always check resistor wattage. A ¼W resistor is fine for low-current signals but will burn out on a 1A motor circuit. When in doubt, use a higher wattage rating — they're cheap.`,
        facts: ["P=V×I", "W = Watts", "P=I²R", "P=V²/R", "¼W = common resistor", "mAh×V = Wh battery capacity"]
      },

      {
        id: "ac-vs-dc",
        title: "AC vs DC",
        tags: ["basic"],
        chain: ["Power source type", "DC = one direction always", "AC = reverses direction periodically", "Batteries = DC", "Wall outlets = AC", "Adapters convert AC to DC"],
        blurb: "DC flows in one direction. AC alternates back and forth. Batteries give DC. Wall outlets give AC. Most electronics run on DC — that's why power adapters exist.",
        detail: `<strong>DC (Direct Current):</strong>\nElectrons always flow the same direction. Stable voltage. Used by: batteries, solar panels, USB, all microcontrollers, motors controlled by electronics.\n\n<strong>AC (Alternating Current):</strong>\nElectrons reverse direction periodically.\n• US/Canada: 60 Hz, 120 V RMS\n• Europe/Australia: 50 Hz, 230 V RMS\nHz = times per second it completes a full cycle.\n\n<strong>Why AC for power grids?</strong>\nEasier to step voltage up and down with transformers for efficient long-distance transmission. (This is why Tesla beat Edison — AC wins for distribution.)\n\n<strong>Converting AC to DC (what your charger does):</strong>\n1. Transformer: steps down high voltage\n2. Rectifier (diodes): converts AC to pulsing DC\n3. Filter capacitor: smooths the pulses\n4. Voltage regulator: locks it to the exact output voltage\n\nThat's why your phone charger gets warm — the conversion process wastes some energy as heat.`,
        memory: `DC = a river (always flows the same direction). AC = ocean waves (back and forth). Your phone wants a calm river, not waves. The charger converts the waves to a river.\n\nFor lab hardware: always use DC internally. Isolate from mains AC with a proper power supply.`,
        examTip: `Never mix AC and mains work without proper training and isolation. For lab automation: buy a quality regulated DC power supply (bench supply) rather than building AC conversion circuits yourself.`,
        facts: ["DC = one direction", "AC = alternates", "US = 120V 60Hz", "EU = 230V 50Hz", "Charger = AC→DC converter", "All MCUs run on DC"]
      },

      {
        id: "ground-reference",
        title: "Ground & Voltage Reference",
        tags: ["basic"],
        chain: ["All circuits need a reference", "Ground = 0V reference point", "All voltages measured from it", "Circuits must share GND", "Floating = undefined = garbage readings"],
        blurb: "Ground (GND) is the 0V reference every circuit is measured from. Without a shared ground between connected circuits, signals are meaningless and nothing works.",
        detail: `"Ground" in electronics doesn't mean dirt — it means the circuit's agreed-upon 0V reference point. Every other voltage in the circuit is measured relative to it.\n\n<strong>Types of ground:</strong>\n• Circuit GND: the 0V reference for your electronics (what we care about most)\n• Earth ground: the third prong in wall outlets, physically connected to earth — for safety, not a signal reference\n• Floating ground: when two circuits don't share a common reference — voltages between them are meaningless\n\n<strong>Why shared GND is critical:</strong>\nIf you power a sensor from its own battery and connect its output to an Arduino on USB power — they don't share a GND. The Arduino reads garbage. Connect the GND pins together → problem solved.\n\n<strong>Ground symbols:</strong>\n⏚ (three decreasing lines) = chassis/earth ground\n▽ (triangle pointing down) = signal/circuit ground\nBoth usually labeled GND.\n\n<strong>Ground loops:</strong>\nWhen two grounds are connected at multiple points with different resistances, small currents flow between them, causing noise. Common in audio and sensitive lab equipment.`,
        memory: `GND = sea level. All altitudes are measured FROM sea level. Your circuit's GND is sea level — everything else is measured above it. Connect two circuits without shared GND = trying to give directions using different sea levels. Useless.\n\nRule: when connecting any two circuits, connect GND first.`,
        examTip: `The most common beginner wiring mistake is forgetting to connect GND between devices. If a sensor gives weird readings or a module won't communicate, check the GND connection first.`,
        facts: ["GND = 0V reference", "Must be shared between circuits", "⏚ = ground symbol", "Floating = random garbage", "Connect GND first always", "Earth GND ≠ circuit GND"]
      },

      {
        id: "batteries-energy",
        title: "Batteries & Energy Storage",
        tags: ["basic"],
        chain: ["Chemical energy stored", "Voltage from electrochemical reaction", "Current flows when circuit completes", "Capacity in mAh", "Depletes as energy used"],
        blurb: "Batteries convert chemical energy into electrical energy. Understanding capacity (mAh), voltage, and discharge rates is essential for any portable or wireless project.",
        detail: `<strong>Key battery specs:</strong>\n• Voltage — set by the chemistry (can't change it)\n• Capacity — mAh (milliamp-hours). A 2000 mAh battery delivers 200 mA for 10 hours, or 2000 mA for 1 hour.\n• C-rating — discharge rate. 1C = drain full capacity in 1 hour. 2C = twice as fast.\n\n<strong>Common battery types:</strong>\n• Alkaline AA/AAA — 1.5V, cheap, non-rechargeable, safe. Good for low-power sensors.\n• 9V alkaline — 550 mAh, convenient but expensive per Wh.\n• Li-ion / LiPo — 3.7V nominal, 4.2V fully charged, high energy density, rechargeable. Used in phones, drones, robots.\n• NiMH AA — 1.2V, safe rechargeable, AA format, 2000–2500 mAh.\n\n<strong>LiPo safety (critical):</strong>\nNever overcharge, overdischarge, puncture, or use a puffy/swollen LiPo. Thermal runaway = fire. Always use a protection circuit (BMS) and a proper charger chip (TP4056 is the standard for single-cell).\n\n<strong>For lab hardware:</strong>\nA single 18650 Li-ion cell (3.7V, 3000–3500 mAh) + TP4056 charger + protection circuit is the standard DIY approach for portable builds.`,
        memory: `mAh = fuel tank size. Voltage = fuel type. A 3000 mAh battery = big tank. Divide tank size by your current draw (mA) = hours of runtime. 3000 mAh ÷ 300 mA draw = 10 hours. Simple.`,
        examTip: `LiPo minimum discharge voltage is ~3.0V per cell. Going below damages the cell permanently. Add a low-voltage cutoff circuit or use a module with built-in protection. Never leave a charging LiPo unattended.`,
        facts: ["mAh = capacity", "Li-ion = 3.7V nominal", "AA alkaline = 1.5V", "TP4056 = LiPo charger IC", "LiPo puffed = danger", "Hours = mAh ÷ mA draw"]
      },

    ]
  },

  {
    id: "electronic-components",
    icon: "🔧",
    title: "Electronic Components",
    subtitle: "The parts you'll use in every circuit — what they do and how to use them",
    concepts: [

      {
        id: "resistors",
        title: "Resistors",
        tags: ["basic"],
        chain: ["Current enters", "Resistance slows it down", "Energy converts to heat", "Current exits reduced", "Circuit protected or tuned"],
        blurb: "Resistors limit current flow. They protect LEDs, create voltage dividers, and pull pins to a known state. The most common component in all of electronics.",
        detail: `Resistors have a fixed resistance value in Ohms (Ω). They don't care about direction — install them either way.\n\n<strong>Reading the color code (4-band):</strong>\nBand 1 + Band 2 = first two digits. Band 3 = multiplier. Band 4 = tolerance (gold = ±5%).\n\nColors 0–9: Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Gray, White\nMnemonic: <strong>B</strong>ig <strong>B</strong>rown <strong>R</strong>abbits <strong>O</strong>ften <strong>Y</strong>ield <strong>G</strong>reat <strong>B</strong>ig <strong>V</strong>ocal <strong>G</strong>roans <strong>W</strong>hen...\n(0=Black, 1=Brown, 2=Red, 3=Orange, 4=Yellow, 5=Green, 6=Blue, 7=Violet, 8=Gray, 9=White)\n\n<strong>Types you'll actually use:</strong>\n• Fixed resistor — standard, one value\n• Potentiometer (pot) — variable resistor with a knob (volume control, calibration trim)\n• Trimmer — small adjustable pot for one-time calibration on a PCB\n• Thermistor — resistance changes with temperature (NTC type decreases as temp rises)\n• LDR (Light Dependent Resistor) — resistance decreases as light increases\n\n<strong>Pull-up / pull-down resistors:</strong>\nA digital input pin left unconnected "floats" — it reads random 0s and 1s. A 10 kΩ resistor to VCC (pull-up) or GND (pull-down) holds it at a known state until something drives it.`,
        memory: `Resistor = a speed bump on a road. Current (cars) can still get through, just slower. More bumps (higher resistance) = slower speed (less current). The color bands are the speed limit sign.\n\nPull-up resistor = a spring holding a door open. Something has to push against it to close the door (pull the pin LOW).`,
        examTip: `Most used values to stock: 100 Ω, 330 Ω, 470 Ω, 1 kΩ, 10 kΩ. The 10 kΩ is your workhorse — pull-ups, voltage dividers, base resistors. Always have 20+ of them.`,
        facts: ["Ω = Ohms", "Color code: BBROYGBVGW", "Gold band = ±5%", "10 kΩ = pull-up standard", "Pot = variable", "Thermistor = temp sensor", "LDR = light sensor"]
      },

      {
        id: "capacitors",
        title: "Capacitors",
        tags: ["basic"],
        chain: ["Voltage applied", "Charge stores on plates", "Voltage builds up", "Releases charge quickly when needed", "Smooths power, blocks DC, passes AC"],
        blurb: "Capacitors store a small charge and release it quickly. They smooth power supplies, filter noise, and are used in timing circuits. Like a tiny rechargeable battery that charges and discharges in microseconds.",
        detail: `Capacitance measured in Farads (F). Typical values range from pF (picofarads) to mF (millifarads).\n\n<strong>Two main types:</strong>\n• Electrolytic — polarized (has + and − legs). Values from 1 μF to 10,000 μF. MUST be installed the correct way or they explode. The longer leg is +. The stripe on the body marks −.\n• Ceramic — non-polarized, install either way. Values from 1 pF to 10 μF. Very common for decoupling.\n\n<strong>The most important use — decoupling:</strong>\nPlace a 100 nF (0.1 μF) ceramic capacitor between VCC and GND right next to every IC's power pin. It absorbs brief voltage spikes so the chip doesn't reset or glitch. This is non-negotiable on any PCB.\n\n<strong>Other uses:</strong>\n• Filtering — smooth ripple from a power supply (use 10–1000 μF electrolytic)\n• Timing — RC circuit: τ = R × C. After 5τ, the cap is fully charged/discharged.\n• Energy storage — large caps power camera flashes, motor startup spikes\n\n<strong>Key formula:</strong> Time constant τ = R × C (in seconds, with Ohms and Farads)`,
        memory: `Capacitor = a shock absorber on a car. Power supply spikes (road bumps) hit the cap, it absorbs them, and your chips feel nothing. Without it, every bump rattles everything.\n\nElectrolytic = polarized (stripe = minus, longer leg = plus). Get this wrong = small explosion.`,
        examTip: `100 nF ceramic caps are one of the most important components in any circuit. Buy 50 of them. Put one near every chip. Your circuits will be more stable instantly. Also: 100 nF = 0.1 μF = 100,000 pF — same cap, different notation.`,
        facts: ["F = Farads", "μF = microfarads (×10⁻⁶)", "Electrolytic = polarized", "100 nF = decoupling standard", "τ = RC", "Stripe = minus", "Ceramic = non-polarized"]
      },

      {
        id: "inductors",
        title: "Inductors",
        tags: ["basic"],
        chain: ["Current flows through coil", "Magnetic field builds up", "Field collapses when current stops", "Creates a voltage spike", "Stores energy in magnetic field"],
        blurb: "Inductors store energy in a magnetic field and resist changes in current. Less common in beginner projects, but critical to understand — motors are inductors, and forgetting this destroys transistors.",
        detail: `Inductance measured in Henries (H). Typical values: μH to mH.\n\n<strong>Key behaviors:</strong>\n• Resist changes in current — opposite of capacitors (which resist voltage changes)\n• Pass DC freely, oppose AC — opposite of capacitors\n• When power is cut suddenly, an inductor releases its stored energy as a voltage spike (kickback). This spike can be 10× the supply voltage and will destroy transistors and MCU pins.\n\n<strong>The flyback diode rule:</strong>\nAny time you switch a motor, relay, or solenoid coil with a transistor or MOSFET — always place a diode (1N4007 or 1N5819) across the coil, with the cathode toward VCC. This catches the kickback spike and routes it safely.\n\n<strong>Main uses:</strong>\n• DC-DC converters (buck/boost) — switch current rapidly through an inductor to change voltage efficiently\n• Filters — block high-frequency noise\n• Transformers — two coupled inductors step voltage up or down\n• Motors — a motor IS a big inductor with a spinning core`,
        memory: `Inductor = a flywheel. Takes effort to spin up (build current), hard to stop suddenly (resists current changes). Cut power abruptly = the flywheel keeps spinning = voltage spike. The flyback diode is the hand brake.\n\nMotor = inductor. Relay coil = inductor. Always add flyback diode.`,
        examTip: `The flyback diode is one of the most commonly forgotten protections in beginner projects. Every motor, relay, and solenoid needs one. Symptoms of a missing flyback diode: MCU resetting when motor starts/stops, or dead MOSFET.`,
        facts: ["H = Henries", "Stores magnetic energy", "Resists current change", "Kickback = voltage spike danger", "1N4007 = flyback diode", "Motor = big inductor", "Buck/boost use inductors"]
      },

      {
        id: "diodes",
        title: "Diodes",
        tags: ["basic"],
        chain: ["Current wants to flow", "Diode checks direction", "Forward = allowed through", "Reverse = blocked", "One-way valve for electrons"],
        blurb: "A diode only lets current flow in one direction. It's the one-way valve of electronics — used for polarity protection, flyback suppression, and converting AC to DC.",
        detail: `Diodes have two terminals: Anode (+) and Cathode (−). Current flows from Anode → Cathode. The stripe (band) on the body marks the Cathode.\n\n<strong>Forward voltage drop (Vf):</strong>\nA small voltage is "used up" crossing the diode:\n• Silicon diode (1N4007): Vf ≈ 0.6–0.7 V\n• Schottky diode (1N5819): Vf ≈ 0.2–0.3 V\n• LED: Vf ≈ 2–3.5 V depending on color\n\n<strong>Types you'll use:</strong>\n• 1N4007 — general purpose rectifier, 1 A, flyback protection, everywhere\n• 1N5819 Schottky — low forward voltage, fast switching, polarity protection\n• Zener — reverse breakdown at a specific voltage → used as voltage reference or clamp\n• TVS (Transient Voltage Suppressor) — absorbs ESD and voltage spikes, protects inputs\n• LED — Light Emitting Diode (covered separately)\n\n<strong>Polarity protection:</strong>\nPut a Schottky diode in series with your power input. Someone connects the battery backwards → diode blocks it → circuit survives. Simple and cheap insurance.`,
        memory: `Diode = a subway turnstile. You can only go through one way. Try the wrong way = blocked. The stripe on the diode body = the exit (cathode). Current exits through the stripe end.\n\n1N4007 = your default choice. Schottky = when you need less voltage drop or faster switching.`,
        examTip: `Always orient diodes correctly — the stripe marks the cathode (negative/exit side). For flyback protection: cathode toward VCC, anode toward the coil. For polarity protection: anode toward the positive supply input.`,
        facts: ["Anode (+) → Cathode (−)", "Stripe = cathode", "Vf ≈ 0.7V silicon", "Schottky ≈ 0.3V", "1N4007 = general use", "Zener = voltage ref", "TVS = ESD protection"]
      },

      {
        id: "transistors-bjt",
        title: "Transistors (BJT)",
        tags: ["basic"],
        chain: ["Small current at Base", "Controls large current at Collector", "Amplify or switch", "NPN most common", "GPIO drives base → switches load"],
        blurb: "A transistor is an electronically controlled switch. A small signal at the Base controls a much larger current between Collector and Emitter. The fundamental building block of all digital electronics.",
        detail: `<strong>NPN BJT (most common for beginners):</strong>\nThree pins: Base (B), Collector (C), Emitter (E)\n• Small base current → controls large collector-emitter current\n• When base is driven HIGH → transistor saturates (fully ON, like a closed switch)\n• When base is LOW → transistor cuts off (fully OFF, like an open switch)\n• Current flows into the base to turn it on (for NPN)\n\n<strong>Using as a switch with an MCU:</strong>\n1. MCU GPIO pin → 1 kΩ resistor → Base\n2. Load (LED, relay, motor) → Collector → VCC\n3. Emitter → GND\nWhen GPIO goes HIGH → transistor ON → current flows through load.\n\n<strong>Current gain (hFE or β):</strong>\nRatio of collector current to base current. Typically 100–300.\nYou need Ic / hFE as your base current to fully saturate it.\nExample: driving a 200 mA relay with hFE=200 → Ib = 200/200 = 1 mA needed at base.\n\n<strong>Common NPN transistors:</strong> 2N2222, BC547, S8050\n<strong>Common PNP transistors:</strong> 2N3906, BC557 (less common for switching)`,
        memory: `Transistor = a water valve controlled by a tiny lever. Small hand movement (base current) opens a big valve (collector current). NPN = "Never Points iN" — the arrow on the emitter symbol points OUT, and current flows INTO the base to turn it on.\n\nGPIO → 1kΩ → Base. Load → Collector. Emitter → GND. That's the recipe.`,
        examTip: `The 1 kΩ base resistor limits base current to a safe level for the GPIO pin. Too low → too much current from GPIO. Too high → transistor won't saturate. 1 kΩ works for most 5V GPIO → small transistor switch applications.`,
        facts: ["Pins: B/C/E", "NPN = most common", "hFE = gain (100–300)", "Saturation = fully ON", "Cutoff = fully OFF", "1kΩ base resistor", "2N2222 = common NPN"]
      },

      {
        id: "mosfets",
        title: "MOSFETs",
        tags: ["basic"],
        chain: ["Voltage applied to Gate", "Channel opens between Drain and Source", "Voltage-controlled (not current)", "Handles high current", "GPIO-friendly — low gate current"],
        blurb: "MOSFETs are voltage-controlled transistors and the preferred switch for microcontroller projects. They handle large currents, draw almost no current from the GPIO pin, and are efficient for motor and LED strip control.",
        detail: `Three pins: Gate (G), Drain (D), Source (S)\n\n<strong>N-channel MOSFET (most common):</strong>\n• Voltage at Gate (relative to Source) → opens channel from Drain to Source\n• Voltage-controlled — Gate draws almost zero current (unlike BJT which needs base current)\n• Fully ON when Vgs exceeds threshold voltage (Vth)\n\n<strong>Logic-level vs standard MOSFETs:</strong>\n• Standard MOSFET: needs 10 V+ at gate to fully turn on → NOT directly driven by 3.3V or 5V GPIO\n• Logic-level MOSFET: fully ON at 3.3 V or 5 V → directly driven by microcontroller GPIO\nAlways look for "logic-level" in the datasheet or product name.\n\n<strong>Common logic-level N-channel MOSFETs:</strong>\n• IRLZ44N — 47 A, 55 V, fully on at 5 V → heavy loads\n• IRL520N — 10 A, 100 V, fully on at 5 V\n• 2N7000 — 200 mA, great for small loads from 3.3 V GPIO\n• AO3400 — SOT-23 SMD, good for PCB work\n\n<strong>Basic wiring:</strong>\n1. Load+ → VCC\n2. Load− → Drain\n3. Source → GND\n4. Gate → 100 Ω resistor → GPIO (100 Ω prevents oscillation)\n5. 10 kΩ from Gate to GND (pull-down, keeps MOSFET off when GPIO floats)`,
        memory: `MOSFET = a light switch that flips itself using voltage. No current wasted on the control. Unlike the BJT water valve (needs constant current pressure), the MOSFET just needs a voltage level to flip. Perfect for battery-powered projects.\n\nLogic-level = the important word. Without it, your 5V GPIO can't fully open the gate.`,
        examTip: `For most motor/LED strip/solenoid switching projects: use an IRLZ44N (5V systems) or 2N7000 (small loads, 3.3V). Add a 100 Ω gate resistor and a 10 kΩ gate-to-GND pull-down. Don't forget the flyback diode across any inductive load.`,
        facts: ["Pins: G/D/S", "Voltage-controlled", "Gate draws ~0 A", "Logic-level = 3.3/5V compatible", "IRLZ44N = 47A logic-level", "100Ω gate resistor", "10kΩ gate pull-down"]
      },

      {
        id: "leds",
        title: "LEDs & Displays",
        tags: ["basic"],
        chain: ["Current flows through diode junction", "Photons emitted", "Color depends on semiconductor material", "Needs current-limiting resistor", "Polarity matters — long leg = positive"],
        blurb: "LEDs are diodes that emit light. They need a current-limiting resistor to survive. The same physics applies to LED strips, status indicators, and the addressable RGB LEDs used in lighting projects.",
        detail: `<strong>Forward voltage (Vf) by color:</strong>\n• Red / Orange / Yellow: ~2.0–2.2 V\n• Green: ~2.2–3.0 V\n• Blue / White: ~3.0–3.5 V\n\n<strong>Standard current:</strong> 20 mA (most 5mm through-hole LEDs). Modern bright LEDs work well at 10–15 mA.\n\n<strong>Resistor calculation:</strong>\nR = (Vsupply − Vf) / Iled\nExample: 5V supply, red LED (Vf = 2V), 20 mA:\nR = (5 − 2) / 0.020 = 150 Ω → use 150 Ω or 220 Ω\n\n<strong>Polarity:</strong> Long leg = Anode (+). Short leg = Cathode (−). Flat side of the body = Cathode.\n\n<strong>Types beyond basic 5mm LEDs:</strong>\n• SMD LEDs — tiny surface-mount, used on PCBs and LED strips\n• WS2812B (NeoPixel) — individually addressable RGB LED. One data wire controls hundreds. 5V, ~60 mA per LED at full white.\n• SK6812 — similar to WS2812B, also has RGBW variant\n• 7-segment display — 7 individual LEDs showing digits 0–9\n• OLED display (SSD1306) — 128×64 pixel display, I2C interface, great for MCU projects`,
        memory: `LED = a very picky light bulb. It wants a specific voltage (Vf), a specific current (20 mA), and has strong opinions about direction. Too much current = instant death. The resistor is its bodyguard.\n\nLong leg = positive (+). Short leg = negative (−). If you always remember "long = positive" you'll never install one backwards.`,
        examTip: `For WS2812B (NeoPixel) strips: each LED draws up to 60 mA at full white. A strip of 60 LEDs = 3.6 A at full brightness. Use a dedicated 5V power supply, not the Arduino's 5V pin. Add a 470 Ω resistor on the data line and a 1000 μF cap on power input.`,
        facts: ["Vf: red=2V, blue=3.3V", "Long leg = anode (+)", "R=(Vsupply−Vf)/Iled", "20 mA standard current", "WS2812B = addressable RGB", "OLED SSD1306 = I2C display", "Flat side = cathode"]
      },

      {
        id: "switches-relays",
        title: "Switches & Relays",
        tags: ["basic"],
        chain: ["Physical action needed", "Switch opens or closes circuit", "Relay = switch controlled by electromagnet", "MCU + transistor drives relay coil", "Relay safely switches high-voltage loads"],
        blurb: "Switches complete or break circuits mechanically. Relays let a low-power microcontroller safely switch high-power or mains-voltage devices. They're how your code reaches out to control the real world.",
        detail: `<strong>Switch types:</strong>\n• SPST (Single Pole Single Throw) — simplest: one circuit, on/off\n• SPDT (Single Pole Double Throw) — one input, switches between two outputs\n• DPDT (Double Pole Double Throw) — two SPDTs in one package\n• Momentary pushbutton — only ON while pressed (like a doorbell)\n• Latching / toggle — stays in position until pressed again\n\n<strong>Debouncing:</strong>\nMechanical switches physically bounce — they make and break contact 5–20 times in the first 5–50 ms when pressed. Your MCU reads all those bounces as separate presses.\n• Software debounce: after first trigger, ignore input for 10–50 ms\n• Hardware debounce: 10 kΩ pull-up + 100 nF capacitor to GND on the input pin\n\n<strong>Relay:</strong>\nA small coil (controlled by transistor/MOSFET from MCU) creates a magnetic field that moves metal contacts, switching a completely separate high-power circuit. Perfect for controlling mains voltage safely.\n• NC (Normally Closed): contact closed when relay is OFF\n• NO (Normally Open): contact open when relay is OFF — the one you use most\n\n<strong>Solid State Relay (SSR):</strong>\nNo moving parts. Uses a TRIAC or MOSFET to switch the load. Faster, silent, longer life. Better for lab automation.\n\n<strong>Optocoupler:</strong>\nLED + photodetector in one package. Electrically isolates MCU from high-voltage circuits while passing signals.`,
        memory: `Relay = a drawbridge controlled by a small motor. The small motor (MCU + transistor) lifts the bridge (closes contacts), letting a large truck (mains voltage) cross safely — and you never touch the truck directly.\n\nFor lab automation: prefer Solid State Relays (SSR). Quieter, faster, no mechanical wear.`,
        examTip: `Always add a flyback diode across a relay coil — it's an inductor. Without it, the kickback spike kills the transistor switching it. Relay modules from Amazon usually have the diode and transistor built in. Check before assuming.`,
        facts: ["SPST/SPDT/DPDT", "Momentary vs latching", "Debounce = 10–50 ms", "NC/NO contacts", "SSR = solid state relay", "Optocoupler = isolation", "Always flyback diode on coil"]
      },

    ]
  },

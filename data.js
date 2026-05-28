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

  {
    id: "circuits",
    icon: "🔌",
    title: "Circuits",
    subtitle: "How components connect and interact — the rules that govern every circuit",
    concepts: [

      {
        id: "series-parallel",
        title: "Series vs Parallel",
        tags: ["basic"],
        chain: ["Components connected", "Series = one path for current", "Parallel = multiple paths", "Current splits vs voltage splits", "Different rules for each"],
        blurb: "Series circuits share the same current. Parallel circuits share the same voltage. Understanding which is which is the foundation of reading and building any circuit.",
        detail: `<strong>Series connection:</strong>\nComponents connected end-to-end — one single path for current to flow.\n• Same current flows through all components\n• Voltages add up: Vtotal = V1 + V2 + V3\n• Resistances add up: Rtotal = R1 + R2 + R3\n• One component fails → whole circuit breaks\n• Example: old-style Christmas lights (one bulb dies → all go out)\n\n<strong>Parallel connection:</strong>\nComponents connected across the same two nodes.\n• Same voltage across all components\n• Currents add up: Itotal = I1 + I2 + I3\n• Resistance decreases: 1/Rtotal = 1/R1 + 1/R2 + 1/R3\n• One component fails → others keep working\n• Example: wall outlets (all at 120 V, devices draw independent current)\n\n<strong>Two resistors in parallel shortcut:</strong>\nRtotal = (R1 × R2) / (R1 + R2)\n\n<strong>In real circuits:</strong>\nMost circuits are a mix of both. Learn to identify which sections are series and which are parallel, then apply the right rules to each.`,
        memory: `Series = beads on a string. Break one bead = the whole string breaks. Parallel = lanes on a highway. Close one lane = other lanes still flow.\n\nSeries: voltages add, resistance adds, current same.\nParallel: currents add, resistance drops, voltage same.`,
        examTip: `LEDs should almost always be in parallel (each with its own resistor), not series. Series LEDs share current — one failing open kills them all, and matching forward voltages is tricky. Parallel LEDs each get full voltage and are independent.`,
        facts: ["Series: same current", "Parallel: same voltage", "Series R: adds", "Parallel R: decreases", "Parallel 2R: R1×R2/(R1+R2)", "Series fail = all off", "Parallel fail = others ok"]
      },

      {
        id: "breadboards",
        title: "Breadboards",
        tags: ["basic"],
        chain: ["Need to prototype without soldering", "Push components into holes", "Rows internally connected", "Power rails along edges", "Test and modify freely"],
        blurb: "Breadboards let you build circuits without soldering. Components push into holes that are electrically connected in rows. The essential tool for learning and prototyping.",
        detail: `<strong>Breadboard anatomy:</strong>\n• Power rails (top & bottom edges): long horizontal rows connected along their full length, marked + (red) and − (blue). Connect VCC and GND here first.\n• Component area: holes arranged in columns A–E and F–J. Each group of 5 (same row letter, same number) is electrically connected. The center channel divides A–E from F–J.\n• Center dividing channel: ICs (chips) straddle this gap — each leg in its own row on either side.\n\n<strong>How current flows:</strong>\nEverything inserted into the same numbered row (e.g., row 14, columns A through E) is electrically connected. Insert a resistor in 14A and an LED in 14C → they're connected.\n\n<strong>Common mistakes:</strong>\n• Forgetting to connect power rails to your actual power source\n• Inserting a component across the center divider accidentally\n• Wires bridging rows they shouldn't\n• On half-size breadboards: power rails are sometimes split in the middle (not continuous) — check with a multimeter\n• Loose connections: push components in firmly\n\n<strong>Conventions:</strong>\nRed wire = VCC. Black wire = GND. Keep wires short. Label rows with tape if your circuit gets complex.`,
        memory: `Breadboard = a pegboard where every row of 5 holes is secretly connected underground. Plug anything into the same row = connected. The center gap = a river you can't cross (great for chips to straddle).\n\nAlways connect your power rails to your supply FIRST. Most "it doesn't work" issues are an unconnected power rail.`,
        examTip: `Before debugging any breadboard circuit, use your multimeter in continuity mode to verify: (1) VCC rail has voltage, (2) GND rail is connected, (3) the components you think are connected actually are. Breadboard connections are physical and can be loose.`,
        facts: ["Rows of 5 connected", "Center gap separates halves", "Rails = VCC/GND", "Red = VCC, Black = GND", "No soldering needed", "Check rail continuity", "ICs straddle center gap"]
      },

      {
        id: "schematics",
        title: "Reading Schematics",
        tags: ["basic"],
        chain: ["Circuit drawn on paper", "Standard symbols used", "Lines = wires", "Dot at crossing = connected", "Follow current from supply to ground"],
        blurb: "Schematics are circuit diagrams using standard symbols. They show logical connections, not physical layout. Learning to read them unlocks every tutorial, datasheet, and PCB design you'll ever encounter.",
        detail: `<strong>Common schematic symbols:</strong>\n• Battery / VCC: labeled +5V, 3V3, VCC, or VBAT — all pins with the same label connect together\n• GND: triangle pointing down ▽ or three decreasing lines ⏚ — all GND symbols connect together\n• Resistor: zigzag line (US style) or rectangle (EU/IEC style)\n• Capacitor: two parallel lines (electrolytic has a + sign on one plate)\n• LED: diode triangle + arrows pointing away (light emitting)\n• NPN transistor: vertical line with two diagonal lines and an arrow on the emitter pointing outward\n• Switch: a gap in a line with a movable lever\n• IC/chip: rectangle with labeled pins on the sides\n\n<strong>The most important rule:</strong>\nA dot where two wires cross = they ARE connected.\nTwo wires crossing with no dot = they are NOT connected (they just overlap on paper).\n\n<strong>Reading flow:</strong>\nTrace current from the power supply (VCC) through components to ground. Power flows top → bottom by convention. Signals flow left → right.\n\n<strong>Net labels:</strong>\nNames like DATA, CLK, TX, SCL label wire segments that connect to the same net even if drawn in different places on the schematic.`,
        memory: `Schematic = a subway map, not a satellite photo. It shows you what connects to what (the logic), not where things physically sit. Like a recipe vs a photo of the dish — both describe the same thing, one is actually useful for following.\n\nDot = connected. No dot = just crossing. This one rule prevents hours of debugging.`,
        examTip: `When building from a schematic, identify all the VCC and GND connections first. Then trace each signal path one at a time. Draw on a printout if it helps — mark wires as you connect them. A missed GND connection is the most common build error.`,
        facts: ["Dot = connected", "No dot = crossing only", "VCC labels = same net", "GND symbols = same net", "Zigzag = resistor (US)", "Arrow out = NPN emitter", "Current: top to bottom"]
      },

      {
        id: "voltage-divider",
        title: "Voltage Dividers",
        tags: ["basic"],
        chain: ["Two resistors in series", "Voltage taps off the midpoint", "Output = fraction of input", "5V → 3.3V for level shifting", "Sensor + fixed R = analog reading"],
        blurb: "Two resistors in series create a voltage divider — a fixed fraction of the input voltage appears at the midpoint. Used for level shifting, reading sensors, and creating reference voltages.",
        detail: `<strong>Formula:</strong>\nVout = Vin × R2 / (R1 + R2)\nWhere R1 is between Vin and Vout, R2 is between Vout and GND.\n\n<strong>Examples:</strong>\n5V → 2.5V: R1 = 10 kΩ, R2 = 10 kΩ → Vout = 5 × 10/20 = 2.5 V\n5V → 3.3V: R1 = 10 kΩ, R2 = 20 kΩ → Vout = 5 × 20/30 = 3.33 V ✓\n\n<strong>Common uses:</strong>\n• Level shifting: convert 5V Arduino output to 3.3V for ESP32 or Pi\n• Reading a potentiometer: a pot is a built-in adjustable voltage divider\n• Reading a thermistor or LDR: pair the sensor with a fixed resistor → voltage changes with the measured quantity → feed into an ADC pin\n• Creating reference voltages for comparators\n\n<strong>Important limitations:</strong>\n• The output voltage changes if you connect a low-resistance load — keep load impedance much higher than R2\n• Not suitable for two-way level shifting (use a dedicated level shifter IC like TXB0108 or BSS138 for that)\n• Wastes some current continuously (P = Vin² / (R1+R2)) — use high resistances (10–100 kΩ) to minimize this`,
        memory: `Voltage divider = adjusting the depth of a pool by adding a partial drain. R2 sets how much voltage "stays". Equal resistors = exactly half. Make R2 bigger relative to R1 = output voltage rises toward Vin.\n\nQuick mental check: output is always between 0V and Vin. If R2 >> R1, output ≈ Vin. If R2 << R1, output ≈ 0V.`,
        examTip: `The 5V→3.3V divider (R1=10kΩ, R2=20kΩ) is the most commonly used. But for SPI/I2C level shifting at speed, use a proper level shifter IC — a voltage divider is one-directional and too slow for fast signals.`,
        facts: ["Vout=Vin×R2/(R1+R2)", "5V→3.3V: R1=10k, R2=20k", "Pot = adjustable divider", "Thermistor + R = sensor divider", "Load affects output", "One-directional only", "Use high R to save power"]
      },

      {
        id: "kirchhoffs-laws",
        title: "Kirchhoff's Laws",
        tags: ["basic"],
        chain: ["Multiple paths in circuit", "KCL: current into node = current out", "KVL: voltages around loop sum to zero", "Apply to any junction or loop", "Foundation of all circuit analysis"],
        blurb: "Two laws that govern every circuit: current can't pile up at a junction (KCL), and you can't gain or lose energy going around a loop (KVL). Everything else in circuit theory follows from these.",
        detail: `<strong>KCL — Kirchhoff's Current Law:</strong>\nAt any node (junction), the sum of currents entering equals the sum of currents leaving.\nElectrons can't accumulate — what comes in must go out.\n\nExample: three wires meet at a node. 2A in from wire 1, 1.5A in from wire 2 → 3.5A must leave through wire 3.\n\n<strong>KVL — Kirchhoff's Voltage Law:</strong>\nAround any closed loop in a circuit, the sum of all voltage rises equals the sum of all voltage drops. The net change is zero.\n\nExample: 9V battery, two resistors R1=100Ω and R2=200Ω in series.\nKVL: 9V − VR1 − VR2 = 0\nCurrent: I = 9 / (100+200) = 30 mA\nVR1 = 0.030 × 100 = 3V, VR2 = 0.030 × 200 = 6V\nCheck: 3V + 6V = 9V ✓\n\n<strong>Why these matter in practice:</strong>\n• Verify your circuit design on paper before building\n• Debug: if measured voltages don't sum to zero around a loop, something is wrong\n• Analyze circuits with multiple branches and power sources`,
        memory: `KCL = water pipe junction. Water in = water out. No water piles up at the junction.\nKVL = hiking a loop trail. Whatever altitude you gain going up, you lose going down. You always return to your starting height.\n\nUse KVL to find unknown voltages. Use KCL to find unknown currents at a junction.`,
        examTip: `KVL is how you verify LED resistor calculations: Vsupply − Vresistor − Vled = 0. If they don't add up, something is wrong. Always do this sanity check on paper before powering a new circuit.`,
        facts: ["KCL: ΣI_in = ΣI_out", "KVL: ΣV around loop = 0", "Current conserved at nodes", "Energy conserved in loops", "Apply to each loop separately", "Foundation of all circuit math"]
      },

      {
        id: "datasheets",
        title: "Reading Datasheets",
        tags: ["basic"],
        chain: ["Unfamiliar component", "Find manufacturer datasheet", "Check absolute max ratings first", "Find the pinout", "Copy the typical application circuit"],
        blurb: "Datasheets are the official spec sheets for every electronic component. Reading just three sections — max ratings, pinout, and typical application — is enough to use any component correctly.",
        detail: `<strong>The three sections you must read (in this order):</strong>\n\n1. <strong>Absolute Maximum Ratings</strong> — NEVER exceed these values. VCC max, pin voltage max, max current, temperature range. Exceeding any of these = component dies, often instantly. Read this first, every time.\n\n2. <strong>Pinout diagram</strong> — which physical pin does what. Cross-reference with the package type (DIP, SOT-23, QFN). Getting a pin wrong is the most common build error.\n\n3. <strong>Typical Application Circuit</strong> — a ready-made schematic showing how to wire the component. Copy this exactly for your first build. The engineers who designed the chip drew this — trust it.\n\n<strong>Other sections worth knowing:</strong>\n• Recommended Operating Conditions: the range you should actually use (has safety margin from the max ratings)\n• Electrical Characteristics: typical values — Vf, operating current, etc.\n• Timing Diagrams: for ICs with digital signals, shows when signals must be high/low\n• Register Map: for programmable chips, lists all configurable settings\n\n<strong>Where to find datasheets:</strong>\nSearch "[part number] datasheet" → manufacturer's site or datasheetspdf.com, alldatasheet.com. The manufacturer's PDF is always the authoritative source.`,
        memory: `Datasheet = the owner's manual you should have read before breaking something. Three rules:\n1. Read max ratings FIRST (like checking weight limit before climbing a ladder)\n2. Get the pinout right (like knowing which wire is live before touching)\n3. Copy the typical application circuit exactly the first time (like following a recipe before improvising)\n\nAfter it works, then you customize.`,
        examTip: `The typical application circuit is your best friend. Most beginners skip the datasheet entirely and wire things from memory or a random tutorial. One wrong pull-up value or missing decoupling cap causes hours of debugging. Copy the typical circuit. Every. Time.`,
        facts: ["Abs max = never exceed", "Pinout = pin functions", "Typical circuit = copy first", "Operating conditions ≠ max ratings", "Register map = programmable settings", "Manufacturer PDF = authoritative"]
      },

    ]
  },

  {
    id: "signals-communication",
    icon: "📡",
    title: "Signals & Communication",
    subtitle: "How microcontrollers talk to sensors, displays, and each other",
    concepts: [

      {
        id: "analog-vs-digital",
        title: "Analog vs Digital Signals",
        tags: ["micro"],
        chain: ["Signal exists in the world", "Analog = any value continuously", "Digital = only 0 or 1", "ADC converts analog to digital", "DAC converts digital to analog"],
        blurb: "Analog signals are continuous — any value is possible. Digital signals are binary — only HIGH or LOW. The real world is analog. Microcontrollers are digital. Sensors bridge the gap.",
        detail: `<strong>Analog:</strong>\nCan be any value within a range (e.g., 0–5V continuously). Temperature, sound, light, pressure, pH — all naturally analog. More vulnerable to noise — a small spike changes the reading.\n\n<strong>Digital:</strong>\nOnly two valid states: HIGH (1) or LOW (0). Defined voltage thresholds:\n• Arduino 5V system: >3.5V = HIGH, <1.5V = LOW\n• 3.3V system: >2.0V = HIGH, <0.8V = LOW\nNoise-resistant — noise has to cross the threshold to corrupt data.\n\n<strong>ADC (Analog-to-Digital Converter):</strong>\nSamples an analog voltage at regular intervals and converts each sample to a digital number.\n• Arduino Uno: 10-bit ADC → 1024 steps (0–1023) over 0–5V → resolution = 5/1024 ≈ 4.9 mV per step\n• ESP32: 12-bit ADC → 4096 steps (0–4095) over 0–3.3V → resolution ≈ 0.8 mV per step\n• Raspberry Pi: NO built-in ADC — needs external IC (e.g., MCP3008 over SPI)\n\n<strong>DAC (Digital-to-Analog Converter):</strong>\nConverts a digital number back to a voltage. Used for audio output, setting precise analog voltages.\n• Arduino Uno: no DAC (uses PWM to approximate)\n• ESP32: two 8-bit DAC outputs on GPIO 25 and 26`,
        memory: `Analog = a dimmer switch (infinite positions between off and full). Digital = a regular light switch (on or off, nothing between). ADC = taking a photo of the dimmer's position. DAC = setting the dimmer to match a number. Something is always lost in conversion — that's the resolution limit.`,
        examTip: `Arduino analogRead() returns 0–1023. To convert to voltage: V = reading × (5.0 / 1023). For ESP32: V = reading × (3.3 / 4095). Never apply more than the ADC reference voltage to an analog pin — instant damage on ESP32 (3.3V max, NOT 5V tolerant).`,
        facts: ["Analog = continuous", "Digital = 0 or 1", "Arduino ADC = 10-bit (1024 steps)", "ESP32 ADC = 12-bit (4096 steps)", "Pi = no ADC built-in", "ESP32 DAC: GPIO 25, 26", "5V→Arduino ADC ok, NOT ESP32"]
      },

      {
        id: "pwm",
        title: "PWM — Pulse Width Modulation",
        tags: ["micro"],
        chain: ["Digital pin only has 0 or 1", "Rapidly switch between them", "Vary the time spent HIGH", "Average voltage = duty cycle × VCC", "Controls motor speed, LED brightness, servo angle"],
        blurb: "PWM rapidly switches a digital pin between HIGH and LOW. By varying the on-time ratio you simulate different voltage levels — how microcontrollers control motor speed, LED brightness, and servo position with only digital outputs.",
        detail: `<strong>Duty cycle:</strong> percentage of time the signal is HIGH.\n• 0% = always LOW = 0V average\n• 25% = 25% HIGH = 1.25V average (from 5V)\n• 50% = half the time HIGH = 2.5V average\n• 100% = always HIGH = 5V average\n\n<strong>Frequency:</strong> how many on/off cycles per second (Hz).\n• Arduino default PWM: 490 Hz (most pins) or 980 Hz (pins 5 and 6)\n• Servo control requires: 50 Hz\n• LED dimming: any frequency above ~100 Hz (eye can't detect flicker)\n• Motors: 1–20 kHz typical\n\n<strong>Arduino usage:</strong>\nanalogWrite(pin, value) — value 0 (0%) to 255 (100%)\nPWM pins on Uno: 3, 5, 6, 9, 10, 11 (marked with ~ on the board)\n\n<strong>Why PWM works:</strong>\n• LEDs: your eye averages the flicker → appears dimmer\n• Motors: the motor's inductance smooths the pulses → runs at proportional speed\n• Servos: pulse width (not duty cycle) encodes the angle — 1ms=0°, 1.5ms=90°, 2ms=180° at 50Hz\n\n<strong>ESP32:</strong> All GPIO can do PWM via ledcWrite(). 16 channels, configurable frequency and resolution.`,
        memory: `PWM = rapidly blinking a light to make it look dimmer. Blink faster than your eye can see → looks like it's half-bright if it's on 50% of the time. This same principle controls motor speed (motor averages the power) and servo angles (pulse width = angle command).`,
        examTip: `Servo libraries handle the 50Hz timing for you — just call myServo.write(90) for 90°. For motor speed with a motor driver, use analogWrite(enablePin, 128) for ~50% speed. Remember: analogWrite is 0–255, not 0–100.`,
        facts: ["Duty cycle = % time HIGH", "analogWrite: 0–255", "50% = half average voltage", "Servo: 50Hz, 1–2ms pulse", "PWM pins: 3,5,6,9,10,11 on Uno", "~symbol = PWM-capable pin", "ESP32: all GPIO can PWM"]
      },

      {
        id: "uart-serial",
        title: "UART / Serial",
        tags: ["micro"],
        chain: ["Two devices want to talk", "TX of one → RX of the other", "No clock wire — both agree on baud rate", "Data sent one bit at a time", "Simplest serial protocol"],
        blurb: "UART is the simplest serial communication — just two wires, TX and RX. This is how an Arduino talks to your computer over USB, and how most GPS modules, Bluetooth modules, and cellular modems communicate.",
        detail: `<strong>Two wires (plus shared GND):</strong>\n• TX — Transmit (output from this device)\n• RX — Receive (input to this device)\nCross them: your TX → their RX, their TX → your RX.\n\n<strong>Baud rate:</strong> bits per second. Both devices must be set to the same baud rate or data is garbage.\nCommon baud rates: 9600, 19200, 57600, 115200\n115200 is standard for most modern Arduino/ESP32 projects.\n\n<strong>Data frame:</strong> 1 start bit + 8 data bits + 1 stop bit = 10 bits per byte.\nAt 9600 baud: 9600 / 10 = 960 bytes per second.\n\n<strong>Voltage warning:</strong> 5V UART from Arduino into a 3.3V ESP32 RX pin = damage. Use a voltage divider or level shifter on the TX line when crossing voltage levels.\n\n<strong>Arduino:</strong>\nSerial.begin(115200) in setup()\nSerial.print() / Serial.println() — send data\nSerial.available() / Serial.read() — receive data\nOpen Serial Monitor in IDE (Ctrl+Shift+M), set matching baud rate.\n\n<strong>Common UART devices:</strong>\nGPS modules (NMEA sentences), HC-05/HC-06 Bluetooth, SIM800L GSM, OpenLog data logger`,
        memory: `UART = walkie-talkies. Both must be on the same channel (baud rate). Your mouth (TX) goes to their ear (RX). Their mouth goes to your ear. If you both talk at the same time — garbage. Most UART is half-duplex in practice.\n\nMost common mistake: forgetting to cross TX→RX. TX→TX = silence. TX→RX = talking.`,
        examTip: `On Arduino Uno, pins 0 (RX) and 1 (TX) are shared with the USB Serial. Don't use them while uploading or using the Serial Monitor. Use SoftwareSerial for a second UART on other pins, or an Arduino Mega which has 4 hardware UARTs.`,
        facts: ["TX→RX (cross the wires)", "Baud must match both ends", "Common: 9600, 115200", "No clock wire (async)", "Serial.begin() sets baud", "5V TX → 3.3V RX = damage", "Arduino 0/1 = shared with USB"]
      },

      {
        id: "i2c",
        title: "I2C",
        tags: ["micro"],
        chain: ["Multiple devices, only two wires", "SDA = data line", "SCL = clock line", "Master sends device address", "Only matching device responds"],
        blurb: "I2C lets many devices share just two wires. Every device has a unique 7-bit address. The master calls the address, only the right device answers. Perfect for connecting multiple sensors to one microcontroller.",
        detail: `<strong>Two wires (plus GND):</strong>\n• SDA — Serial Data (bidirectional)\n• SCL — Serial Clock (master drives this)\n\n<strong>Addressing:</strong>\nEach device has a 7-bit address (0x00–0x7F = 128 possible). Some devices let you configure the last 1–3 bits with solder pads or address pins, so you can have multiple identical devices on one bus.\n\n<strong>Pull-up resistors:</strong>\nSDA and SCL must be pulled up to VCC with resistors — typically 4.7 kΩ for 100 kHz, 2.2 kΩ for 400 kHz. Many breakout boards include them. If not: add them yourself or nothing works.\n\n<strong>Speeds:</strong> Standard = 100 kHz, Fast = 400 kHz, Fast+ = 1 MHz\n\n<strong>Common I2C devices and addresses:</strong>\n• MPU6050 IMU — 0x68 (or 0x69 with AD0 high)\n• BMP280 pressure/temp — 0x76 or 0x77\n• SSD1306 OLED display — 0x3C (or 0x3D)\n• SHT31 temperature/humidity — 0x44\n• VL53L0X distance sensor — 0x29\n\n<strong>Arduino (Wire library):</strong>\nWire.begin() → Wire.beginTransmission(addr) → Wire.write(data) → Wire.endTransmission()\n\n<strong>I2C scanner:</strong> Run a scanner sketch to discover all connected device addresses. Essential for debugging.`,
        memory: `I2C = a shared office intercom. Two wires to everyone (data + clock). Master presses a button (sends address) → only the matching extension picks up. One bus, many devices, each called by name.\n\nPull-ups are like the power supply to the intercom system — without them, nobody can hear anything.`,
        examTip: `"I2C device not found" is the most common I2C error. Checklist: (1) correct SDA/SCL pins for your board, (2) pull-ups present (4.7 kΩ to VCC), (3) correct voltage (3.3V vs 5V), (4) run I2C scanner to confirm address. The scanner sketch is in Arduino IDE: File → Examples → Wire → i2c_scanner.`,
        facts: ["2 wires: SDA + SCL", "7-bit addresses (0x00–0x7F)", "4.7kΩ pull-ups required", "100/400 kHz speeds", "Arduino: Wire library", "MPU6050 = 0x68", "SSD1306 OLED = 0x3C", "Scanner finds addresses"]
      },

      {
        id: "spi",
        title: "SPI",
        tags: ["micro"],
        chain: ["Master needs fast data transfer", "4 wires used", "MOSI / MISO / SCLK / CS", "Master controls clock", "CS selects one device at a time"],
        blurb: "SPI is faster than I2C and uses 4 wires. It's used for displays, SD cards, and high-speed sensors. One dedicated Chip Select wire per device lets the master talk to each one individually.",
        detail: `<strong>Four wires:</strong>\n• MOSI — Master Out Slave In (master sends data)\n• MISO — Master In Slave Out (slave sends data back)\n• SCLK (SCK) — Serial Clock (master controls)\n• CS (SS) — Chip Select, active LOW, one per device\n\n<strong>How it works:</strong>\nMaster pulls CS of target device LOW → sends/receives data synchronized with SCLK pulses → pulls CS HIGH when done. Other devices ignore traffic while their CS is HIGH.\n\n<strong>SPI vs I2C:</strong>\n• SPI: faster (MHz speeds), full-duplex, simpler hardware, no addressing needed\n• I2C: fewer wires, addressing built-in, slower, half-duplex\n• Rule of thumb: use I2C for sensors, SPI for displays and storage\n\n<strong>Arduino Uno SPI pins:</strong>\n10 = SS (CS), 11 = MOSI, 12 = MISO, 13 = SCK\n\n<strong>Common SPI devices:</strong>\n• SD card modules\n• TFT color displays (ILI9341, ST7789)\n• MCP3008 — adds 8 analog inputs to Raspberry Pi\n• High-speed IMUs (ICM-20948)\n• SPI flash memory\n\n<strong>Arduino (SPI library):</strong>\nSPI.begin() → digitalWrite(CS, LOW) → SPI.transfer(byte) → digitalWrite(CS, HIGH)`,
        memory: `SPI = a dedicated phone line to each person. One wire to talk (MOSI), one to listen (MISO), a shared clock (SCLK), and a specific phone number per device (CS pin). Faster than I2C intercom but uses more wires. Best for things that need speed: displays, SD cards.`,
        examTip: `Each SPI device needs its own CS pin from the MCU. Connecting 5 SPI devices = 5 CS pins used. On a pin-limited board like Arduino Uno, this adds up fast. Consider I2C devices where possible to save pins, or use an I2C/SPI GPIO expander.`,
        facts: ["4 wires: MOSI/MISO/SCLK/CS", "CS per device (active LOW)", "Full duplex", "MHz speeds", "No pull-ups needed", "Arduino SPI: pins 10–13", "SD card = SPI", "ILI9341 display = SPI"]
      },

      {
        id: "interrupts",
        title: "Interrupts",
        tags: ["micro"],
        chain: ["Main program running", "Hardware event occurs on a pin", "CPU pauses main program instantly", "Runs the ISR function", "Returns to main program where it left off"],
        blurb: "Interrupts let a microcontroller respond instantly to events without constantly checking (polling). A button press, sensor pulse, or timer fires the interrupt — the CPU drops everything, handles it, then resumes.",
        detail: `<strong>Without interrupts — polling:</strong>\nwhile(true) { if(digitalRead(pin) == HIGH) { doSomething(); } }\nCPU wastes cycles checking constantly. Misses fast events if it's busy doing something else.\n\n<strong>With interrupts:</strong>\nattachInterrupt(digitalPinToInterrupt(pin), myISR, RISING);\nWhen the pin goes HIGH → CPU immediately pauses → runs myISR() → returns.\n\n<strong>Trigger modes:</strong>\n• RISING — fires when pin goes LOW → HIGH\n• FALLING — fires when pin goes HIGH → LOW\n• CHANGE — fires on either edge\n• LOW — fires continuously while pin is LOW (use sparingly)\n\n<strong>ISR rules — critical:</strong>\n• Keep ISR code SHORT and FAST — no Serial.print(), no delay(), no I2C/SPI calls\n• Variables shared between ISR and main loop MUST be declared volatile\n• Interrupts are disabled inside an ISR by default\n\n<strong>Arduino Uno interrupt pins:</strong> only 2 and 3.\nESP32 / Arduino Mega: any GPIO can be an interrupt pin.\n\n<strong>Timer interrupts:</strong>\nFire at precise regular intervals — not tied to a pin. Used for precise timing, PWM generation, sensor polling at exact rates. TimerOne library for Arduino. FreeRTOS tasks on ESP32.`,
        memory: `Interrupt = a fire alarm at work. You don't stand at your desk all day checking "is there a fire?" (polling). The alarm sounds when there IS a fire (interrupt) → you respond immediately → go back to your desk. The key rule: keep the alarm response short. Don't investigate the whole building during the alarm — just trip the breaker and return.`,
        examTip: `The volatile keyword is the most commonly forgotten ISR rule. Without it, the compiler may optimize away the variable, and the main loop never sees the updated value. Any variable written in an ISR and read outside it must be declared volatile.`,
        facts: ["RISING/FALLING/CHANGE modes", "ISR = short + fast only", "volatile keyword required", "No delay() in ISR", "Uno: only pins 2, 3", "ESP32: any GPIO", "Timer interrupt = precise timing", "attachInterrupt()"]
      },

    ]
  },

  {
    id: "microcontrollers",
    icon: "🤖",
    title: "Microcontrollers",
    subtitle: "The brains of your hardware — what they are, which to choose, and how to program them",
    concepts: [

      {
        id: "what-is-mcu",
        title: "What is a Microcontroller?",
        tags: ["micro"],
        chain: ["CPU + memory + I/O on one chip", "Runs one program in a loop", "Controls physical pins directly", "No OS needed", "The brain of every embedded device"],
        blurb: "A microcontroller (MCU) is a complete computer on a single chip — processor, memory, and I/O pins all integrated. It runs your code and interfaces with the physical world directly.",
        detail: `<strong>Microcontroller vs Microprocessor:</strong>\n• Microprocessor (laptop/desktop CPU): powerful, but needs external RAM, storage, I/O chips, and an operating system to do anything.\n• Microcontroller: everything integrated on one chip — flash memory (stores program), SRAM (variables), and GPIO pins. Runs one program directly on power-up. No OS needed.\n\n<strong>Key specs to know for any MCU:</strong>\n• Clock speed (MHz) — how fast it executes instructions\n• Flash memory — non-volatile storage where your program lives (survives power off)\n• SRAM — working memory for variables (lost on power off)\n• EEPROM — tiny non-volatile storage for settings (some MCUs)\n• GPIO pins — General Purpose Input/Output: the physical connection to the world\n• ADC channels — how many analog inputs\n• Communication interfaces — UART, I2C, SPI, USB built-in\n• Operating voltage — 3.3V or 5V (critical for compatibility)\n\n<strong>Common MCU families:</strong>\n• ATmega328P — Arduino Uno/Nano (8-bit, 16 MHz, 5V)\n• RP2040 — Raspberry Pi Pico (dual-core ARM, 133 MHz, 3.3V)\n• ESP32 — WiFi/BT built-in (dual-core, 240 MHz, 3.3V)\n• STM32 — professional, used in drones and industrial (various)\n• ATtiny85 — tiny, low power, 8 pins total`,
        memory: `Microcontroller = a Swiss Army knife computer. Not as powerful as a laptop, but it's self-contained, uses almost no power, and has physical pins you can connect the real world to. Plug in a sensor, read a value, flip a pin, control a motor. That's the whole deal.\n\nFlash = the hard drive (permanent). SRAM = the desk (temporary workspace). GPIO = the hands.`,
        examTip: `Flash stores your compiled program. SRAM holds variables at runtime. On Arduino Uno: 32KB Flash (plenty), 2KB SRAM (very tight). Running out of SRAM causes random crashes and weird behavior — use F() macro to keep string literals in Flash: Serial.println(F("Hello"));`,
        facts: ["CPU+Flash+SRAM in one chip", "Flash = program storage", "SRAM = variables (volatile)", "GPIO = physical pins", "No OS needed", "3.3V or 5V systems", "ATmega328P = Arduino Uno"]
      },

      {
        id: "arduino",
        title: "Arduino",
        tags: ["micro"],
        chain: ["ATmega328P chip on a board", "USB connection built in", "Write C++ in Arduino IDE", "Click upload", "Program runs immediately and forever"],
        blurb: "Arduino is the most beginner-friendly microcontroller platform. Write code, click upload, it runs. The starting point for almost everyone in the maker and robotics world.",
        detail: `<strong>Arduino Uno — the classic starting board:</strong>\n• Chip: ATmega328P\n• Clock: 16 MHz\n• Voltage: 5V logic\n• Flash: 32 KB\n• SRAM: 2 KB\n• Digital I/O: 14 pins (6 with PWM, marked ~)\n• Analog inputs: 6 (10-bit ADC, 0–5V)\n• I2C: A4 (SDA), A5 (SCL)\n• SPI: 10 (SS), 11 (MOSI), 12 (MISO), 13 (SCK)\n• UART: pins 0 (RX) and 1 (TX), shared with USB\n• Power input: 7–12V via barrel jack (onboard regulator to 5V)\n\n<strong>The two required functions:</strong>\nvoid setup() — runs once at boot. Initialize pins, start Serial, configure sensors.\nvoid loop() — runs forever after setup(). Your main logic lives here.\n\n<strong>Other popular Arduino boards:</strong>\n• Arduino Nano — same chip as Uno, breadboard-friendly small form factor\n• Arduino Mega 2560 — 54 digital pins, 16 analog, 4 UARTs. Good for complex projects.\n• Arduino Pro Mini — no USB chip (cheaper/smaller, needs external programmer)\n\n<strong>Shields:</strong> add-on boards that stack on top — motor shield, relay shield, WiFi shield, etc.`,
        memory: `Arduino = a LEGO starter kit for electronics. Pre-built, well-documented, enormous community. Every component you can buy has an Arduino tutorial and library already written. Start here.\n\nsetup() = the morning routine (done once). loop() = the workday (runs forever). That's the entire structure.`,
        examTip: `2 KB SRAM on the Uno fills up fast. Symptoms of full SRAM: program runs briefly then crashes or behaves randomly. Fix: use the F() macro for string literals, avoid String objects (use char arrays), minimize global variables.`,
        facts: ["ATmega328P chip", "16 MHz, 5V", "32KB Flash, 2KB SRAM", "14 digital pins, 6 analog", "setup() once, loop() forever", "I2C: A4/A5", "PWM: 3,5,6,9,10,11", "Free IDE"]
      },

      {
        id: "raspberry-pi",
        title: "Raspberry Pi",
        tags: ["micro"],
        chain: ["ARM CPU on a board", "Linux OS runs from SD card", "40-pin GPIO header", "Python or any language", "WiFi and Ethernet built in"],
        blurb: "Raspberry Pi is a full Linux computer the size of a credit card. Unlike Arduino it runs a real OS, browses the web, runs Python, and handles complex computation — but it's not great at hard real-time hardware control.",
        detail: `<strong>Raspberry Pi 4 Model B (current standard):</strong>\n• CPU: ARM Cortex-A72, quad-core, 1.5 GHz\n• RAM: 1, 2, 4, or 8 GB\n• Storage: microSD card (your hard drive)\n• OS: Raspberry Pi OS (Debian Linux)\n• Connectivity: WiFi 802.11ac, Bluetooth 5.0, Gigabit Ethernet\n• Ports: 2× USB 3.0, 2× USB 2.0, 2× micro-HDMI, USB-C power\n• GPIO: 40-pin header (26 GPIO + power/GND pins), all at 3.3V\n\n<strong>Raspberry Pi vs Arduino:</strong>\n• Pi: runs Python, connects to internet, does image processing, databases, AI inference. NOT reliable for microsecond-precise timing.\n• Arduino/ESP32: simple, real-time, reliable, low power, wakes instantly. Can't browse the internet.\n• Best of both: use ESP32 for timing-critical sensor/actuator tasks, Pi for data processing, networking, and UI.\n\n<strong>Important Pi GPIO notes:</strong>\n• All GPIO pins are 3.3V — applying 5V to any GPIO pin destroys it\n• No built-in ADC — for analog sensors, use MCP3008 (SPI) or ADS1115 (I2C)\n• Max current per GPIO: 16 mA. Max total from all GPIO: 50 mA.\n• I2C: GPIO 2 (SDA), GPIO 3 (SCL) — pins 3 and 5 on header\n• SPI: GPIO 10 (MOSI), 9 (MISO), 11 (CLK), 8 (CE0)`,
        memory: `Arduino = a dedicated calculator (does one thing perfectly, reliably). Raspberry Pi = a tiny laptop (does everything, but sometimes fumbles precise timing).\n\nFor your lab: Pi handles the database, web dashboard, and AI. ESP32/Arduino handles the sensors and actuators. They talk over UART or USB Serial.`,
        examTip: `Never apply 5V to a Raspberry Pi GPIO pin. The Pi uses 3.3V logic — 5V input fries the pin or the whole SoC. For connecting to 5V devices, use a voltage divider (for inputs) or a level shifter IC (for bidirectional signals).`,
        facts: ["Full Linux OS", "ARM quad-core 1.5GHz", "WiFi + BT built-in", "GPIO = 3.3V ONLY", "No built-in ADC", "microSD = storage", "I2C: pins 3+5 (GPIO 2+3)", "16mA max per GPIO pin"]
      },

      {
        id: "esp32",
        title: "ESP32",
        tags: ["micro"],
        chain: ["Dual-core ARM chip", "WiFi and Bluetooth built in", "3.3V logic", "Programs like Arduino", "Perfect for IoT and lab wireless sensors"],
        blurb: "ESP32 combines Arduino-style programming with built-in WiFi and Bluetooth. For any project that needs wireless connectivity — lab sensors reporting to a dashboard, remote-controlled hardware — ESP32 is the go-to choice.",
        detail: `<strong>ESP32 core specs:</strong>\n• CPU: Xtensa dual-core LX6, up to 240 MHz\n• RAM: 520 KB SRAM (on-chip)\n• Flash: 4 MB (external, on module)\n• WiFi: 802.11 b/g/n (2.4 GHz)\n• Bluetooth: Classic 4.2 + BLE 4.2\n• GPIO: 34 pins (some input-only: 34–39)\n• ADC: 18 channels, 12-bit resolution\n• DAC: 2 channels (GPIO 25, 26)\n• UART, I2C, SPI, I2S, CAN all supported\n• Operating voltage: 3.3V (USB input accepted via onboard regulator)\n\n<strong>Critical 3.3V warning:</strong>\nGPIO pins are 3.3V maximum — NOT 5V tolerant. Connecting a 5V signal directly to an ESP32 GPIO destroys it. Use a voltage divider or level shifter.\n\n<strong>ADC quirk:</strong>\nADC2 channels (GPIO 0, 2, 4, 12–15, 25–27) conflict with WiFi. When WiFi is active, only use ADC1 channels (GPIO 32–39).\n\n<strong>Common ESP32 boards:</strong>\nESP32 DevKit v1, NodeMCU-32S, WEMOS LOLIN32, Adafruit HUZZAH32\n\n<strong>For lab automation:</strong>\nESP32 connects sensors to your WiFi → publishes data via MQTT → Node-RED or Home Assistant processes it → Grafana dashboard displays it. All wireless, all automated.`,
        memory: `ESP32 = Arduino + WiFi + Bluetooth fused into one chip. Give your sensor project internet access with no extra hardware. It's 3.3V (important!) and programs just like Arduino using the same IDE.\n\nESP32 > ESP8266: faster, more RAM, BT support, more GPIO. Use ESP32 for all new wireless projects.`,
        examTip: `GPIO 6–11 on the ESP32 are connected to the internal flash memory chip — never use them for anything else or you'll corrupt the flash and brick the board. GPIO 34–39 are input-only (no internal pull-ups). When using WiFi, avoid ADC2 pins for analog readings.`,
        facts: ["Dual-core 240MHz", "WiFi + BT built-in", "3.3V GPIO — NOT 5V tolerant", "12-bit ADC (18 channels)", "Avoid GPIO 6–11 (flash)", "ADC2 conflicts with WiFi", "DAC: GPIO 25, 26", "4MB Flash, 520KB SRAM"]
      },

      {
        id: "gpio-pins",
        title: "GPIO Pins",
        tags: ["micro"],
        chain: ["Pin on microcontroller", "Configure as input or output", "Read sensors or control devices", "Voltage level = the signal", "Current limits must be respected"],
        blurb: "GPIO (General Purpose Input/Output) pins are the physical interface between your code and the real world. Set them as outputs to control things, or inputs to read sensors and buttons.",
        detail: `<strong>Pin modes:</strong>\n• OUTPUT — set HIGH (VCC) or LOW (GND) to control LEDs, transistors, relays\n• INPUT — read HIGH or LOW from a button, sensor, or digital output\n• INPUT_PULLUP — same as INPUT but enables the MCU's internal pull-up resistor (~20–50 kΩ to VCC). Button connects pin to GND when pressed → reads LOW. When not pressed → reads HIGH.\n• Analog input (ADC) — read a voltage as a number (0–1023 on Arduino 10-bit)\n• PWM output — generate a PWM waveform (motor speed, LED brightness, servo)\n\n<strong>Current limits — non-negotiable:</strong>\n• Arduino Uno: max 40 mA per pin, 200 mA total from all GPIO\n• ESP32: max 12 mA per pin\n• Raspberry Pi: max 16 mA per pin, 50 mA total\nNEVER connect a motor, solenoid, or high-current LED directly to a GPIO pin. Use a transistor or MOSFET.\n\n<strong>Floating inputs:</strong>\nAn unconnected input pin reads random noise. Always use INPUT_PULLUP (or an external pull-down resistor) to hold the pin at a known state.\n\n<strong>Voltage levels:</strong>\n• Arduino Uno GPIO: 5V\n• ESP32 GPIO: 3.3V\n• Raspberry Pi GPIO: 3.3V\nConnecting a 5V output to a 3.3V input can destroy the 3.3V device.`,
        memory: `GPIO pin = a light switch that's also a sensor. In output mode, your code flips it (HIGH/LOW). In input mode, something external flips it and your code reads which way it is.\n\nAlways check the current limit. GPIO is strong enough for an LED, not a motor. Exceeding the limit doesn't blow a fuse — it silently damages the chip.`,
        examTip: `INPUT_PULLUP is your best friend for buttons. Connect one side of the button to the pin, the other to GND. Use INPUT_PULLUP in pinMode(). The pin reads HIGH when not pressed, LOW when pressed. No external resistor needed.`,
        facts: ["OUTPUT: HIGH/LOW", "INPUT_PULLUP: internal resistor", "Arduino max: 40mA/pin", "ESP32 max: 12mA/pin", "Pi max: 16mA/pin", "Floating = random reads", "Never motor directly to GPIO", "3.3V ≠ 5V compatible"]
      },

      {
        id: "mcu-programming",
        title: "Microcontroller Programming Basics",
        tags: ["micro"],
        chain: ["Write code in IDE", "Compile to machine code", "Upload over USB", "MCU runs program on boot", "Debug with Serial Monitor"],
        blurb: "Microcontroller programming follows a simple pattern: setup once, loop forever, talk to hardware through built-in functions. The C++ looks intimidating but the core is just a few functions you'll use constantly.",
        detail: `<strong>Program structure (Arduino / ESP32):</strong>\nvoid setup() {\n  Serial.begin(115200);     // start serial at 115200 baud\n  pinMode(13, OUTPUT);       // set pin 13 as output\n}\nvoid loop() {\n  digitalWrite(13, HIGH);    // pin 13 = 5V\n  delay(1000);               // wait 1000 ms\n  digitalWrite(13, LOW);     // pin 13 = 0V\n  delay(1000);\n}\n\n<strong>Key functions:</strong>\n• pinMode(pin, mode) — set OUTPUT, INPUT, or INPUT_PULLUP\n• digitalWrite(pin, HIGH/LOW) — set a digital output\n• digitalRead(pin) — read a digital pin (returns 0 or 1)\n• analogRead(pin) — read analog (returns 0–1023 on Uno)\n• analogWrite(pin, 0–255) — PWM output\n• delay(ms) — pause everything for N milliseconds\n• millis() — milliseconds since boot (use this instead of delay for non-blocking timing)\n\n<strong>Non-blocking timing with millis():</strong>\nunsigned long lastTime = 0;\nvoid loop() {\n  if (millis() - lastTime >= 1000) {\n    lastTime = millis();\n    readSensor();  // runs every 1 second\n  }\n  // other code runs freely here\n}\n\n<strong>Data types to know:</strong>\nint (16-bit on AVR), long, float, bool, char, byte, unsigned long (for millis())`,
        memory: `Arduino programming = the same 3-act play every time:\n1. setup() — set the stage (once)\n2. loop() — perform the show (forever)\n3. Functions — your props and costumes\n\ndelay() = freezing the entire program. millis() = checking a clock while still doing other work. For anything serious, always use millis() instead of delay().`,
        examTip: `delay() blocks everything — no sensor reads, no button checks, no serial receive. Once you understand millis()-based timing, you'll never use delay() in production code again. The pattern: check if (millis() - lastTime >= interval), do the thing, update lastTime.`,
        facts: ["setup() = once", "loop() = forever", "delay() = blocking", "millis() = non-blocking", "analogRead: 0–1023", "analogWrite: 0–255", "unsigned long for millis()", "Serial.println() = debug tool"]
      },

    ]
  },

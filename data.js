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

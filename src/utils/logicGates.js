// Logic Gate Simulators

export const logicGates = {
  nand: (a, b) => !(a && b),
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  xor: (a, b) => a !== b,
};

export const getGateTruthTable = (gateType) => {
  const gate = logicGates[gateType];
  return [
    { a: 0, b: 0, output: gate(0, 0) ? 1 : 0 },
    { a: 0, b: 1, output: gate(0, 1) ? 1 : 0 },
    { a: 1, b: 0, output: gate(1, 0) ? 1 : 0 },
    { a: 1, b: 1, output: gate(1, 1) ? 1 : 0 },
  ];
};

export const getGateInfo = (gateType) => {
  const gateInfo = {
    nand: {
      name: "NAND",
      icPart: "74LS00",
      description: "NOT AND - outputs 0 only when both inputs are 1",
      symbol: "⊼",
    },
    and: {
      name: "AND",
      icPart: "74LS08",
      description: "Outputs 1 only when both inputs are 1",
      symbol: "∧",
    },
    or: {
      name: "OR",
      icPart: "74LS32",
      description: "Outputs 1 when at least one input is 1",
      symbol: "∨",
    },
    xor: {
      name: "XOR",
      icPart: "74LS86",
      description: "Exclusive OR - outputs 1 when inputs are different",
      symbol: "⊕",
    },
  };
  return gateInfo[gateType] || gateInfo.nand;
};

export const generateLabReport = (gateType) => {
  const info = getGateInfo(gateType);
  const truthTable = getGateTruthTable(gateType);

  return `
DIGITAL LOGIC EXPERIMENT REPORT
${info.name} Gate Analysis
================================================================================

OBJECTIVE:
To verify the truth table and operational characteristics of a ${info.name} gate
using the standard IC ${info.icPart}.

APPARATUS:
- IC ${info.icPart} (${info.name} gate)
- Power supply (5V)
- Test probes
- Oscilloscope (if needed)
- BreadBoard

THEORY:
A ${info.name} gate is a fundamental digital logic component. ${info.description}

Truth Table for ${info.name}:
================================================================================
INPUT A | INPUT B | OUTPUT
--------|---------|--------
${truthTable.map((row) => `   ${row.a}    |    ${row.b}    |   ${row.output}`).join("\n")}

PROCEDURE:
1. Connect the IC to the breadboard with proper power connections
2. Apply input signals A and B to the appropriate pins
3. Measure the output for each input combination
4. Record results and compare with truth table
5. Document timing characteristics if using oscilloscope

RESULTS:
All measurements matched the theoretical truth table.
Gate operated at specified voltage and frequency ranges.

CONCLUSION:
The ${info.name} gate (IC ${info.icPart}) behaves according to digital logic
principles. The device is suitable for use in combinational logic circuits.

Additional Notes:
- Propagation delay: < 30ns typical
- Power consumption: < 50mW per gate
- Noise margin: > 0.4V
  `;
};

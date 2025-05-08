import { graphviz } from 'd3-graphviz';

export interface DFA {
  states: string[];
  alphabet: string[];
  start_state: string;
  end_states: string[];
  transitions: Record<string, string>;
  regex: string;
}

export interface StateCheck {
  state: string;
  isValid: boolean;
}

export interface CFG {
  productions: string[];
  start_symbol: string;
}

export interface PDA {
  states: string[];
  alphabet: string[];
  start_state: string;
  push_states: (string | null)[];
  pop_states: (string | null)[];
  accept_states: string[];
  transitions: Record<string, string>;
}
export const DFA_1 = {
  states: [
    "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
    "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21",
    "T1", "T2", "T3"
  ],
  alphabet: ["a", "b"],
  start_state: "q1",
  end_states: ["q21"], // Add accepting states if needed
  transitions: {
    "q1,a": "q2",
    "q1,b": "q3",
    "q2,b": "T1",
    "q2,a": "q4",
    "q3,a": "T1",
    "q3,b": "q4",
    "q4,a": "q5",
    "q4,b": "q6",
    "q5,a": "T2",
    "q5,b": "q7",
    "q6,a": "q8",
    "q6,b": "q8",
    "q7,a": "q9",
    "q7,b": "T2",
    "q8,a": "T2",
    "q8,b": "q9",
    "q9,a": "q10",
    "q9,b": "q11",
    "q10,a": "q12",
    "q10,b": "q13",
    "q11,a": "q10",
    "q11,b": "q13",
    "q12,a": "q14",
    "q12,b": "T3",
    "q13,a": "q10",
    "q13,b": "q13",
    "q14,a": "q15",
    "q14,b": "q14",
    "q15,a": "q16",
    "q15,b": "q15",
    "q16,a": "q17",
    "q16,b": "q19",
    "q17,a": "q18",
    "q17,b": "q14",
    "q18,a": "q21",
    "q18,b": "q15",
    "q19,a": "T3",
    "q19,b": "q20",
    "q20,a": "T3",
    "q20,b": "q21",
    "q21,a": "q21",
    "q21,b": "q21",
    "T1,a": "T1",
    "T1,b": "T1",
    "T2,a": "T2",
    "T2,b": "T2",
    "T3,a": "T3",
    "T3,b": "T3"
  }
};

export const DFA_2: DFA = {
  states: [
    "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11",
    "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "T"
  ],
  alphabet: ["0", "1"],
  start_state: "q0",
  end_states: ["q21"],
  regex: "", // Placeholder - update with the actual regex if needed
  transitions: {
    "q0,1": "q0",
    "q0,0": "q1",
    "q1,1": "q1",
    "q1,0": "q2",
    "q2,1": "q3",
    "q2,0": "q5",
    "q3,1": "q4",
    "q3,0": "q5",
    "q4,1": "q8",
    "q4,0": "q6",
    "q5,1": "T",
    "q5,0": "q12",
    "q6,1": "q7",
    "q6,0": "q14",
    "q7,1": "q17",
    "q7,0": "q11",
    "q8,1": "q9",
    "q8,0": "q10",
    "q9,1": "q17",
    "q9,0": "q10",
    "q10,1": "q9",
    "q10,0": "q17",
    "q11,1": "q7",
    "q11,0": "q15",
    "q12,1": "q13",
    "q12,0": "q11",
    "q13,1": "q16",
    "q13,0": "q14",
    "q14,1": "q13",
    "q14,0": "q17",
    "q15,1": "T",
    "q15,0": "q17",
    "q16,1": "q17",
    "q16,0": "T",
    "q17,1": "q18",
    "q17,0": "q18",
    "q18,1": "q19",
    "q18,0": "q18",
    "q19,1": "q20",
    "q19,0": "q19",
    "q20,1": "q21",
    "q20,0": "q20",
    "q21,1": "q21",
    "q21,0": "q21",
    "T,1": "T",
    "T,0": "T"
  }
};


export const CFG_1: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F G H I',
    'A → "aa" | "bb"',
    'B → "aba" | "bab" | "bbb"',
    'C → "a" C | "b" C | λ',
    'D → "aa" | "bb"',
    'E → D E | λ',
    'F → "a" R "a" R "a"',
    'R → "b" R | λ',
    'G → F G | λ',
    'H → "bbb" | "aaa"',
    'I → "a" I | "b" I | λ'
  ]
};
export const CFG_2: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F G H I',
    // segment 1: 1*0 1*0 1*
    'A → X "0" Y "0" Z',
    'X → "1" X | λ',
    'Y → "1" Y | λ',
    'Z → "1" Z | λ',
    // segment 2: (11+00)
    'B → "11" | "00"',
    // segment 3: (10+01)*
    'C → "10" C | "01" C | λ',
    // segment 4: (1+0)
    'D → "1" | "0"',
    // segment 5: (11+00)
    'E → "11" | "00"',
    // segment 6: (1+0+11+00+101+111+000)
    'F → "1" | "0" | "11" | "00" | "101" | "111" | "000"',
    // segment 7: (11+00)*
    'G → "11" G | "00" G | λ',
    // segment 8: 1 0* 1 0* 1
    'H → "1" O "1" O "1"',
    'O → "0" O | λ',
    // segment 9: (11+00)*
    'I → "11" I | "00" I | λ'
  ]
};

export const PDA_1: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7",
           "Read8", "Read9", "Read10", "Read11", "Read12", "Read13", "Accept1", "Accept2"],
  alphabet: ["a", "b"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept1", "Accept2"],
  transitions: {
    "Start,": "Read1",
    "Read1,a": "Read2",
    "Read1,b": "Read3",
    "Read2,b": "Read4",
    "Read3,a": "Read5",
    "Read4,a": "Read6",
    "Read5,b": "Read6",
    "Read6,b": "Read7",
    "Read7,a": "Read8",
    "Read8,b": "Read9",
    "Read9,a": "Read10",
    "Read9,b": "Read11",
    "Read10,b": "Read12",
    "Read11,a": "Read13",
    "Read10,": "Accept1",
    "Read11,": "Accept1",
    "Read12,a,b,": "Accept2",
    "Read13,a,b,": "Accept2",
    "Read6,a": "Read6",
    "Read7,b": "Read7",
    "Read8,a": "Read6",
    "Read10,a": "Read10",
    "Read11,b": "Read11",
  }
};

export const PDA_2: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7", "Read8", "Accept"],
  alphabet: ["1", "0"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept"],
  transitions: {
    "Start,": "Read1",
    "Read1,0,1": "Read2",
    "Read2,0": "Read3",
    "Read2,1": "Read4",
    "Read3,0": "Read5",
    "Read3,1": "Read4",
    "Read4,0": "Read7",
    "Read4,1": "Read6",
    "Read6,0": "Read7",
    "Read5,0": "Read8",
    "Read5,1": "Read4",
    "Read6,1": "Read8",
    "Read7,1": "Read8",
    "Read7,0": "Read3",
    "Read8,0,1": "Read8",
    "Read8,": "Accept",
  }
};

export function generateDotGraph(automaton: DFA | PDA, highlightedState?: string, color: string = '#000000'): string {
  let dot = 'digraph G {\n';
  dot += '  bgcolor="transparent";\n';
  dot += '  node [fontname="Inter"];\n';
  dot += '  edge [fontname="Inter"];\n';
  
  if ('push_states' in automaton) {
    dot += '  rankdir=TB;\n';
    dot += '  node [shape=diamond, style=filled, fillcolor=white, color=black];\n';
  } else {
    dot += '  rankdir=LR;\n';
    dot += '  node [shape=circle, style=filled, fillcolor=white, color=black];\n';
  }

  const states = 'states' in automaton ? automaton.states : [];
  const endStates = 'end_states' in automaton ? automaton.end_states :
                    'accept_states' in automaton ? automaton.accept_states : [];

  if ('push_states' in automaton) {
    dot += '  start [shape=none, label=""];\n';
    dot += `  start -> ${automaton.start_state} [label="start"];\n`;

    states.forEach(state => {
      let shape = 'diamond';
      let attributes = [];

      if (state === automaton.start_state || automaton.accept_states.includes(state)) {
        shape = 'ellipse';
      } else if (automaton.push_states.includes(state)) {
        shape = 'rectangle';
      }

      if (state === highlightedState) {
        attributes.push(`fillcolor="${color}"`);
        attributes.push('fontcolor="white"');
      } else {
        attributes.push('fillcolor="white"');
        attributes.push('fontcolor="black"');
      }

      if (automaton.accept_states.includes(state)) {
        attributes.push('peripheries=2');
      }

      attributes.push(`shape=${shape}`);
      dot += `  ${state} [${attributes.join(', ')}];\n`;
    });
  } else {
    states.forEach(state => {
      let nodeAttributes = ['style=filled'];
      if (endStates.includes(state)) {
        nodeAttributes.push('shape=doublecircle');
      }
      if (state === highlightedState) {
        nodeAttributes.push(`fillcolor="${color}"`);
        nodeAttributes.push('fontcolor="white"');
      } else {
        nodeAttributes.push('fillcolor="white"');
        nodeAttributes.push('fontcolor="black"');
      }
      dot += `  ${state} [${nodeAttributes.join(', ')}];\n`;
    });
  }

  if ('transitions' in automaton) {
    const transitionGroups = new Map<string, string[]>();
    
    Object.entries(automaton.transitions).forEach(([key, value]) => {
      const [source, symbol] = key.split(',');
      const transitionKey = `${source}->${value}`;
      if (!transitionGroups.has(transitionKey)) {
        transitionGroups.set(transitionKey, []);
      }
      transitionGroups.get(transitionKey)?.push(symbol || 'ε');
    });

    transitionGroups.forEach((symbols, key) => {
      const [source, target] = key.split('->');
      const label = symbols.join(', ');
      dot += `  ${source} -> ${target} [label="${label}", color="black"];\n`;
    });
  }

  dot += '}';
  return dot;
}

export function generateCFGGraph(cfg: CFG): string {
  let dot = 'digraph G {\n';
  dot += '  bgcolor="transparent";\n';
  dot += '  rankdir=TB;\n';
  dot += '  node [shape=rectangle, style=filled, fillcolor=white, fontname="monospace"];\n';
  dot += '  edge [color="#374151"];\n';

  // Create a subgraph for better organization
  dot += '  subgraph cluster_0 {\n';
  dot += '    style=filled;\n';
  dot += '    color=lightgrey;\n';
  dot += '    node [style=filled, fillcolor=white];\n';
  
  // Add start symbol
  dot += `    "${cfg.start_symbol}" [fillcolor="#e5e7eb", shape=ellipse];\n`;

  // Add productions
  cfg.productions.forEach((prod, i) => {
    const [lhs, rhs] = prod.split('→').map(s => s.trim());
    const nodeId = `prod_${i}`;
    const label = rhs.replace(/\|/g, '\\n|').replace(/λ/g, 'ε');
    dot += `    "${nodeId}" [label="${label}"];\n`;
    
    if (i === 0) {
      dot += `    "${cfg.start_symbol}" -> "${nodeId}";\n`;
    } else {
      const prevNodeId = `prod_${i-1}`;
      dot += `    "${prevNodeId}" -> "${nodeId}";\n`;
    }
  });

  dot += '  }\n';
  dot += '}';
  return dot;
}

export function validateString(dfa: DFA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = dfa.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!dfa.transitions[transition]) {
      stateChecks.push({ state: currentState, isValid: false });
      return { isValid: false, stateChecks };
    }
    currentState = dfa.transitions[transition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = dfa.end_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validatePDA(pda: PDA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = pda.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!pda.transitions[transition]) {
      const epsilonTransition = `${currentState},`;
      if (!pda.transitions[epsilonTransition]) {
        stateChecks.push({ state: currentState, isValid: false });
        return { isValid: false, stateChecks };
      }
      currentState = pda.transitions[epsilonTransition];
    } else {
      currentState = pda.transitions[transition];
    }
    stateChecks.push({ state: currentState, isValid: true });
  }

  const epsilonTransition = `${currentState},`;
  if (pda.transitions[epsilonTransition]) {
    currentState = pda.transitions[epsilonTransition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = pda.accept_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validateCFG(cfg: CFG, input: string): boolean {
  const firstProd = cfg.productions[0];
  if (firstProd.includes('101') || firstProd.includes('111')) {
    return /^[01]+$/.test(input);
  } else {
    return /^[ab]+$/.test(input);
  }
}
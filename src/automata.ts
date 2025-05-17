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
export const DFA_1: DFA = {
  states: [
    "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11",
    "q12", "q13", "q14", "q15", "q16"
  ],
  alphabet: ["0", "1"],
  start_state: "q0",
  end_states: ["q8"],
  regex: "", // Placeholder - update with the actual regex if needed
  transitions: {
    "q0,1": "q16",
    "q0,0": "q16",
    "q16,1": "q1",
    "q16,0": "q1",
    "q1,1": "q2",
    "q1,0": "q2",
    "q2,1": "q12",
    "q2,0": "q3",
    "q3,1": "q12",
    "q3,0": "q4",
    "q12,0": "q13",
    "q12,1": "q15",
    "q13,1": "q14",
    "q13,0": "q4",
    "q14,1": "q15",
    "q14,0": "q5",
    "q4,1": "q5",
    "q4,0": "q5",
    "q15,1": "q5",
    "q15,0": "q13",
    "q5,1": "q9",
    "q5,0": "q6",
    "q9,1": "q11",
    "q9,0": "q10",
    "q10,1": "q8",
    "q10,0": "q6",
    "q11,1": "q8",
    "q11,0": "q10",
    "q7,1": "q8",
    "q7,0": "q8",
    "q8,1": "q8",
    "q8,0": "q8",
    "q6,0": "q6",
    "q6,1": "q7"
  }
};
export const DFA_2 = {
  states: [
    "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"
  ],
  alphabet: ["a", "b"],
  start_state: "q0",
  end_states: ["q10"],
  transitions: {
    "q0,a": "q1",
    "q0,b": "q1",
    "q1,a": "q2",
    "q1,b": "q2",
    "q2,a": "q4",
    "q2,b": "q3",
    "q3,a": "q6",
    "q3,b": "q3",
    "q4,a": "q4",
    "q4,b": "q5",
    "q5,a": "q9",
    "q5,b": "q7",
    "q6,a": "q9",
    "q6,b": "q8",
    "q7,a": "q8",
    "q7,b": "q10",
    "q8,a": "q9",
    "q8,b": "q10",
    "q9,a": "q10",
    "q9,b": "q10",
    "q10,a": "q10",
    "q10,b": "q10"
  }
};



export const CFG_1: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F G',
    
    // A = (1+0)
    'A → "1" | "0"',
    
    // B = (1+0)*
    'B → "1" B | "0" B | λ',
    
    // C = (11+00+01+10)*
    'C → "11" C | "00" C | "01" C | "10" C | λ',
    
    // D = (11+00+01+10)
    'D → "11" | "00" | "01" | "10"',
    
    // E = (1010+001+111+000)
    'E → "1010" | "001" | "111" | "000"',
    
    // F = (1+0)*
    'F → "1" F | "0" F | λ',
    
    // G = H I',
    'G → H I',

    // H = (101+011+111+010)
    'H → "101" | "011" | "111" | "010"',

    // I = (1+0)*
    'I → "1" I | "0" I | λ'
  ]
};
export const CFG_2: CFG = {
  start_symbol: 'S',
  productions: [
    'S → A B C D E F G',

    // A = (a+b+aa+bb+aba)
    'A → "a" | "b" | "aa" | "bb" | "aba"',

    // B = (a+b+bb+aa)*
    'B → "a" B | "b" B | "aa" B | "bb" B | λ',

    // C = (a+b+aa+bb)
    'C → "a" | "b" | "aa" | "bb"',

    // D = (a+b)*
    'D → "a" D | "b" D | λ',

    // E = (ab+ba+bab+aba)
    'E → "ab" | "ba" | "bab" | "aba"',

    // F = (ab+bb+abbb+bab+aa)
    'F → "ab" | "bb" | "abbb" | "bab" | "aa"',

    // G = (a+b)*
    'G → "a" G | "b" G | λ'
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
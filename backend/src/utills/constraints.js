

export function normalizeConstraints(input) {
  if (typeof input === 'string') {
    // Split multi-line string into array
    return input
      .split('\n')             // split by newlines
      .map(line => line.trim()) // trim each line
      .filter(Boolean);        // remove empty lines
  }

  if (Array.isArray(input)) {
    return input.map(line => line.trim()).filter(Boolean); // clean array input too
  }

  return [] 
}


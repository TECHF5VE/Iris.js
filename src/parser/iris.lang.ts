const SEMICOLON = `";"`;

export const irisGrammer: string = `
start
  = _ translation

translation
  = ${SEMICOLON} _ statement*

statement
  = integer

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

_ "whitespace"
  = [ \\t]*
`;

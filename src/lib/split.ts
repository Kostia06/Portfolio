import SplitType from 'split-type'

export function splitLines(el: HTMLElement) {
  return new SplitType(el, { types: 'lines', lineClass: 'split-line' })
}
export function splitWords(el: HTMLElement) {
  return new SplitType(el, { types: 'words', wordClass: 'split-word' })
}
export function splitChars(el: HTMLElement) {
  return new SplitType(el, { types: 'chars', charClass: 'split-char' })
}

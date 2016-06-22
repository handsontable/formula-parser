export function trimEdges(string, margin = 1) {
  string = string.substring(margin, string.length - margin);

  return string;
}

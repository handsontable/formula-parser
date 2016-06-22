export function extractLabel(label) {
  const [, columnAbs, column, rowAbs, row] = label.match(/(\$)?([A-Za-z]+)(\$)?([0-9]+)/) || [];

  return [
    {
      index: parseInt(row, 10),
      label: row,
      isAbsolute: rowAbs === '$',
    },
    {
      index: columnLabelToIndex(column),
      label: column,
      isAbsolute: columnAbs === '$'
    }
  ];
}

export function labelToCoords(label) {
  return 1;
}

export function coordsToLabel(coords) {
  return 1;
}

const COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function columnLabelToIndex(label) {
  let result = 0;

  for (let i = 0, j = label.length - 1; i < label.length; i += 1, j -= 1) {
    result += Math.pow(COLUMN_LABEL_BASE.length, j) * (COLUMN_LABEL_BASE.indexOf(label[i]) + 1);
  }
  if (result) {
    --result;
  }

  return result;
}

export function columnIndexToLabel(column) {
  let result = '';

  while (column >= 0) {
    result = String.fromCharCode(column % 26 + 97) + result;
    column = Math.floor(column / 26) - 1;
  }

  return result.toUpperCase();
}

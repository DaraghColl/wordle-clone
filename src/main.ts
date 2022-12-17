import './style.css';

const wordleGrid = document.querySelector('.grid');
const word = 'catch';

const checkIfLetterCorrect = (item: HTMLInputElement, rowItemIndex: number) => {
  if (item.value.toLowerCase() === word[rowItemIndex]) {
    item.classList.add('letter-correct');
  }
};

const rowItemInput = (event: InputEvent, rowItemIndex: number) => {
  const target = event.target as HTMLInputElement;
  target.disabled = true;

  checkIfLetterCorrect(target, rowItemIndex);
};

const createRowItem = (rowItemIndex: number, row: number) => {
  const rowItem = document.createElement('input');
  rowItem.setAttribute('type', 'text');
  rowItem.setAttribute('row', row.toString());
  rowItem.setAttribute('row-item', rowItemIndex.toString());
  rowItem.classList.add('grid__item');

  // disable all inputs inputs except first input
  if (rowItemIndex !== 0 && row === 0) {
    rowItem.disabled = true;
  }

  rowItem.addEventListener('input', (event: any) => rowItemInput(event, rowItemIndex));

  return rowItem;
};

const createRow = (row: number) => {
  for (let i = 0; i <= 4; i++) {
    const rowItem = createRowItem(i, row);
    wordleGrid?.appendChild(rowItem);
  }
};

for (let i = 0; i <= 3; i++) {
  createRow(i);
}

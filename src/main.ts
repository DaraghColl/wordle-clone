import './style.css';

const wordleGrid = document.querySelector('.grid');
const word = 'catch';

const checkInputAnswer = (item: HTMLInputElement, rowItemIndex: number) => {
  // add correct class if letter is correct
  // set matching columns to value and disabled
  if (item.value.toLowerCase() === word[rowItemIndex]) {
    item.classList.add('letter-correct');
    const matchingRowItems = document.querySelectorAll<HTMLInputElement>(
      `[row-item="${rowItemIndex}"]`,
    );
    matchingRowItems.forEach((rowItem) => {
      rowItem.value = item.value;
      rowItem.disabled = true;
      rowItem.classList.add('letter-correct');
    });
  }
};

const rowItemInputEvent = (event: InputEvent, rowItemIndex: number) => {
  const target = event.target as HTMLInputElement;
  target.disabled = true;

  checkInputAnswer(target, rowItemIndex);
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

  rowItem.addEventListener('input', (event: any) => rowItemInputEvent(event, rowItemIndex));

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

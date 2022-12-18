import './style.css';

const wordleGrid = document.querySelector('.grid');
const word = 'catch';
const gameState = {
  gameOver: false,
};

const wordStatus: Record<string, boolean> = {};
word.split('').forEach((key) => (wordStatus[key.toLowerCase()] = false));

/** GAME LOGIC */
const checkGameStatus = (item: HTMLInputElement) => {
  const allLettersCorrect = Object.values(wordStatus).every((value) => value === true);

  if (allLettersCorrect) {
    gameState.gameOver = true;
  } else if (item.getAttribute('row') === '3' && item.getAttribute('row-item') === '4') {
    gameState.gameOver = true;
  }
};

const checkInputAnswer = (item: HTMLInputElement, rowItemIndex: number) => {
  if (!gameState.gameOver) {
    // add correct class if letter is correct
    // set matching columns to value and disabled
    if (item.value.toLowerCase() === word[rowItemIndex]) {
      wordStatus[item.value.toLowerCase()] = true;
      item.classList.add('letter-correct');
      const matchingRowItems = document.querySelectorAll<HTMLInputElement>(
        `[row-item="${rowItemIndex}"]`,
      );
      matchingRowItems.forEach((rowItem) => {
        rowItem.value = item.value;
        rowItem.disabled = true;
        rowItem.classList.add('letter-correct');
      });
    } else if (word.includes(item.value)) {
      item.classList.add('letter-exists');
    } else {
      item.classList.add('letter-incorrect');
    }

    checkGameStatus(item);
  }
};

const findNextInput = (item: HTMLInputElement, rowItemIndex: number) => {
  const nextItem = item.nextElementSibling as HTMLInputElement;

  if (!gameState.gameOver) {
    // if letter already answered, check for next input again
    if (nextItem.classList.contains('letter-correct')) {
      findNextInput(nextItem, rowItemIndex);
      return;
    } else {
      nextItem.disabled = false;
      nextItem.focus();
    }
  }
};

const rowItemInputEvent = (event: InputEvent, rowItemIndex: number) => {
  const target = event.target as HTMLInputElement;
  target.disabled = true;

  checkInputAnswer(target, rowItemIndex);
  findNextInput(target, rowItemIndex);
};

const createRowItem = (rowItemIndex: number, row: number) => {
  const rowItem = document.createElement('input');
  rowItem.setAttribute('type', 'text');
  rowItem.setAttribute('row', row.toString());
  rowItem.setAttribute('row-item', rowItemIndex.toString());
  rowItem.classList.add('grid__item');
  rowItem.disabled = true;

  // disable all inputs inputs except first input
  if (rowItemIndex === 0 && row === 0) {
    rowItem.disabled = false;
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

/** GAME CONTROLS **/
const startGame = document.querySelector('#start_game_button') as HTMLElement;
const gameControlsContainer = document.querySelector('#start_controls_container') as HTMLElement;
startGame?.addEventListener('click', () => {
  gameControlsContainer.style.display = 'none';
});

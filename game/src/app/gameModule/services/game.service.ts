/**
 *
 */
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { StateGame } from './../models/state';
import { Cell } from '../models/cell';

export class GameService {
  type: string;
  endGame: Subject<boolean> = new Subject();
  stateGame: StateGame;
  constructor() {
    this.initialization();
  }

  initialization() {
    if (localStorage.length) {
      this.stateGame = JSON.parse(localStorage.getItem('game'));
      this.type = this.stateGame.currentType === 'cross' ? 'zero' : 'cross';

    } else {
      this.stateGame = new StateGame();
      this.type = this.stateGame.selectedType = 'cross';
      for (let index = 1; index <= 9; index++) {
        const cell = new Cell(index);
        this.stateGame.cells.push(cell);
      }
    }
  }

  get onEndGame(): Observable<boolean> {
    return this.endGame.asObservable();
  }

  checkWin(arr: number[], filterCells: Cell[]) {
    for (let index = 0; index < arr.length; index++) {
      if (!filterCells.some(x => x.id === arr[index])) {
        return false;
      }
    }
    return true;
  }

  changeCell(id: number) {
    if (!this.stateGame.isStartGame) {
      this.stateGame.isStartGame = true;
    }

    this.stateGame.cells[id - 1].type = this.type;
    const cells = this.stateGame.cells.filter(x => {
      return x.type === this.type;
    });

    if (cells.length >= 3) {
      if (this.checkWin([1, 2, 3], cells) ||
        this.checkWin([4, 5, 6], cells) || this.checkWin([7, 8, 9], cells) ||
        this.checkWin([1, 4, 7], cells) || this.checkWin([2, 5, 8], cells) ||
        this.checkWin([3, 6, 9], cells) || this.checkWin([1, 5, 9], cells) ||
        this.checkWin([3, 5, 7], cells)) {
        this.stateGame.isHaveEndGame = true;
        this.saveGameState();
        this.endGame.next(true);
        return;
      }
    } if (this.stateGame.cells.filter(x => x.type).length === 9) {
      this.stateGame.isHaveEndGame = true;
      this.saveGameState(true);
      this.endGame.next(true);
      return;
    }
    this.saveGameState();
    this.type = this.type === 'cross' ? 'zero' : 'cross';
  }

  closedDialog() {
    localStorage.clear();
    this.initialization();
  }

  saveGameState(isDraw: boolean = false) {
    if (localStorage.length) {
      localStorage.clear();
    }
    this.stateGame.currentType = isDraw ? '' : this.type;
    localStorage.setItem('game', JSON.stringify(this.stateGame));
  }
}

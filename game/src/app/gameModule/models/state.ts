import { Cell } from './cell';

export class StateGame {
    constructor() {
        this.isHaveWon = false;
    }
    cells: Cell[] = [];
    type: string;
    isHaveWon: boolean;
    isStartGame: boolean;
    selectedType: string;
}

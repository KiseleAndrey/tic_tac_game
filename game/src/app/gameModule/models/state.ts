import { Cell } from './cell';

export class StateGame {
    constructor() {
        this.isHaveEndGame = false;
    }
    cells: Cell[] = [];
    currentType: string;
    isHaveEndGame: boolean;
    isStartGame: boolean;
    selectedType: string;
}

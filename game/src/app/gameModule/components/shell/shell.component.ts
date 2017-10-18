import { Component, OnInit, AfterViewInit } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  constructor(private gameServece: GameService) {
  }
  get cells() {
    return this.gameServece.stateGame.cells;
  }

  get getStateGame() {
    return this.gameServece.stateGame.isStartGame;
  }

  get type() {
    return this.gameServece.stateGame.selectedType;
  }
  changeType(type: string) {
    this.gameServece.type = this.gameServece.stateGame.selectedType = type;
  }
}

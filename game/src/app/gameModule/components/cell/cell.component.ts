import { GameService } from './../../services/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../models/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input()
  cell: Cell;
  constructor(private gameservice: GameService) { }

  changeState() {
    if (!this.cell.type) {
      this.gameservice.changeCell(this.cell.id);
    }
  }
}

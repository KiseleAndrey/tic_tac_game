import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('show-popup', [
      state('false', style({
        top: '-310px',
        background: 'rgba(0, 0, 0, 0.04)',
      })),
      state('true', style({
        top: '40px',
        background: '#e3e3e3',
      })),
      transition('0 => 1', [
        animate(200, style({ transform: 'translateY(100%) scale(0.6)' })),
      ]),
      transition('1 => 0', [
        animate(200, style({ transform: 'translateY(-100%) scale(0.6)' }))
      ]),
    ]),
  ]
})
export class PopupComponent implements OnInit {
  show = false;
  gameEndSubscription: Subscription;
  constructor(private gameServece: GameService) {

  }
  ngOnInit(): void {
    this.show = this.gameServece.stateGame.isHaveEndGame;

    this.gameEndSubscription = this.gameServece.onEndGame.subscribe(x => {
      this.show = x;
    });
  }

  get type(): string {
    return this.gameServece.stateGame.currentType;
  }

  closeDialog() {
    this.show = !this.show;
    this.gameServece.closedDialog();
  }

}

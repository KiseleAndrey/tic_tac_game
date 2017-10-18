import { NgModule } from '@angular/core';
import { ShellComponent } from './components/shell/shell.component';
import { GameRoutingModule } from './game-routing-module';
import { CellComponent } from './components/cell/cell.component';
import { GameService } from './services/game.service';
import { PopupComponent } from './components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CellComponent,
    PopupComponent,
    ShellComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    GameService
  ]
})
export class GameModule {

}

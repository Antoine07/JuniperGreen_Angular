import { NgModule } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RulesComponent } from './rules/rules.component';
import { StatusComponent } from './status/status.component';
import { LevelComponent } from './level/level.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'status', component: StatusComponent },
  { path: 'level', component: LevelComponent },
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports : [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { GameComponent } from './game/game.component';
import { RulesComponent } from './rules/rules.component';

import { JunipergreenService } from './junipergreen.service';
import { ControlValidatorDirective } from './shared/control-names.directive';
import { PossiblesComponent } from './possibles/possibles.component'
import { StorageNumberService } from './storage-number.service';
import { StatusComponent } from './status/status.component';
import { LevelComponent } from './level/level.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GameComponent,
    RulesComponent,
    ControlValidatorDirective,
    PossiblesComponent,
    StatusComponent,
    LevelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports
    BrowserAnimationsModule,
  ],
  providers: [JunipergreenService, StorageNumberService],
  bootstrap: [AppComponent]
})
export class AppModule { }

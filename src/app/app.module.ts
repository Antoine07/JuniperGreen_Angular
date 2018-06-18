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
import { StatusComponent } from './status/status.component';
import { LevelComponent } from './level/level.component';

import { JuniperDatabaseService } from './juniper-database.service';

// http client
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [JunipergreenService, JuniperDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

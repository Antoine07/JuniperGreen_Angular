import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../init';
import { JunipergreenService } from '../junipergreen.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  player1 : User;
  player2 : User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // this.player1 = new User(this.players.player1.name, this.players.player1.score);
    // this.player2 = new User(this.players.player2.name, this.players.player2.score);

  }

  replay() {
    localStorage.clear();

    return this.router.navigate(['/game']);
  }

}

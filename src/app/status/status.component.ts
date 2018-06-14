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

  Players: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.Players = localStorage.getItem('storage') ;

  }

  replay(){
    localStorage.clear();

    return this.router.navigate(['/game']);
  }

}

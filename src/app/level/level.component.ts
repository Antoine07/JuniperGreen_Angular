import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  levelForm: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.levelForm = new FormGroup({
      'range': new FormControl('', [
      ])
    });
  }

  ngAfterViewInit() {
    console.log('init ... view')

  }

  onSubmit(){
    console.log(this.levelForm.value['range']);

  }

}

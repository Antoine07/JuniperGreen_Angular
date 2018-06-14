import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  levelForm: FormGroup;

  constructor(private elementRef:ElementRef){

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

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: ` <p>input-button-unit works! The title is: {{ title }}</p> `,
  styleUrls: ['./input-button-unit.component.scss'],
})
export class InputButtonUnitComponent implements OnInit {
  title = 'Hello world@';

  constructor() {
    // this.title = 'I Love Angular';
    console.log('in constructor');
    this.changeTitle('My First Angular App');
    console.log(this.title);
    // this.changeTitle('I Love Angular');
  }

  ngOnInit(): void {
    this.changeTitle('Angular CLI Rules! (Test function changeTitle)');
  }

  changeTitle(newTitle: string) {
    console.log(newTitle);
    this.title = newTitle;
  }


}

function multiply(x: number, y: number) {
  return x * y;
}

let z = multiply(4, 5);
console.log(z);


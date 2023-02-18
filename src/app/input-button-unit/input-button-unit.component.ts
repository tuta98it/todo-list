import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: ` <p>input-button-unit works! The title is: {{ title }}</p>
    <input type="text" [value]="generateTitle()" id="my-input" />




    <button>Save</button>`,
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
    setTimeout(() => {
      this.title = 'This is not the title you are looking for';
    }, 3000);
  }

  changeTitle(newTitle: string) {
    console.log(newTitle);
    this.title = newTitle;
  }

  generateTitle(): string {
    return 'This title was generated by a method.';
  }
}

function multiply(x: number, y: number) {
  return x * y;
}

let z = multiply(4, 5);
console.log(z);




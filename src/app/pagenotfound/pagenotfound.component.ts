import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  template: `
    <p>
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="backHome()">Back Home</button>
      </div>
    </nz-result>
    </p>
  `,
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit{
    constructor(private router: Router){}
    ngOnInit(): void {}
    backHome(){
      this.router.navigate(['']);
    }
}

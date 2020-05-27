import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prime-theme',
  templateUrl: './prime-theme.component.html',
  styleUrls: ['./prime-theme.component.scss']
})
export class PrimeThemeComponent implements OnInit {
  text: string;

  constructor() { }

  ngOnInit(): void {
  }

}

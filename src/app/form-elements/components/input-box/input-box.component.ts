import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() controlName = 'inputBox';
  @Input() parent = true;
  @Input() required = true;
  @Input() value = '';
  @Input() placeholder = '';
  @Input() selected = false;
  @Input() maxLength = 30;
  @Input() disabled = false;
  @Input() validationPattern = /^[a-zA-Z0-9]$/i;
  @Input() validationMessage = 'Invalid data';

  text: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

}

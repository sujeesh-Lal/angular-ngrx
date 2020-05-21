import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InputValidators } from './input-validators';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() parent: FormGroup = this.fb.group({});
  @Input() controlName = 'inputBox';
  @Input() public autocomplete: string;
  @Input() required = true;
  @Input() readonly = true;
  @Input() defaultValue = '';

  // @Input()
  // set value(data: string) {
  //   this.defaultValue = data;
  // }
  @Input() placeholder = '';


  // @Input() selected = false;
  // @Input() maxLength = 3;

  // @Input() validationPattern = /^[a-zA-Z0-9]$/i;
  // @Input() validationMessage = 'Invalid data';

  // defaultValue = '';
  cname = 'inputBox';


  @Input() public config: any = {
    required: true,
    readonly: false,
    controlName: 'inputBox',
    autocomplete: 'off',
    placeholder: '',
    maxLength: 20,
    validationRule: /^[a-zA-Z0-9-]$/i
  };


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addFormControl();
    console.log(this.defaultValue);
  }

  addFormControl(): void {
    const validators = [Validators.required, Validators.minLength(5)];
    this.parent.addControl(this.controlName, this.fb.control(null, validators));
  }

  get isRequired(): boolean {
    return this.required === undefined ? this.config.required : this.required;
  }

  get setPlaceholder() {
    let placeholder =
      this.placeholder !== undefined
        ? this.placeholder
        : this.config.placeholder;
    if (placeholder === undefined) {
      placeholder = '';

    }
    return placeholder;
  }

  get setAutocomplete() {
    let autocomplete =
      this.autocomplete !== undefined
        ? this.autocomplete
        : this.config.autocomplete;
    if (!autocomplete) {
      autocomplete = 'off';
    }
    return autocomplete;
  }

}

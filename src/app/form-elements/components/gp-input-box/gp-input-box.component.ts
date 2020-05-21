import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Interface
import { FormElement } from './form-element.interface';

/* custome validators */
import { InputValidators } from './../input-box/input-validators';

@Component({
  selector: 'gp-input-box',
  templateUrl: './gp-input-box.component.html',
  styleUrls: ['./gp-input-box.component.scss']
})
export class GpInputBoxComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() controlName: string;
  @Input()
  set label(data: string) {
    this.showLabel = (data && data.trim().length > 0) ? true : false;
    this.config.label = data;
  }
  @Input() readonly: boolean;
  @Input() defaultValue: string;
  @Input() autocomplete: string; // possible value - 'on', 'off' (Default value is 'off').
  @Input() placeholder: string;
  @Input() forId: string;
  @Input() className: string;

  @Input() public config: FormElement = {
    type: 'gpInput',
    className: 'gp-input-box-component',
    textAlign: 'text-left',
    required: true,
    readonly: false,
    controlName: 'inputBox',
    autocomplete: 'off',
    defaultValue: '',
    placeholder: '',
    maxLength: 20,
    validationRule: /^[a-zA-Z0-9-]$/i,
    validationMessage: {
      emptyFieldError: 'Error on empty field',
      invalidInputError: 'Error on invalid input',
      customError: 'Business validation error'
    },
    accessibility: {
      forId: 'forId'
    }
  };

  showLabel = false;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.controlName = this.cn;
    this.forId = this.getForId;
    this.addControl();
  }

  get isDisabled(): boolean {
    if (this.controlName) {
      return this.parent.get(this.controlName).disabled;
    }
  }

  get required(): boolean {
    return (
      this.parent.get(this.controlName).hasError('required') &&
      this.parent.get(this.controlName).touched
    );
  }

  get invalid(): boolean {
    return (
      this.parent.get(this.controlName).hasError('invalidInput') &&
      this.parent.get(this.controlName).dirty &&
      !this.required
    );
  }

  get customError(): boolean {
    return (
      this.parent.get(this.controlName).hasError('customError') &&
      this.parent.get(this.controlName).dirty &&
      !this.required
    );
  }

  addControl(): void {
    if (this.parent.get(this.controlName) === null) {
      if (this.config.required) {
        this.parent.addControl(
          this.controlName,
          this.fb.control(null, [
            Validators.required,
            InputValidators.validateInput(this.config.validationRule),
          ])
        );
      } else {
        this.parent.addControl(this.controlName, this.fb.control(null));
      }
    } else {
      if (this.config.required) {
        this.parent.get(this.controlName).clearValidators();
        this.parent
          .get(this.controlName)
          .setValidators([
            Validators.required,
            InputValidators.validateInput(this.config.validationRule)
          ]);
        this.parent.get(this.controlName).updateValueAndValidity();
      }
    }
  }

  getErrorMessage() {
    if (this.required) {
      return this.config.validationMessage.emptyFieldError;
    }
    if (this.invalid) {
      return this.config.validationMessage.invalidInputError;
    }
    if (this.customError) {
      return this.config.validationMessage.customError;
    }
  }

  getClass() {
    let inputClass = this.className ? this.className : this.config.className;
    if (this.isDisabled) {
      inputClass += 'inactive';
    }
    if (this.required || this.invalid || this.customError) {
      inputClass += 'error-border';
    }
    return inputClass;
  }

  // Get control name
  get cn() {
    return this.controlName !== undefined
      ? this.controlName
      : this.config.controlName;
  }

  // Get default value
  get dv() {
    return this.defaultValue ? this.defaultValue : this.config.defaultValue;
  }

  // Get readonly
  get ro() {
    return this.readonly ? this.readonly : this.config.readonly;
  }

  // Get auto complete
  get ac() {
    return this.autocomplete ? this.autocomplete : this.config.autocomplete;
  }

  // Get place holder
  get ph() {
    return this.placeholder ? this.placeholder : this.config.placeholder;
  }

  // Get for/id
  get getForId() {
    return this.forId ? this.forId : this.config.accessibility.forId;
  }

}

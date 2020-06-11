import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  // @Input()
  // set val(data: string) {
  //   //   this.showLabel = (data && data.trim().length > 0) ? true : false;
  //   //   // this.showLabel = true;
  //   //   this.config.label = data;
  // }

  value: any = '';
  cities: any = [];

  constructor(
    // Retrieve the dependency only from the local injector,
    // not from parent or ancestors.
    @Self()
    // We want to be able to use the component without a form,
    // so we mark the dependency as optional.
    @Optional()
    private ngControl: NgControl
  ) {
    this.cities.push({ label: 'A', value: 'A' });
    this.cities.push({ label: 'B', value: 'B' });
    this.cities.push({ label: 'C', value: 'C' });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() { }

  // get selVvalue(): any {
  //   return this.stars.reduce((total, starred) => {
  //     return total + (starred ? 1 : 0);
  //   }, 0);
  // }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    this.value = value;
  }

  selectItem(evt: any) {
    // console.log(evt.option.value);
    this.value = evt.option.value;
    // this.ngControl.viewModel = evt.option.value;
    this.writeValue(evt.option.value);
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  private onChange() { }
  private onTouched() { }
}

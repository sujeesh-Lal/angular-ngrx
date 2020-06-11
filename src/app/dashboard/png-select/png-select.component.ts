import {
  NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef,
  ContentChild, TemplateRef, SimpleChanges, OnChanges, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItem } from './selectitem';
import { ObjectUtils } from './objectutils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PngSelectComponent),
  multi: true
};

@Component({
  selector: 'png-select',
  templateUrl: './png-select.component.html',
  providers: [SELECTBUTTON_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PngSelectComponent implements ControlValueAccessor, OnChanges {

  @Input() tabindex = 0;

  @Input() multiple: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() ariaLabelledBy: string;

  @Input() disabled: boolean;

  @Input() dataKey: string;

  @Input() optionLabel: string;

  @Output() onOptionClick: EventEmitter<any> = new EventEmitter();

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef) itemTemplate;

  value: any;

  focusedItem: HTMLDivElement;

  _options: any[];

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  constructor(private cd: ChangeDetectorRef) { }

  @Input() get options(): any[] {
    return this._options;
  }

  set options(val: any[]) {
    // NoOp
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.options) {
      this._options = this.optionLabel ? ObjectUtils.generateSelectItems(simpleChange.options.currentValue, this.optionLabel)
        : simpleChange.options.currentValue;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  onItemClick(event, option: SelectItem, index: number) {
    if (this.disabled || option.disabled) {
      return;
    }

    if (this.multiple) {
      const itemIndex = this.findItemIndex(option);
      if (itemIndex !== -1) {
        this.value = this.value.filter((val, i) => i !== itemIndex);
      }
      else {
        this.value = [...this.value || [], option.value];
      }
    }
    else {
      this.value = option.value;
    }

    this.onOptionClick.emit({
      originalEvent: event,
      option,
      index
    });

    this.onModelChange(this.value);

    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }

  onFocus(event: Event) {
    this.focusedItem = (event.target as HTMLDivElement);
  }

  onBlur(event) {
    this.focusedItem = null;
    this.onModelTouched();
  }

  isSelected(option: SelectItem) {
    if (this.multiple) {
      return this.findItemIndex(option) !== -1;
    }
    else {
      return ObjectUtils.equals(option.value, this.value, this.dataKey);
    }
  }

  findItemIndex(option: SelectItem) {
    let index = -1;
    if (this.value) {
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i] === option.value) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}

// @NgModule({
//   imports: [CommonModule],
//   exports: [PngSelectComponent],
//   declarations: [PngSelectComponent]
// })
// export class SelectButtonModule { }

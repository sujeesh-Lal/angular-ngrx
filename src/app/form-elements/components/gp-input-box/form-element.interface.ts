export interface FormElement {

    type?: string;

    className?: string;
    label?: string;

    required?: boolean;

    disabled?: boolean;

    controlName?: string;

    readonly?: boolean;

    autocomplete?: string;

    defaultValue?: string;

    maxLength?: number;

    placeholder?: string;

    textAlign?: string; // text-right, text-left, text-center

    groupName?: string;

    dropdownOptions?: DropdownOptions[];

    radioOptions?: RadioOptions[];

    enableGroupLabel?: boolean;

    codePropertyName?: string;

    valuePropertyName?: string;

    validationRule?: object;

    colSize?: ColumnSize;

    groupKeyCol?: number; // Applicable for only radio label

    validationMessage?: ValidationMessage;

    accessibility?: Accessibility;

}



interface ValidationMessage {

    emptyFieldError: string;

    invalidInputError: string;

    customError: string;

}



interface ColumnSize {

    keyCol: number;

    valCol: number;

}



export interface RadioOptions {

    code: string;

    value: string;

    colSize: number;

    showLabel: boolean;

}

export interface DropdownOptions {

    code: string;

    value: string;

}



export interface DatepickerFormat {

    year: number;

    month: number;

    day: number;

}



export interface Accessibility {

    forId: string;

}

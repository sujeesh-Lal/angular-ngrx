import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {
  SEVERITY, GIP_FIELD_LIST, GIP_MEMBER_ERROR_DATA, LAB_FIELD_LIST,
  LAB_MEMBER_ERROR_DATA, DUPLICATE_DATA
} from './member-data.model';
import { OverlayPanel } from 'primeng/overlaypanel';


@Component({
  selector: 'member-data-edit-errors',
  templateUrl: './member-data-edit-errors.component.html',
  styleUrls: ['./member-data-edit-errors.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDataEditErrorsComponent implements OnInit {
  memberData: any[];
  memberDataFrozenCols: any[];
  memberDataScrollableCols: any[];
  severityMsg: string | null = null;
  errorList = [];
  headerMap: object;
  validationObject: object = {};
  optionsObject: object = {};
  showDeleteDialog = false;
  deleteTaggedRow: any;
  dateRegex = '^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9][0-9]$';
  categories = [
    { label: 'one', value: 'one' },
    { label: 'two$', value: 'two$' },
    { label: 'three', value: 'three' },
    { label: 'four', value: 'four' },
    { label: 'five', value: 'five' },
    { label: 'six', value: 'six' },
    { label: 'seven', value: 'seven' },
    { label: 'eight', value: 'eight' },
  ];
  constructor(private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    (window as any).aaa = this;
    this.memberData = this.getMemeberData();
    this.memberDataFrozenCols = this.getFrozonCols();
    this.memberDataScrollableCols = this.getScrollableCols();
    this.generateValidationAndOptionsObject();
  }

  generateValidationAndOptionsObject() {
    GIP_FIELD_LIST.forEach((field) => {
      this.validationObject[field.column_id] = field;
      if (field.type === 'select') {
        this.optionsObject[field.column_id] = field.options.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
      }
    });
    console.log(this.validationObject);
    console.log(this.optionsObject);
  }

  getSelectOptions(field, data) {
    const optionObject = this.optionsObject[field].filter((option) => {
      if (data.row_entry[field] === option.value) {
        return option;
      }
    });
    let optionValues = this.optionsObject[field];
    if (!optionObject.length) {
      optionValues = [{
        label: data.row_entry[field],
        value: data.row_entry[field]
      }].concat(this.optionsObject[field]);
    }
    return optionValues;
  }

  formatDate(dateObj) {
    if (dateObj && dateObj.getDate && !isNaN(dateObj.getDate())) {
      return (dateObj.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        + '/' + (dateObj.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        + '/' + dateObj.getFullYear();
    } else {
      return dateObj;
    }
  }

  getMemeberData() {
    return GIP_MEMBER_ERROR_DATA.member_data_errors;
  }

  getFrozonCols() {
    return [
      { field: 'delete', header: '' },
      { field: 'errors', header: 'Error' },
      { field: 'severity', header: 'Severity' },
      { field: 'include', header: 'Include' }
    ];
  }

  getScrollableCols() {
    this.headerMap = GIP_MEMBER_ERROR_DATA.header_map;
    const resultArray = Object.keys(GIP_MEMBER_ERROR_DATA.header_map).map((personNamedIndex) => {
      const fields: any = {
        field: null,
        header: null
      };
      fields.field = personNamedIndex;
      fields.header = GIP_MEMBER_ERROR_DATA.header_map[personNamedIndex];
      return fields;
    });
    console.log(resultArray);
    return [{ field: 'row_number', header: 'Row No' }].concat(resultArray);
  }

  getRowSeverity(data) {
    if (data && (data.error_severity === SEVERITY.ACTION || data.error_severity === SEVERITY.ACTION_WITH_TOLERANCE)) {
      return 'fa fa-exclamation-circle red-exclamation';
    } else if (data && data.error_severity === SEVERITY.DATA_QUALITY_CHECK) {
      return 'fa fa-exclamation-circle yellow-exclamation';
    } else {
      return '';
    }
  }

  showSeverityMsg(event, overlay: OverlayPanel, data) {
    if (data && (data.error_severity === SEVERITY.ACTION || data.error_severity === SEVERITY.ACTION_WITH_TOLERANCE)) {
      this.severityMsg = 'Action - please correct the field highlighted';
    } else if (data && data.error_severity === SEVERITY.DATA_QUALITY_CHECK) {
      this.severityMsg = 'Please review to improve the quality of the quote';
    } else {
      this.severityMsg = null;
    }
    if (this.severityMsg) {
      overlay.show(event);
    }

  }

  hideSeverityPopup(overlay: OverlayPanel, ) {
    overlay.hide();
  }

  deleteMemberDataRow(data) {
    this.deleteTaggedRow = data;
    this.showDeleteDialog = true;
  }

  deleteConfirm() {
    console.log('delete');
    this.showDeleteDialog = false;
    this.deleteTaggedRow = null;
  }

  deleteCancel() {
    console.log('cancel');
    this.deleteTaggedRow = null;
    this.showDeleteDialog = false;
  }

  getConsolidatedErrors(data) {
    if (data && data.errors) {
      if (Object.keys(data.errors).length === 1) {
        if (data.errors[Object.keys(data.errors)[0]].length > 1) {
          return `<a
         class="mde-error-link">${data.errors[Object.keys(data.errors)[0]].length} errors</a> `;
        } else if (data.errors[Object.keys(data.errors)[0]].length === 1) {
          return `<span class="mde-single-error-msg">${data.errors[Object.keys(data.errors)[0]][0].message}</span>`;
        } else {
          return '<em class="fa fa-check green-tick"></em>';
        }
      } else if (Object.keys(data.errors).length > 1) {
        return `<a
        class="mde-error-link">${this.getErrorCount(data.errors)} errors</a> `;
      } else {
        return '<em class="fa fa-check green-tick"></em>';
      }
    } else {
      return '<em class="fa fa-check green-tick"></em>';
    }
  }

  showErrorMsg(event, overlay: OverlayPanel, data) {
    if (event.target.children[0].getAttribute('class') &&
      event.target.children[0].getAttribute('class').indexOf('mde-error-link') !== -1) {
      this.errorList = [];
      Object.keys(data.errors).forEach(item => {
        if (data.errors[item].length !== undefined) {
          this.errorList = this.errorList.concat(data.errors[item]);
        }
      });
      overlay.show(event);

    }
  }

  getErrorCount(errors) {
    let count = 0;
    Object.keys(errors).forEach(item => {
      if (errors[item].length !== undefined) {
        count = count + errors[item].length;
      }
    });
    return count;
  }

  selectMemberRow(evt, data) {
    this.checkDuplicate('age');
    console.log(evt);
    console.log(data);
  }

  hasValidationFieldError(field, data) {

    if (data && data.errors) {
      if (data.errors[field] && data.errors[field].length > 0) {
        // console.log('has validation', data.errors);
        return true;
      }
    }
    return false;
  }

  onEditInit(event) {
    console.log('onEditInit', event);
  }

  onEditCancel(event) {
    console.log('onEditCancel', event);
  }

  onEditComplete(event) {
    if (event.field === 'category') {
      this.validateField(event.field, event.data);
    } else if (event.field === 'date_of_birth') {
      event.data.row_entry[event.field] = this.formatDate(event.data.row_entry[event.field]);
      this.validateField(event.field, event.data);
    } else if (event.field === 'gender') {
      this.validateField(event.field, event.data);
    }
    if (event.field === 'age' || event.field === 'date_of_birth' || event.field === 'gender' ||
      event.field === 'first_name' || event.field === 'last_name'
      || event.field === 'employee_payroll_no') {
      this.checkDuplicate(event.field);
    }

    console.log('onEditComplete', event.data);
  }

  // validateDate(type, data) {

  // }

  onKey(event: any, data, field, index) { // without type info
    console.log(event.target.value);
    this.validateField(field, data);
    // this.values += event.target.value + ' | ';
  }

  onChange() {
    console.log('this.onChange');
  }

  isValidData(field, data) {
    if (this.getFieldValidationArray(field, data).length > 0) {
      return 'error-border';
    } else {
      return '';
    }
  }

  getFieldValidationArray(field, data) {
    const dataVal = this.getKeyValue(data, field);
    // if (data.row_entry[field]) {
    //   if (typeof data.row_entry[field] === 'string') {
    //     dataVal = data.row_entry[field].trim();
    //   } else {
    //     dataVal = data.row_entry[field];
    //   }
    // }
    const validatorArray = [];
    this.validationObject[field].validators.forEach((validator) => {
      if (dataVal && validator.validate === 'regex_match' && !this.isValidRegex(validator, dataVal)) {
        // this.validateRegex(validator, dataVal);
        validatorArray.push({
          severity: validator.error_severity,
          message: validator.error_message
        });
      } else if (validator.validate === 'required' && this.validateRequired(dataVal)) {
        validatorArray.push({
          severity: validator.error_severity,
          message: validator.error_message
        });
      } else if (validator.validate === 'required_without' && this.validateRequiredWithout(validator, dataVal, data)) {
        if (!dataVal) {
          validatorArray.push({
            severity: validator.error_severity,
            message: validator.error_message
          });
        }
      } else if (dataVal && validator.validate === 'number_field_less_than_or_equal_to'
        && !this.validateNumberLessThanEqual(validator, dataVal, data, field)) {
        // check dependent field valid
        validatorArray.push({
          severity: validator.error_severity,
          message: validator.error_message
        });
      } else if (dataVal && validator.validate === 'date_field_less_than_or_equal_to'
        && !this.validateDateLessThanEqual(validator, dataVal, data, field)) {
        validatorArray.push({
          severity: validator.error_severity,
          message: validator.error_message
        });
      } else if (dataVal && validator.validate === 'options'
        && !this.validateOptions(validator, dataVal, data, field)) {
        validatorArray.push({
          severity: validator.error_severity,
          message: validator.error_message
        });
      }
    });
    return validatorArray;
  }

  validateField(field, data) {
    // console.log(data);
    // console.log(this.getMemberColumnValidation(type));
    // let dataVal = null;
    // if (data.row_entry[type]) {
    //   if (typeof data.row_entry[type] === 'string') {
    //     dataVal = data.row_entry[type].trim();
    //   } else {
    //     dataVal = data.row_entry[type];
    //   }
    // }
    const validatorArray = this.getFieldValidationArray(field, data);
    // if (this.validationObject[type].mandatory) {
    //   if (dataVal.length === 0) {
    //     return true;
    //   }
    // }
    // this.validationObject[type].validators.forEach((validator) => {
    //   if (validator.validate === 'regex_match' && !this.validateRegex(validator, dataVal)) {
    //     this.validateRegex(validator, dataVal);
    //     validatorArray.push({
    //       severity: validator.error_severity,
    //       message: validator.error_message
    //     });
    //   } else if (validator.validate === 'required' && this.validateRequired(validator, dataVal)) {
    //     validatorArray.push({
    //       severity: validator.error_severity,
    //       message: validator.error_message
    //     });
    //   }
    // });
    if (data) {
      if (!data.errors) {
        data.errors = {};
      }
      if (validatorArray.length > 0) {
        data.errors[field] = validatorArray;
      } else {
        delete data.errors[field];
      }
      this.updateSeverity(data);
    }
    // data.errors
    console.log(validatorArray);
    return true;
  }

  updateSeverity(data) {
    if (data && typeof data.errors === 'object' && Object.keys(data.errors).length > 0) {
      data.error_severity = this.getErrorRowSeverity(data.errors);
    } else {
      data.errors = null;
      data.error_severity = null;
    }
  }

  getErrorRowSeverity(errors) {
    let severityArray = [];
    Object.keys(errors).forEach(item => {
      if (errors[item].length > 0) {
        const listSeverity = errors[item].map((el) => {
          return el.severity;
        });
        severityArray = severityArray.concat(listSeverity);
      }
    });
    // console.log(severityArray);
    if (severityArray.indexOf(SEVERITY.ACTION) || severityArray.indexOf(SEVERITY.ACTION_WITH_TOLERANCE)) {
      return SEVERITY.ACTION;
    } else if (severityArray.indexOf(SEVERITY.DATA_QUALITY_CHECK)) {
      return SEVERITY.DATA_QUALITY_CHECK;
    } else {
      return null;
    }
  }

  isValidRegex(validator, data) {
    // console.log('dd');
    const globalRegex = RegExp(validator.regex, 'g');
    return globalRegex.test(data);
    // validator.regex.test
  }

  validateRequired(data) {
    if (data === null || data === undefined || data === '') {
      return true;
    } else {
      return false;
    }
    // if (data && data.length > 0) {
    //   return false;
    // } else {
    //   return true;
    // }
  }

  validateDate(dateStr) {
    const dtRegex = RegExp(this.dateRegex, 'g');
    return dtRegex.test(dateStr);
    // if (dtRegex.test(dateStr)) {
    //   return dateStr;
    // } else {
    //   return null;
    // }
  }

  validateRequiredWithout(validator, dataVal, data) {
    let isDependentRequiredFieldEmpty = false;
    validator.fields.forEach((key) => {
      const keyValue = this.getKeyValue(data, key);
      if (!keyValue) {
        isDependentRequiredFieldEmpty = true;
        this.validationObject[key].validators.forEach((validatorItem) => {
          if (validatorItem.validate === 'required_without') {
            if (!data.errors) {
              data.errors = {};
            }
            data.errors[key] = [{
              severity: validatorItem.error_severity,
              message: validatorItem.error_message
            }];
          }
        });
      }
    });

    if (!dataVal && isDependentRequiredFieldEmpty) {
      return true;
    } else if (dataVal && isDependentRequiredFieldEmpty) {
      validator.fields.forEach((key) => {
        const keyValue = this.getKeyValue(data, key);
        if (!keyValue) {
          delete data.errors[key];
        }
      });
      return false;
    }

    // const validatorArray = [];
    // this.validationObject[key].validators.forEach((validatorItem) => {
    //   if (validatorItem.validate === 'regex_match' && !this.isValidRegex(validatorItem, dataVal)) {
    //     validatorArray.push({
    //       severity: validatorItem.error_severity,
    //       message: validatorItem.error_message
    //     });
    //   } else if (validatorItem.validate === 'number_field_less_than_or_equal_to'
    //     && !this.validateNumberLessThanEqual(validatorItem, keyValue, data)) {
    //     validatorArray.push({
    //       severity: validatorItem.error_severity,
    //       message: validatorItem.error_message
    //     });
    //   } else if (validatorItem.validate === 'date_field_less_than_or_equal_to'
    //     && !this.validateDateLessThanEqual(validatorItem, keyValue, data)) {
    //     validatorArray.push({
    //       severity: validatorItem.error_severity,
    //       message: validatorItem.error_message
    //     });
    //   }
    // });

    // validator.fields.forEach((key) => {
    //   const keyValue = this.getKeyValue(data, key);
    //   // if (keyValue) {

    //   // }
    //   this.validationObject[key].validators.forEach((validatorItem) => {
    //     if (validatorItem.validate === 'regex_match' && !this.isValidRegex(validatorItem, dataVal)) {
    //       validatorArray.push({
    //         severity: validatorItem.error_severity,
    //         message: validatorItem.error_message
    //       });
    //     } else if (validatorItem.validate === 'number_field_less_than_or_equal_to'
    //       && !this.validateNumberLessThanEqual(validatorItem, keyValue, data)) {
    //       validatorArray.push({
    //         severity: validatorItem.error_severity,
    //         message: validatorItem.error_message
    //       });
    //     } else if (validatorItem.validate === 'date_field_less_than_or_equal_to'
    //       && !this.validateDateLessThanEqual(validatorItem, keyValue, data)) {
    //       validatorArray.push({
    //         severity: validatorItem.error_severity,
    //         message: validatorItem.error_message
    //       });
    //     }
    //   });
    // });
    // return validatorArray;
    // if (!dataVal && validatorArray.length > 0) {
    //   return true;
    // } else if (dataVal && validatorArray.length === 0) {
    //   return false;
    // } else if (!dataVal && validatorArray.length === 0) {
    //   return false;
    // }
    // return Boolean(validatorArray.length);
  }

  validateNumberLessThanEqual(validator, dataVal, data, field) {
    return dataVal <= parseInt(validator.field_limit, 10) ? true : false;
  }

  validateDateLessThanEqual(validator, dataVal, data, field) {
    if (this.validateDate(dataVal)) {
      dataVal = dataVal.replaceAll('-', '/');
      dataVal = dataVal.replaceAll('.', '/');
      const dateObj = new Date();
      dateObj.setDate(dataVal.split('/')[0]);
      dateObj.setMonth(parseInt(dataVal.split('/')[1], 10) - 1);
      dateObj.setFullYear(dataVal.split('/')[2]);
      if (dateObj && dateObj.getDate && !isNaN(dateObj.getDate())) {
        if (this.getAge(dateObj) <= parseInt(validator.field_limit, 10)) {
          return true;
        }
      }
    }
    return false;
  }

  validateOptions(validator, dataVal, data, field) {
    const optionObject = this.optionsObject[field].filter((option) => {
      if (dataVal === option.value) {
        return option;
      }
    });
    return Boolean(optionObject.length);
  }

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getKeyValue(data, field) {
    let dataVal = null;
    if (data.row_entry[field]) {
      if (typeof data.row_entry[field] === 'string') {
        dataVal = data.row_entry[field].trim();
      } else {
        dataVal = data.row_entry[field];
      }
    }
    return dataVal;
  }

  onDateSelect(data, rowData, field) {
    rowData.row_entry[field] = this.formatDate(data);
    this.validateField(field, rowData);
  }

  exportExcel() {
    const exportData = this.memberData.map((item) => {
      return Object.assign({
        row_number: item.row_number,
        severity: item.error_severity,
        include: item.include
      }, item.row_entry);
    });
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'member_data_errors');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getDuplicateValidtionForField(field) {
    console.log(this.validationObject[field]);
    const duplicateVlidators = this.validationObject[field].validators.filter((validateItem) => {
      if (validateItem.validate.indexOf('duplicate_error') !== -1) {
        return validateItem;
      }
    });
    return duplicateVlidators;
  }

  checkDuplicate(field) {
    // const dataRows = DUPLICATE_DATA;
    // get duplicate validation object for field
    const duplicateValidators = this.getDuplicateValidtionForField(field);
    if (duplicateValidators.length) {
      const mappedData = this.memberData.map((mapItem, mapIndex) => {
        if (!mapItem.errors) {
          mapItem.errors = {};
        } else {
          delete mapItem.errors.duplicate_error_1;
          delete mapItem.errors.duplicate_error_2;
        }
        const duplicateObj = {};
        if (mapItem.include) {
          this.memberData.map((item, itemIndex) => {
            if (mapIndex !== itemIndex && item.include) {
              duplicateValidators.forEach((duplicateValidator) => {
                this.validateDuplicateErrors(duplicateValidator, mapItem, item, duplicateObj);
              });
            }
          });
        }
        return (Object.keys(duplicateObj).length > 0) ? Object.assign(mapItem.errors, duplicateObj) : mapItem;
      });
      console.log(mappedData);
    }
  }

  checkDuplicate1(field) {
    // const dataRows = DUPLICATE_DATA;
    // get duplicate validation object for field
    const duplicateValidators = this.getDuplicateValidtionForField(field);
    if (duplicateValidators.length) {
      duplicateValidators.forEach((duplicateValidator) => {
        duplicateValidator.possible_columns.forEach((dItem) => {
          console.log(dItem);
        });

      });

      const mappedData = this.memberData.map((mapItem, mapIndex) => {
        if (!mapItem.errors) {
          mapItem.errors = {};
        } else {
          delete mapItem.errors.duplicate_error_1;
          delete mapItem.errors.duplicate_error_2;
        }
        const duplicateObj = {};
        if (mapItem.include) {
          this.memberData.map((item, itemIndex) => {
            if (mapIndex !== itemIndex && item.include) {
              duplicateValidators.forEach((duplicateValidator) => {
                this.validateDuplicateErrors(duplicateValidator, mapItem, item, duplicateObj);
              });


              // if ((mapItem.row_entry.first_name === item.row_entry.first_name &&
              //   mapItem.row_entry.last_name === item.row_entry.last_name &&
              //   mapItem.row_entry.gender === item.row_entry.gender)) {

              //   if (mapItem.row_entry.date_of_birth === item.row_entry.date_of_birth) {
              //     this.setDuplicateError(duplicateObj, item, 'duplicate_error_1');
              //   } else if (mapItem.row_entry.age.toString() === item.row_entry.age.toString()) {
              //     this.setDuplicateError(duplicateObj, item, 'duplicate_error_1');
              //   }
              // }
              // if (mapItem.row_entry.employee_payroll_no === item.row_entry.employee_payroll_no) {
              //   this.setDuplicateError(duplicateObj, item, 'duplicate_error_2');
              // }
            }
          });
        }
        return (Object.keys(duplicateObj).length > 0) ? Object.assign(mapItem.errors, duplicateObj) : mapItem;
      });
      console.log(mappedData);
    }
  }


  validateDuplicateErrors(duplicateValidator, mapItem, item, duplicateObj) {
    console.log(duplicateValidator.validate);
    for (const dItem of duplicateValidator.possible_columns) {
      let duplicate = false;
      for (const fld of dItem.split(',')) {
        if (mapItem.row_entry[fld.trim()] && item.row_entry[fld.trim()] && mapItem.row_entry[fld.trim()].toString()
          === item.row_entry[fld.trim()].toString()) {
          duplicate = true;
        } else {
          duplicate = false;
          break;
        }
      }
      if (duplicate) {
        this.setDuplicateError(duplicateObj, item, duplicateValidator.validate);
        // push to array
        break;
      }
    }
  }

  setDuplicateError(duplicateObj, item, type) {
    if (!duplicateObj[type]) {
      duplicateObj[type] = [];
    }
    duplicateObj[type].push({
      severity: 'ACTION',
      message: type === 'duplicate_error_1' ? 'Possible duplicate of Row ' + item.row_number :
        'Duplicate employee Id'
    });
  }

}

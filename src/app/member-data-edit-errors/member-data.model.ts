export enum SEVERITY {
    ACTION = 'ACTION',
    ACTION_WITH_TOLERANCE = 'ACTION_WITH_TOLERANCE',
    DATA_QUALITY_CHECK = 'DATA_QUALITY_CHECK'
}

export const GIP_FIELD_LIST = [
    {
        column_id: 'category',
        column_name: 'Category reference',
        alternates: [
            'Category ID',
            'Category'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Category reference missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9 -]*$',
                error_message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'scheme_earnings',
        column_name: 'Scheme earnings',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Scheme earnings missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Scheme earnings must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Scheme earnings must have a positive value',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'work_postcode',
        column_name: 'Work postcode',
        alternates: [
            'Postcode',
            'Post code',
            'Postal code'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Provide valid UK work postcode, or if outside the UK, enter the country or, if relevant, \'offshore\'',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})|^(n\'wide - Nationwide)$)',
                error_message: '\'Work postcode must contain only letters, numbers and the special characters \'space -\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'job_title',
        column_name: 'Job title',
        alternates: [
            'Occupation',
            'Position',
            'Job'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Job title missing',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()&., %\\-_<>!@#$:;\'"?£=/+]*$',
                error_message: 'Job title must contain only letters, numbers and the special characters \'(   ) & . , space % - _ < > ! @ # $ : ; \' " ? £ = / +\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'date_of_birth',
        column_name: 'Date of birth',
        alternates: [
            'DOB',
            'D.O.B.'
        ],
        mandatory: true,
        column_additional_info: 'Required without Age',
        type: 'date',
        validators: [
            {
                validate: 'required_without',
                error_message: 'Date of birth missing',
                fields: [
                    'age'
                ],
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9][0-9]$',
                error_message: 'Date of birth must be in dd/mm/yyyy format',
                error_severity: 'ACTION'
            },
            {
                validate: 'date_field_less_than_or_equal_to',
                error_message: 'Member\'s date of birth cannot be more than 99 years ago',
                error_severity: 'ACTION',
                field_limit: '99'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'age',
        column_name: 'Age',
        mandatory: true,
        column_additional_info: 'Required without Date of birth',
        type: 'number',
        validators: [
            {
                validate: 'required_without',
                error_message: 'Age missing',
                fields: [
                    'date_of_birth'
                ],
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Age must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'number_field_less_than_or_equal_to',
                error_message: 'Member\'s age cannot be greater than 99 years',
                error_severity: 'ACTION',
                field_limit: '99'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'gender',
        column_name: 'Gender',
        mandatory: true,
        type: 'select',
        options: [
            'Male',
            'Female'
        ],
        validators: [
            {
                validate: 'required',
                error_message: 'Gender missing',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'options',
                error_message: 'Gender must be either \'male\' or \'female\'',
                error_severity: 'ACTION',
                option_values: [
                    'Male',
                    'Female',
                    'male',
                    'female',
                    'M',
                    'F',
                    'm',
                    'f'
                ]
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'first_name',
        column_name: 'First name',
        alternates: [
            'Forename',
            'Christian Name'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'First name must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'last_name',
        column_name: 'Last name',
        alternates: [
            'Surname'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'Last name must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'initials',
        column_name: 'Initials',
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()&., %\\-_<>!@#$:;\'"?£=/+]*$',
                error_message: 'Initials must contain only letters, numbers and the special characters \'(   ) & . , space % - _ < > ! @ # $ : ; \' " ? £ = / +\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'employee_payroll_no',
        column_name: 'Employee ID',
        alternates: [
            'Payroll Number',
            'Staff ID'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'Employee ID must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'group_income_protection_benefit',
        column_name: 'Group Income Protection benefit',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Group Income Protection benefit missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Group Income Protection benefit must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Group Income Protection benefit must have a positive value',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'employees_pension_contributions',
        column_name: 'Employee\'s pension contributions',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Employee\'s pension contributions missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Employee\'s pension contributions must have a positive value',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Employee\'s pension contributions must be numerical',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'employers_pension_contributions',
        column_name: 'Employer\'s pension contributions',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Employer\'s pension contributions missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Employer\'s pension contributions must have a positive value',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Employer\'s pension contributions must be numerical',
                error_severity: 'ACTION'
            }
        ]
    }
];

export const LAB_FIELD_LIST = [
    {
        column_id: 'category',
        column_name: 'Category reference',
        alternates: [
            'Category ID',
            'Category'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Category reference missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9 -]*$',
                error_message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'scheme_earnings',
        column_name: 'Scheme earnings',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Scheme earnings missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Scheme earnings must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Scheme earnings must have a positive value',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'work_postcode',
        column_name: 'Work postcode',
        alternates: [
            'Postcode',
            'Post code',
            'Postal code'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Provide valid UK work postcode, or if outside the UK, enter the country or, if relevant, \'offshore\'',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})|^(n\'wide - Nationwide)$)',
                error_message: '\'Work postcode must contain only letters, numbers and the special characters \'space -\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'job_title',
        column_name: 'Job title',
        alternates: [
            'Occupation',
            'Position',
            'Job'
        ],
        mandatory: true,
        type: 'string',
        validators: [
            {
                validate: 'required',
                error_message: 'Job title missing',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()&., %\\-_<>!@#$:;\'"?£=/+]*$',
                error_message: 'Job title must contain only letters, numbers and the special characters \'(   ) & . , space % - _ < > ! @ # $ : ; \' " ? £ = / +\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'date_of_birth',
        column_name: 'Date of birth',
        alternates: [
            'DOB',
            'D.O.B.'
        ],
        mandatory: true,
        column_additional_info: 'Required without Age',
        type: 'date',
        validators: [
            {
                validate: 'required_without',
                error_message: 'Date of birth missing',
                fields: [
                    'age'
                ],
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9][0-9]$',
                error_message: 'Date of birth must be in dd/mm/yyyy format',
                error_severity: 'ACTION'
            },
            {
                validate: 'date_field_less_than_or_equal_to',
                error_message: 'Member\'s date of birth cannot be more than 99 years ago',
                error_severity: 'ACTION',
                field_limit: '99'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'age',
        column_name: 'Age',
        mandatory: true,
        column_additional_info: 'Required without Date of birth',
        type: 'number',
        validators: [
            {
                validate: 'required_without',
                error_message: 'Age missing',
                fields: [
                    'date_of_birth'
                ],
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Age must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'number_field_less_than_or_equal_to',
                error_message: 'Member\'s age cannot be greater than 99 years',
                error_severity: 'ACTION',
                field_limit: '99'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'gender',
        column_name: 'Gender',
        mandatory: true,
        type: 'select',
        options: [
            'Male',
            'Female',
        ],
        validators: [
            {
                validate: 'required',
                error_message: 'Gender missing',
                error_severity: 'ACTION_WITH_TOLERANCE'
            },
            {
                validate: 'options',
                error_message: 'Gender must be either \'male\' or \'female\'',
                error_severity: 'ACTION',
                option_values: [
                    'Male',
                    'Female',
                    'male',
                    'female',
                    'M',
                    'F',
                    'm',
                    'f'
                ]
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'first_name',
        column_name: 'First name',
        alternates: [
            'Forename',
            'Christian Name'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'First name must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'last_name',
        column_name: 'Last name',
        alternates: [
            'Surname'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'Last name must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'initials',
        column_name: 'Initials',
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()&., %\\-_<>!@#$:;\'"?£=/+]*$',
                error_message: 'Initials must contain only letters, numbers and the special characters \'(   ) & . , space % - _ < > ! @ # $ : ; \' " ? £ = / +\'',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'employee_payroll_no',
        column_name: 'Employee ID',
        alternates: [
            'Payroll Number',
            'Staff ID'
        ],
        mandatory: false,
        type: 'string',
        validators: [
            {
                validate: 'regex_match',
                regex: '^[a-zA-Z0-9()& \\-#\']*$',
                error_message: 'Employee ID must contain only letters, numbers and the special characters \'( ) & space - \' #\'',
                error_severity: 'ACTION'
            },
            {
                validate: 'duplicate_error_1',
                possible_columns: ['first_name, last_name, gender, date_of_birth', 'first_name, last_name, gender, age'],
                error_message: 'Possible duplicate of row ',
                error_severity: 'ACTION'
            }
            ,
            {
                validate: 'duplicate_error_2',
                possible_columns: ['employee_payroll_no, gender, date_of_birth', 'employee_payroll_no, gender, age'],
                error_message: 'Duplicate error, please use unique employee ID',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'life_assurance_benefit',
        column_name: 'Life Assurance Benefit',
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Life Assurance Benefit missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Life Assurance Benefit must be numerical',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^(?!0*(\\.0+)?$)([0-9]+|[0-9]*\\.[0-9]+)$',
                error_message: 'Life Assurance Benefit must have a positive value',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'benefit_adjustment',
        column_name: 'Benefit adjustment',
        alternates: [
            'Adjustment to benefit',
            'Adjustment of benefit',
            'Adjustment of the benefit'
        ],
        mandatory: true,
        type: 'number',
        validators: [
            {
                validate: 'required',
                error_message: 'Benefit adjustment missing',
                error_severity: 'ACTION'
            },
            {
                validate: 'regex_match',
                regex: '^[+]?[0-9]+([.][0-9]+)?$',
                error_message: 'Benefit adjustment must be numerical',
                error_severity: 'ACTION'
            }
        ]
    },
    {
        column_id: 'is_early_retiree',
        column_name: 'Early retiree',
        mandatory: false,
        type: 'select',
        options: [
            'Yes',
            'No'
        ],
        validators: [
            {
                validate: 'options',
                error_message: 'Early retirees, mark with \'Y\'; for others mark \'N\' or leave blank',
                error_severity: 'ACTION',
                option_values: [
                    'Y',
                    'N',
                    'Yes',
                    'No',
                    ''
                ]
            }
        ]
    }
];

export const GIP_MEMBER_ERROR_DATA = {
    quote_request_id: 'ABC123',
    error_row_count: 1,
    header_map: {
        category: 'Category reference',
        scheme_earnings: 'Scheme earnings',
        work_postcode: 'Work postcode',
        job_title: 'Job title',
        date_of_birth: 'Date of birth',
        age: 'Age',
        gender: 'Gender',
        first_name: 'First name',
        last_name: 'Last name',
        initials: 'Initials',
        employee_payroll_no: 'Employee ID',
        group_income_protection_benefit: 'Group Income Protection benefit',
        employees_pension_contributions: 'Employee\'s pension contributions',
        employers_pension_contributions: 'Employer\'s pension contributions'
    },
    member_data_errors: [
        {
            row_number: 1,
            row_entry: {
                category: null,
                scheme_earnings: 34,
                work_postcode: 'abc',
                job_title: 'CEO',
                date_of_birth: null,
                age: 30,
                gender: 'Male',
                first_name: 'Sujeesh',
                last_name: 'Lal',
                initials: 'DL',
                employee_payroll_no: 'EMP456',
                group_income_protection_benefit: 10,
                employees_pension_contributions: 20,
                employers_pension_contributions: 30
            },
            errors: {
                category: [
                    {
                        severity: 'ACTION',
                        message: 'Category missing',
                    },
                    // {
                    //     severity: 'ACTION',
                    //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                    // }
                ],
                date_of_birth: [
                    {
                        severity: 'ACTION',
                        message: 'Date of birth missing',
                    }
                ],
                age: [
                    {
                        severity: 'ACTION',
                        message: 'Age missing',
                    }
                ],
                duplicate_error_1: [
                    {
                        severity: 'ACTION',
                        message: 'Possible duplicate of Row 2'
                    }
                ],
                duplicate_error_2: [
                    {
                        severity: 'ACTION',
                        message: 'Possible duplicate of Row 2'
                    }
                ]
            },
            error_severity: 'ACTION',
            include: true
        },
        {
            row_number: 3,
            row_entry: {
                category: 'two',
                scheme_earnings: 567,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '08/10/1989',
                age: 30,
                gender: 'Male',
                first_name: 'Sujeesh',
                last_name: 'Lal',
                initials: 'DL',
                employee_payroll_no: 'EMP456',
                group_income_protection_benefit: 110,
                employees_pension_contributions: 230,
                employers_pension_contributions: 350
            },
            errors: {
                date_of_birth: [
                    {
                        severity: 'ACTION_WITH_TOLERANCE',
                        message: 'Date of birth missing',
                    }
                ],
                job_title: [
                    {
                        severity: 'ACTION',
                        message: 'Job title missing',
                    }
                ],
                gender: [
                    {
                        severity: 'ACTION',
                        message: 'Gender must tt be either \'male\' or \'female\''
                    }
                ]
            },
            error_severity: null,
            include: true
        },
        {
            row_number: 13,
            row_entry: {
                category: 'three',
                scheme_earnings: null,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 30,
                gender: 'Male',
                first_name: 'Sujeesh',
                last_name: 'Lal',
                initials: 'Initials',
                employee_payroll_no: 'EMP67',
                group_income_protection_benefit: 110,
                employees_pension_contributions: 230,
                employers_pension_contributions: 340
            },
            errors: {
                scheme_earnings: [
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing',
                    }
                ]
            },
            error_severity: 'ACTION',
            include: true
        },
        {
            row_number: 33,
            row_entry: {
                category: 'four',
                scheme_earnings: 456,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '21/07/1970',
                age: 67,
                gender: 'Female',
                first_name: 'Amber',
                last_name: 'Rob',
                initials: 'Initials',
                employee_payroll_no: 'EMP890',
                group_income_protection_benefit: 150,
                employees_pension_contributions: 260,
                employers_pension_contributions: 307
            },
            errors: {
                scheme_earnings: [
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing',
                    }
                ],
                work_postcode: [
                    {
                        severity: 'ACTION',
                        message: 'Provide valid UK work postcode, or if outside the UK, enter the country or, if relevant, \'offshore',
                    },
                    {
                        severity: 'ACTION',
                        message: '\'Work postcode must contain only letters, numbers and the special characters \'space -\'',
                    }
                ]
            },
            error_severity: 'ACTION',
            include: true
        },
        {
            row_number: 31,
            row_entry: {
                category: 'five',
                scheme_earnings: 434,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 56,
                gender: 'Female',
                first_name: 'Mathew',
                last_name: 'Hayden',
                initials: 'Initials',
                employee_payroll_no: 'EMP543',
                group_income_protection_benefit: 180,
                employees_pension_contributions: 207,
                employers_pension_contributions: 304
            },
            errors: null,
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 38,
            row_entry: {
                category: 'six',
                scheme_earnings: 32,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 32,
                gender: 'Male',
                first_name: 'Stephan',
                last_name: 'Waugh',
                initials: 'Initials',
                employee_payroll_no: 'EMP654',
                group_income_protection_benefit: 105,
                employees_pension_contributions: 206,
                employers_pension_contributions: 310
            },
            errors: {
            },
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 43,
            row_entry: {
                category: 'seven',
                scheme_earnings: 329,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 64,
                gender: 'Male',
                first_name: 'Lin',
                last_name: 'Dan',
                initials: 'Initials',
                employee_payroll_no: 'EMP661',
                group_income_protection_benefit: 190,
                employees_pension_contributions: 820,
                employers_pension_contributions: 430
            },
            errors: {
                date_of_birth: [
                    {
                        severity: 'ACTION_WITH_TOLERANCE',
                        message: 'Date of birth missing',
                    }
                ]
            },
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 39,
            row_entry: {
                category: 'eight',
                scheme_earnings: 100,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 79,
                gender: 'Female',
                first_name: 'Roger',
                last_name: 'Finch',
                initials: 'Initials',
                employee_payroll_no: 'EMP750',
                group_income_protection_benefit: 120,
                employees_pension_contributions: 220,
                employers_pension_contributions: 320
            },
            errors: {
            },
            error_severity: 'ACTION',
            include: true
        }
    ]
};

export const LAB_MEMBER_ERROR_DATA = {
    quote_request_id: 'DEF123',
    error_row_count: 1,
    header_map: {
        category: 'Category reference',
        scheme_earnings: 'Scheme earnings',
        work_postcode: 'Work postcode',
        job_title: 'Job title',
        date_of_birth: 'Date of birth',
        age: 'Age',
        gender: 'Gender',
        first_name: 'First name',
        last_name: 'Last name',
        initials: 'Initials',
        employee_payroll_no: 'Employee ID',
        life_assurance_benefit: 'Life Assurance Benefit',
        benefit_adjustment: 'Benefit adjustment',
        is_early_retiree: 'Early retiree'
    },
    member_data_errors: [
        {
            row_number: 1,
            row_entry: {
                category: 'one',
                scheme_earnings: 234,
                work_postcode: 'abc',
                job_title: 'CEO',
                date_of_birth: '01/03/2200',
                age: 78,
                gender: 'Male',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP123',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'Yes'
            },
            errors: {
                category: [
                    {
                        severity: 'ACTION',
                        message: 'Category missing',
                    },
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing 2',
                    }
                ]
            },
            error_severity: 'DATA_QUALITY_CHECK',
            include: true
        },
        {
            row_number: 3,
            row_entry: {
                category: 'two',
                scheme_earnings: 676,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 10,
                gender: 'Male',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP823',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'No'
            },
            errors: {
                date_of_birth: [
                    {
                        severity: 'ACTION_WITH_TOLERANCE',
                        message: 'Date of birth missing',
                    }
                ],
                job_title: [
                    {
                        severity: 'ACTION',
                        message: 'Job title missing',
                    }
                ]
            },
            error_severity: null,
            include: true
        },
        {
            row_number: 13,
            row_entry: {
                category: 'three',
                scheme_earnings: 77,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2020',
                age: 9,
                gender: 'Female',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP923',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'Yes'
            },
            errors: {
                scheme_earnings: [
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing',
                    }
                ]
            },
            error_severity: 'ACTION',
            include: true
        },
        {
            row_number: 33,
            row_entry: {
                category: 'four',
                scheme_earnings: 987,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2021',
                age: 91,
                gender: 'Female',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP923',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'No'
            },
            errors: {
                scheme_earnings: [
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing',
                    }
                ],
                work_postcode: [
                    {
                        severity: 'ACTION',
                        message: 'Provide valid UK work postcode, or if outside the UK, enter the country or, if relevant, \'offshore',
                    },
                    {
                        severity: 'ACTION',
                        message: 'Scheme earnings missing',
                    }
                ]
            },
            error_severity: 'ACTION',
            include: true
        },
        {
            row_number: 31,
            row_entry: {
                category: 'five',
                scheme_earnings: 876,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2021',
                age: 45,
                gender: 'Female',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP927',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'Y'
            },
            errors: null,
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 38,
            row_entry: {
                category: 'six',
                scheme_earnings: 654,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2021',
                age: 44,
                gender: 'Male',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP027',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'N'
            },
            errors: {
            },
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 43,
            row_entry: {
                category: 'seven',
                scheme_earnings: 344,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2021',
                age: 66,
                gender: 'Male',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP027',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'Yes'
            },
            errors: {
                date_of_birth: [
                    {
                        severity: 'ACTION_WITH_TOLERANCE',
                        message: 'Date of birth missing',
                    }
                ]
            },
            error_severity: 'ACTION_WITH_TOLERANCE',
            include: true
        },
        {
            row_number: 39,
            row_entry: {
                category: 'eight',
                scheme_earnings: 976,
                work_postcode: 'abrewrewewc',
                job_title: 'CEOS',
                date_of_birth: '01/03/2021',
                age: 56,
                gender: 'Female',
                first_name: 'First name',
                last_name: 'Last name',
                initials: 'Initials',
                employee_payroll_no: 'EMP077',
                life_assurance_benefit: 1,
                benefit_adjustment: 0,
                is_early_retiree: 'Yes'
            },
            errors: {
            },
            error_severity: 'ACTION',
            include: true
        }
    ]
};


export const DUPLICATE_DATA: any = [
    {
        row_number: 1,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP456',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: null,
        error_severity: 'ACTION',
        include: true
    },
    {
        row_number: 2,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP456',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: {
            category: [
                {
                    severity: 'ACTION',
                    message: 'Category missing',
                },
                // {
                //     severity: 'ACTION',
                //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                // }
            ],
            date_of_birth: [
                {
                    severity: 'ACTION',
                    message: 'Date of birth missing',
                }
            ],
            age: [
                {
                    severity: 'ACTION',
                    message: 'Age missing',
                }
            ]
        },
        error_severity: 'ACTION',
        include: true
    },
    {
        row_number: 3,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP456',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: {
            category: [
                {
                    severity: 'ACTION',
                    message: 'Category missing',
                },
                // {
                //     severity: 'ACTION',
                //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                // }
            ],
            date_of_birth: [
                {
                    severity: 'ACTION',
                    message: 'Date of birth missing',
                }
            ],
            age: [
                {
                    severity: 'ACTION',
                    message: 'Age missing',
                }
            ]
        },
        error_severity: 'ACTION',
        include: true
    },
    {
        row_number: 4,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP56',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: {
            category: [
                {
                    severity: 'ACTION',
                    message: 'Category missing',
                },
                // {
                //     severity: 'ACTION',
                //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                // }
            ],
            date_of_birth: [
                {
                    severity: 'ACTION',
                    message: 'Date of birth missing',
                }
            ],
            age: [
                {
                    severity: 'ACTION',
                    message: 'Age missing',
                }
            ]
        },
        error_severity: 'ACTION',
        include: true
    },
    {
        row_number: 5,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP46',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: {
            category: [
                {
                    severity: 'ACTION',
                    message: 'Category missing',
                },
                // {
                //     severity: 'ACTION',
                //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                // }
            ],
            date_of_birth: [
                {
                    severity: 'ACTION',
                    message: 'Date of birth missing',
                }
            ],
            age: [
                {
                    severity: 'ACTION',
                    message: 'Age missing',
                }
            ]
        },
        error_severity: 'ACTION',
        include: true
    },
    {
        row_number: 6,
        row_entry: {
            category: null,
            scheme_earnings: 34,
            work_postcode: 'abc',
            job_title: 'CEO',
            date_of_birth: null,
            age: null,
            gender: 'Male',
            first_name: 'First name',
            last_name: 'Last name',
            initials: 'Initials',
            employee_payroll_no: 'EMP496',
            group_income_protection_benefit: 10,
            employees_pension_contributions: 20,
            employers_pension_contributions: 30
        },
        duplicateRow: null,
        errors: {
            category: [
                {
                    severity: 'ACTION',
                    message: 'Category missing',
                },
                // {
                //     severity: 'ACTION',
                //     message: 'Category reference must contain only letters, numbers and the special characters \'space -\'',
                // }
            ],
            date_of_birth: [
                {
                    severity: 'ACTION',
                    message: 'Date of birth missing',
                }
            ],
            age: [
                {
                    severity: 'ACTION',
                    message: 'Age missing',
                }
            ]
        },
        error_severity: 'ACTION',
        include: true
    }
];

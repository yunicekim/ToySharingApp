// File name : YKutil.js
// Program : PROG2430 Assignment 2
// Purpose : to declare functions related to util
// Revision History :
//     Yunice Kim, Feb 22, 2020 : Add validate form functions
//     Yunice Kim, Mar 1, 2020: Delete unused code
function doValidate_FormRegister() {
    var form = $("#RegisterForm");
    //console.info("inside validate form join");
    form.validate({
        rules:{
            name:{
                required: true,
                minlength: 2,
                maxlength: 30
            }
        },
        messages:{
            name:{
                required: "Please enter a toy name",
                minlength: "Length must be 2-30 characters long",
                maxlength: "Length must be 2-30 characters long"
            }
        }
    });
    return form.valid();
}
function doValidate_FormDetail() {
    var form = $("#detailForm");
    //console.info("inside validate form Detail");
    form.validate({
        rules:{
            rentDate:{
                required: true,
                rentDateCheck: true
            },
            returnDate:{
                required: true,
                returnDateCheck: true
            }
        },
        messages:{
            rentDate:{
                required: "Please select rent date",
                rentDateCheck: "rent date cannot after the return date"
            },
            returnDate:{
                required: "Please select return date",
                returnDateCheck: "return date cannot before the rent date"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("returnDateCheck",
    function (value, element) {
        var returnDate = value;
        var rentDate = $("#rentDate").val();
        if(rentDate <= returnDate){
            return true;
        }
        return false;
    },
    "Our custom return date checker"
);

jQuery.validator.addMethod("rentDateCheck",
    function (value, element) {
        var rentDate = value;
        var returnDate = $("#returnDate").val();
        if(rentDate <= returnDate){
            return true;
        }
        return false;
    },
    "Our custom rent date checker"
);


function doValidate_FormJoin() {
    var form = $("#JoinForm");
    console.info("inside validate form join");
    form.validate({
        rules:{
            emailForJoin:{
                required: true,
                email: true
            },
            nameForJoin:{
                required: true,
                minlength: 2,
                maxlength: 30
            },
            postalCodeForJoin:{
                //required: true,
                postalCode: true
            },
            phoneForJoin:{
                //required: true,
                phone: true
            }
        },
        messages:{
            emailForJoin:{
                required: "Please enter a email",
                email: "Please enter a valid email address"
            },
            nameForJoin:{
                required: "Please enter a name",
                minlength: "Length must be 2-30 characters long",
                maxlength: "Length must be 2-30 characters long"
            },
            postalCodeForJoin:{
                //required: true,
                postalCode: "Please enter a vaild postal code format eg)A1A1A1 or a1a 1a1"
            },
            phoneForJoin: {
                //required: true,
                phone: "Please enter a valid phone format eg)123-456-7890 or 123456789"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("email",
    function (value, element) {
        var regex = /^.+@\w*\.\w*$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom email checker"
);

jQuery.validator.addMethod("postalCode",
    function (value, element) {
        var regex = /^[a-zA-Z]\d[a-zA-Z]\s?\d[a-zA-Z]\d$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom postal code checker"
);
jQuery.validator.addMethod("phone",
    function (value, element) {
        var regex = /^\d{3}-?\d{3}-?\d{4}$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom phone checker"
);
// jQuery.validator.addMethod("valuecheck",
//     function (value, element) {
//     // console.log(value);
//         if(value >= 0 && value <= 5){
//             return true;
//         }
//         return false;
//     },
//     "Our custom rating value checker"
// );

function doValidate_FormModify() {
    var form = $("#YKModifyForm");
    form.validate({
        rules:{
            nameInModify:{
                required: true,
                minlength: 2,
                maxlength: 30
            },
            emailInModify:{
                required: true,
                email: true
            },
            datePickerInModify:{
                required: true
            },
            spnFoodQualityInModify:{
                required: true,
                valuecheck: true
            },
            spnServiceInModify:{
                required: true,
                valuecheck: true
            },
            spnValueInModify:{
                required: true,
                valuecheck: true
            }
        },
        messages:{
            nameInModify:{
                required: "Please enter a name",
                minlength: "Length must be 2-30 characters long",
                maxlength: "Length must be 2-30 characters long"
            },
            emailInModify:{
                required: "Please enter a email",
                email: "Please enter a valid email address"
            },
            datePickerInModify:{
                required: "Review date is required"
            },
            spnFoodQualityInModify:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            },
            spnServiceInModify:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            },
            spnValueInModify:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

function doValidate_FormModify2() {
    var form = $("#YKModifyForm2");
    form.validate({
        rules:{
            nameInModify2:{
                required: true,
                minlength: 2,
                maxlength: 30
            },
            emailInModify2:{
                required: true,
                email: true
            },
            datePickerInModify2:{
                required: true
            },
            spnFoodQualityInModify2:{
                required: true,
                valuecheck: true
            },
            spnServiceInModify2:{
                required: true,
                valuecheck: true
            },
            spnValueInModify2:{
                required: true,
                valuecheck: true
            }
        },
        messages:{
            nameInModify2:{
                required: "Please enter a name",
                minlength: "Length must be 2-30 characters long",
                maxlength: "Length must be 2-30 characters long"
            },
            emailInModify2:{
                required: "Please enter a email",
                email: "Please enter a valid email address"
            },
            datePickerInModify2:{
                required: "Review date is required"
            },
            spnFoodQualityInModify2:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            },
            spnServiceInModify2:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            },
            spnValueInModify2:{
                required: "Value must be 0-5",
                valuecheck: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

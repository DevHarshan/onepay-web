const PATTERNS = {
    name: /^[^0-9]+$/,
    phone: /^(0|\+94)[0-9]{9}$/,
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: '',
};

const EMPTY_ERRORS = {
    name: 'Name is required.',
    phone: 'Phone number is required.',
    email: 'Email address is required.',
    message: 'Message is required.',
};

const PATTERN_ERRORS = {
    name: 'Invalid name, name should not contain numbers.',
    phone: 'Invalid phone number.',
    email: 'Invalid email address.',
    message: '',
}

const FIELD_NAMES = ['name', 'phone', 'email', 'message'];

let formValue = {
    name: '',
    phone: '',
    email: '',
    message: '',
};

const checkField = (fieldName) => {
    const fieldEl = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-error`);

    if(!fieldEl.value) {
        // check field empty
        addError(fieldEl, errorEl, EMPTY_ERRORS[fieldName]);
        return true;
    } else if(PATTERNS[fieldName] && !PATTERNS[fieldName].test(fieldEl.value)) {
        // check pattern
        addError(fieldEl, errorEl, PATTERN_ERRORS[fieldName]);
        return true;
    } else {
        removeError(fieldEl, errorEl);
        return false;
    }

}

const addError = (field, errorEl, error) => {
    field.classList.add('form-field-error');
    errorEl.innerHTML = error;
    errorEl.classList.add('on-error');
}

const removeError = (field, errorEl) => {
    field.classList.remove('form-field-error');
    errorEl.classList.remove('on-error');
}

const resetFields = () => {
    formValue = {
        name: '',
        phone: '',
        email: '',
        message: '',
    };

    FIELD_NAMES.forEach(fieldName => {
        document.getElementById(fieldName).classList.remove('form-field-error');
        document.getElementById(`${fieldName}-error`).classList.remove('on-error');
    });

    $('#contactus-form').trigger('reset');
}

// on change field values
const onInputHandler = (e) => {
    formValue[e.target.name] = e.target.value?.trim();
    checkField(e.target.name);
}

const closeModalHandler = () => {
    resetFields();
    $('#contactus-form-modal').modal('hide');
}

$('#contactus-form-modal').on('hidden.bs.modal', function (event) {
    resetFields();
});

// submit contact us form
const onSubmitHandler = (e) => {
    e.preventDefault();
    
    // check all fields
    let errorCount = 0;
    FIELD_NAMES.forEach(fieldName => {
        if(checkField(fieldName)) {
            errorCount++;
        }
    });
    if(errorCount > 0) {
        return;
    }

    // console.log(formValue);
    
    $.ajax({
        url: "https://merchant-api-live-v2.onepay.lk/api/merchant/contact_form/",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(formValue),
        dataType: "json",
        complete: function (response, status) {
            // console.log(response, status);
            if (status === 'success' && response.status === 200) {
                $('#contactus-form-modal').modal('hide');
                resetFields();
                setTimeout(() => {
                    $('#success-modal').modal('show');
                }, 500);
            } else {
                $('#error-modal').modal('show');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $('#error-modal').modal('show');
        },
    });

}
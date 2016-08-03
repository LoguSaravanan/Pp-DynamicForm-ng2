$(document).ready(function () {
    console.log('Document Onready event triggered');
    $('select').material_select();

// $('.ripple-selector > div').addClass('paper-ripple');
// $('paper-ripple').paperRipple();
});

function submitHandler(event) {

    //debugger;
    var form = document.querySelector('form');
    //var data = new FormData(form);
    //$(form).serialize() 
    //genFormData(form);
    document.querySelector('#fromJS').textContent =serialize(form);
    $('#fromJS').focus(); 
    //console.log(document.forms[0].value);
    //event.preventDefault();
}

function genFormData(form) {
    var params = {};
    //debugger;
    for (var i = 0; i < form.elements.length; i++) {

        var element = form.elements[i];
        var fieldName = element.name;
        if (fieldName == "" || fieldName == undefined || element.tagName == "BUTTON") {
            continue;
        }
        var fieldValue = element.value;

        params[fieldName] = fieldValue;

    }
    console.log(params);
    console.log(JSON.stringify(params,null,2));
    return JSON.stringify(params);
}


function serialize(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, returnObj = {};
    for(var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.name === "") {
            continue;
        }
        switch (element.nodeName) {
            case 'INPUT':
                switch (element.type) {
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'file':
                    case 'submit':
                        break;
                    case 'text':
                    returnObj[element.name] = element.value;
                    break;
                    case 'checkbox':
                        if (element.checked) 
                        returnObj[element.name] = true;
                        else
                        returnObj[element.name] = false;
                        break;
                    case 'radio':
                        if (element.checked) {
                            returnObj[element.name] = element.value;
                        }
                        break;
                }
                break;
            case 'TEXTAREA':
                returnObj[element.name] = element.value;
                break;
            case 'SELECT':
                switch (element.type) {
                    case 'select-one':
                        returnObj[element.name] = element.value;
                        break;
                    case 'select-multiple':
                        for (var j = element.options.length - 1; j >= 0; j = j - 1) {
                            if (element.options[j].selected) {
                                returnObj[element.name] = element.options[j].value;
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                break;
        }
    }
    return JSON.stringify(returnObj,null,2);
}

var specificationCommonPath = "public/wallet.CardAccountsSpecification-1.8/v1/schema/";
var quesArray = [];


var typeOfSpecAccount = 'CARDACCOUNT';
var resourceName = 'card-account';
var mehtodName = 'remove';

function getJSON(url,retrivePath) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            for(var prop in retrivePath.split('.')){
                json=json[prop];
            }
            return json;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

var api = {
    prepareInputParams: function (typeOfSpecAccount, resourceName, mehtodName) {
        var apiURL;
        switch (fiType) {
            case 'CARDACCOUNT':
                apiURL = "public/wallet.CardAccountsSpecification-1.8/v1/schema/api.json";
                break;
        }
        return { 'apiURL': apiURL, resourceName: resourceName, mehtodName: mehtodName }
    },
    load: function (inputObj) {
        var retrivePath="resources."+inputObj.resourceName+".methods."+inputObj.mehtodName;
        return getJSON(inputObj.apiURL,retrivePath);
    }
}




function loadAPI() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var api = JSON.parse(xhttp.responseText);
            //debugger;
            var qUrl = api.resources["card-account"].methods["remove"].request.$ref;
            loadRequest(qUrl);
        }
    };
    xhttp.open("GET", specificationCommonPath + "api.json", true);
    xhttp.send();
}

function loadRequest(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            jsonQues = JSON.parse(xhttp.responseText);
            convertToQuestions(jsonQues.properties);
            console.log('Converted into questions');
            initiateAngular(window.app);
        }
    };
    xhttp.open("GET", specificationCommonPath + url, true);
    xhttp.send();
}

function convertToQuestions(properties) {
    for (var name in properties) {
        var value = properties[name];
        if (value.type) {
            var q = prepareFields(name, value);
            if (typeof q == 'object') {
                quesArray.push(q);
            }
        }

    }
}

function prepareFields(propName, propVal) {
    switch (propVal.type) {
        case 'boolean':
            return new CheckboxQuestion({
                key: propName,
                label: propName,
                description: propVal.description
            });
        case 'array':
            return new DropdownQuestion({
                key: propName,
                label: propName,
                description: propVal.description,
                options: propVal.items.enum
            });
        case undefined:
    }
}


var question = {
    'getQuestions': function () {
        return quesArray;
    }
};

// var question = {
//     'getQuestions': function () {
//         questions = [
//             new DropdownQuestion({
//                 key: 'brave',
//                 label: 'Bravery Rating',
//                 options: [{
//                     key: 'solid',
//                     value: 'Solid'
//                 }, {
//                         key: 'great',
//                         value: 'Great'
//                     }, {
//                         key: 'good',
//                         value: 'Good'
//                     }, {
//                         key: 'unproven',
//                         value: 'Unproven'
//                     }],
//                 order: 3
//             }),
//             new TextboxQuestion({
//                 key: 'firstName',
//                 label: 'First name',
//                 value: 'Bombasto',
//                 type: 'text',
//                 required: true,
//                 order: 1
//             }),
//             new TextboxQuestion({
//                 key: 'emailAddress',
//                 label: 'Email',
//                 type: 'text',
//                 order: 2
//             }),
//             new CheckboxQuestion({
//                 key: 'gender',
//                 label: 'Gender',
//                 required: true
//             }),

//         ];
//         return questions;
//     }
// };


function ToFormGroup(questions) {
    var group = {};

    questions.forEach(function (question) {
        group[question.key] = question.required ? new ng.forms.FormControl(question.value || '', ng.forms.Validators.required) :
            new ng.forms.FormControl(question.value || '');
    });
    return new ng.forms.FormGroup(group);
}


window.app = {
    'services': {
        'question': question,
        'questionControl': {
            'ToFormGroup': ToFormGroup
        }
    },
    'ng': {}
};

loadAPI();

(function(app) {
    app.ng.DynamicFormQuestionComponent = ng.core
        .Component({
            selector: 'df-question',
            //templateUrl: 'app/dynamic-form-question-plain.component.html',
            templateUrl: 'app/dynamic-form-question.component.html',
            directives: [ng.forms.REACTIVE_FORM_DIRECTIVES],
            inputs: ['question', 'form']
        })
        .Class({
            constructor: function() {
                //debugger;
            }, 
            ngOnInit: function() {
                
            },
            isValid: function() {
                console.info(this.form.controls[this.question.key]);
                return this.form.controls[this.question.key].valid;
            }
        });
})(window.app || (window.app = {}));

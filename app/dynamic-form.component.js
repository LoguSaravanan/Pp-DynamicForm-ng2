(function (app) {
    app.ng.DynamicFormComponent = ng.core
        .Component({
            selector: 'dynamic-form',
            //templateUrl: 'app/dynamic-form.component-plain.html',
            templateUrl: 'app/dynamic-form.component.html',
            directives: [app.ng.DynamicFormQuestionComponent, ng.forms.REACTIVE_FORM_DIRECTIVES],
            inputs: ['questions']
        })
        .Class({
            constructor: function () {
                this.payLoad = '';
            },
            ngOnInit() {
                console.log('ngOnInit');
                this.form=app.services.questionControl.ToFormGroup(this.questions);
            
            },
            onSubmit: function (event) {
                //this.payLoad = JSON.stringify(this.questions[0]);
                //console.log("on submit in Angular:"+event)
                this.payLoad = JSON.stringify(this.form.value);
                event.preventDefault();
            },
        });
})(window.app || (window.app = {}));

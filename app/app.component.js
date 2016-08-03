(function(app) {
  app.ng.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      templateUrl: 'app/my-app.component.html',
      directives: [app.ng.DynamicFormComponent]
    })
    .Class({
      constructor: function() {
        this.questions = app.services['question'].getQuestions();
        console.log('Questions going to Angular');
        console.log(this.questions);
      }
    });
})(window.app);

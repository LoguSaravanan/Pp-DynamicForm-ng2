function initiateAngular(app) {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered: Angular Bootstraping..');
    ng.platformBrowserDynamic.bootstrap(app.ng.AppComponent,[
      ng.forms.disableDeprecatedForms(),
      ng.forms.provideForms()
    ]);
  });
}

console.log('Main.js:');
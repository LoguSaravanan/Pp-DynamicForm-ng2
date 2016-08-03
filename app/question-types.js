function QuestionBase(attributes){
  this.value = attributes.value ||'';
  this.key = attributes.key || '';
  this.label = attributes.label || '';
  this.required = !!attributes.required;
  this.order = attributes.order === undefined ? 1 : attributes.order;
  this.description = attributes.description || '';

}

function TextboxQuestion(attributes) {
    QuestionBase.call(this,attributes);
    this.controlType = 'textbox';
    this.type = attributes['type'] || '';
}

function DropdownQuestion (attributes){
  QuestionBase.call(this,attributes);
  this.controlType = 'dropdown';
   this.options = attributes['options'] || [];
}

function CheckboxQuestion (attributes){
  QuestionBase.call(this,attributes);
  this.controlType = 'checkbox';
}

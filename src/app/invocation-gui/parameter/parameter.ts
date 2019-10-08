// The parameter description as given in the json descriptor file
export class ParameterDescription<T> {
  value: T
  id: string
  name: string
  description: string
  optional: boolean
  type: string
  'value-key': string
}

// The parameter object, model of the formGroup (created from ParameterDescription)
export class Parameter<T> extends ParameterDescription<T> {
  inputType: string

  readonly typeToInputType = {
    'String': 'text',
    'File': 'text',
    'Flag': 'checkbox',
    'Number': 'number',
    '': 'text'
  }

  constructor(description: ParameterDescription<T> = new ParameterDescription<T>()) {
    super()
    this.value = description.value;
    this.id = description.id || '';
    this.name = description.name || '';
    this.optional = !!description.optional;
    this.description = description.description || '';
    this.type = description.type || '';
    this.inputType = this.typeToInputType[this.type];
  }

  parseValue(value: any) {
    return  this.type == 'Number' ? +value :
            this.type == 'Flag' ? value == 'on' || value === true : value;
  }
}

export class StringParameter extends Parameter<string> {
  type = 'String'

  constructor(description: ParameterDescription<string> = new ParameterDescription<string>()) {
    super(description);
  }
}

export class FileParameter extends Parameter<string> {
  type = 'File'

  constructor(description: ParameterDescription<string> = new ParameterDescription<string>()) {
    super(description);
  }
}

export class NumberParameter extends Parameter<number> {
  type = 'Number'

  constructor(description: ParameterDescription<number> = new ParameterDescription<number>()) {
    super(description);
  }
}
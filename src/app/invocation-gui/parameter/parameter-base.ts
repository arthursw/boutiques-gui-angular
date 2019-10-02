export class ParameterBase<T> {
  value: T;
  id: string;
  name: string;
  description: string;
  required: boolean;
  type: string;
  inputType: string;

  readonly typeToInputType = {
    'String': 'text',
    'File': 'text',
    'Boolean': 'checkbox',
    'Number': 'number',
    '': 'text'
  };

  constructor(options: {
      value?: T,
      id?: string,
      name?: string,
      description?: string,
      required?: boolean,
      type?: string
    } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.name = options.name || '';
    this.required = !!options.required;
    this.description = options.description || '';
    this.type = options.type || '';
    this.inputType = this.typeToInputType[this.type];
  }
}

export class StringParameter extends ParameterBase<string> {
  type = 'String';

  constructor(options: {} = {}) {
    super(options);
  }
}

export class FileParameter extends ParameterBase<string> {
  type = 'File';

  constructor(options: {} = {}) {
    super(options);
  }
}

export class NumberParameter extends ParameterBase<string> {
  type = 'Number';

  constructor(options: {} = {}) {
    super(options);
  }
}
import { ParameterBase } from '../parameter/parameter-base'

export class ParameterGroupBase {
  id: string;
  name: string;
  description: string;
  optional: boolean;
  exclusive: boolean;
  members: ParameterBase<any>[];

  constructor(options: {
      id?: string,
      name?: string,
      description?: string,
      optional?: boolean,
      exclusive?: boolean,
    } = {}) {
    this.id = options.id || '';
    this.name = options.name || '';
    this.description = options.description || '';
    this.optional = options.optional != null ? options.optional : true;
    this.exclusive = options['mutually-exclusive'] || false;
    this.members = [];
  }
}

export default class HttpException extends Error {
  public readonly objectOrError?: string | object | any;

  public description?: string;

  constructor(objectOrError?: string | object | any, description?: string) {
    super();
    this.objectOrError = objectOrError;
    this.description = description;
  }
}

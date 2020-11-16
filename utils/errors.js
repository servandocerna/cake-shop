class CustomError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

class InvalidParameterError extends Error {
  constructor(name) {
    super();
    this.code = 'INVALID_PARAMETER';
    this.message = `Parameter "${name}" is invalid`;
  }
}

class RequiredParameterError extends Error {
  constructor(name) {
    super();
    this.code = 'REQUIRED_PARAMETER';
    this.message = `Parameter "${name}" is required`;
  }
}

class ResourceNotFoundError extends Error {
  constructor(resource, id) {
    super();
    this.code = 'RESOURCE_NOT_FOUND';
    this.message = `${resource} with id: "${id}" not found`;
  }
}

module.exports = {
  CustomError,
  InvalidParameterError,
  RequiredParameterError,
  ResourceNotFoundError
};
export class AuthorizationError extends Error {
  constructor(s, m) {

    super();
    this.name = "AuthorizationError";
    this.status = s;
    this.message = m;
  }
}


export class InternalServerError extends Error {
  constructor(s, m) {
    super();
    this.name = "InternalServerError";
    this.status = s;
    this.message = m;
  }
}


export class ValidationError extends Error {
  constructor(s, m) {
    super();
    this.name = "ValidationError";
    this.status = s;
    this.message = m;
  }
}


export class ForbiddenError extends Error {
  constructor(s, m) {
    super();
    this.name = "ForbiddenError";
    this.status = s;
    this.message = m;
  }
}


export class NotFoundError extends Error {
  constructor(s, m) {
    super();
    this.name = "NotFoundError";
    this.status = s;
    this.message = m;
  }
}

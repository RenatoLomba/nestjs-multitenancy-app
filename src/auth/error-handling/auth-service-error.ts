import { AuthServiceErrorCodes } from './auth-service-error-codes';

export class AuthServiceError extends Error {
  code: AuthServiceErrorCodes;

  constructor(code: AuthServiceErrorCodes) {
    super();
    this.code = code;
  }
}

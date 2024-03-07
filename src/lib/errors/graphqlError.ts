export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BaseError';
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class UnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownError';
  }
}

/**
 * Wraps the result object by its __typename property and throws the corresponding error if necessary.
 * @param result - The result object to be wrapped.
 * @returns The wrapped result object.
 * @throws {InternalServerError} If the __typename property is 'InternalServerError'.
 * @throws {NotFoundError} If the __typename property is 'NotFoundError'.
 * @throws {UnauthorizedError} If the __typename property is 'UnauthorizedError'.
 * @throws {UnknownError} If the __typename property is 'UnknownError'.
 * @throws {BaseError} If the __typename property is 'BaseError'.
 * @template T - The type of the result object.
 */
export function wrapResultByTypename<T>(result: any): T {
  if (result.__typename === 'InternalServerError') {
    throw new InternalServerError(result.message);
  } else if (result.__typename === 'NotFoundError') {
    throw new NotFoundError(result.message);
  } else if (result.__typename === 'UnauthorizedError') {
    throw new UnauthorizedError(result.message);
  } else if (result.__typename === 'UnknownError') {
    throw new UnknownError(result.message);
  } else if (result.__typename === 'BaseError') {
    throw new BaseError(result.message);
  }

  return result;
}

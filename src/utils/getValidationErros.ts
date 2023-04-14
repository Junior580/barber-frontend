import { ValidationError } from 'yup'

interface IValidationErrors {
  [key: string]: string
}

export function getValidationErrors(err: ValidationError): IValidationErrors {
  const validationErrors: IValidationErrors = {}

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
}

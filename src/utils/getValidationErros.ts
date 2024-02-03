import { ValidationError } from 'yup'

interface ValidationErrors {
  [key: string]: string
}

export function getValidationErrors(err: ValidationError): ValidationErrors {
  const validationErrors: ValidationErrors = {}

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message
    }
  })

  return validationErrors
}

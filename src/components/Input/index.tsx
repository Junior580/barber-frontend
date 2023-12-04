// import React, {
//   InputHTMLAttributes,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react'
// import { IconBaseProps } from 'react-icons'
// import { FiAlertCircle } from 'react-icons/fi'

// import { Container, Error } from './styles'
// import { useField } from '@unform/core'

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name: string
//   icon?: React.ComponentType<IconBaseProps>
//   error?: boolean
// }

// export const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
//   const inputRef = useRef<HTMLInputElement>(null)

//   const [isFocused, setIsFocused] = useState<boolean>(false)
//   const [isFilled, setIsFilled] = useState<boolean>(false)

//   const { fieldName, defaultValue, error, registerField } = useField(name)

//   const handleInputFocus = useCallback(() => {
//     setIsFocused(true)
//   }, [])

//   const handleInputBlur = useCallback(() => {
//     setIsFocused(false)

//     setIsFilled(!!inputRef.current?.value)
//   }, [])

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: inputRef.current,
//       path: 'value',
//     })
//   }, [fieldName, registerField])

//   return (
//     <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
//       {Icon && <Icon size={20} />}
//       <input
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//         defaultValue={defaultValue}
//         type="text"
//         ref={inputRef}
//         {...rest}
//       />
//       {error && (
//         <Error title={error}>
//           <FiAlertCircle color="#c53030" size={20} />
//         </Error>
//       )}
//     </Container>
//   )
// }

import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'
import { useField } from '@unform/core'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps<TFieldValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>
  // error?: boolean
  error: FieldErrors
  register: UseFormRegister<FieldValues>
}

export const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  register,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    // setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type="text"
        {...register}
        {...rest}
      />
      {error && (
        <Error title={error.root?.message as string}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  )
}

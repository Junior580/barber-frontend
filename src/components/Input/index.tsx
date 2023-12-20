import React, { ComponentProps, useCallback, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

interface InputProps extends ComponentProps<'input'> {
  icon?: React.ComponentType<IconBaseProps>
  error?: string
}

export const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!error)
  }, [])

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input onFocus={handleInputFocus} onBlur={handleInputBlur} {...rest} />
      {!!error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  )
}

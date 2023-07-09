import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Container type="button" {...rest}>
      {loading ? 'carregando' : children}
    </Container>
  )
}

import { ReactNode } from 'react'
import { Container } from './styles'

type TooltipProps = {
  title: string
  children: ReactNode
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

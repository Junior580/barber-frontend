import { ReactNode } from 'react'
import { Container } from './styles'

interface ITooltipProps {
  title: string
  children: ReactNode
  className?: string
}

const Tooltip: React.FC<ITooltipProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export default Tooltip

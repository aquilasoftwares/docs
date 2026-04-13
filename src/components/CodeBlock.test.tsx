import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeBlock from './CodeBlock'

it('renders the code content', () => {
  render(<CodeBlock code="git checkout -b feature/test" />)
  expect(screen.getByText('git checkout -b feature/test')).toBeInTheDocument()
})

it('copies code to clipboard on button click', async () => {
  const user = userEvent.setup()
  const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

  render(<CodeBlock code="git status" />)

  await user.click(screen.getByRole('button', { name: /copy/i }))
  expect(writeText).toHaveBeenCalledWith('git status')
})

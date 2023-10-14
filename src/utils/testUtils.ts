import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { TestContextProvider } from '../services/Providers/TestProvider'

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestContextProvider, ...options })

export * from '@testing-library/react'
export { customRender as render }
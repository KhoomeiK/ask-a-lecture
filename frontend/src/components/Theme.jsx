import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { deep } from '@theme-ui/presets'

const deepTheme = {
    ...deep,
    styles: {
        ...deep.styles,
    },
}

export const Theme = props => (
    <ThemeProvider theme={deepTheme}>{props.children}</ThemeProvider>
)
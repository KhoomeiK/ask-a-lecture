import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { tailwind } from '@theme-ui/presets'

const theme = {
    ...tailwind,
    styles: {
        ...tailwind.styles,
    },
}

export const Theme = props => (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { roboto } from '@theme-ui/presets'

const theme = {
    ...roboto,
    styles: {
        ...roboto.styles,
    },
}

export const Theme = props => (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)
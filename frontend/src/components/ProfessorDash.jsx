/** @jsx jsx */
import {
    Link
} from "react-router-dom";
import React, { useState } from 'react'
import {classes} from '../utils'
import {StyledDropzone} from './Dropzone'

import {jsx, Heading} from 'theme-ui'
export const ProfessorDash = (props) => {
    // Strip out stuff for nav
    const {to, staticContext, activeClassName, ...rest} = props

    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")

    return (
        <React.Fragment>
            <header
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    variant: 'styles.header',
                }}
                className="header">
                <Heading>Ask-A-Lecture</Heading>
                <div sx={{ mx: 'auto' }} />
                <Link {...rest} to="/student"
                    sx={{
                        color: 'inherit',
                        '&.active': {
                            color: 'primary',
                        },
                        marginRight: '10px'
                    }}>Student View</Link> 

            </header>
            <div className="dashboard">
                <StyledDropzone setText={setText} setLoading={setLoading} />
            </div>
        </React.Fragment>
    )
}
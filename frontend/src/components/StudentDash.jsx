/** @jsx jsx */
import React, { useState } from 'react'

import {
    Link
} from "react-router-dom";
import { jsx, 
    Heading, 
    Button,     
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Box,
    Flex,
    Slider,} from 'theme-ui'

import { StyledDropzone } from './Dropzone'

import { classes, postLecture, popToast } from '../utils'

import { Collapse, CardBody, Card } from 'reactstrap';

export const ClassCollapsible = (props) => {
    // Strip out stuff for nav
    const {to, staticContext, activeClassName, classObject, ...rest} = props

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (<React.Fragment>
        <Button onClick={toggle} style={{ marginBottom: '1rem' }}>18.01</Button>
        <Collapse isOpen={isOpen}>
            <Card>
                {classObject.className}
                {classObject.classNumber}
                <CardBody>
                    <Link {...rest} to={{pathname: "/search", state: classObject}}
                        sx={{
                            color: 'inherit',
                            '&.active': {
                                color: 'primary',
                            },
                            marginRight: '10px'
                        }}

                    >lecture 1</Link> 
                </CardBody>
            </Card>
        </Collapse>
    </React.Fragment>
    )
}

export const StudentDash = (props) => {
    // Strip out stuff for nav
    const {to, staticContext, activeClassName, ...rest} = props

    // const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

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
                <Link {...rest} to="/professor"
                    sx={{
                        color: 'inherit',
                        '&.active': {
                            color: 'primary',
                        },
                        marginRight: '10px'
                    }}>Professor View</Link> 

            </header>
            <div className="dashboard">
                {/* <StyledDropzone setText={setText} setLoading={setLoading} /> */}
                <Box
                    style={{marginTop: '30px'}}>
                    {/* onSubmit={e => uploadTranscript(e, text)} */}
                    {/* <Button onClick={toggle} style={{ marginBottom: '1rem' }}>18.01</Button> */}
                    <Button onClick={toggle} style={{ marginBottom: '1rem' }}>18.01</Button>
                    {classes.map(obj => <ClassCollapsible classObject={obj}/>)}
                    {/* <Collapse isOpen={isOpen}>
                        
                        <Card>
                            <CardBody>
                                <Link {...rest} to="/search"
                                    sx={{
                                        color: 'inherit',
                                        '&.active': {
                                            color: 'primary',
                                        },
                                        marginRight: '10px'
                                    }}>lecture 1</Link> 
                            </CardBody>
                        </Card>
                    </Collapse> */}
                </Box>
               
            </div>
        </React.Fragment>
    )
}
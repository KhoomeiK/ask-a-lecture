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
        
        <Button className="maxButton" style={{width:'100%'}} onClick={toggle} style={{ marginBottom: '1rem' }}>{classObject.className} {classObject.classNumber}</Button>
        <Collapse  isOpen={isOpen}>
            {Object.keys(classObject.lectures).map(lecture => {
                const lectNum = classObject.lectures[lecture]
                return(
                    <Card >
                        <CardBody>
                            <Link {...rest} to={{pathname: "/search", state: {...classObject, lectureNum: lectNum}}}
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary',
                                    },
                                    marginRight: '10px'
                                }}

                            >{lecture}</Link> 

                        </CardBody>
                    </Card>
                    
                )})}
                    
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
                    {classes.map(obj => <ClassCollapsible classObject={obj}/>)}

                </Box>
               
            </div>
        </React.Fragment>
    )
}
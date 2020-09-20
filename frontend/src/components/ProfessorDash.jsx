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

const uploadTranscript = (e, transcript) => {
    e.preventDefault()
    
    const classId = e.target.classId.value
    const lectureNumber = e.target.lectureNumber.value
    const lectureTitle = e.target.lectureTitle.value
    const videoLink = e.target.videoLink.value
    if (transcript === "") {
        popToast("Please upload a transcript (.vtt, .txt) first.")
        return
    }
    const lecture = {transcript, lectureTitle, classId, lectureNumber, videoLink}
    popToast("Successfully sent!")
    postLecture(lecture)
}


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
                <Heading>Niidl</Heading>
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
                <Box
                    as='form'
                    style={{marginTop: '30px'}}
                    onSubmit={e => uploadTranscript(e, text)}>
                    <Label htmlFor='classId'>Class ID</Label>
                    <Input
                        name='classId'
                        id='classId'
                        placeholder='18.S096'
                        mb={3}
                    />
                    <Label htmlFor='lectureNumber'>Lecture Number</Label>
                    <Input
                        name='lectureNumber'
                        id='lectureNumber'
                        placeholder='12'
                        mb={3}
                    />
                    <Label htmlFor='lectureTitle'>Lecture Title</Label>
                    <Input
                        type='lectureTitle'
                        name='lectureTitle'
                        id='lectureTitle'
                        placeholder='Hamming Codes on the Voyager'
                        mb={3}
                    />
                    <Label htmlFor='videoLink'>Video Link</Label>
                    <Input
                        type='videoLink'
                        name='videoLink'
                        id='videoLink'
                        placeholder='https://www.youtube.com/watch?v=hFQL7BS6lrs&ab_channel=SMTOWN'
                        mb={3}
                    />
                   
                    <Button>Submit</Button>
                </Box>
               
            </div>
        </React.Fragment>
    )
}
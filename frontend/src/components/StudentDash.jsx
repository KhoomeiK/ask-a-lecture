/** @jsx jsx */
import React, { useState } from 'react'

import { Link } from "react-router-dom";
import { jsx, Heading, Label, Box,} from 'theme-ui'
import { classes, postLecture, popToast } from '../utils'
import { Collapse, CardBody, Card, Navbar } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// images
// import n from '../linear_algebra.png'

const baseUrl = "./images/";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export const ClassCollapsible = (props) => {
    // Strip out stuff for nav
    const {to, staticContext, activeClassName, classObject, ...rest} = props

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (<React.Fragment>
        {/* <Button onClick={toggle} style={{marginTop: '1rem', width:'100%'}}>{classObject.className} </Button> */}
        <Card onClick={toggle} style={{marginTop: '1rem'}} >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={classObject.image}
                    style={{height: '150px'}}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {classObject.className}
                    </Typography>
                    {classObject.classId}
                </CardContent>
            </CardActionArea>
        </Card>
        <Collapse isOpen={isOpen}>
            {Object.keys(classObject.lectures).map(lecture => {
                const lectNum = classObject.lectures[lecture]
                return(
                    <Card key={lectNum}>
                        <CardBody style={{padding: '10px'}}>
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
                <Heading>Niidl</Heading>
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
                <Box
                    style={{marginTop: '30px'}}>
                    <Label htmlFor='classId' style={{fontSize: '30px'}}>Classes</Label>
                    {classes.map(obj => <ClassCollapsible key={obj.classId} classObject={obj}/>)}
                </Box>
            </div>
        </React.Fragment>
    )
}
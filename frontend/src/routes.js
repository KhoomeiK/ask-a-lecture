

/** @jsx jsx */
import React, {useState} from 'react'
import {
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import {jsx, Heading} from 'theme-ui'
import { ProfessorDash } from './components/ProfessorDash';
import { StudentDash } from './components/StudentDash'

const PageSwitches = (props) => {

    return(
        <Switch>
            
            <Route path="/">
                {() => {
                    switch (props.userType) {
                    case "professor":
                        return <ProfessorDash />;
                    case "student":
                        return <StudentDash />;
                    default:
                        return <ProfessorDash />;
                    }
                }}
            </Route>
            <Route path="/professor" component={ProfessorDash} />
            <Route path="/student" component={StudentDash} />
            
        </Switch>
    )
}

const Frame = (props) => {
    const [userType, setUserType] = useState('professor')
    
    return (
        <div className="container">
            {/* <div id="logo-container">
                <Link to="/">
                    
                </Link>
            </div> */}
            <header
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    variant: 'styles.header',
                }}
                className="header">
                <Heading>Ask-A-Lecture</Heading>
                <div sx={{ mx: 'auto' }} />
                {
                    props.userType === 'professor' ? 
                        <Link {...props} to="/student" activeClassName='active'
                            sx={{
                                color: 'inherit',
                                '&.active': {
                                    color: 'primary',
                                },
                                marginRight: '10px'
                            }}>Student View</Link> :
                        <Link {...props} to="/professor" activeClassName='active'
                            sx={{
                                color: 'inherit',
                                '&.active': {
                                    color: 'primary',
                                },
                                marginRight: '10px'
                            }}>Professor View</Link>
                }
            </header>
           
            <PageSwitches userType={userType} setUserType={setUserType}/>
        </div>)
};
export const Routes = (props) => (
    <React.Fragment>
        <Frame {...props}/>
    </React.Fragment>
)
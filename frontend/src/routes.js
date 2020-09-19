

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
            <Route path="/professor" component={ProfessorDash} />
            <Route path="/student" component={StudentDash} />
            <Route path="/" component={ProfessorDash} />
        </Switch>
    )
}

{/* <div id="logo-container">
                <Link to="/">
                    
                </Link>
            </div> */}

const Frame = (props) => {
    const [userType, setUserType] = useState('professor')
    
    return (
        <div className="container">

            <PageSwitches userType={userType} setUserType={setUserType}/>
        </div>)
};
export const Routes = (props) => (
    <React.Fragment>
        <Frame {...props}/>
    </React.Fragment>
)
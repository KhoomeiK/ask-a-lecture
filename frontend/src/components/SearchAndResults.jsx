/** @jsx jsx */

import _ from 'lodash'
import React, {useState} from 'react'
import { Search } from 'semantic-ui-react'
import { Card, Heading, jsx, Box} from 'theme-ui'
import { Link } from 'react-router-dom'
import {Link as ThemeLink} from 'theme-ui' 
import { postSearch, timeStampToYouTube, timeStampToSeconds, getVideoId } from '../utils'
import { Card as CardView, Icon, Image } from 'semantic-ui-react'
import YouTube from 'react-youtube';
const initialState = {
    loading: false,
    results: [],
    value: '',
}

const ResultCard = (props) => {
    const updatedText = props.text.slice(0, 100) + "..."
    // let time = props.timestamp.split(".")[0]
    console.log(props)
    const videoId = getVideoId(props.link)

    const options = {
        height: '310',
        width: '510',
        start: timeStampToSeconds(props.timestamp),
        playerVars: {
        // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }
    return(
        <CardView style={{width: '100%' }}>
            {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> */}
            <CardView.Content>Lecture Entry
                <CardView.Header><ThemeLink target="_blank" href={props.linkWithTime}>{props.timestamp}</ThemeLink></CardView.Header>
                <CardView.Description>
                    {props.text}
                </CardView.Description>
                <YouTube opts={options} videoId={videoId} />
            </CardView.Content>
        </CardView>

    // <Card key={`${timestamp}-table`} className="searchCard">
    //     {updatedText} <ThemeLink target="_blank" href={linkWithTime}>({timestamp})</ThemeLink>
    // </Card>
    )
}

const fetchResults = async (search) => {
    const filteredResults = await(postSearch(search));
    try {
        const data = await filteredResults.json();
        console.log(data)
        // return data;
        if (data !== []) {
            const { link, title } = data;
            return data.results.map(value =>  ({...value, linkWithTime: timeStampToYouTube(value.timestamp, link), title, link}));
        }
        return data;
        
    } catch (e) {
        console.log(e)
    }
}

function exampleReducer(state, action) {
    switch (action.type) {
    case 'CLEAN_QUERY':
        return initialState
    case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }

    default:
        throw new Error()
    }
}

const resultRenderer = ({text, linkWithTime, timestamp}) => {
    const updatedText = text.slice(0, 100) + "..."
    timestamp = timestamp.split(".")[0]
    return (
        <Card key={timestamp} className="searchCard">
            {updatedText} <ThemeLink target="_blank" href={linkWithTime}>({timestamp})</ThemeLink>
        </Card>
    )
}

function SearchExampleStandard(props) {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.title)

            const search = {"classId": props.classId, "lectureNumber": props.lectureNum, "question": data.value}
            const source = await fetchResults(search)
            props.setResults(source)

            dispatch({
                type: 'FINISH_SEARCH',
                results: source,
            })
        }, 300)
    }, [])

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <Search
            className="searchBar"
            loading={loading}
            // onResultSelect={(e, data) =>
            //     dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            // }
            onSearchChange={handleSearchChange}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
        />
    )
}

export const SearchAndResults = (props) => {
    const {to, staticContext, activeClassName, ...rest} = props

    const [results, setResults] = useState([])
    let classId = "18.S096"
    let lectureNum = "1"
    if (props.location.state) {
        classId = props.location.state.classId
        lectureNum = props.location.state.lectureNum
    }
    console.log(results)
    
    return(
        <React.Fragment>
            <header
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    variant: 'styles.header',
                }}
                className="header">
                <Heading>Search</Heading>
                <SearchExampleStandard setResults={setResults} classId={classId} lectureNum={lectureNum} />
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
            <Box className="dashboard">
                {results.map(result => <ResultCard {...result} />)}
            </Box>
        </React.Fragment>
    )
}

/** @jsx jsx */

import _ from 'lodash'
import React from 'react'
import { Search } from 'semantic-ui-react'
import { Card, Heading, jsx, Text} from 'theme-ui'
import { Link } from 'react-router-dom'
import {Link as ThemeLink} from 'theme-ui' 
import { postSearch, timeStampToYouTube } from '../utils'

// TODO: This should be replaced with acutal data
// const getResults = () =>
//   _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
//   }))
const initialState = {
    loading: false,
    results: [],
    value: '',
}

const ResultCard = ({text, timestamp, videoURL}) => {
    return(<Card>
        <Text>
            Card
        </Text>
    </Card>
    )
}

const fetchResults = async (search) => {
    const filteredResults = await(postSearch(search));
    try {
        const data = await filteredResults.json();
        // return data;
        if (data != []) {
            return data.map(value =>  ({...value, title: timeStampToYouTube(value.timestamp, "https://youtu.be/hFQL7BS6lrs")}));
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

const resultRenderer = ({text, timestamp}) => {
    const updatedText = text.slice(10) + "..."
    return <Card>{updatedText}, <Link href={timeStampToYouTube(timestamp, "https://youtu.be/hFQL7BS6lrs")}>Video Link</Link></Card>
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
            console.log(search)
            const source = await fetchResults(search)
            console.log(source)

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
            onResultSelect={(e, data) =>
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            }
            onSearchChange={handleSearchChange}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
        />
    )
}




// class SearchBar extends Component {
//   state = initialState
  

//   handleResultSelect = (e, { result }) => {
//     this.setState({ value: result })
//     // this.props.setResults
// }

//   handleSearchChange = (e, { value }) => {
//     this.setState({ isLoading: true, value })

//     setTimeout(async () => {
//       if (this.state.value.length < 1) return this.setState(initialState)

      
//         const search = {"classId": this.props.classId, "lectureNumber": this.props.lectureNum, "question": this.state.value}
//         console.log(search)

//         // Array of JSON comes back
//         const filteredResults = await fetchResults(search)

//         console.log(filteredResults)

//       this.setState({
//         isLoading: false,
//         results: filteredResults,
//       })
//     }, 300)
//   }

//   render() {
//     const { isLoading, value, results } = this.state

//     return (
//       <div className="searchBar">
//           <Search
//             category
//             loading={isLoading}
//             onResultSelect={this.handleResultSelect}
//             onSearchChange={_.debounce(this.handleSearchChange, 500, {
//               leading: true,
//             })}
//             results={results}
//             value={value}
//           />
//       </div>
//     )
//   }
// }

export const SearchAndResults = (props) => {
    const {to, staticContext, activeClassName, ...rest} = props
    let classId = "18.S096"
    let lectureNum = "1"
    if (props.location.state) {
        classId = props.location.state.classId
        lectureNum = props.location.state.lectureNum
    }
    
    return(
        <header
            sx={{
                display: 'flex',
                alignItems: 'center',
                variant: 'styles.header',
            }}
            className="header">
            <Heading>Ask-A-Lecture</Heading>
            <SearchExampleStandard classId={classId} lectureNum={lectureNum} />
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
    )
}

// const initialState = { isLoading: false, results: [], value: '' }

// export const SearchAndResults = () => {

//     const [isLoading, setIsLoading] = useState(false)
//     const [results, setResults] = useState([])
//     const [value, setValue] = useState('')

    
//     const handleResultSelect = (e, { result }) => setValue(result.title)

//     const handleSearchChange = (e, { value }) => {
//         setValue(value)
//         setIsLoading(true)
//     }

//     const setTimeout = () => {
//       if (value.length < 1) {
//           setIsLoading(false)
//           setResults([])
//           setValue('')
//         //   return this.setState(initialState)
//       }

//       const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
//       const isMatch = (result) => re.test(result.title)

//       const filteredResults = _.reduce(
//         source,
//         (memo, data, name) => {
//           const results = _.filter(data.results, isMatch)
//           if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

//           return memo
//         },
//         {},
//       )

//       this.setState({
//         isLoading: false,
//         results: filteredResults,
//       })
//     }, 300)
//   }

//   render() {
//     const { isLoading, value, results } = this.state

//     return (
//       <Grid>
//         <Grid.Column width={8}>
//           <Search
//             category
//             loading={isLoading}
//             onResultSelect={this.handleResultSelect}
//             onSearchChange={_.debounce(this.handleSearchChange, 500, {
//               leading: true,
//             })}
//             results={results}
//             value={value}
//           />
//         </Grid.Column>
//         <Grid.Column width={8}>
//           <Segment>
//             <Header>State</Header>
//             <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(this.state, null, 2)}
//             </pre>
//             <Header>Options</Header>
//             <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(source, null, 2)}
//             </pre>
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     )
//   }

//     return(<Search
//         category
//         loading={isLoading}
//         onResultSelect={this.handleResultSelect}
//         onSearchChange={_.debounce(this.handleSearchChange, 500, {
//             leading: true,
//         })}
//         results={results}
//         value={value}
//     />)
// }
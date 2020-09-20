/** @jsx jsx */

import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import {Card, Heading, jsx, Text} from 'theme-ui'
import {Link } from 'react-router-dom'

const initialState = { isLoading: false, results: [], value: '' }

// TODO: This should be replaced with acutal data
// const getResults = () =>
//   _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
//   }))

const getResults = () => {
    
}

const source = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun()

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})

const ResultCard = ({text, timestamp, videoURL}) => {
    return(<Card
  sx={{
    maxWidth: 256,
  }}>
  <Text>
    Card
  </Text>
</Card>)

}

class SearchBar extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    // this.props.setResults
}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(
        source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch)
          if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

          return memo
        },
        {},
      )

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <div className="searchBar">
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
      </div>
    )
  }
}

export const SearchAndResults = (props) => {
    const {to, staticContext, activeClassName, ...rest} = props
    return(
        <header
            sx={{
                display: 'flex',
                alignItems: 'center',
                variant: 'styles.header',
            }}
            className="header">
            <Heading>Ask-A-Lecture</Heading>
            <SearchBar />
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
import React, { Component } from 'react'
import './searchbox.scss'
import { Suggestions } from './suggestions/suggestions'
import products from './sample-data.json'
import Fuse from 'fuse.js'
import { SearchIcon } from 'components/icon'
import { AppEventEmitter } from 'services/app-event-emitter'

export class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuggestions: false,
      suggestions: products,
      suggestionType: 'products',
      query: ''
    }
  }

  show = () => {
    this.setState({ showSuggestions: true })
    document.addEventListener('click', this.close)
  }

  close = (e) => {
    if (!this.search.contains(e.target)) {
      this.setState({ showSuggestions: false }, () => document.removeEventListener('click', this.close))
    }
  }

  async onSearch (keyword) {
    const fuseSearch = new Fuse(products, {
      keys: ['name']
    })
    const result = fuseSearch.search(keyword)

    this.setState({ suggestions: keyword ? result : products, query: keyword })
  }

  onViewAll (type: number) {
    const { query } = this.state
    AppEventEmitter.emit('search', { type, query })
  }

  render () {
    const { showSuggestions, suggestions, query } = this.state

    return (
      <div className='searchbox' ref={ref => (this.search = ref)}>
        <div className='input-wrapper'>
          <input
            onFocus={this.show}
            onChange={e => this.onSearch(e.target.value)}
            value={query}
            maxLength={40} placeholder='Search...' className='searchbox-input' />

          <SearchIcon className='searchbox-icon' />
        </div>

        <Suggestions
          query={query}
          onChange={type => this.setState({ suggestionType: type })}
          onClickViewAll={type => this.onViewAll(type)}
          suggestions={suggestions} className={showSuggestions ? 'appeared' : 'disappeared'} />
      </div>
    )
  }
}

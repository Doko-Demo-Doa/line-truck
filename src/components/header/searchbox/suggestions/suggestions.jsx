import React, { Component, useState } from 'react'
import classnames from 'classnames'
import Highlighter from 'react-highlight-words'
import { Box2Icon, BuildingIcon, SupplierIcon, CloudSearchIcon } from 'components/icon'
import './suggestions.scss'

/**
 * This is a little hack since highlighted word
 * is also highlighted when the whole item is hovered.
 */
const SuggestionItem = ({ text = '', query, type }) => {
  const [hovered, setHovered] = useState(false)

  const getIcon = () => {
    if (type === 0) {
      return <Box2Icon className='ico' black={!hovered} />
    }
    if (type === 2) {
      return <BuildingIcon className='ico' black={!hovered} />
    }
    return <SupplierIcon className='ico' black={!hovered} />
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} className='suggestion-item' onClick={() => alert(3434)}>
      {getIcon()}
      <Highlighter
        highlightClassName={classnames('suggestion-item-highlighted', hovered ? 'force-white' : '')}
        searchWords={[query]}
        autoEscape
        textToHighlight={text} className='suggestion-item-text' />
    </div>
  )
}

/**
 * Suggestion box when focusing on search input.
 */
export class Suggestions extends Component {
  state = {
    activeIndex: 0
  }

  onChangeTab (idx, item) {
    this.setState({ activeIndex: idx })
    this.props.onChange(item.toLowerCase())
  }

  render () {
    const { className, query, suggestions, onClickViewAll } = this.props
    const { activeIndex } = this.state

    return (
      <div className={classnames('suggestions shadow', className)}>
        <div className='suggestions-tabs'>
          {['Products', 'Suppliers', 'Vendors'].map((item, idx) => (
            <div key={idx} onClick={() => this.onChangeTab(idx, item)} className={classnames('s-tab', idx === activeIndex ? 's-tab-active' : '')}>
              {item}
              <span>10</span>
            </div>
          ))}
        </div>

        {suggestions.length > 0
          ? suggestions.map((item, idx) => <SuggestionItem type={activeIndex} text={item.name} query={query} key={idx} />)
          : (
            <div className='empty'>
              <CloudSearchIcon className='empty-ico' />
              <p>No results within current filter set</p>
            </div>
          )}

        <div className='suggestion-footer' onClick={() => onClickViewAll(activeIndex)}>
          View all search results
        </div>
      </div>
    )
  }
}

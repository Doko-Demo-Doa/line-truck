import React from 'react'
import Simplebar from 'simplebar-react'
import classnames from 'classnames'
import './suggestion-menu.scss'

const SuggestionItem = ({ text, highlighted, ref, id, onClick }) => {
  return (
    <div onClick={onClick} id={id} ref={ref} className={classnames('suggestion-item', highlighted ? 'highlighted' : '')}>
      {text}
    </div>
  )
}

export class SuggestionMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      highlightedIndex: 0
    }
    this.scroll = React.createRef()
  }

  componentDidMount () {
    const { suggestions, onSelect, closeFunc } = this.props
    const options = {
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    }
    document.addEventListener('keydown', data => {
      if (data.code === 'Enter') {
        // TODO: Do further logic.
        onSelect(suggestions[this.state.highlightedIndex])
        closeFunc() // Got from WithDropdown.jsx
      }
      if (data.code === 'ArrowUp') {
        if (this.state.highlightedIndex > 0) {
          this.setState({ highlightedIndex: this.state.highlightedIndex - 1 }, () => document.getElementById(`sItem${this.state.highlightedIndex}`).scrollIntoView(options))
        }
      }
      if (data.code === 'ArrowDown') {
        if (!(this.state.highlightedIndex >= suggestions.length - 1)) {
          this.setState({ highlightedIndex: this.state.highlightedIndex + 1 }, () => document.getElementById(`sItem${this.state.highlightedIndex}`).scrollIntoView(options))
        }
      }
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', () => {})
  }

  render () {
    const { suggestions, onSelect } = this.props
    const { highlightedIndex } = this.state

    return (
      <Simplebar id='scroller' className='suggestion-menu'>
        {suggestions.map((item, idx) => (
          <SuggestionItem onClick={() => onSelect(suggestions[idx])} id={`sItem${idx}`} highlighted={idx === highlightedIndex} key={idx} text={item} />
        ))}
      </Simplebar>
    )
  }
}

SuggestionMenu.defaultProps = {
  suggestions: []
}

import React, { Component } from 'react'
import classnames from 'classnames'
import './tab-bar.scss'

export class CustomTabBar extends Component {
  static defaultProps = {
    onChange: () => {},
    tabItems: []
  }

  render () {
    const { onChange, tabItems, activeIndex } = this.props

    return (
      <div className='custom-tab-bar'>
        <div className='tabs'>
          {tabItems.map((item, idx) => (
            <div key={idx} className={classnames('tab', idx === activeIndex ? 'active' : '')} onClick={() => onChange(idx)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

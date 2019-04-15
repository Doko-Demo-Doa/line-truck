import React, { Component } from 'react'
import classnames from 'classnames'
import './with-dropdown.scss'

export class WithDropdown extends Component {
  static defaultProps = {
    dropdown: () => {},
    closeAfterClick: false
  }

  state = {
    menuVisible: false
  }

  show = (e) => {
    e.preventDefault()
    this.setState({ menuVisible: true }, () => document.addEventListener('click', this.close))
  }

  close = (e) => {
    const { closeAfterClick } = this.props
    if (closeAfterClick || !this.dropdownMenu.contains(e.target)) {
      this.setState({ menuVisible: false }, () => document.removeEventListener('click', this.close))
    }
  }

  render () {
    const { children, className, innerClassName } = this.props
    const { menuVisible } = this.state

    return (
      <div onClick={this.show} className={classnames('dropdown-renderprops', className)}>
        {children}
        <div ref={element => (this.dropdownMenu = element)} className={classnames('dropdown-main', innerClassName, menuVisible ? 'visible' : 'hidden')}>
          {this.props.dropdown(menuVisible, this.close)}
        </div>
      </div>
    )
  }
}

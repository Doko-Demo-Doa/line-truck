import React, { Component } from 'react'
import classnames from 'classnames'
import './side-menu-button.scss'
import { DashboardIcon, ForecastIcon, HelpIcon, SlowmoversIcon,
  MoneyIcon, StockswapIcon, BsLogoIcon, IntercoIcon } from 'components/icon'
import { WithTooltip } from '../../../hocs/with-tooltip/with-tooltip'

type Props = {
  icon: string
}

export class SideMenuButton extends Component<Props> {
  getIcon () {
    const { icon } = this.props
    switch (icon) {
      case 'bs':
        return <BsLogoIcon className='side-menu-icon' />
      case 'dashboard':
        return <DashboardIcon className='side-menu-icon' />
      case 'money':
        return <MoneyIcon className='side-menu-icon' />
      case 'stockswap':
        return <StockswapIcon className='side-menu-icon' />
      case 'forecast':
        return <ForecastIcon className='side-menu-icon' />
      case 'help':
        return <HelpIcon className='side-menu-icon' />
      case 'interco':
        return <IntercoIcon className='side-menu-icon' />
      case 'slowmovers':
        return <SlowmoversIcon className='side-menu-icon' />
      default:
        return <DashboardIcon className='side-menu-icon' />
    }
  }

  renderContent () {
    const { className, active } = this.props
    return (
      <div className={classnames('side-menu-button', active ? 'active' : '', className)}>
        {this.getIcon()}
      </div>
    )
  }

  render () {
    const { tooltip } = this.props

    return (tooltip
      ? <WithTooltip text={tooltip}>
        {this.renderContent()}
      </WithTooltip> : this.renderContent()
    )
  }
}

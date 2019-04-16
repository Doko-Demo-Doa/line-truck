import React, { Component } from 'react'
import './authen-layout.scss'
import { Header } from 'components/header/header'
import { CustomTabBar } from 'components/header/tab-bar/tab-bar'
import { i18next } from 'common/i18next'
import Spinner from 'react-spinkit'
import { customHistory } from '../../common/history'
import { SideMenu } from '../../components/side-menu/side-menu'

type Props = {
  withoutTabs: boolean,
  content: Object,
  headerIndex: number,
  withoutHeader: boolean,
  breadcrumbs: Array
}

const TAB_ITEMS = [
  { id: 'dashboard', name: i18next.t('tab_bar.dashboard') }
]

export class AuthenLayout extends Component<Props> {
  static defaultProps = {
    content: null,
    loading: false
  }

  constructor (props) {
    super(props)
    let activeTab = 0
    if (location.href.includes('info')) activeTab = 2
    if (location.href.includes('purchase-request')) activeTab = 1
    if (location.href.includes('dashboard')) activeTab = 0
    this.state = {
      activeTab
    }
  }

  render () {
    const { withoutHeader, withoutTabs, content, loading } = this.props
    const { activeTab } = this.state

    return (
      <div className='authen-layout'>
        <SideMenu />
        <div className='content'>
          {!withoutHeader && <Header />}
          {!withoutTabs && <CustomTabBar tabItems={TAB_ITEMS} onChange={(idx) => {
            this.setState({ activeTab: idx }, () => customHistory.push(TAB_ITEMS[idx].id))
          }} activeIndex={activeTab} />}
          <div className='content-main'>
            {loading ? <Spinner name='line-scale' color='#0517b9' /> : React.isValidElement(content) && React.cloneElement(content)}
          </div>
        </div>
      </div>
    )
  }
}

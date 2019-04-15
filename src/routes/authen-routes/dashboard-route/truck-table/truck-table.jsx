import React, { Component } from 'react'
import classnames from 'classnames'
import { sortBy } from 'lodash'
import Spinner from 'react-spinkit'
import './truck-table.scss'
import { Switch } from 'components/switch/switch'
import { SortIcon } from 'components/icon'
import { customHistory } from 'common/history'
import { Chip } from 'components/chip/chip'
import { AppEventEmitter } from 'services/app-event-emitter'

const TABLE_SECTIONS = [
  {
    name: 'Plate',
    id: 'truck-plate',
    cls: 'truck-plate'
  },
  {
    name: 'Cargo Type',
    id: 'cargoType',
    cls: 'cargo-type',
    icon: true
  },
  {
    name: 'Driver',
    id: 'driverName',
    cls: 'driver-name'
  },
  {
    name: 'Truck Type',
    cls: 'truck-type'
  },
  {
    name: 'Price',
    id: 'price',
    cls: 'price',
    icon: true
  },
  {
    name: 'Dimension',
    id: 'dimension',
    cls: 'dimension',
    icon: true
  },
  {
    name: 'Parking address',
    cls: 'parking-address'
  },
  {
    name: 'Production Year',
    cls: 'production-year'
  },
  {
    name: 'Status',
    cls: 'status'
  },
  {
    name: 'Description',
    cls: 'description'
  }
]

export class TruckTable extends Component {
  constructor (props) {
    super(props)
    this.list = React.createRef()
    this.state = {
      products: [],
      productsFiltered: []
    }
  }

  componentDidMount () {
    AppEventEmitter.addListener('search', data => {
      // 0 = Products, 1 = Suppliers, 2 = Vendors
      if (data) this.setState({ searchCriteria: data })
    })
  }

  componentWillUnmount () {
    AppEventEmitter.removeListener('search', () => {})
  }

  async onSwitch (isAll) {

  }

  onSort (type) {
    const { descending, productsFiltered, sortType } = this.state
    this.setState({ descending: !descending }, () => {
      const sortedArray = (type === sortType) ? this.state.descending ? sortBy(productsFiltered, type).reverse() : sortBy(productsFiltered, type) : sortBy(productsFiltered, type).reverse()
      this.setState({ sortType: type, productsFiltered: sortedArray })
    })
  }

  resetArgs () {
    this.eol = false
    this.loading = false
    this.params.page = 0
  }

  renderItem = (item, idx) => {
    return (
      <div key={idx} onClick={(e) => customHistory.push(`/product-detail/${item.productNumber}?ext=` + (item.extendedToUsersCountry ? 1 : 0), item)} className={classnames('table-item', item.cls)}>
        <div className='code'>
          <span>{item.productNumberShort || '000000'}</span>
        </div>
        <div className='description'>
          {item.productDescription}
        </div>
        <div className='pack'>aaa</div>
        <div className='size'>{item.packagingSize || '-'}</div>
        <div className='supplier'>{item.supplierName}</div>
        <div className='coo'>{item.countryOfOrigin || '-'}</div>
        <div className='rfi'>
          <span onClick={(e) => this.openRFI(e, item)}>RFI</span>
        </div>
      </div>
    )
  }

  render () {
    const { productsFiltered, sortType, descending, searchCriteria, loading } = this.state

    return (
      <div className='product-table'>
        {loading && <div className='loading-overlay'><Spinner className='brenntag-sp' name='line-scale' color='#0517b9' /></div>}
        <div className='heading'>
          {searchCriteria ? (
            <div className='chips'>
              <Chip onClose={() => this.setState({ searchCriteria: null })} label={`Searching by: Keyword`} />
            </div>
          ) : (<span>Truck List</span>)}
          <div className='right-btns'>
            <Switch onChange={isAll => this.onSwitch(isAll)} checkedInitially={false} label1='All Products' label2='My Products' />
          </div>
        </div>

        <div className='main-table'>
          {/* Table Header */}
          <div className='table-header'>
            {TABLE_SECTIONS.map((item, idx) => (
              <div onClick={() => item.icon ? this.onSort(item.id) : null} key={idx} className={classnames('header-item', item.cls)}>
                <span>{item.name}</span>
                <SortIcon className={classnames('ico', item.icon ? '' : 'translucent', descending && (item.id === sortType) ? 'descending' : '')} />
              </div>
            ))}
          </div>

          {/* Table Content */}
          <div className='table-content' id='product-table-parent'>
            {productsFiltered.map((item, idx) => this.renderItem(item, idx))}
          </div>
        </div>
        <div className='table-footer'>
          Total Records: <span>{productsFiltered.length}</span>
        </div>
      </div>
    )
  }
}

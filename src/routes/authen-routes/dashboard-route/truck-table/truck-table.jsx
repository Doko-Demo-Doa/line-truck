import React, { Component } from 'react'
import classnames from 'classnames'
import { sortBy } from 'lodash'
import Spinner from 'react-spinkit'
import { Switch } from 'components/switch/switch'
import { SortIcon } from 'components/icon'
import { Chip } from 'components/chip/chip'
import { AppEventEmitter } from 'services/app-event-emitter'
import './truck-table.scss'
import sampleTrucks from './sample-data.json'
import { ButtonMain } from 'components/button/button-main'
import { modals } from 'components/modals/modal-registry'
import { NewTruckModal } from 'components/new-truck/new-truck-modal'

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
      products: sampleTrucks,
      productsFiltered: sampleTrucks
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

  onAddTruck () {
    modals.open({
      content: <NewTruckModal onClose={() => {
        modals.close()
      }} />
    })
  }

  onSort (type) {
    const { descending, productsFiltered, sortType } = this.state
    this.setState({ descending: !descending }, () => {
      const sortedArray = (type === sortType) ? this.state.descending ? sortBy(productsFiltered, type).reverse() : sortBy(productsFiltered, type) : sortBy(productsFiltered, type).reverse()
      this.setState({ sortType: type, productsFiltered: sortedArray })
    })
  }

  renderItem = (item, idx) => {
    return (
      <div key={idx} className={classnames('table-item', item.cls)}>
        <div className='truck-plate'>
          <span>{item.truck_plate || '000000'}</span>
        </div>
        <div className='cargo-type'>
          {item.cargo_type.join(', ')}
        </div>
        <div className='driver-name'>{item.driver}</div>
        <div className='truck-type'>{item.truck_type || '-'}</div>
        <div className='price'>{item.price}</div>
        <div className='dimension'>{item.dimension.length + '-' + item.dimension.width + '-' + item.dimension.height}</div>
        <div className='parking-address'>
          <span className='pa'>{item.parking_address}</span>
        </div>
        <div className='production-year'>{item.production_year}</div>
        <div className='status'>{item.status}</div>
        <div className='description'>{item.description}</div>
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
          ) : (<span className='head-title'>Truck List</span>)}
          <div className='right-btns'>
            <ButtonMain onClick={() => this.onAddTruck()} className='add-truck-btn' title='+ Add new truck' />
            <Switch onChange={isAll => this.onSwitch(isAll)} checkedInitially={false} label1='All Trucks' label2='New Trucks' />
          </div>
        </div>

        <div className='main-table'>
          {/* Table Header */}
          <div className='inner-content-wrapper'>
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
        </div>
        <div className='table-footer'>
          Total Records: <span>{productsFiltered.length}</span>
        </div>
      </div>
    )
  }
}

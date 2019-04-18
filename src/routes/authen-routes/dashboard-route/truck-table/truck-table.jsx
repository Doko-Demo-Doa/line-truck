import React, { Component } from 'react'
import classnames from 'classnames'
import Spinner from 'react-spinkit'
import { Switch } from 'components/switch/switch'
import { SortIcon } from 'components/icon'
import { Chip } from 'components/chip/chip'
import { AppEventEmitter } from 'services/app-event-emitter'
import { sortBy } from 'lodash'
import './truck-table.scss'
import sampleTrucks from './sample-data.json'
import { ButtonMain } from 'components/button/button-main'
import { modals } from 'components/modals/modal-registry'
import { NewTruckModal } from 'components/new-truck/new-truck-modal'
import { truckStatusMapper } from '../../../../utils/utils-data'
import { formatCurrency } from '../../../../utils/utils-formatting'

const TABLE_SECTIONS = [
  {
    name: 'Plate',
    id: 'truckPlate',
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
    id: 'truckType',
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
    cls: 'dimension'
  },
  {
    name: 'Parking address',
    id: 'parkingAddress',
    cls: 'parking-address'
  },
  {
    name: 'P. Year',
    id: 'productionYear',
    cls: 'production-year'
  },
  {
    name: 'Status',
    id: 'status',
    cls: 'status',
    icon: true
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
      productsFiltered: sampleTrucks.filter(n => n.production_year >= 2015),
      sortType: 'cargoType',
      descending: true, // Sorting with reversed order
      pageNum: 1,
      maxPage: 26
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
    this.setState({ productsFiltered: isAll ? this.state.products : this.state.productsFiltered.filter(n => n.production_year >= 2015) })
  }

  onSort (type) {
    const { productsFiltered, sortType } = this.state
    this.setState({ descending: !this.state.descending }, () => {
      const sortedArray = (type === sortType) ? this.state.descending ? sortBy(productsFiltered, type) : sortBy(productsFiltered, type).reverse() : sortBy(productsFiltered, type).reverse()
      console.log(this.state.descending)
      console.table(sortedArray)
      this.setState({ sortType: type, productsFiltered: sortedArray })
    })
  }

  onAddTruck () {
    modals.open({
      content: <NewTruckModal onClose={(values) => {
        // console.log(values)
        this.setState(prevState => {
          const newProds = [...prevState.products, {
            id: prevState.products.length + 1,
            truck_plate: values.truckPlate,
            cargo_type: values.cargoTypes,
            truck_type: values.truckType,
            driver: values.driverName,
            production_year: values.productionYear,
            price: parseInt(values.price),
            dimension: {
              length: parseFloat(values.vLength),
              width: parseFloat(values.vWidth),
              height: parseFloat(values.vHeight)
            },
            parking_address: values.parkingAddress,
            status: truckStatusMapper(values.status),
            description: values.description
          }]
          return {
            ...prevState,
            products: newProds,
            productsFiltered: newProds
          }
        }, () => console.log(this.state))
        modals.close()
      }} />
    })
  }

  renderItem = (item, idx) => {
    return (
      <div key={idx} className={classnames('table-item', item.cls)}>
        <div className='truck-plate'>
          <span>{item.truck_plate || '000000'}</span>
        </div>
        <div className='cargo-type content-padding'>
          {item.cargo_type.join(', ')}
        </div>
        <div className='driver-name'>{item.driver}</div>
        <div className='truck-type'>{`${item.truck_type} tons` || '-'}</div>
        <div className='price'>{formatCurrency(item.price)}</div>
        <div className='dimension'>{item.dimension.length + '-' + item.dimension.width + '-' + item.dimension.height}</div>
        <div className='parking-address content-padding'>
          <span className='pa'>{item.parking_address}</span>
        </div>
        <div title='Production Year' className='production-year'>{item.production_year}</div>
        <div className='status'>{truckStatusMapper(item.status)}</div>
        <div className='description'>{item.description}</div>
      </div>
    )
  }

  render () {
    const { productsFiltered, sortType, descending, searchCriteria, loading, pageNum, maxPage } = this.state

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
          <div>Total Records: <span>{productsFiltered.length}</span></div>

          <div className='paging'>
            <div className='txt'>Page <span>{pageNum}</span> of <span>{maxPage}</span></div>
            <ButtonMain disabled={pageNum <= 1} onClick={() => this.setState({ pageNum: this.state.pageNum - 1 })} className='paging-btn' title='<' />
            <ButtonMain disabled={pageNum >= maxPage} onClick={() => this.setState({ pageNum: this.state.pageNum + 1 })} className='paging-btn' title='>' />
          </div>
        </div>
      </div>
    )
  }
}

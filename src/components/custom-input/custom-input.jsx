import React from 'react'
import classnames from 'classnames'
import { CalendarIcon, ArrowDownIcon } from 'components/icon'
import Calendar from 'rc-calendar'
import enUS from 'rc-calendar/lib/locale/en_US'
import moment from 'moment'
import './custom-input.scss'
import { WithDropdown } from '../../hocs/with-dropdown/with-dropdown'
import { SelectionMenu } from 'components/selection-menu/selection-menu'
import { SuggestionMenu } from 'components/suggestion-menu/suggestion-menu'

export const CustomInput = ({ label, type, multiline, className, inputClassName, value, onChange, suggestions = [], unit, options = [], metaValue = 'Test', onSelectSuggestion, error, errorMessage, disabled, ...props }) => {
  const getInputLayout = () => {
    switch (type) {
      case 'input':
        return <input disabled={disabled} className={classnames('input', disabled ? 'custom-input-disabled ' : '', unit ? 'align-left' : '')} onChange={onChange} value={value} {...props} />
      case 'password':
        return <input disabled={disabled} type='password' className={classnames('input')} onChange={onChange} value={value} {...props} />
      case 'input-multiline':
        return <textarea maxLength={256} disabled={disabled} onChange={onChange} value={value} {...props} />
      case 'date':
        // Returns 'date' type input. Which will activate a calendar dropdown upon click.
        return <div className={classnames('input', 'selectable')}>{value || 'SELECT'}</div>
      case 'select':
        return <div className={classnames('input', 'selectable')}>{value || 'SELECT'}</div>
      case 'meta':
        return <div className={classnames('input', 'selectable')}>{value || 'SELECT'}</div>
      default:
        return <input disabled={disabled} className={classnames('input', unit ? 'align-left' : '')} onChange={onChange} value={value} {...props} />
    }
  }

  const getTrailingIcon = () => {
    switch (type) {
      case 'date':
        return <CalendarIcon />
      case 'select':
        return <ArrowDownIcon black />
      case 'meta':
        return <ArrowDownIcon black />
      default:
        return null
    }
  }

  const getDropdown = (closeFunc) => {
    switch (type) {
      case 'date':
        return <Calendar locale={{ ...enUS, monthBeforeDate: true, monthFormat: 'MMMM' }} disabledDate={(m) => m.isBefore(moment())} onSelect={onChange} />
      case 'select':
        return <SelectionMenu data={options} value={value} onChange={onChange} />
      case 'meta':
        return <SelectionMenu className='select-meta' data={options} value={value} onChange={onChange} />
      case 'input-suggestion':
        return <SuggestionMenu closeFunc={closeFunc} onSelect={text => onSelectSuggestion(text)} suggestions={suggestions} />
      default:
        return null
    }
  }

  return (
    <WithDropdown
      closeAfterClick={type !== 'date' || (type === 'input-suggestion' && suggestions.length <= 0)} // If true, the menu will be closed when you click anywhere inside the menu, not just items.
      dropdown={(visible, closeFunc) => getDropdown(closeFunc)}
      className={classnames('custom-input', className)}>
      <>
        {label && <div className={classnames('label')}>{label}</div>}
        <div className={'mini-wrapper'}>
          <div className={classnames('input-inside', disabled ? 'custom-input-disabled ' : '', inputClassName, error ? 'custom-input-error' : '')}>
            {getInputLayout()}
            {getTrailingIcon()}

            {/* Unit is a a small annotation */}
            {unit && <div className='unit'>{unit}</div>}
          </div>

          {type === 'meta' && <div className='meta'>{metaValue}</div>}
        </div>

        <div className={classnames('custom-input-error-message', error ? 'visible' : 'hidden')}>{errorMessage}</div>
      </>
    </WithDropdown>
  )
}

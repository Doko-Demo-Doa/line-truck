import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import './modal-default.scss'

export class ModalRegistry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }

    this.content = null
    modals.open = this.onOpenModal
    modals.close = this.onCloseModal
  }

  onOpenModal = (options) => {
    this.content = options.content
    this.setState({ open: true })
  };

  onCloseModal = () => {
    this.setState({ open: false })
  };

  render () {
    const { open } = this.state

    return (
      <>
        <Modal closeOnOverlayClick={false} classNames={{ modal: 'modal-registry', overlay: 'modal-registry-blur' }} showCloseIcon={false} open={open} onClose={this.onCloseModal} center>
          {React.isValidElement(this.content) && React.cloneElement(this.content)}
        </Modal>
      </>
    )
  }
}

export const modals = {}

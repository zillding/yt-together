import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleSearch } from '../actions'

import { RowContainer } from '../components/RowLayout'
import Brand from '../components/Brand'
import ToggleSearchButton from '../components/ToggleSearchButton'

class TitleBar extends Component {
  render() {
    const {
      showSearch,
      toggleSearch,
    } = this.props

    return (
      <RowContainer>
        <div>
          <Brand/>
        </div>
        <div>
          <ToggleSearchButton
            showSearch={showSearch}
            onClick={toggleSearch} />
        </div>
      </RowContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    showSearch: state.showSearch,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSearch: () => dispatch(toggleSearch()),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default C

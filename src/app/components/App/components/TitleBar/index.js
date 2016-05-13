import { Component } from 'react'
import { connect } from 'react-redux'

import { toggleSearch } from 'actions'

import { RowContainer } from 'components/RowLayout'
import Brand from './components/Brand'
import UserNumber from './components/UserNumber'
import SecretTag from './components/SecretTag'
import Username from './components/Username'
import ToggleSearchButton from './components/ToggleSearchButton'

class TitleBar extends Component {
  render() {
    const {
      numberOfUsers,
      roomName,
      username,
      showSearch,
      toggleSearch,
    } = this.props

    return (
      <RowContainer>
        <RowContainer>
          <Brand/>
          <UserNumber number={numberOfUsers} />
          { roomName === 'secretRoom' ? <SecretTag/> : null }
        </RowContainer>
        <RowContainer>
          <Username username={username} />
          <ToggleSearchButton
            showSearch={showSearch}
            onClick={toggleSearch} />
        </RowContainer>
      </RowContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    numberOfUsers: state.roomState.get('numberOfUsers'),
    roomName: state.roomState.get('name'),
    username: state.username,
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

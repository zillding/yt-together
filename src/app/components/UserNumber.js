import React from 'react'

const style = {
  marginLeft: '1em',
}

const UserNumber = ({ number }) => (
  <div
    className="ui large red label"
    style={style}>
    <i className="users icon"></i>
    {number}
  </div>
)

export default UserNumber

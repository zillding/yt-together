import React from 'react'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const RowContainer = ({ children }) => (
  <div style={containerStyle}>
    { children }
  </div>
)

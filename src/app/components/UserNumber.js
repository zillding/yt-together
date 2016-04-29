import React from 'react'

import { generateNonDupInt } from '../utils'

const style = {
  marginLeft: '1em',
}

const UserNumber = ({ number }) => (
  <div
    className={`ui large red label ${getClassName()}`}
    style={style}>
    <i className="users icon"></i>
    {number}
  </div>
)

export default UserNumber

function getClassName() {
  // generate a random non duplicated
  // animate class name
  const classArray = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'swing',
    'tada',
    'wobble',
    'jello',
  ]
  const index = generateNonDupInt(0, classArray.length - 1)
  return `animated ${classArray[index]}`
}

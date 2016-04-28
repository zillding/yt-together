import React from 'react'

export const PrevButton = ({ isSending, disabled, onPrevious }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onPrevious}>
      <i className="step backward icon"></i>
      Previous
    </button>
  )
}

export const NextButton = ({ isSending, disabled, onNext }) => {
  const cn = isSending ?
    'ui disabled right labeled icon button loading' :
    'ui right labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onNext}>
      <i className="step forward icon"></i>
      Next
    </button>
  )
}

export const SyncButton = ({ isSending, disabled, onSync }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      style={{margin: 0}}
      onClick={onSync}>
      <i className="refresh icon"></i>
      Sync Play Time
    </button>
  )
}

import React from 'react'

export const PauseButton = ({ isSending, disabled, onPause }) => (
  <Button
    disabled={disabled}
    isSending={isSending}
    iconCn="pause icon"
    onClick={onPause} />
)

export const ResumeButton = ({ isSending, disabled, onResume }) => (
  <Button
    disabled={disabled}
    isSending={isSending}
    iconCn="play icon"
    onClick={onResume} />
)

export const PrevButton = ({ isSending, disabled, onPrevious }) => (
  <Button
    disabled={disabled}
    isSending={isSending}
    iconCn="step backward icon"
    onClick={onPrevious} />
)

export const NextButton = ({ isSending, disabled, onNext }) => (
  <Button
    disabled={disabled}
    isSending={isSending}
    iconCn="step forward icon"
    onClick={onNext} />
)

export const SyncButton = ({ isSending, disabled, onSync }) => (
  <Button
    disabled={disabled}
    isSending={isSending}
    iconCn="refresh icon"
    onClick={onSync} />
)

const Button = ({ isSending, disabled, iconCn, onClick }) => {
  const cn = isSending ?
    'ui disabled icon button loading' :
    'ui icon button'
  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      style={{margin: 0}}
      onClick={onClick}>
      <i className={iconCn}></i>
    </button>
  )
}

const PlayButton = ({ isSelecting, onClick }) => {
  const cn = isSelecting ?
    'ui disabled icon button loading' :
    'ui icon button'
  return (
    <button
      className={cn}
      disabled={isSelecting}
      onClick={onClick}>
      <i className="play icon"></i>
    </button>
  )
}

export default PlayButton

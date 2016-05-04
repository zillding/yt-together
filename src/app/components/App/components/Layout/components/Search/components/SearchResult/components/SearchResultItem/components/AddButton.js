const AddButton = ({ isAdding, onClick }) => {
  const cn = isAdding ?
    'ui positive disabled loading icon button' :
    'ui positive icon button'

  return (
    <button
      className={cn}
      disabled={isAdding}
      onClick={onClick}>
      <i className="plus icon"></i>
    </button>
  )
}

export default AddButton

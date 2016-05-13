const style = {
  marginRight: 10
}

const Username = ({ username }) => (
  <div
    className="ui large basic label"
    style={style}>
    <i className="user icon"></i>
    {username}
  </div>
)

export default Username

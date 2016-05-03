import React, { Component, PropTypes } from 'react'
import GitHubForkRibbon from 'react-github-fork-ribbon'

const containerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const segmentStyle = {
  minWidth: 400
}

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
    }
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange() {
    const text = this.refs.input.value.trim()
    if (text) {
      this.setState({ error: false })
    }
  }

  _handleSubmit(e) {
    e.preventDefault()
    const text = this.refs.input.value.trim()
    if (text) {
      this.setState({ loading: true })
      this.props.onSubmit(text)
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { loading, error } = this.state
    const formCN = loading ?
      'ui large loading form' :
      'ui large form'
    const fieldCN = error ?
      'field error' :
      'field'

    return (
      <div style={containerStyle}>
        <GitHubForkRibbon
          href="https://github.com/zillding/yt-together"
          target="_blank"
          position="right">
          Fork me on GitHub
        </GitHubForkRibbon>
        <div style={segmentStyle}>
          <div className="ui stacked segment">
            <Header/>
            <form
              className={formCN}
              onSubmit={this._handleSubmit}>
              <div className={fieldCN}>
                <div className="ui left icon input">
                  <input
                    ref="input"
                    type="text"
                    placeholder="Enter your name..."
                    onChange={this._handleChange} />
                  <i className="user icon"></i>
                </div>
              </div>
              <button
                className="ui fluid large teal submit button"
                type="submit">
                OK
              </button>
            </form>
          </div>
          {
            error ? <ErrorMessage/> : null
          }
        </div>
      </div>
    )
  }
}

Splash.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const Header = () => (
  <h2 className="ui center aligned icon header">
    <i className="youtube play icon"></i>
    <div className="content">
      Watch YouTube Together!
      <div className="sub header">Greetings! Say hi to everyone. 🙋</div>
    </div>
  </h2>
)

const ErrorMessage = () => (
  <div className="ui error message">
    <ui className="list">
      <li>Please enter your name.</li>
    </ui>
  </div>
)

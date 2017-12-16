import React from 'react'

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  componentDidMount () {
    this.timer = setInterval(() => this.changeDate(), 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  changeDate () {
    this.setState({
      date: new Date()
    })
  }
  render () {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <h2>This is an example.</h2>
        <p>The time is currently: <strong>{this.state.date.toLocaleTimeString()}</strong></p>
      </div>
    )
  }
}

export default Example

import React from 'react'
import Api from '../classes/Api'

class AuthForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'no user',
      type: 'login',
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
  }

  componentDidMount () {
    console.log('mounted AuthForm.jsx')
  }

  componentWillUnmount () {
    console.log('unmounted AuthForm.jsx')
  }

  login () {
    Api.setEnv({
      env: window.env,
      username: this.state.email,
      password: this.state.password
    }).then(() => {
      this.state.status = 'success'
    }).catch(() => {
      this.state.status = 'failure'
    })
  }

  model (prop, e) {
    let tmp = {}
    tmp[prop] = e.target.value
    this.setState(tmp)
  }

  render () {
    let forms = {}

    forms.login = (
      <div id="loginform">
        <input type="email" placeholder="email" value={this.state.email} onChange={this.model.bind(this, 'email')}/>
        <input type="password" placeholder="password" value={this.state.password} onChange={this.model.bind(this, 'password')}/>
      </div>
    )

    forms.signup = (
      <div id="signupform">
        <input type="text" placeholder="name"/>
        <input type="email" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <input type="password" placeholder="confirm password"/>
      </div>
    )

    return (
      <div className="AuthForm">
        {forms[this.state.type]}
        <button onClick={this.login.bind(this)} >{this.state.type}</button>
        {this.state.status}
      </div>
    )
  }
}

export default AuthForm

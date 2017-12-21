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
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label" htmlFor="input-example-1">Email</label>
          </div>
          <div className="col-9">
            <input className="form-input" type="email" placeholder="john@example.com" value={this.state.email} onChange={this.model.bind(this, 'email')}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label" htmlFor="input-example-1">Password</label>
          </div>
          <div className="col-9">
            <input className="form-input" type="password" placeholder="Password" value={this.state.password} onChange={this.model.bind(this, 'password')}/>
          </div>
        </div>
      </form>
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
        <div className="form-group clearfix">
          <button className="btn col-4 float-right " onClick={this.login.bind(this)} >{this.state.type}</button>
        </div>
        {this.state.status}
      </div>
    )
  }
}

export default AuthForm

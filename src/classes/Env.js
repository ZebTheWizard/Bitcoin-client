import defaultenv from '../env.json'

class Env {
  constructor () {
    if (!localStorage.getItem('env')) localStorage.setItem('env', '{}')
    this.env = JSON.parse(localStorage.getItem('env'))
    Object.keys(defaultenv).forEach(key => {
      this.set(key, defaultenv[key])
    })
  }

  get () {
    return this.env
  }

  set (item, value) {
    this.env[item] = value
    this.publish()
  }

  remove (item) {
    delete this.env[item]
    this.publish()
  }

  publish () {
    window.localStorage.setItem('env', JSON.stringify(this.env))
  }
}

export default Env

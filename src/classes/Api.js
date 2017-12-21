/* global axios */
class Api {
  /**
   * @param {object} settings the settings for the method.
   * @param {object} settings.env the environment object you want to use.
   * @param {string} settings.client_id the client id for the API.
   * @param {string} settings.client_secret the secret token for the API.
   * @param {string} settings.username the username for the user you want to grant access.
   * @param {string} settings.password the password for the user you want to grant access.
   */
  static setEnv (settings) {
    const env = settings.env

    let credentials = {
      'grant_type': 'password'
    }

    credentials.client_id = settings.client_id || env.get().client_id
    credentials.client_secret = settings.client_secret || env.get().client_secret
    credentials.username = settings.username
    credentials.password = settings.password

    return new Promise((resolve, reject) => {
      axios.post(env.get().api + '/oauth/token', credentials).then(({data}) => {
        env.set('access_token', 'Bearer ' + data.access_token)
        env.set('refresh_token', data.refresh_token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Api

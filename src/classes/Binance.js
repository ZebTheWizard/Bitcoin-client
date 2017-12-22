/* global axios */
class Binance {
  constructor () {
    this.state = {
      stream: 'wss://stream.binance.com:9443/ws/',
      symbol: 'btcusdt',
      channel: 'kline_1m',
      api: 'https://www.binance.com/api/v1/',
      ws: ''
    }
  }

  set (options) {
    Object.keys(options).forEach(key => {
      this.state[key] = options[key]
    })
    return this
  }

  _listen () {
    console.log('_listen')
    this.state.ws = new WebSocket(this.state.stream + this.state.symbol + '@' + this.state.channel)
  }

  _objToUrl (obj) {
    let url = '?'
    for (var key in obj) {
      if (url !== '') url += '&'
      url += key + '=' + encodeURIComponent(obj[key])
    }
    return url
  }

  fetch (endpoint, options) {
    options.symbol = options.symbol.toUpperCase()
    return new Promise((resolve, reject) => {
      axios.get(this.state.api + endpoint + this._objToUrl(options)).then(({data}) => {
        if (endpoint === 'klines') {
          for (var i = 0; i < data.length; i++) {
            let t = data[i]
            let obj = {
              times: {start: t[0], close: t[6]},
              prices: {open: t[1], high: t[2], low: t[3], close: t[4]},
              volumes: {base: t[5], quote: t[7], takerBase: t[9], takerQuote: t[10]},
              trades: t[8],
              ignore: t[11]
            }
            data[i] = obj
          }
        }
        resolve(data)
      })
    })
  }

  listen (func) {
    if (!this.state.ws) this._listen()
    this.state.ws.addEventListener('message', function (event) {
      let data = JSON.parse(event.data)
      let d = data
      data.event = d.e
      if (d.e === 'trade') {
        data.times = {event: d.E, trade: d.T}
        data.symbol = d.s
        data.price = d.p
        data.quantity = d.q
        data.isMarketMaker = d.m
        data.ignore = d.M
        data.ids = {trade: d.t, buyer: d.b, seller: d.a}
      }

      if (d.e === 'kline') {
        let d = data.k
        data.kline = {
          times: {close: d.T, start: d.t},
          symbol: d.s,
          interval: d.i,
          tradeIDs: {first: d.f, last: d.L},
          prices: {open: d.o, close: d.c, high: d.h, low: d.l},
          volumes: {base: d.v, quote: d.q, takerBase: d.V, takerQuote: d.Q},
          trades: d.n,
          isClosed: d.x,
          ignore: d.B
        }
      }

      func(data)
    })
  }
  // get () {
  //   if (!this.state.ws) this.listen()
  //   return new Promise((resolve, reject) => {
  //     this.state.ws.onmessage = (event) => {
  //       let data = JSON.parse(event.data)
  //       let d = data
  //       data.event = d.e
  //       if (d.e === 'trade') {
  //         data.time = {event: d.E, trade: d.T}
  //         data.symbol = d.s
  //         data.price = d.p
  //         data.quantity = d.q
  //         data.isMarketMaker = d.m
  //         data.ignore = d.M
  //         data.id = {trade: d.t, buyer: d.b, seller: d.a}
  //       }
  //
  //       if (d.e === 'kline') {
  //         let d = data.k
  //         data.kline = {
  //           time: {close: d.T, start: d.t},
  //           symbol: d.s,
  //           interval: d.i,
  //           tradeID: {first: d.f, last: d.L},
  //           price: {open: d.o, close: d.c, high: d.h, low: d.l},
  //           volume: {base: d.v, quote: d.q, takerBase: d.V, takerQuote: d.Q},
  //           trades: d.n,
  //           isClosed: d.x,
  //           ignore: d.B
  //         }
  //       }
  //       resolve(data)
  //     }
  //   })
  // }
}

export default new Binance()

## Getting Started
```coffee
import Binance from '../classes/Binance'
```

## configure
The wrapper will use the default settings or you can use your own settings.

```coffee
Binance.set({
  symbol: 'btcusdt',
  channel: 'kline_1m'
})
```

## fetch
Fetch existing data for a specific coin. You Must include the symbol property in the options.

```coffee
Binance.fetch('klines', {
  symbol: 'btcusdt',
  interval: '1m',
  limit: 5
})
.then (data => {
  # do something
})
```

`Binance.fetch` returns an array of objects. Each object will contain the following data.

```coffee
{
  ignore: String,
  prices: {
    close: String,
    high: String,
    low: String,
    open: String
  },
  times: {
    close: Number,
    start: Number
  },
  trades: Number,
  volumes: {
    base: String,
    quote: String,
    takerBase: String,
    takerQuote: String
  }
}
```


## listen
Listen to the web socket channel for a specific coin. Specify the settings using the set method.

```coffee
Binance.set({
  symbol: 'btcusdt',
  channel: 'kline_1m'
}).listen(data => {
  console.log(data)
})
```

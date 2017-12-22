<template lang="html">
  <div id="chart"></div>
</template>

<script>
import Binance from '../classes/Binance'
export default {
  mounted () {
    google.charts.load('current', {
      'packages':['corechart']
    })
    google.charts.setOnLoadCallback(this.draw)

    Binance.fetch('klines', {symbol: 'BTCUSDT', interval: '1m', limit: 5}).then(data => {
      console.log(data)
    })
    Binance.listen(data => {
      // console.log(typeof data, data)
    })
  },
  methods: {
    draw () {
      let el = document.getElementById('chart')
      var data = google.visualization.arrayToDataTable([
        ['Mon', 0, 28, 38, 45],
        ['Tue', 31, 38, 55, 66],
        ['Wed', 50, 55, 77, 80],
        ['Thu', 77, 77, 66, 50],
        ['Fri', 68, 66, 22, 15]
        // Treat first row as data as well.
      ], true);

      var options = {
        legend:'none'
      };

      var chart = new google.visualization.CandlestickChart(el);

      chart.draw(data, options);
    }
  }
}
</script>

<style lang="css">
</style>

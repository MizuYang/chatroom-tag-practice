<template>
  <h2>查看手機目前是直向或橫向</h2>

  <h3>
    {{ resolut }}
  </h3>
</template>

<script>
export default {
  data () {
    return {
      resolut: '螢幕橫縱向偵測'
    }
  },
  mounted () {
    // window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
    //   if (window.orientation === 180 || window.orientation === 0) {
    //     this.resolut = '目前您的螢幕為縱向！'
    //   }
    //   if (window.orientation === 90 || window.orientation === -90) {
    //     this.resolut = '目前您的螢幕為橫向！'
    //   }
    // }, false)

    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
      if (window.orientation === 180 || window.orientation === 0) {
        alert('目前您的螢幕為縱向！')
      }
      if (window.orientation === 90 || window.orientation === -90) {
        alert('目前您的螢幕為橫向！')
      }
    }, false)
  }
}
</script>

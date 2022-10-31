<template>
  <h2>查看手機目前是直向或橫向</h2>

  <h3 ref="resolut"></h3>
</template>

<script>

window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
  if (window.orientation === 180 || window.orientation === 0) {
    this.$refs.resolut.textContent = '目前您的螢幕為縱向！'
  }
  if (window.orientation === 90 || window.orientation === -90) {
    this.$refs.resolut.textContent = '目前您的螢幕為橫向！'
  }
}, false)
export default {
}
</script>

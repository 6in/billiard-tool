<template>
    <div>
        <svg width="400" height="400">
            <circle :cx="ob.cx" :cy="ob.cy" :r="r" fill="yellow"/>
            <circle :cx="cx" :cy="cy" :r="r" fill="white"/>

            <line :x1="cx" :y1="400" :x2="cx" :y2="0"  stroke="black" stroke-width="1"></line>

            <line :x1="cx" :y1="cy" :x2="ob.cx" :y2="ob.cy"  stroke="black" stroke-width="1"></line>

            <line id="ob_center" :x1="ob.cx" :y1="ob.cy - r" :x2="ob.cx" :y2="ob.cy + r"  stroke="black" stroke-width="1"></line>

            <circle :cx="cp.cx" :cy="cp.cy" :r="4" fill="black"/>
            <text x="100" y="30" font-size="30" fill="#ffffff">角度: {{ dispDegree }} 度</text>

        </svg>
    </div>
</template>

<script>

export default {
  name: 'ContactPoint',
  data () {
    return {
      r: 80,
      cx: 200,
      cy: 300
    }
  },
  props: {
    degree: {
      type: Number,
      'default': 0
    },
    dispDegree: {
      type: Number,
      'default': 0.0
    }
  },
  computed: {
    ob () {
      const vm = this

      const deg = 90 - vm.degree
      const rad = deg * Math.PI / 180

      const cx = vm.cx + vm.r * 2 * Math.cos(rad)
      const cy = vm.cy - vm.r * 2 * Math.sin(rad)

      return { cx, cy }
    },
    cp () {
      const vm = this

      const deg = 90 - vm.degree
      const rad = deg * Math.PI / 180

      const cx = vm.cx + vm.r * Math.cos(rad)
      const cy = vm.cy - vm.r * Math.sin(rad)

      return { cx, cy }
    }
  }
}

</script>

<style scoped>
svg {
    background: gray;
}
</style>

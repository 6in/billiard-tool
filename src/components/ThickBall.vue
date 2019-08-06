<template>
    <div>
        <svg width="400" height="400">
            <circle :cx="cx" :cy="cy" :r="r" fill="rgba(255,255,255,0.5)"/>
            <circle :cx="ob.cx" :cy="cy" :r="r" fill="rgba(255,255,0,0.5)"/>

            <line v-if="isShowRight" id="cb_left_edge" :x1="cx-r" :y1="0" :x2="cx - r" :y2="400"  stroke="black" stroke-width="1" stroke-dasharray="8 8"></line>
            <line id="cb_center" :x1="cx" :y1="0" :x2="cx" :y2="400"  stroke="black" stroke-width="1"></line>

            <line id="ob_center" :x1="ob.cx" :y1="200 - r" :x2="ob.cx" :y2="200 + r"  stroke="black" stroke-width="1"></line>

            <line v-if="!isShowRight" id="cb_right_edge" :x1="cx+r" :y1="0" :x2="cx+r" :y2="400"  stroke="black" stroke-width="1" stroke-dasharray="8 8"></line>
            <line v-if="isShowRight" id="ob_right_edge" :x1="ob.cx+r" :y1="0" :x2="ob.cx+r" :y2="400"  stroke="black" stroke-width="1" stroke-dasharray="8 8"></line>
            <line v-if="!isShowRight" id="ob_left_edge" :x1="ob.cx-r" :y1="0" :x2="ob.cx-r" :y2="400"  stroke="black" stroke-width="1" stroke-dasharray="8 8"></line>

            <circle id="cp" :cx="cp.cx" :cy="200" :r="4" fill="black"/>

            <rect :x="tap.x" :y="300" :width="tap.w" :height="100" fill="white" />

            <line
              id="ob_lhs"
              :x1="ob.cx - halfLine.x"
              :y1="200 - halfLine.y"
              :x2="ob.cx - halfLine.x "
              :y2="200 + halfLine.y"
              stroke="black"
              stroke-width="1"
              stroke-dasharray="2 2"></line>
            <line
              id="ob_lhs"
              :x1="ob.cx + halfLine.x"
              :y1="200 - halfLine.y"
              :x2="ob.cx + halfLine.x "
              :y2="200 + halfLine.y"
              stroke="black"
              stroke-width="1"
              stroke-dasharray="2 2"></line>

            <line
              id="gb_lhs"
              :x1="cx - halfLine.x"
              :y1="cy - halfLine.y"
              :x2="cx - halfLine.x "
              :y2="cy + halfLine.y"
              stroke="black"
              stroke-width="1"
              stroke-dasharray="2 2"></line>
            <line
              id="gb_rhs"
              :x1="cx + halfLine.x"
              :y1="cy - halfLine.y"
              :x2="cx + halfLine.x "
              :y2="cy + halfLine.y"
              stroke="black"
              stroke-width="1"
              stroke-dasharray="2 2"></line>

            <text x="100" y="30" font-size="30" fill="#ffffff">厚み: {{ thickPercent }} %</text>

        </svg>
    </div>
</template>

<script>

export default {
  name: 'ThickBall',
  data () {
    return {
      r: 80,
      cx: 200,
      cy: 200,
      thickPercent: 0
    }
  },
  props: {
    degree: {
      type: Number,
      'default': 0
    },
    tapSize: {
      type: String,
      'default': '12'
    }
  },
  computed: {
    ob () {
      const vm = this

      const deg = 90 - vm.degree
      const rad = deg * Math.PI / 180

      const cx = vm.cx + vm.r * 2 * Math.cos(rad)
      const cy = vm.cy - vm.r * 2 * Math.sin(rad)
      vm.emitThickPercent({cx, cy})
      return { cx, cy }
    },
    cp () {
      const vm = this

      const deg = 90 - vm.degree
      const rad = deg * Math.PI / 180

      const cx = vm.cx + vm.r * Math.cos(rad)
      const cy = vm.cy - vm.r * Math.sin(rad)

      return { cx, cy }
    },
    isShowRight () {
      const vm = this
      return vm.ob.cx < vm.cx
    },
    tap () {
      const vm = this
      const w = Number(vm.tapSize) * (vm.r * 2) / 57.0

      return { x: 200 - w / 2.0, w }
    },
    halfLine () {
      const vm = this
      const y = Math.sqrt(Math.abs(vm.r * vm.r - (vm.r / 2) * (vm.r / 2)))
      return {
        x: vm.r / 2.0,
        y: y
      }
    }
  },
  methods: {
    emitThickPercent (ob) {
      const vm = this
      let lhs = 0
      let rhs = 0
      // オブジェクトボールが左側にあるなら
      if (ob.cx < vm.cx) {
        rhs = ob.cx + vm.r
        lhs = vm.cx - vm.r
      }
      // オブジェクトボールが右側にあるなら
      if (vm.cx < ob.cx) {
        rhs = vm.cx + vm.r
        lhs = ob.cx - vm.r
      }
      const value = Math.floor(((rhs - lhs) / (vm.r * 2)) * 100)
      vm.thickPercent = value
      vm.$emit('thickPercent', value)
    }

  }
}

</script>

<style scoped>
svg {
    background: gray;
}
</style>

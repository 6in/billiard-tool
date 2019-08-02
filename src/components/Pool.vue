<template>
    <div>
        <svg ref="svg" width=400 height=800>

            <g>
                <line :x1="200" :y1="0" :x2="200" :y2="800" stroke="lightgray" stroke-width="1"></line>
                <line :x1="200-block" :y1="0" :x2="200-block" :y2="800" stroke="lightgray" stroke-width="1"></line>
                <line :x1="200+block" :y1="0" :x2="200+block" :y2="800" stroke="lightgray" stroke-width="1"></line>

                <line :x1="0" :y1="400-block" :x2="400" :y2="400-block" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400-block*2" :x2="400" :y2="400-block*2" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400-block*3" :x2="400" :y2="400-block*3" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400" :x2="400" :y2="400" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400+block" :x2="400" :y2="400+block" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400+block*2" :x2="400" :y2="400+block*2" stroke="lightgray" stroke-width="1"></line>
                <line :x1="0" :y1="400+block*3" :x2="400" :y2="400+block*3" stroke="lightgray" stroke-width="1"></line>

                <circle v-for="(pocket,index) in pockets"
                  ref="pocket" v-bind:key="index" :cx="pocket.x" :cy="pocket.y"
                  :r="r * 5" fill="rgba(0,0,255,0.3)"/>

            </g>

            <circle ref="cb2" id="cb" :cx="cb.cx" :cy="cb.cy" :r="r*4" fill="rgba(0,0,0,0)"/>
            <circle ref="cb" id="cb" :cx="cb.cx" :cy="cb.cy" :r="r" style="fill: white"/>

            <circle ref="ob2" id="ob" :cx="ob.cx" :cy="ob.cy" :r="r*4" fill="rgba(0,0,0,0)"/>
            <circle ref="ob" id="ob" :cx="ob.cx" :cy="ob.cy" :r="r" fill="yellow"/>

            <circle ref="gb" id="gb" :cx="gb.cx" :cy="gb.cy" :r="r" fill="green" stroke="black"/>

            <line :x1="pk.cx" :y1="pk.cy" :x2="ob.cx" :y2="ob.cy" stroke="black" stroke-width="1"></line>

            <line :x1="gb.cx" :y1="gb.cy" :x2="cb.cx" :y2="cb.cy" stroke="black" stroke-width="1"></line>

            <line :x1="ob.cx" :y1="ob.cy" :x2="gb.cx" :y2="gb.cy" stroke="black" stroke-width="1"></line>
            <line :x1="gb.cx" :y1="gb.cy" :x2="gb2.cx" :y2="gb2.cy" stroke="black" stroke-width="1"></line>
            <line :x1="tan.x1" :y1="tan.y1" :x2="tan.x2" :y2="tan.y2" stroke="white" stroke-width="1"></line>

            <g v-if="ob2cb_disp">
                <line :x1="ob.cx" :y1="ob.cy" :x2="cb.cx" :y2="cb.cy" stroke="blue" stroke-width="1"></line>
            </g>

            <g v-if="drag.obj != null && drag.obj.id == 'cb'">
                <line :x1="cb.cx" :y1="0" :x2="cb.cx" :y2="800" stroke="pink" stroke-width="1" stroke-dasharray="8 8"></line>
                <line :x1="0" :y1="cb.cy" :x2="400" :y2="cb.cy" stroke="pink" stroke-width="1" stroke-dasharray="8 8"></line>
            </g>
            <g v-if="drag.obj != null && drag.obj.id == 'ob'">
                <line :x1="ob.cx" :y1="0" :x2="ob.cx" :y2="800" stroke="pink" stroke-width="1" stroke-dasharray="8 8"></line>
                <line :x1="0" :y1="ob.cy" :x2="400" :y2="ob.cy" stroke="pink" stroke-width="1" stroke-dasharray="8 8"></line>
            </g>

        </svg>
    </div>
</template>

<script>
export default {
  name: 'pool',
  data () {
    return {
      title: 'this is pool',
      drag: {
        obj: null,
        offsetX: 0,
        offsetY: 0
      },
      ob2cb_disp: true,
      block: 400.0 / 4.0
    }
  },
  props: {
    r: {
      type: Number
    },
    pk: {
      type: Object
    },
    cb: {
      type: Object
    },
    ob: {
      type: Object
    }
  },
  computed: {
    gb () {
      const vm = this
      const rad = vm.getRadianOb(vm.ob, vm.pk) + Math.PI

      const cx = vm.ob.cx + (vm.r * 2) * Math.cos(rad)
      const cy = vm.ob.cy + (vm.r * 2) * Math.sin(rad)

      const rad2 = vm.getRadian(vm.cb.cx, vm.cb.cy, cx, cy) + Math.PI

      const deg1 = vm.toDegree(rad)
      let deg2 = vm.toDegree(rad2)
      let deg3 = deg1 - deg2
      // if (vm.cb.cy < cy) {
      //     deg3 = deg1 + 360 - deg2;
      // }

      vm.$emit('degreeGB2CB', Math.floor(deg3))
      vm.$emit('setGB', {cx, cy})

      return {
        cx: cx,
        cy: cy
      }
    },
    gb2 () {
      const vm = this
      const rad = vm.getRadianOb(vm.ob, vm.pk) + Math.PI

      const cx = vm.ob.cx + (vm.r * 10) * Math.cos(rad)
      const cy = vm.ob.cy + (vm.r * 10) * Math.sin(rad)

      return {
        cx: cx,
        cy: cy
      }
    },
    tan () {
      const vm = this
      let rad = vm.getRadianOb(vm.ob, vm.pk) + Math.PI

      // GBの中心
      const cx = vm.ob.cx + (vm.r * 2) * Math.cos(rad)
      const cy = vm.ob.cy + (vm.r * 2) * Math.sin(rad)

      // GBの中心を通る直角のライン
      rad -= Math.PI / 2

      const x1 = cx + (vm.r * 20) * Math.cos(rad)
      const y1 = cy + (vm.r * 20) * Math.sin(rad)

      // 180度
      rad += Math.PI

      const x2 = cx + (vm.r * 20) * Math.cos(rad)
      const y2 = cy + (vm.r * 20) * Math.sin(rad)

      return { x1, y1, x2, y2 }
    },
    pockets () {
      const vm = this
      const pockets = []

      for (let y = 0; y < 3; y++) {
        let offsetY = 0
        switch (y) {
          case 0:
            offsetY = vm.r
            break
          case 1:
            offsetY = 0
            break
          case 2:
            offsetY = -vm.r
        }
        for (let x = 0; x < 2; x++) {
          let offsetX = vm.r - x * vm.r * 2
          pockets.push({ x: x * 400 + offsetX, y: y * 400 + offsetY })
        }
      }
      return pockets
    }

  },
  mounted () {
    const vm = this

    const { svg, cb, ob, cb2, ob2 } = vm.$refs

    svg.addEventListener('mousemove', e => vm.mouseMove(e), false)
    svg.addEventListener('touchmove', e => vm.mouseMove(e), false)
    svg.addEventListener('mouseup', e => vm.mouseUp(e), false)
    svg.addEventListener('touchend', e => vm.mouseUp(e), false)

    vm.moveable(cb)
    vm.moveable(ob)
    vm.moveable(cb2)
    vm.moveable(ob2)

    vm.$refs.pocket.forEach(pk => {
      pk.addEventListener('mousedown', e => vm.onSelectPocket(e))
      pk.addEventListener('touchstart', e => vm.onSelectPocket(e))
    })
  },
  methods: {
    moveable (elem) {
      const vm = this
      elem.addEventListener('mousedown', e => vm.mouseDown(e), false)
      elem.addEventListener('touchstart', e => vm.mouseDown(e), false)
      elem.addEventListener('mousemove', e => vm.mouseMove(e), false)
      elem.addEventListener('touchmove', e => vm.mouseMove(e), false)
      elem.addEventListener('mouseup', e => vm.mouseUp(e), false)
      elem.addEventListener('touchend', e => vm.mouseUp(e), false)
    },
    getRadianOb (src, dst) {
      return Math.atan2(
        dst.cy - src.cy,
        dst.cx - src.cx
      )
    },
    getRadian (x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1)
    },
    toDegree (rad) {
      return rad * 180.0 / Math.PI
    },
    screenPointToSVGPoint (svg, elem, x, y) {
      const p = svg.createSVGPoint()
      p.x = x
      p.y = y
      const CTM = elem.getScreenCTM()
      return p.matrixTransform(CTM.inverse())
    },
    mousePointToSVGPoint (e) {
      return this.screenPointToSVGPoint(
        this.$refs.svg,
        this.drag.obj,
        e.clientX,
        e.clientY)
    },
    mouseDown (e) {
      const vm = this
      const event = (e.type === 'mousedown') ? e : e.changedTouches[0]
      const target = event.target
      if (target.tagName === 'circle') {
        vm.drag = {
          obj: target,
          offsetX: Number(target.getAttribute('cx')),
          offsetY: Number(target.getAttribute('cy'))
        }
      }
      event.preventDefault()
    },
    mouseUp (e) {
      this.drag.obj = null
      this.$emit('moveEnd')
    },
    mouseMove (e) {
      const vm = this
      if (!vm.drag.obj) { return }
      const event = (e.type === 'mousemove') ? e : e.changedTouches[0]
      const p = vm.mousePointToSVGPoint(event)
      vm.$emit('moveBall', { target: vm.drag.obj.id, cx: p.x, cy: p.y })
      event.preventDefault()
    },
    onSelectPocket (e) {
      const event = (e.type === 'mousedown') ? e : e.changedTouches[0]
      const target = event.target
      const vm = this
      vm.$emit('selectPocket', {
        x: target.getAttribute('cx'),
        y: target.getAttribute('cy')
      })
    }
  }
}
</script>

<style scoped>
svg {
  background: green;
}
</style>

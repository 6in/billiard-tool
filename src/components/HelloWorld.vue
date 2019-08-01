<template>
  <div class="hello">
    <flex-box direction="column">
      <flex-item>
        <flex-box align-items="center">
          <flex-item>
            タップ:{{ tapSize }}mm<input type="range" v-model="tapSize" min="12" max="20" style="width: 100px"/>
          </flex-item>
          <flex-item>
            見下ろし角度:<input type="range" v-model="phi" min="0.1" max="1.5" step="0.01" style="width: 100px"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'ズームON', unchecked: 'ズームOFF'}"
              v-model="zoom"
              :width="200"/>
          </flex-item>
        </flex-box>
      </flex-item>
      <flex-item>
        <flex-box>
          <flex-item>
            <pool
              ref="pool"
              :cb="cb"
              :ob="ob"
              :pk="pk"
              :r="r"
              @moveBall="onMoveBall"
              @degreeGB2CB="onDegreeGB2CB"
              @selectPocket="onSelectPocket"
              @setGB="onSetGB"
            ></pool>
          </flex-item>
          <flex-item>
            <flex-box direction="column">
              <flex-item style="width: 800px">
                <!-- 3D 表示 -->
                <gl-panel :cb="cb"
                :gb="gb"
                :ob="ob"
                :pk="pk"
                :degree="gb2cb"
                :lookAtOb="lookAtOb"
                :is-zoom="zoom"
                :phi="phi"></gl-panel>
              </flex-item>
              <flex-item>
                <flex-box>
                  <flex-item>
                    <!-- コンタクトポイント -->
                    <contact-point :degree="gb2cb"
                        :dispDegree="getDegree()" />
                  </flex-item>

                  <flex-item>
                    <thick-ball
                      :degree="gb2cb"
                      :tap-size="tapSize"
                      @thickPercent="onThickPercent" />
                  </flex-item>
                </flex-box>
              </flex-item>
            </flex-box>
          </flex-item>
        </flex-box>

      </flex-item>
    </flex-box>

  </div>
</template>

<script>
import Pool from './Pool'
import ContactPoint from './ContactPoint'
import FlexBox from './FlexBox'
import FlexItem from './FlexItem'
import ThickBall from './ThickBall'
import GlPanel from './GlPanel'

export default {
  name: 'HelloWorld',
  components: {
    ContactPoint,
    FlexBox,
    FlexItem,
    Pool,
    ThickBall,
    GlPanel
  },
  props: {
    msg: String
  },
  data () {
    return {
      pk: {
        cx: 9,
        cy: 9
      },
      ob: {
        cx: 100,
        cy: 100
      },
      cb: {
        cx: 200,
        cy: 500
      },
      gb: {
        cx: 200,
        cy: 500
      },
      r: 9,
      gb2cb: 0,
      thick: 0,
      tapSize: '12',
      zoom: false,
      lookAtOb: false,
      phi: '' + (Math.PI / 180 * 80)
    }
  },
  methods: {
    onMoveBall ({ target, cx, cy }) {
      // console.log({target,cx,cy});
      const vm = this
      vm[target].cx = cx
      vm[target].cy = cy
    },
    onDegreeGB2CB (deg) {
      const vm = this
      // console.log({deg})
      vm.gb2cb = deg
    },
    onThickPercent (thick) {
      this.thick = thick
    },
    getDegree () {
      const vm = this
      let deg = 0
      if (vm.gb2cb < -270) {
        deg = 360 + vm.gb2cb
      } else {
        deg = Math.abs(vm.gb2cb)
      }
      if (deg > 90) {
        deg = 360 - deg
      }
      return deg
    },
    onSelectPocket ({ x, y }) {
      this.pk.cx = x
      this.pk.cy = y
    },
    onSetGB (gb) {
      this.gb = gb
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
pool {
  width: 400px;
  height: 800px;
}
.hello {
  margin: 0px;
}

input {
  font-size: 20px;
  width: 30%;
  text-align: right;
}

span {
  font-size: 20px;
}
</style>

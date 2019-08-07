<template>
  <div class="hello">
    <flex-box direction="column">
      <flex-item>
        <flex-box align-items="center"  wrap="wrap">
          <flex-item>
            ボールサイズ:<input type="range" v-model="r" min="8.0" max="12" step="0.1" style="width: 100px"/>
          </flex-item>
          <flex-item>
            タップ:{{ tapSize }}mm<input type="range" v-model="tapSize" min="12" max="20" style="width: 100px"/>
          </flex-item>
          <flex-item>
            見下ろし角度:<input type="range" v-model="phi" min="0.1" max="1.5" step="0.01" style="width: 100px"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'ズームON', unchecked: 'ズームOFF'}"
              v-model="zoom"
              :width="100"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'GB表示', unchecked: 'GB非表示'}"
              v-model="showGB"
              :width="100"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'GB中心', unchecked: '的球中心'}"
              v-model="lookAtGb"
              :width="100"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'Train On', unchecked: 'Train Off'}"
              v-model="trainBalls"
              :width="100"/>
          </flex-item>
          <flex-item>
            <toggle-button :labels="{ checked: 'Guide On', unchecked: 'Guide Off'}"
              v-model="betweenLine"
              :width="100"/>
          </flex-item>
        </flex-box>
      </flex-item>
      <flex-item>
        <flex-box v-if="!isSmartPhone" >
          <flex-item>
            <!-- 2D 表示 -->
            <pool
              ref="pool"
              :cb="cb"
              :ob="ob"
              :pk="pk"
              :radius="r"
              @moveBall="onMoveBall"
              @degreeGB2CB="onDegreeGB2CB"
              @selectPocket="onSelectPocket"
              @setGB="onSetGB"
              @moveEnd="onMoveEnd"></pool>
          </flex-item>
          <flex-item>
            <flex-box direction="column">
              <flex-item style="width: 800px">
                <!-- 3D 表示 -->
                <gl-panel
                  ref="gl_panel"
                  :radius="r"
                  :cb="cb"
                  :gb="gb"
                  :ob="ob"
                  :pk="pk"
                  :degree="gb2cbDegree"
                  :lookAtGb="lookAtGb"
                  :is-zoom="zoom"
                  :showGB="showGB"
                  :phi="phi"
                  :trainBalls="trainBalls"
                  :betweenLine="betweenLine"></gl-panel>
              </flex-item>
              <flex-item>
                <flex-box>
                  <flex-item>
                    <!-- 厚み表示 -->
                    <thick-ball
                      :degree="gb2cbDegree"
                      :tap-size="tapSize"
                      @thickPercent="onThickPercent" />
                  </flex-item>
                  <flex-item>
                    <!-- コンタクトポイント -->
                    <contact-point :degree="gb2cbDegree"
                        :dispDegree="getDegree()" />
                  </flex-item>
                </flex-box>
              </flex-item>
            </flex-box>
          </flex-item>
        </flex-box>

        <flex-box v-if="isSmartPhone" direction="column">
          <flex-item>
            <flex-box>
              <flex-item>
                <!-- 2D 表示 -->
                <pool
                  ref="pool"
                  :cb="cb"
                  :ob="ob"
                  :pk="pk"
                  :radius="r"
                  @moveBall="onMoveBall"
                  @degreeGB2CB="onDegreeGB2CB"
                  @selectPocket="onSelectPocket"
                  @setGB="onSetGB"
                  @moveEnd="onMoveEnd"></pool>
              </flex-item>
              <flex-item>
                <flex-box direction="column">
                  <flex-item>
                    <!-- 厚み表示 -->
                    <thick-ball
                      :degree="gb2cbDegree"
                      :tap-size="tapSize"
                      @thickPercent="onThickPercent" />
                  </flex-item>
                  <flex-item>
                    <!-- コンタクトポイント -->
                    <contact-point :degree="gb2cbDegree"
                        :dispDegree="getDegree()" />
                  </flex-item>
                </flex-box>
              </flex-item>
            </flex-box>
          </flex-item>

          <flex-item style="width: 800px">
                <gl-panel
                  ref="gl_panel"
                  :radius="r"
                  :cb="cb"
                  :gb="gb"
                  :ob="ob"
                  :pk="pk"
                  :degree="gb2cbDegree"
                  :lookAtGb="lookAtGb"
                  :is-zoom="zoom"
                  :showGB="showGB"
                  :phi="phi"
                  :trainBalls="trainBalls"
                  :betweenLine="betweenLine"></gl-panel>
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
import isMobile from 'ismobilejs'

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
      isSmartPhone: isMobile.phone,
      r: '8.0',
      gb2cbDegree: 0,
      thick: 0,
      tapSize: '12',
      zoom: false,
      lookAtGb: true,
      showGB: true,
      phi: '' + (Math.PI / 180 * 80),
      trainBalls: false,
      betweenLine: true
    }
  },
  methods: {
    onMoveBall ({ target, cx, cy }) {
      // console.log({target,cx,cy});
      const vm = this
      const r = Number(vm.r)
      if (cx <= r) {
        cx = r
      }
      if (400 - r <= cx) {
        cx = 400 - r
      }
      if (cy <= r) {
        cy = r
      }
      if (800 - r <= cy) {
        cy = 800 - r
      }
      vm[target].cx = cx
      vm[target].cy = cy
    },
    onDegreeGB2CB (deg) {
      const vm = this
      // console.log({deg})
      vm.gb2cbDegree = deg
    },
    onThickPercent (thick) {
      this.thick = thick
    },
    getDegree () {
      const vm = this
      let deg = 0
      if (vm.gb2cbDegree < -270) {
        deg = 360 + vm.gb2cbDegree
      } else {
        deg = Math.abs(vm.gb2cbDegree)
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
    },
    onClickUpdate () {
      this.$refs.gl_panel.$forceUpdate()
    },
    onMoveEnd () {
      const vm = this
      vm.betweenLine = false
      window.setTimeout(() => {
        vm.betweenLine = true
      }, 0)
    },
    onClickRefresh () {
      this.$refs.gl_panel.refreshBalls()
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

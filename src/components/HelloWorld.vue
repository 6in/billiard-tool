<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <flex-box>
      <flex-item>
        <pool ref="pool"
          :cb="cb"
          :ob="ob"
          :pk="pk"
          :r="r"
          @moveBall="onMoveBall"
          @degreeGB2CB="onDegreeGB2CB"
          @selectPocket="onSelectPocket"></pool>
      </flex-item>
      <flex-item>
        <contact-point :degree="gb2cb" />
        <flex-box direction="column">
          <flex-item><span>角度:</span><input :value="getDegree()" /><span>度</span></flex-item>
        </flex-box>
      </flex-item>
      <flex-item>
        <thick-ball :degree="gb2cb" :tap-size="tapSize" @thickPercent="onThickPercent" />
        <flex-box direction="column">
          <flex-item><span>厚み:</span><input :value="thick" placeholder="edit me"><span>%</span></flex-item>
          <flex-item><span>タップ:</span><input v-model="tapSize" placeholder="edit me" /><span>mm</span></flex-item>
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

export default {
  name: 'HelloWorld',
  components: {
    ContactPoint,
    FlexBox,
    FlexItem,
    Pool,
    ThickBall
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
      r: 9,
      gb2cb: 0,
      thick: 0,
      tapSize: '12'
    }
  },
  methods: {
    onMoveBall ({target, cx, cy}) {
      // console.log({target,cx,cy});
      const vm = this
      vm[target].cx = cx
      vm[target].cy = cy
    },
    onDegreeGB2CB (deg) {
      const vm = this
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
    onSelectPocket ({x, y}) {
      this.pk.cx = x
      this.pk.cy = y
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
  font-size: 30px;
  width: 30%;
  text-align: right;
}

span {
  font-size: 30px;
}
</style>

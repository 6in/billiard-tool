<template>
  <div class="hello">
    <vgl-renderer antialias style="height: 400px;" :shadow-map-enabled="true" :disable-depth="false">
        <vgl-scene>
          <!-- 利用できるオブジェクト -->
          <vgl-sphere-geometry
              name="sphere"
              :radius="radius"
              :width-segments="widthSegments"
              :height-segments="heightSegments"></vgl-sphere-geometry>

          <!-- 台 -->
          <vgl-box-geometry name="box" :width="400" :height="1" :depth="800"></vgl-box-geometry>

          <!-- ライン -->
          <vgl-box-geometry name="long_line"  :width="1" :height="1" :depth="800"></vgl-box-geometry>
          <vgl-box-geometry name="short_line" :width="400" :height="1" :depth="1"></vgl-box-geometry>

          <!-- 色の種類 -->
          <vgl-mesh-standard-material name="ob" color="#ffff00"></vgl-mesh-standard-material>
          <vgl-mesh-standard-material name="cb" color="#ffffff"></vgl-mesh-standard-material>
          <vgl-mesh-lambert-material name="green" color="#009900"></vgl-mesh-lambert-material>
          <vgl-mesh-lambert-material name="gray" color="#000000"></vgl-mesh-lambert-material>
          <vgl-line-basic-material
                  name="line_g"
                  :linewidth="2.0"
                  color="#ffffff" ></vgl-line-basic-material>

          <!-- 実際にオブジェクトを配置 -->

          <!-- 的球 -->
          <vgl-mesh
            geometry="sphere"
            material="ob"
            color="#ff0000"
            :position="ob3d"
            cast-shadow receive-shadow></vgl-mesh>

          <!-- 手玉 -->
          <vgl-mesh
            geometry="sphere"
            material="cb"
            :position="cb3d"
            cast-shadow receive-shadow></vgl-mesh>

          <!-- GB -->
          <vgl-mesh v-if="showGB"
            geometry="sphere"
            material="cb"
            :position="gb3d"
            cast-shadow receive-shadow></vgl-mesh>

          <!-- トレイン表示 -->
          <vgl-group v-if="trainBalls">
            <vgl-mesh  v-for="(ball,i) in trainBalls3d"
              v-bind:key="i"
              geometry="sphere"
              material="ob"
              :position="ball"
              cast-shadow receive-shadow></vgl-mesh>
          </vgl-group>

          <!-- ガイドライン -->
          <vgl-mesh geometry="long_line" material="cb" :position="`-100 0.1 0`" ></vgl-mesh>
          <vgl-mesh geometry="long_line" material="cb" :position="`   0 0.1 0`" ></vgl-mesh>
          <vgl-mesh geometry="long_line" material="cb" :position="` 100 0.1 0`" ></vgl-mesh>

          <vgl-mesh v-for="i in 7" :key="i" geometry="short_line" material="cb" :position="`   0 0.1 ${-300 + (i-1) * 100}`" ></vgl-mesh>

          <!-- ビリヤード台 -->
          <vgl-mesh geometry="box" material="green" :position="`0 0 0`" receive-shadow ></vgl-mesh>

          <vgl-mesh geometry="box2" material="ob" :position="gb3d" :translate="`  `" :rotation="`0 0.5 0`" />

          <!-- ボール間のライン -->
          <vgl-group v-if="betweenLine">
            <vgl-geometry
              name="line_g"
              :position-attribute="gb2cbline"></vgl-geometry>
            <vgl-geometry
              name="line_pk2ob"
              :position-attribute="pk2obline"></vgl-geometry>
            <vgl-geometry
              name="line_gb2ob"
              :position-attribute="gb2obline"></vgl-geometry>
            <vgl-line geometry="line_g" material="line_g"></vgl-line>
            <vgl-line geometry="line_pk2ob" material="line_g"></vgl-line>
            <vgl-line geometry="line_gb2ob" material="line_g"></vgl-line>
          </vgl-group>

          <vgl-line geometry="test" material="line_g"></vgl-line>

          <!-- ライトの設定 -->
          <vgl-ambient-light color="#888888"></vgl-ambient-light>
          <vgl-directional-light position="100 100 100" cast-shadow></vgl-directional-light>

          <!-- 軸ヘルパー -->
          <!-- <vgl-axes-helper size=1000></vgl-axes-helper> -->
        </vgl-scene>

        <!-- カメラの設定 -->
        <vgl-perspective-camera :orbit-position="cameraPos" :orbit-target="lookAt"></vgl-perspective-camera>
    </vgl-renderer>

  </div>
</template>

<script>
export default {
  name: 'gl-panel',
  computed: {
    cameraPos () {
      const vm = this

      let target = vm.gb
      if (vm.lookAtOb) {
        target = vm.ob
      }

      const rad = -vm.getRadian(
        target.cx, target.cy,
        vm.cb.cx, vm.cb.cy)
      const rad3 = Math.PI / 2.0 + rad

      let dist = vm.getDistance(
        target.cx, target.cy,
        vm.cb.cx, vm.cb.cy) + vm.radius * 20

      if (vm.isZoom) {
        dist = vm.radius * 10
      }
      return `${dist} ${vm.phi} ${rad3}`
    },
    ob3d () {
      const vm = this
      const x = this.ob.cx - 200
      const z = this.ob.cy - 400
      return `${x} ${vm.radius} ${z}`
    },
    cb3d () {
      const vm = this
      const x = this.cb.cx - 200
      const z = this.cb.cy - 400
      return `${x} ${vm.radius} ${z}`
    },
    gb3d () {
      const vm = this
      const x = this.gb.cx - 200
      const z = this.gb.cy - 400
      return `${x} ${vm.radius} ${z}`
    },
    pk3d () {
      const vm = this
      const x = this.pk.cx - 200
      const z = this.pk.cy - 400
      return `${x} ${vm.radius} ${z}`
    },
    gb2cbline () {
      const vm = this

      let tgt = vm.gb
      if (vm.lookAtOb) {
        tgt = vm.ob
      }

      const ret = [
        tgt.cx - 200, vm.radius, tgt.cy - 400,
        this.cb.cx - 200, vm.radius, this.cb.cy - 400
      ].join(',')
      // console.log(`gb2cbline:${ret}`)
      return ret
    },
    pk2obline () {
      const vm = this
      const ret = [
        this.pk.cx - 200, vm.radius, this.pk.cy - 400,
        this.ob.cx - 200, vm.radius, this.ob.cy - 400
      ].join(',')
      console.log(`pk2obline:${ret}`)
      return ret
    },
    gb2obline () {
      const vm = this
      const ret = [
        this.gb.cx - 200, vm.radius, this.gb.cy - 400,
        this.ob.cx - 200, vm.radius, this.ob.cy - 400
      ].join(',')
      return ret
    },
    lookAt () {
      if (this.lookAtOb) {
        return this.ob3d
      } else {
        return this.gb3d
      }
    },
    trainBalls3d () {
      const vm = this

      // 的球からポケットまでの距離を計算
      const dist = vm.getDistance(vm.ob.cx, vm.ob.cy, vm.pk.cx, vm.pk.cy)
      // ボール何個分かを計算
      const balls = Math.floor(dist / (vm.radius * 2.0)) + 1
      // 的球からポケットまでの角度を計算
      const deg = Math.PI - vm.getRadian(vm.pk.cx, vm.pk.cy, vm.ob.cx, vm.ob.cy)

      // 的球を中心に、指定角度の方向へ、距離を伸ばしながらボールを配置する
      let targets = []
      for (let i = 0; i < balls; i++) {
        const r = i * vm.radius * 2
        targets.push({
          cx: vm.ob.cx + r * Math.cos(deg),
          cy: vm.ob.cy - r * Math.sin(deg)
        })
        // console.log(targets[targets.length - 1])
      }

      return targets.map(target => `${target.cx - 200} ${vm.radius} ${target.cy - 400}`)
    }

  },
  props: {
    ob: {
      type: Object
    },
    gb: {
      type: Object
    },
    cb: {
      type: Object
    },
    pk: {
      type: Object
    },
    degree: {
      type: Number
    },
    isZoom: {
      type: Boolean
    },
    lookAtOb: {
      type: Boolean,
      'default': false
    },
    phi: {
      type: String,
      'default': '0.1'
    },
    showGB: {
      type: Boolean
    },
    trainBalls: {
      type: Boolean,
      'default': false
    },
    betweenLine: {
      type: Boolean,
      'default': true
    }

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      x: -50,
      y: 10,
      z: -100,
      radius: 9,
      widthSegments: 50,
      heightSegments: 50,
      cameraSpherical: {
        radius: 800,
        phi: Math.PI / 180 * 80,
        theta: 1.0
      }
    }
  },
  methods: {
    getRadian (x1, y1, x2, y2) {
      // console.log(`x1=${x1},y1=${y1},x2=${x2},y2=${y2}`)
      return Math.atan2(y2 - y1, x2 - x1)
    },
    toDegree (rad) {
      return rad * 180.0 / Math.PI
    },
    getDistance (x, y, x2, y2) {
      return Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>

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
            <!-- <vgl-mesh-standard-material name="std3" color="#009900"></vgl-mesh-standard-material> -->
            <vgl-mesh-lambert-material name="gray" color="#000000"></vgl-mesh-lambert-material>

          <!-- 実際にオブジェクトを配置 -->
          <vgl-mesh
            geometry="sphere"
            material="ob"
            color="#ff0000"
            :position="ob3d"
            cast-shadow receive-shadow></vgl-mesh>

          <vgl-mesh
            geometry="sphere"
            material="cb"
            :position="cb3d"
            cast-shadow receive-shadow></vgl-mesh>

          <vgl-mesh
            geometry="sphere"
            material="cb"
            :position="gb3d"
            cast-shadow receive-shadow></vgl-mesh>

          <vgl-mesh geometry="long_line" material="cb" :position="`-100 0.1 0`" ></vgl-mesh>
          <vgl-mesh geometry="long_line" material="cb" :position="`   0 0.1 0`" ></vgl-mesh>
          <vgl-mesh geometry="long_line" material="cb" :position="` 100 0.1 0`" ></vgl-mesh>

          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1 -300`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1 -200`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1 -100`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1    0`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1  100`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1  200`" ></vgl-mesh>
          <vgl-mesh geometry="short_line" material="cb" :position="`   0 0.1  300`" ></vgl-mesh>

          <vgl-mesh geometry="box" material="green" :position="`0 0 0`" receive-shadow ></vgl-mesh>

          <vgl-geometry
            name="line_g"
            :position-attribute="gb2obline"></vgl-geometry>
          <vgl-line-dashed-material
                  name="line_g"
                  :dash-size="1.0"
                  :gap-size="1.0"
                  :linewidth="2.0"
                  color="#ffffff" ></vgl-line-dashed-material>
          <vgl-line geometry="line_g" material="line_g"></vgl-line>

          <!-- ライトの設定 -->
          <vgl-ambient-light color="#888888"></vgl-ambient-light>
          <vgl-directional-light position="100 100 100" cast-shadow></vgl-directional-light>

          <!-- 軸ヘルパー -->
          <vgl-axes-helper size=1000></vgl-axes-helper>
        </vgl-scene>

        <!-- カメラの設定 -->
        <vgl-perspective-camera :orbit-position="cameraPos" :orbit-target="gb3d"></vgl-perspective-camera>
    </vgl-renderer>

    <!-- <aside class="control-panel">
      <label>camera-r<input type="range" v-model="cameraSpherical.radius" min=*0* max="2000" /></label>
      <label>camera-p<input type="range" v-model="cameraSpherical.phi" min=*0* max="3" step="0.001" /></label>
      <label>zoom<input type="checkbox" v-model="isZoom" /></label>
    </aside> -->

  </div>
</template>

<script>
export default {
  name: 'gl-panel',
  computed: {
    cameraPos () {
      const vm = this
      // console.log({gb: vm.gb, cb: vm.cb})
      const rad = -vm.getRadian(
        vm.gb.cx, vm.gb.cy,
        vm.cb.cx, vm.cb.cy)
      const rad3 = Math.PI / 2.0 + rad
      // const rad2 = Math.PI / 180 * 45
      let dist = vm.getDistance(
        vm.gb.cx, vm.gb.cy,
        vm.cb.cx, vm.cb.cy) + vm.radius * 20

      if (vm.isZoom) {
        dist = vm.radius * 20
      }
      console.log(`r=${dist},rad=${vm.toDegree(rad)},rad3=${vm.toDegree(rad3)}`)

      return `${dist} ${vm.cameraSpherical.phi} ${rad3}`
    },
    ob3d () {
      const x = this.ob.cx - 200
      const z = this.ob.cy - 400
      return `${x} 10 ${z}`
    },
    cb3d () {
      const x = this.cb.cx - 200
      const z = this.cb.cy - 400
      return `${x} 10 ${z}`
    },
    gb3d () {
      const x = this.gb.cx - 200
      const z = this.gb.cy - 400
      return `${x} 10 ${z}`
    },
    gb2obline () {
      const ret = [
        this.gb.cx - 200, 10, this.gb.cy - 400,
        this.cb.cx - 200, 10, this.cb.cy - 400
      ].join(',')
      console.log(`gb2cb=${ret}`)
      return ret
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
    degree: {
      type: Number
    },
    isZoom: {
      type: Boolean
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

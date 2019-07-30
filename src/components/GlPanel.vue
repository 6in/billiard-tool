<template>
  <div class="hello">
    <vgl-renderer antialias style="height: 100vh;">
        <vgl-scene>
            <!-- 利用できるオブジェクト -->
            <vgl-sphere-geometry
                name="sphere"
                :radius="radius"
                :width-segments="widthSegments"
                :height-segments="heightSegments"></vgl-sphere-geometry>

            <!-- 台 -->
            <vgl-box-geometry name="box" :width="400" :height="1" :depth="800"></vgl-box-geometry>

            <!-- 色の種類 -->
            <vgl-mesh-standard-material name="std"
            color="#ffff00"></vgl-mesh-standard-material>
            <vgl-mesh-standard-material name="std2"
            color="#ffffff"></vgl-mesh-standard-material>
            <vgl-mesh-lambert-material name="std3"
            color="#009900"></vgl-mesh-lambert-material>

          <!-- 実際にオブジェクトを配置 -->
          <vgl-mesh
            geometry="sphere"
            material="std"
            color="#ff0000"
            :position="`${x} ${y} ${z}`"
            ></vgl-mesh>

          <vgl-mesh
            geometry="sphere"
            material="std2"
            :position="`${x+100} ${y} ${z}`"
            ></vgl-mesh>

          <vgl-mesh
            geometry="box"
            material="std3"
            :position="`0 -10 0`"
            ></vgl-mesh>

          <!-- ライトの設定 -->
          <vgl-ambient-light color="#888888"></vgl-ambient-light>
          <vgl-directional-light position="100 100 100"></vgl-directional-light>

          <!-- 軸ヘルパー -->
          <vgl-axes-helper size=1000></vgl-axes-helper>
        </vgl-scene>

        <!-- カメラの設定 -->
        <vgl-perspective-camera :orbit-position="cameraPos" orbit-target="-50 0 -100"
            position="500 500 300"
        ></vgl-perspective-camera>
    </vgl-renderer>

    <aside class="control-panel">
      <h3>Position</h3>
      <label>radius<input type="range" v-model="radius"></label>
      <label>y<input type="range" v-model="y"></label>
      <label>z<input type="range" v-model="z"></label>
      <label>camera-x<input type="range" v-model="camera.x" min=*0* max="2000"></label>
      <label>camera-z<input type="range" v-model="camera.z" min=*0* max="10" step="0.01"></label>
    </aside>

  </div>
</template>

<script>
export default {
  name: 'gl-panel',
  computed: {
    cameraPos () {
      const vm = this
      return `${vm.camera.x} ${vm.camera.y} ${vm.camera.z}`
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
      camera: {
        x: 800,
        y: 1.0,
        z: Math.PI / 2
      }
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

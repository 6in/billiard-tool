<template>
  <div class="flexbox"
       :style="{
         'align-content': alignContent,
         'align-items': alignItems,
         'flex-direction': direction,
         'flex-wrap': wrap,
         'justify-content': justifyContent
       }">
    <slot>
      <div>content 1</div>
      <div>content 2</div>
      <div>content 3</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'flex-box',
  props: {
    alignContent: {
      type: String,
      default: 'stretch'
    },
    alignItems: {
      type: String,
      default: 'stretch'
    },
    direction: {
      type: String,
      default: 'row'
    },
    wrap: {
      type: String,
      default: 'nowrap'
    },
    justifyContent: {
      type: String,
      default: 'flex-start'
    }
  }
}
</script>

<style scoped>
div.flexbox {
  display: flex;
}
</style>

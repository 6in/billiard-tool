<template>
  <div class="flexitem"
       :style="{
         'align-self': alignSelf,
         'flex-basis': basis,
         'flex-grow': grow,
         'flex-shrink': shrink,
         'margin-left': alignRight ? 'auto': false,
         'margin-top': marginTop ? marginTop : alignBottom ? 'auto': false,
         'order': order,
       }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flex-item',
  props: {
    alignSelf: {
      type: String,
      default: 'auto'
    },
    alignRight: {
      type: Boolean,
      default: false
    },
    alignBottom: {
      type: Boolean,
      default: false
    },
    marginTop: {
      type: String,
      default: undefined
    },
    basis: {
      type: String,
      default: 'auto'
    },
    grow: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 0
    },
    shrink: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
div.flex-row {
  display: flex;
  flex-direction: row;
}
</style>

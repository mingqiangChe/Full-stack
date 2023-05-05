<!-- form-item.vue -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
    <h1>{{ apps }}pp</h1>
  </div>
</template>
<script>
export default {
  name: "iFormItem",
  inject: ["apps"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  mounted() {
    console.log(this.apps, "ll")
  },
}
</script>

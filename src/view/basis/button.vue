<template>
  <button
    :class="type"
    class="basis-button"
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'BasisInput',
    props: {
      type: {
        default: 'primary'
      }
    }
  }
</script>

<style lang="scss">
  .basis-button {
    outline: none;
    border-radius: 4px;
    padding: 8px 16px;
    color: #fff;
    box-shadow: none;
    border: none;
    transition: all .3s;
    cursor: pointer;

    &.primary {
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background-color: #4874ed;
    }

    &:hover {
      background:  #2679b2;
    }
    &:active {
      background: #147bc0;
    }
  }
</style>
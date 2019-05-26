<template>
  <button
    class="basis-button"
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'BasisInput',
    mounted () {
      console.log(this)
    }
  }
</script>

<style lang="scss">
  .basis-button {
    outline: none;
    border-radius: 4px;
    padding: 8px 16px;
    background: #4679b2;
    color: #fff;
    box-shadow: none;
    border: none;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background:  #2679b2;
    }
    &:active {
      background: #147bc0;
    }
  }
</style>
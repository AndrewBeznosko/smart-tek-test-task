<template>
  <div class="control-panel">
    <div class="control-panel__row">
      <button class="control-panel__breed-btn" type="button">
        Породы
        <SvgIcon
          name="arrow-down"
          width="9"
          height="5"
        />
      </button>
    </div>
    <div class="control-panel__breeds">
      <BaseBadge name="Все пёсели" is-active />
      <div class="control-panel__breeds-list">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedsControlPanel',
};
</script>

<style lang="scss" scoped>
  .control-panel {
    &__breed-btn {
      color: #ffffff;
      padding: 2px 0;
      border-bottom: dashed 1px #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__breeds {
      padding-top: 30px;
    }
  }
</style>

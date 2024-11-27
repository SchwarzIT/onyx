<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-component-skeleton {
  @include layers.component() {
    /**
     * TODO: If necessary: Add skeleton stylings.
     */
  }
}
// #region layer
.onyx-component-name {
  @include layers.component() {
    /**
     * TODO: Add component stylings.
     */
    // #endregion layer

    /**
    * TODO: If necessary: Styles can be applied for specific densities.
    */
    // #region densities
    @include density.compact {
      // ...
    }
    @include density.default {
      // ...
    }
    @include density.cozy {
      // ...
    }
    // #endregion densities
  }
}
</style>

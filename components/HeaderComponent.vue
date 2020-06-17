<template>
  <div
    :class="[
      'tresor-header',
      'd-flex',
      'mb-3',
      inLoginView ? 'justify-content-center' : 'justify-content-between'
    ]"
  >
    <div
      :class="[
        'tresor-header__logo',
        { 'tresor-header__logo--login': inLoginView },
        'd-flex'
      ]"
    >
      <img
        class="tresor-icon mr-1"
        alt="Tresor Logo"
        src="@/assets/tresor-icon.png"
      />
      <h4
        class="mb-0 text-secondary font-weight-bold tresor-header__logo--text"
      >
        TRESOR
      </h4>
    </div>
    <b-button
      v-if="isLoggedIn"
      size="sm"
      variant="default"
      @click="onClickLogout"
    >
      <span class="mr-2">Log Out</span>
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton
  },
  props: {
    inLoginView: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    isLoggedIn() {
      // @ts-ignore
      return this.$auth.loggedIn
    }
  },
  methods: {
    async onClickLogout() {
      try {
        // @ts-ignore
        await this.$auth.logout('local')
        this.$router.push('/login')
      } finally {
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.tresor-header {
  &__logo {
    $p: &;
    & .tresor-icon {
      width: 30px;
      height: 30px;
    }
    &--login {
      .tresor-icon {
        width: 40px;
        height: 40px;
      }
      #{$p}--text {
        font-size: 26px;
      }
    }
    &--text {
      font-size: 20px;
      margin-top: 0.2rem;
    }
  }
}
</style>

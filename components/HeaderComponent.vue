<template>
  <div
    :class="[
      'tresor-header',
      'd-flex',
      inLoginView
        ? 'justify-content-center mb-4'
        : 'justify-content-between mb-3'
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
    <div v-if="isLoggedIn">
      <b-button size="sm" variant="default" href="/">
        <font-awesome-icon size="lg" :icon="['fas', 'list']" />
      </b-button>
      <b-button size="sm" variant="default" @click="$router.push('/profile')">
        <font-awesome-icon size="lg" :icon="['fas', 'user']" />
      </b-button>
      <b-button size="sm" variant="default" @click="onClickLogout">
        <b-spinner v-if="loadingLogOut" small label="Spinning"></b-spinner>
        <font-awesome-icon v-else size="lg" :icon="['fas', 'power-off']" />
      </b-button>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      loadingLogOut: false
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
      this.loadingLogOut = true
      try {
        // @ts-ignore
        await this.$auth.logout('local')
        this.$router.push('/login')
      } finally {
        this.loadingLogOut = false
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

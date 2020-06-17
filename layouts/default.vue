<template>
  <b-row
    :class="['layout-container', { 'layout-container--login': inLoginView }]"
    align-v="center"
    align-h="center"
    no-gutters
  >
    <b-col
      :md="layoutBreakPoints.md"
      :lg="layoutBreakPoints.lg"
      :xl="layoutBreakPoints.xl"
      :class="[inLoginView ? 'm-4' : 'm-3']"
    >
      <HeaderComponent :in-login-view="inLoginView" />
      <nuxt />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { BRow, BCol } from 'bootstrap-vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

interface BreakPoint {
  md: string
  lg: string
  xl: string
}
export default Vue.extend({
  components: {
    BRow,
    BCol,
    HeaderComponent
  },
  data() {
    return {
      currentRoute: '' as string,
      loginLayoutBreakPoints: {
        md: '7',
        lg: '6',
        xl: '4'
      } as BreakPoint,
      defaultLayoutBreakPoints: {
        md: '11',
        lg: '9',
        xl: '6'
      } as BreakPoint
    }
  },
  computed: {
    layoutBreakPoints(): BreakPoint {
      return this.inLoginView
        ? this.loginLayoutBreakPoints
        : this.defaultLayoutBreakPoints
    },
    inLoginView(): boolean {
      return this.currentRoute === 'login'
    }
  },
  watch: {
    $route(newValue) {
      this.setCurrentRoute(newValue.name)
    }
  },
  created() {
    this.setCurrentRoute(this.$route.name!)
  },
  methods: {
    setCurrentRoute(routeData: string) {
      this.currentRoute = routeData
    }
  }
})
</script>

<style lang="scss">
html {
  font-size: 16px;
}

.layout-container {
  min-height: 100vh;

  &--login {
    background-color: #222222;
  }
}
</style>

<template>
  <b-row class="layout-container" align-v="center" align-h="center" no-gutters>
    <b-col
      :md="layoutBreakPoints.md"
      :lg="layoutBreakPoints.lg"
      :xl="layoutBreakPoints.xl"
    >
      <HeaderComponent />
      <b-card no-body>
        <nuxt />
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { BRow, BCol, BCard } from 'bootstrap-vue'
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
    BCard,
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
      return this.currentRoute === 'login'
        ? this.loginLayoutBreakPoints
        : this.defaultLayoutBreakPoints
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

<style>
html {
  font-size: 16px;
}

body {
  background-color: #333333;
  height: 100vh;
}

#app {
  height: 100vh;
}
.layout-container {
  height: 100vh;
}
</style>

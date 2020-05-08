<template>
  <q-page class="q-px-md q-py-sm" :class="{ 'q-px-xl': $q.screen.gt.xs }">
    <q-space />
    <keep-alive>
      <component :is="getHome" />
    </keep-alive>
    <q-page-sticky
      v-if="getHome == 'app-account'"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Account from "../components/Account";
import SearchDisplay from "../components/SearchDisplay";
export default {
  name: "Customers",
  components: {
    appAccount: Account,
    appSearchDisplay: SearchDisplay
  },
  computed: {
    ...mapGetters(["getHome"])
  }
};
</script>

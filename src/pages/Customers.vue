<template>
  <q-page
    class=" q-px-md q-py-xl relative"
    :class="{ 'q-px-xl': $q.screen.gt.xs }"
    style="padding-top: 4.5rem"
  >
    <q-toolbar
      class=" search bg-primary q-py-md absolute"
      :class="{ 'q-px-xl': $q.screen.gt.xs }"
    >
      <app-search class="full-width" />
    </q-toolbar>

    <q-space />
    <keep-alive>
      <component :is="getHome" />
    </keep-alive>
    <keep-alive>
      <component :is="modal" />
    </keep-alive>
    <q-page-sticky
      v-if="getHome == 'app-account'"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="add" color="primary" @click="open(true)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Search from "../components/Search";
import Account from "../components/Account";
import SearchDisplay from "../components/SearchDisplay";
import AddAccountMobile from "../components/AddAccountMobile";
import AddAccountWeb from "../components/AddAccountWeb";
export default {
  name: "Customers",

  components: {
    appAccount: Account,
    appSearch: Search,
    appSearchDisplay: SearchDisplay,
    appAddAccountMobile: AddAccountMobile,
    appAddAccountWeb: AddAccountWeb
  },
  data: () => ({
    modal: "app-add-account-mobile"
  }),
  methods: {
    ...mapMutations({ open: "toggleDialogAdd" }),

    detectPlatform() {
      if (this.$q.platform.is.cordova) {
        this.modal = "app-add-account-mobile";
        console.log("mobile");
      } else if (this.$q.platform.is.desktop) {
        this.modal = "app-add-account-web";
        console.log("web");
      }
    }
  },
  computed: {
    ...mapGetters(["getHome"])
  },

  created() {
    this.detectPlatform();
  }
};
</script>

<style lang="scss" scoped>
.search {
  top: 0;
  left: 0;
  z-index: 3;

  @media (min-width: 700px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}
</style>

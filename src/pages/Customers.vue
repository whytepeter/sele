<template>
  <q-page class="q-px-md q-py-sm" :class="{ 'q-px-xl': $q.screen.gt.xs }">
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
import Account from "../components/Account";
import SearchDisplay from "../components/SearchDisplay";
import AddAccountMobile from "../components/AddAccountMobile";
import AddAccountWeb from "../components/AddAccountWeb";
export default {
  name: "Customers",

  components: {
    appAccount: Account,
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

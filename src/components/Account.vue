<template>
  <div class="relative">
    <transition
      enter-active-class="animated fadeIn delay-1s"
      leave-active-class="animated fadeOut "
      mode="out-in"
    >
      <div
        v-if="!accounts.length"
        class="text-grey-5 col text-center q-mt-md absolute-center"
      >
        <q-icon style="font-size: 5em;" name="mdi-account-plus" />

        <div class="text-h6">No Account</div>
      </div>
    </transition>
    <q-pull-to-refresh @refresh="refresh">
      <app-account-items :accounts="accounts" />
    </q-pull-to-refresh>
  </div>
</template>
<script>
import AccountItems from "./AccountItems";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    hello: {
      id: 10,
      bank: "first",
      accName: "Gracious Nicholas",
      accNumber: "0123456789"
    }
  }),
  components: {
    appAccountItems: AccountItems
  },
  methods: {
    ...mapActions(["refreshCustomers"]),
    refresh(done) {
      setTimeout(() => {
        this.refreshCustomers();
        done();
      }, 2000);
    }
  },
  computed: {
    ...mapGetters({ accounts: "getAccounts" })
  }
};
</script>

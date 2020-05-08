<template>
  <div>
    <q-pull-to-refresh @refresh="refresh">
      <app-account-items :accounts="accounts" />
    </q-pull-to-refresh>
  </div>
</template>
<script>
import AccountItems from "./AccountItems";
import { mapGetters } from "vuex";
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
    refresh(done) {
      setTimeout(() => {
        this.accounts.push(this.hello);
        done();
      }, 1000);
    }
  },
  computed: {
    ...mapGetters({ accounts: "getAccounts" })
  }
};
</script>

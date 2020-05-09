<template>
  <div>
    <div v-if="!accounts.length" class="text-grey-5 col text-center q-mt-md">
      <q-icon style="font-size: 5em;" name="mdi-account-plus" />
      <div class="text-h6">No Account</div>
    </div>
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

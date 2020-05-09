<template>
  <div class="col">
    <transition name="fade">
      <div v-if="show" class="col text-center q-py-md">
        <q-img src="~assets/sad.svg" style="height: 100px; max-width: 100px" />
        <div>
          <p class="text-grey-5 text-h5 q-mt-sm">
            Sorry there is no account with name
            <span class="text-grey-7 text-weight-medium">{{
              searchInput
            }}</span>
          </p>
        </div>
      </div>
    </transition>

    <div class="col">
      <app-account-items :accounts="accounts" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AccountItems from "./AccountItems";
export default {
  data: () => ({
    confirm: false
  }),

  components: {
    appAccountItems: AccountItems
  },
  computed: {
    ...mapGetters({
      accounts: "getSearch",
      searchInput: "getSearchInput",
      show: "getError"
    })
  },
  methods: {
    toggleError() {
      if (!this.accounts.length) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave {
}
.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>

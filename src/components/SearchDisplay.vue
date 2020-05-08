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
      <transition-group
        name="animate"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutLeft delay-1s"
        class="accountList"
        tag="ul"
      >
        <q-list v-for="(account, index) in accounts" :key="account.id">
          <q-item class="accountItem q-pr-none bg items-center justify-between">
            <q-item-section top thumbnail class="q-ml-none">
              <img
                :src="'statics/banks/' + account.bank + '.png'"
                :alt="account.bank"
                class="bankImg"
              />
            </q-item-section>

            <q-item-section>
              <div
                class=" row items-center"
                :class="{ 'col accountDetails': $q.screen.gt.xs }"
              >
                <q-item-label
                  :class="{
                    'ellipsis text-subtitle1 text-weight-medium ':
                      $q.screen.lt.sm
                  }"
                  class="accountDetails--name capitalize text-grey-9 text-h6 q-mr-md"
                  >{{ account.accName }}</q-item-label
                >

                <q-item-label
                  :class="{
                    'text-subtitle1 text-weight-bold ': $q.screen.lt.sm
                  }"
                  class="accountDetails--number text-grey-10 text-h6"
                  >{{ account.accNumber }}</q-item-label
                >
              </div>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
                <q-btn
                  @click="deleteAccount(index)"
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn
                  class="lt-sm q-mr-none"
                  size="12px"
                  flat
                  dense
                  round
                  icon="more_vert"
                >
                  <q-menu>
                    <q-list
                      style="min-width: 100px text-grey-8 text-weight-medium"
                    >
                      <q-item clickable v-close-popup>
                        <q-item-section>Edit</q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup>
                        <q-item-section @click="deleteAccount(index)"
                          >Delete</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-separator inset="item" />
        </q-list>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    confirm: false
  }),
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
    },
    deleteAccount(index) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.accounts.splice(index, 1);
          setTimeout(() => {
            this.$q.notify({
              type: "positive",
              color: "secondary",
              message: `Account deleted`
            });
          }, 1500);
        });
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

.bankImg {
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 80px;
    height: 50px;
    border-radius: 5px;
  }
}

.container {
  margin: 0 auto;
  width: 80%;
}
.accountList {
  padding: 0;
}

.accountItem {
  &:hover {
    background-color: $grey-2;
  }
}
.accountDetails {
  width: 100%;
  flex-wrap: nowrap;
  padding: 0 20px;
  &--name {
    width: 70%;
    white-space: nowrap;
  }
  &--number {
    width: 30%;
  }

  @media (max-width: 600px) {
    &--name {
      width: 100%;
    }
  }
}
</style>

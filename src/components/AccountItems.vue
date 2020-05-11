<template>
  <div class="col " :class="{ 'container ': $q.screen.gt.sm }">
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
                  'ellipsis text-subtitle1 text-weight-medium ': $q.screen.lt.sm
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
              <q-btn
                @click="open(index)"
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="edit"
              />
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
                      <q-item-section @click="open(index)">Edit</q-item-section>
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
    <keep-alive>
      <component :is="modal" :account="account" />
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import UpdateAccountMobile from "../components/UpdateAccountMobile";
import UpdateAccountWeb from "../components/UpdateAccountWeb";
export default {
  props: ["accounts"],
  components: {
    appUpdateAccountMobile: UpdateAccountMobile,
    appUpdateAccountWeb: UpdateAccountWeb
  },
  data: () => ({
    account: {},
    modal: "app-update-account-mobile",
    confirm: false
  }),
  computed: {
    ...mapGetters({ dialog: "getDialogUpdate" })
  },
  methods: {
    ...mapMutations({ openDialog: "toggleDialogUpdate" }),

    open(index) {
      this.openDialog(true);
      this.account = this.accounts[index];
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
              color: "primary",
              message: `Account deleted`
            });
          }, 1500);
        });
    },
    detectPlatform() {
      if (this.$q.platform.is.cordova) {
        this.modal = "app-update-account-mobile";
        console.log(this.modal);
      } else if (this.$q.platform.is.desktop) {
        this.modal = "app-update-account-web";
        console.log(this.modal);
      }
    }
  },
  created() {
    this.detectPlatform();
  }
};
</script>

<style lang="scss" scoped>
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

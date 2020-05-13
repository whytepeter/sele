<template>
  <q-page class="q-px-md q-py-sm" :class="{ 'q-px-xl': $q.screen.gt.xs }">
    <q-card flat class="my-card overflow-hidden q-mb-md">
      <q-card-section
        class=" my-card-transaction bg-primary text-white relative-position q-px-xs"
      >
        <!-- This icon is the big naira icon on the card -->
        <q-icon
          size="7em"
          name="img:statics/naira.svg"
          class="naira fixed rotate-135 "
        />
        <q-card-section class="q-pa-none q-mb-none row justify-between ">
          <div class="">
            <q-btn flat color="white" @click="hideBal">
              <div class="text-caption text-grey2 q-mr-sm">{{ hide }}</div>
              <q-icon size="xs" right :name="showIcon" />
            </q-btn>
          </div>
          <q-btn rounded flat icon="mdi-chart-bar" />
        </q-card-section>

        <q-card-section
          class=" row justify-between items-center q-pb-xs q-pt-xs"
        >
          <div class=" col-6 no-wrap q-mb-xs">
            <span class="text-grey-2 text-caption text-weight-medium">
              Total Gain
            </span>
            <div class="row no-wrap items-center">
              <q-icon
                size="sm"
                name="img:statics/naira.svg"
                class="q-mr-xs q-pb-xs"
              />
              <span class="text-h5 text-weight-bold">{{
                gain | currency
              }}</span>
            </div>
          </div>
          <div class="col-4 no-wrap">
            <span class="text-grey-2 text-caption text-weight-medium">
              Total Savings
            </span>
            <div class="row no-wrap items-center">
              <q-icon
                size="xs"
                name="img:statics/naira.svg"
                class="q-mr-xs q-pb-xs"
              />
              <span class="text-h6 text-weight-bold">{{
                savings | currency
              }}</span>
            </div>
          </div>
          <span
            v-if="$q.screen.lt.sm"
            class="custom-separator q-mx-auto q-my-xs bg-white"
          ></span>
          <div class="q-mt-sm items-center">
            <span class="text-grey-2 text-caption text-weight-medium q-mr-xs"
              >Total Expenses</span
            >
            <div class="col">
              <q-icon
                size="1rem"
                name="img:statics/naira.svg"
                class="q-mr-xs q-pb-xs"
              />
              <span class="text-subtitle2 text-weight-bold"
                >{{ expenses | currency }}
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- 
     The Transactions Items 
   -->

    <q-list
      v-for="(trans, index) in transactions"
      :key="trans.id"
      class="transaction-list"
    >
      <q-item
        @click="open(index)"
        active
        active-class="text-primary"
        clickable
        v-ripple
        class="accountItem  bg items-center justify-between"
      >
        <q-item-section avatar>
          <q-icon size="xl" name="img:statics/pos.svg" />
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="1"
            class="item-date text-no-wrap text-weight-medium text-grey-8"
            >{{ trans.date }}</q-item-label
          >
          <q-item-label caption lines="2">Transaction </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label lines="1" class="text-body1 text-green-14"
            >+{{ trans.dailyGain | currency }}
            <q-icon size=".8rem" class="text-green-14">
              <svg viewBox="0 0 29 26" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.8759 26H20.3977L15.8428 18.6857H8.91028V26H4.43213V18.6857H0V15.0286H4.43213V11.3714H0V7.7143H4.43213V1.52588e-05H8.91028L13.7105 7.7143H20.4331V1.52588e-05H24.8759V7.7143H29V11.3714H24.8759V15.0286H29V18.6857H24.8759V26ZM8.91028 15.0286H13.5653L11.2878 11.3714H8.91028V15.0286ZM20.4331 15.0286H18.2619L15.9862 11.3714H20.4331V15.0286ZM8.91028 7.55359L9.01036 7.7143H8.91028V7.55359Z"
                />
              </svg>
            </q-icon>
          </q-item-label>
          <q-item-label lines="1" class="text-body2 text-red"
            >-{{ trans.dailyExpenses | currency }}
            <q-icon size=".7rem" class="text-red">
              <svg viewBox="0 0 29 26" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.8759 26H20.3977L15.8428 18.6857H8.91028V26H4.43213V18.6857H0V15.0286H4.43213V11.3714H0V7.7143H4.43213V1.52588e-05H8.91028L13.7105 7.7143H20.4331V1.52588e-05H24.8759V7.7143H29V11.3714H24.8759V15.0286H29V18.6857H24.8759V26ZM8.91028 15.0286H13.5653L11.2878 11.3714H8.91028V15.0286ZM20.4331 15.0286H18.2619L15.9862 11.3714H20.4331V15.0286ZM8.91028 7.55359L9.01036 7.7143H8.91028V7.55359Z"
                />
              </svg>
            </q-icon>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset="item" />
    </q-list>
    <keep-alive>
      <component :is="modalView" :transaction="transaction" />
    </keep-alive>
    <keep-alive>
      <component :is="modalAdd" />
    </keep-alive>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="openAddTransaction(true)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ViewTransactionMobile from "../components/ViewTransactionMobile";
import ViewTransactionWeb from "../components/ViewTransactionWeb";
import AddTransactionWeb from "../components/AddTransactionWeb";
import AddTransactionMobile from "../components/AddTransactionMobile";
export default {
  name: "Transactions",
  components: {
    appViewTransactionMobile: ViewTransactionMobile,
    appViewTransactionWeb: ViewTransactionWeb,
    appAddTransactionWeb: AddTransactionWeb,
    appAddTransactionMobile: AddTransactionMobile
  },
  data: () => ({
    modalView: "app-view-transaction-mobile",
    modalAdd: "app-add-transaction-web",
    hide: "Hide",
    show: true,
    showIcon: "mdi-eye",
    transaction: {},
    gain: 0,
    savings: 0,
    expenses: 0
  }),

  methods: {
    ...mapMutations({
      openDialog: "toggleDialogTransaction",
      openAddTransaction: "toggleTransactionAdd",
      sumTransations: "sumTransactions"
    }),

    open(index) {
      this.openDialog(true);
      this.transaction = this.transactions[index];
    },

    hideBal() {
      if (this.show === true) {
        this.show = false;
        this.showIcon = "mdi-eye-off";
        this.hide = "Show";

        this.gain = "*****";
        this.savings = "*****";
        this.expenses = "*****";
      } else if (this.show === false) {
        this.show = true;
        this.showIcon = "mdi-eye";
        this.hide = "Hide";

        this.gain = this.summary.totalGain;
        this.savings = this.summary.totalSavings;
        this.expenses = this.summary.totalExpenses;
      }
    },

    detectPlatform() {
      if (this.$q.platform.is.cordova) {
        this.modalView = "app-view-transaction-mobile";
        this.modalAdd = "app-add-transaction-mobile";
      } else if (this.$q.platform.is.desktop) {
        this.modalView = "app-view-transaction-web";
        this.modalAdd = "app-add-transaction-web";
      }
    }
  },
  computed: {
    ...mapGetters({
      transactions: "getTransactions",
      summary: "getTransactionSumary"
    })
  },
  filters: {
    currency(value) {
      return value.toLocaleString();
    }

    // visible(value) {
    //   if (this.show === true) {
    //     return (value = "******");
    //   } else if (this.show === false) {
    //     return (value = value);
    //   }
    // }
  },
  created() {
    this.detectPlatform();
    this.sumTransations();
    this.gain = this.summary.totalGain;
    this.savings = this.summary.totalSavings;
    this.expenses = this.summary.totalExpenses;
  }
};
</script>
<style lang="scss" scoped>
.naira {
  opacity: 0.3;
  right: -30px;
  top: 110px;

  @media (min-width: 600px) {
    right: 0;
  }
}

.my-card {
  border-radius: 9px;
}
.my-card-transaction {
  @media (min-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }
}
.custom-separator {
  height: 1px;
  width: 100%;
  opacity: 0.3;
}

.transaction-list {
  max-width: 100%;
  padding: 8px 0;

  .q-item {
    padding: 8px 0;
  }

  @media (min-width: 600px) {
    right: 0;

    .q-item {
      padding: 8px 16px;
    }
  }

  .item-date {
    font-size: 1.2rem;
  }
}
</style>

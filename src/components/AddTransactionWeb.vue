<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="open" persistent>
      <q-card style="width: 400px" class="q-pb-sm">
        <q-linear-progress :value="100" color="primary" />
        <q-card-section class="row justify-center items-center q-pb-none">
          <div class="text-h6 text-grey-9">
            Add New Transaction
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="close(false)"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-sm">
            Daily Gain
          </div>
          <q-input
            type="number"
            v-model="transaction.dailyGain"
            outlined
            class="text-h6 text-grey-9 q-mb-sm"
          />

          <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-sm">
            Daily Savings
          </div>
          <q-input
            type="number"
            v-model="transaction.dailySavings"
            outlined
            class="text-h6 text-grey-9 q-mb-sm"
          />

          <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-sm">
            Daily Expenses
          </div>
          <q-input
            type="number"
            v-model="transaction.dailyExpenses"
            outlined
            class="text-h6 text-grey-9 q-mb-sm"
          />

          <q-file
            v-model="transaction.reciept"
            label="Upload Reciept"
            outlined
            use-chips
            multiple
            style="width: 100%"
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            unelevated
            :loading="loading"
            @click="simulateProgress"
            color="primary"
            label="Add Transaction"
            class="full-width q-py-xs"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: false,

      transaction: {
        date: "May 12, 2020",
        dailyGain: "",
        dailySavings: "",
        dailyExpenses: "",
        reciept: null
      }
    };
  },

  methods: {
    ...mapMutations({ close: "toggleTransactionAdd" }),

    getUrl(files) {
      return `http://localhost:4444/upload?count=${files.length}`;
    },
    //Loader
    simulateProgress() {
      // we set loading state
      this.loading = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false;
      }, 3000);
    }
  },
  computed: {
    ...mapGetters({ open: "getTransactionAdd" })
  }
};
</script>
<style lang="scss" scoped></style>

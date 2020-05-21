<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="open" persistent>
      <q-card style="width: 400px" class="q-pb-sm">
        <div v-if="!loading">
          <q-linear-progress :value="100" color="primary" />
        </div>
        <div v-else><q-linear-progress indeterminate /></div>
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
        <q-form @submit="addNewTransation">
          <q-card-section class="q-pb-none">
            <div
              class="text-right text-subtitle1 text-grey-9 text-weight-medium text-uppercase"
            >
              {{ transaction.date }}
            </div>

            <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-xs ">
              Daily Gain
            </div>
            <q-input
              type="number"
              v-model="transaction.dailyGain"
              outlined
              class="text-h6 text-grey-9 q-mb-xs"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Please add a gain']"
            />

            <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-xs">
              Daily Savings
            </div>
            <q-input
              type="number"
              v-model="transaction.dailySavings"
              outlined
              class="text-h6 text-grey-9 q-mb-xs"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Please add 0 if there\'s no saving '
              ]"
            />

            <div class="text-subtitle1 text-grey-9 text-weight-medium q-mb-xs">
              Daily Expenses
            </div>
            <q-input
              type="number"
              v-model="transaction.dailyExpenses"
              outlined
              class="text-h6 text-grey-9 q-mb-xs"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please add an expense'
              ]"
            />

            <q-file
              v-model="transaction.reciept"
              label="Upload Reciept"
              outlined
              use-chips
              multiple
              style="width: 100%"
              class="q-py-xs"
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              type="submit"
              unelevated
              color="primary"
              label="Add Transaction"
              class="full-width q-py-xs"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { date } from "quasar";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      transaction: {
        date: "",
        dailyGain: "",
        dailySavings: "",
        dailyExpenses: "",
        reciept: null
      }
    };
  },

  methods: {
    ...mapMutations({ close: "toggleTransactionAdd" }),
    ...mapActions(["addTransaction"]),

    //if files is not an image
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) must be an image`
      });
    },
    //reset form
    resetForm() {
      this.transaction.dailyGain = "";
      this.transaction.dailySavings = "";
      this.transaction.dailyExpenses = "";
      this.transaction.reciept = null;
    },
    addNewTransation() {
      this.transaction.reciept = null;
      this.addTransaction(this.transaction);
      //close the form
      this.close(false);
      //clear the fields
      this.resetForm();
    },

    getUrl(files) {
      return `http://localhost:4444/upload?count=${files.length}`;
    }
  },
  computed: {
    ...mapGetters({ open: "getTransactionAdd", loading: "getLoading" }),

    currentDate() {
      let timeStamp = Date.now();

      return date.formatDate(timeStamp, "MMM DD, YYYY");
    }
  },
  created() {
    this.transaction.date = this.currentDate;
  }
};
</script>
<style lang="scss" scoped></style>

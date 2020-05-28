<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="dialog" persistent position="bottom">
      <q-card style="width: 400px" class="q-pb-sm">
        <div v-if="!loading">
          <q-linear-progress :value="100" color="primary" />
        </div>
        <div v-else><q-linear-progress indeterminate /></div>
        <q-card-section class="row justify-center items-center q-pb-none">
          <div class="text-h6 ">Add New Account</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="closeForm"
          />
        </q-card-section>

        <q-form @submit="addNewCustomer">
          <q-card-section column>
            <div class="q-pa-sm row justify-between bg-grey-2 rounded-borders">
              <div class="col-4 col-sm-3">
                <img
                  :src="'statics/banks/' + account.bank + '.png'"
                  :alt="account.bank"
                  style="width: 80px; height: 50px; border: 1px solid #dddd"
                  class="rounded-borders"
                />
              </div>
              <div
                :class="{ 'select-container': empty }"
                class=" q-gutter-md col-8 col-sm-9 relative"
              >
                <q-select
                  v-model="account.bank"
                  :options="options"
                  label="Select bank"
                  @input="validBank"
                />
                <p
                  v-if="empty"
                  :class="{ 'warning-select': empty }"
                  class=" text-caption text-red-14 absolute"
                >
                  Please select a bank
                </p>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              outlined
              v-model="account.accName"
              label="Account Name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please add an account Name'
              ]"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              outlined
              v-model="account.accNumber"
              label="Account Number"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length === 10) ||
                  'Please number should be 10 digits',
                val => isNaN(val) !== true || 'Please input must be a number'
              ]"
            />
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              type="submit"
              unelevated
              color="primary"
              label="Add New Account"
              class="full-width"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      empty: false,

      options: [
        "Access",
        "Diamond",
        "Eco",
        "First",
        "Fidelity",
        "FCMB",
        "GTB",
        "Heritage",
        "Keystone",
        "Opay",
        "Polaris",
        "Stanbic",
        "Sterling",
        "UBA",
        "Unity",
        "Union",
        "WEMA",
        "Zenith"
      ],
      account: {
        bank: "default",
        accName: "",
        accNumber: ""
      }
    };
  },

  methods: {
    ...mapMutations({ close: "toggleDialogAdd" }),
    ...mapActions(["addCustomer"]),

    //close form
    closeForm() {
      this.close(false);
      this.resetForm();
    },
    //validate bank
    validBank() {
      if (this.account.bank !== "default") {
        this.empty = false;
      } else {
        this.empty = true;
      }
    },

    //reset form
    resetForm() {
      //clear fields
      this.account.bank = "default";
      this.account.accName = "";
      this.account.accNumber = "";
    },

    //add new account
    addNewCustomer() {
      if (this.account.bank !== "default") {
        this.validBank();

        this.addCustomer(this.account);
        this.close(false);
        this.resetForm();
      } else {
        this.validBank();
      }
    }
  },
  computed: {
    ...mapGetters({ dialog: "getDialogAdd", loading: "getLoading" })
  }
};
</script>
<style lang="scss" scoped>
.q-card {
  border-radius: 20px 20px 0 0;
}

.select-container {
  border: 1px solid red;

  .warning-select {
    top: 4.2rem;
  }
}
</style>

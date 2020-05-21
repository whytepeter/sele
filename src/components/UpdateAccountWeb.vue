<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 400px" class="q-pb-sm">
        <div v-if="!loading">
          <q-linear-progress :value="100" color="primary" />
        </div>
        <div v-else><q-linear-progress indeterminate /></div>
        <q-card-section class="row justify-center items-center q-pb-none">
          <div class="text-h6 ">Update Account</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="closeForm(false)"
          />
        </q-card-section>

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
            <div class=" q-gutter-md col-8 col-sm-9 relative">
              <q-select
                v-model="account.bank"
                :options="options"
                label="Select bank"
              />
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
              val => (val && val.length > 0) || 'Please add an acccount Number'
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
              val => (val && val.length > 0) || 'Please add an acccount Number'
            ]"
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            unelevated
            @click="editCustomer"
            color="primary"
            label="Update Account"
            class="full-width"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    account: Object
  },
  data() {
    return {
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
        "WEMA",
        "Zenith"
      ]
    };
  },

  methods: {
    ...mapMutations({ closeForm: "toggleDialogUpdate" }),
    ...mapActions({ update: "editCustomer" }),

    //update the account
    editCustomer() {
      if (this.account.bank !== "default") {
        this.update(this.account);
        this.closeForm(false);
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters({ dialog: "getDialogUpdate", loading: "getLoading" })
  }
};
</script>
<style lang="scss" scoped></style>

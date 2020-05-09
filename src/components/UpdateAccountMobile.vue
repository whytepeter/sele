<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="dialog" :persistent="persistent" position="bottom">
      <q-card style="width: 400px" class="q-pb-sm">
        <q-linear-progress :value="100" color="primary" />
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
            <div class="q-gutter-md col-8 col-sm-9">
              <q-select
                v-model="account.bank"
                :options="options"
                label="Select bank"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="account.accName" label="Account Name" />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="account.accNumber"
            label="Account Number"
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            unelevated
            :loading="loading"
            @click="simulateProgress"
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
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    account: Object
  },
  data() {
    return {
      loading: false,
      persistent: true,

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
    //Loader
    simulateProgress() {
      // we set loading state
      this.loading = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false;
      }, 3000);
    },

    close() {}
  },
  computed: {
    ...mapGetters({ dialog: "getDialogUpdate" })
  }
};
</script>
<style lang="scss" scoped></style>

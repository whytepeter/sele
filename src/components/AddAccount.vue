<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Bottom"
      icon="keyboard_arrow_down"
      color="primary"
      @click="open('bottom')"
    />

    <q-dialog v-model="dialog" :persistent="persistent">
      <q-card style="width: 400px" class="q-pb-sm">
        <q-card-section class="row justify-center items-center q-pb-none">
          <div class="text-h6 ">Add New Account</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md" style="max-width: 300px">
            <div class="q-gutter-md">
              <q-select
                filled
                v-model="account.bank"
                :options="options"
                label="Select bank"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            outline
            v-model="account.accName"
            label="Account Name"
            :dense="dense"
          />
          <q-space /><br />
          <q-input
            outline
            v-model="account.accNumber"
            label="Account Number"
            :dense="dense"
          />
        </q-card-section>
        <q-card-actions class="">
          <q-btn
            unelevated
            :loading="loading"
            @click="simulateProgress"
            color="primary"
            label="Add New Account"
            class="full-width"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      persistent: true,
      dialog: false,
      position: "center",
      options: [
        {
          label: "Access",
          value: "access"
        },
        {
          label: "GTB",
          value: "gtb"
        }
      ],
      account: {
        bank: "default",
        accName: "",
        accNumber: ""
      }
    };
  },

  methods: {
    open(position) {
      this.position = position;
      this.dialog = true;
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
  }
};
</script>

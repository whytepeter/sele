<template>
  <q-card
    flat
    class="my-card col bg-transparent justify-center full-width  text-grey-9"
    style="font-size: 1rem"
  >
    <q-card-section style="max-width: 400px" class="col q-mx-auto q-pa-none">
      <q-card-section class="text-center row justify-center">
        <div class="row items-center ">
          <q-icon size="3rem" name="img:statics/sele-logo.svg" class="naira" />
          <div class="q-ml-sm text-h4">esele</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pb-xs">
        <div class=" text-left text-h6 text-weight-bold q-mb-md">
          Reset Password
        </div>
        <div v-if="loading === true" class="fixed-top">
          <q-linear-progress indeterminate />
        </div>
        <q-input
          type="email"
          dense
          outlined
          v-model="user.email"
          placeholder="Email Address"
          class="q-mb-md text-subtitle1"
          ><template v-slot:prepend>
            <q-icon name="email" color="primary" />
          </template>
        </q-input>
      </q-card-section>
      <p class="text-caption text-red q-px-ms q-mb-xs">{{ error }}</p>
      <q-card-actions class="q-pt-none q-px-md">
        <q-btn
          flat
          label="Reset Password"
          class="bg-primary full-width text-grey-1 "
          @click="passwordReset(user)"
        />
      </q-card-actions>
      <q-card-section class="text-center q-py-xs">
        <div class=" text-grey-8 text-captionsubtitle2">
          Already have an account?
          <q-btn
            no-caps
            flat
            class="text-secondary q-pa-none"
            label="Login"
            @click="switchTo('app-login')"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    loading: false,
    user: {
      email: ""
    }
  }),
  methods: {
    ...mapMutations({ changeShow: "changeShow", setError: "setError" }),
    ...mapActions(["passwordReset"]),

    switchTo(to) {
      this.setError(null);
      this.changeShow(to);
      //reset form
      this.user.email = "";
    }
  },
  computed: {
    ...mapGetters({ error: "getAuthError", loading: "getLoading" })
  }
};
</script>

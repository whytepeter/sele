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
          <div class="q-ml-sm text-h4">Sele</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pb-xs">
        <div class=" text-left text-h5 text-weight-bold q-mb-md">
          Reset Password
        </div>

        <q-input
          type="email"
          dense
          outlined
          v-model="user.email"
          placeholder="Email Address"
          class="q-mb-md text-subtitle1"
        />
      </q-card-section>

      <q-card-actions class="q-pt-none q-px-md">
        <q-btn
          flat
          label="Reset Password"
          class="bg-primary full-width text-grey-1 "
          :loading="loading"
          @click="simulateProgress"
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
            @click="changeShow('app-login')"
          />
        </div>
        <div class=" text-grey-8 text-captionsubtitle2">
          New to <strong>SELE</strong>?
          <q-btn
            no-caps
            flat
            class="text-secondary q-pa-none"
            label="Sign up"
            @click="changeShow('app-create-account')"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    loading: false,
    user: {
      email: "",
      password: ""
    }
  }),
  methods: {
    ...mapMutations({ changeShow: "changeShow" }),

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

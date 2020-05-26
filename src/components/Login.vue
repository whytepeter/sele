<template>
  <q-card
    flat
    class="my-card col bg-transparent justify-center full-width  text-grey-9"
    style="font-size: 1rem"
  >
    <div v-if="loading === true" class="fixed-top">
      <q-linear-progress indeterminate />
    </div>
    <q-card-section style="max-width: 400px" class="col q-mx-auto q-pa-none">
      <q-card-section class="text-center row justify-center">
        <div class="row items-center ">
          <q-icon size="3rem" name="img:statics/sele-logo.svg" class="naira" />
          <div class="q-ml-sm text-h4">esele</div>
        </div>
      </q-card-section>
      <form>
        <q-card-section class="q-pb-xs">
          <div class=" text-left text-h6 text-weight-bold q-mb-md">
            Login
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

          <q-input
            :type="type"
            dense
            outlined
            v-model="user.password"
            placeholder="Password"
            class="q-mb-md text-subtitle1"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                round
                :icon="passwordIcon"
                color="primary"
                @click="togglevisibility"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
          </q-input>

          <p class="text-caption text-red">{{ error }}</p>
          <q-card-section
            class=" q-pa-none text-left text-grey-8 text-caption no-whitespace"
          >
            <q-btn
              no-caps
              flat
              class="text-secondary q-pa-none "
              label="Forgot Password"
              @click="switchTo('app-reset-password')"
            />
          </q-card-section>
        </q-card-section>

        <q-card-actions class="q-pt-none q-px-md">
          <q-btn
            flat
            label="Login"
            class="bg-primary full-width text-grey-1 "
            @click="login"
          />
        </q-card-actions>
        <q-card-section class="text-center q-py-xs">
          <div class=" text-grey-8 text-captionsubtitle2">
            New to <strong>ESELE</strong>?
            <q-btn
              no-caps
              flat
              class="text-secondary q-pa-none"
              label="Sign up"
              @click="switchTo('app-create-account')"
            />
          </div>
        </q-card-section>
      </form>
    </q-card-section>
  </q-card>
</template>
<script>
import { LocalStorage } from "quasar";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    showPassword: false,
    type: "password",
    passwordIcon: "mdi-eye-off",
    user: {
      email: "",
      password: ""
    }
  }),
  methods: {
    ...mapMutations({ changeShow: "changeShow", setError: "setError" }),
    ...mapActions(["loginUser"]),

    togglevisibility() {
      if (this.showPassword === false) {
        this.showPassword = true;
        this.type = "text";
        this.passwordIcon = "mdi-eye";
      } else if (this.showPassword === true) {
        this.showPassword = false;
        this.type = "password";
        this.passwordIcon = "mdi-eye-off";
      }
    },

    login() {
      this.loginUser(this.user);

      console.log(`error message ${this.error}`);
    },

    resetForm() {
      (this.user.email = ""), (this.user.password = "");
    },
    switchTo(to) {
      this.setError(null);
      this.changeShow(to);
      this.resetForm();
    }
  },
  computed: {
    ...mapGetters({
      error: "getAuthError",
      loading: "getLoading"
    })
  }
};
</script>

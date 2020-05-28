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
            Create Account
          </div>
          <q-input
            dense
            outlined
            v-model="user.username"
            placeholder="Username"
            class="q-mb-md text-subtitle1"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account" color="primary" />
            </template>
          </q-input>

          <q-input
            type="email"
            dense
            outlined
            v-model="user.email"
            placeholder="Email Address"
            class="q-mb-md text-subtitle1"
          >
            <template v-slot:prepend>
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
            class="Policy q-pa-none text-center text-grey-8 text-caption no-whitespace"
          >
            By creating an account, you agree to <strong>ESELE</strong>
            <q-btn
              no-caps
              flat
              class="text-secondary q-pa-none"
              label="Terms & Privacy Policy"
              @click="terms = true"
            />
          </q-card-section>
        </q-card-section>

        <q-card-actions class="q-pt-none q-px-md">
          <q-btn
            flat
            label="Create Account"
            class="bg-primary full-width text-grey-1 "
            @click="createAccount"
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
              @click="switchTo"
            />
          </div>
        </q-card-section>
      </form>
    </q-card-section>

    <q-dialog v-model="terms">
      <q-card>
        <q-card-section>
          <div class="text-h6">Esele Terms and Privacy Policies</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <app-terms />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ACCEPT" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import Terms from "./TermsAndPolicy";
export default {
  components: {
    appTerms: Terms
  },
  data: () => ({
    terms: false,
    showPassword: false,
    type: "password",
    passwordIcon: "mdi-eye-off",
    user: {
      username: "",
      email: "",
      password: ""
    }
  }),
  methods: {
    ...mapMutations({
      changeShow: "changeShow",
      setError: "setError",
      setRedirect: "setRedirect"
    }),
    ...mapActions(["registerUser"]),

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

    switchTo() {
      this.setError(null);
      this.changeShow("app-login");
      this.resetForm();
    },

    resetForm() {
      (this.user.username = ""),
        (this.user.email = ""),
        (this.user.password = "");
    },

    createAccount() {
      //validate user inputs
      if (this.user.username.trim() !== "")
        if (this.user.email.trim() !== "")
          if (this.user.password.trim() !== "") {
            this.registerUser(this.user);
          } else {
            this.error = "field must not be empty";
          }

      if (this.redirect) {
        this.$q.notify({
          color: "secondary",
          message: `Registration successful`
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      error: "getAuthError",
      loading: "getLoading",
      redirect: "isRedirect"
    })
  }
};
</script>

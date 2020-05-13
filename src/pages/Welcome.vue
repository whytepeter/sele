<template>
  <q-page padding class="q-py-md relative flex q-pt-xl">
    <keep-alive>
      <component :is="show" />
    </keep-alive>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CreateAccount from "../components/CreateAccount";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
export default {
  name: "Welcome",

  components: {
    appCreateAccount: CreateAccount,
    appLogin: Login,
    appResetPassword: ResetPassword
  },
  methods: {
    ...mapMutations({ changeShow: "changeShow" })
  },
  computed: {
    ...mapGetters({ show: "getShow" })
  }
};
</script>
<style lang="scss" scoped></style>

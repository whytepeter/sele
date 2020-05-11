<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="isLogin">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          <div class="q-ml-sm">{{ pageTitle }}</div>
        </q-toolbar-title>
      </q-toolbar>

      <div
        v-if="pageTitle === 'Customers'"
        :class="{ 'q-mx-xl ': $q.screen.gt.xs }"
        class="q-mt-lg q-mb-md"
      >
        <app-search />
      </div>
    </q-header>
    <q-drawer
      v-if="isLogin"
      v-model="drawer"
      show-if-above
      :width="270"
      :breakpoint="900"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding class="text-grey-8">
          <q-item
            to="/"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Transactions')"
          >
            <q-item-section avatar>
              <q-icon name="mdi-finance" />
            </q-item-section>
            <q-item-section>Transactions</q-item-section>
          </q-item>

          <q-item
            to="/customers"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Customers')"
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-box" />
            </q-item-section>
            <q-item-section>Customers</q-item-section>
          </q-item>

          <q-item
            to="/share"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Share App')"
          >
            <q-item-section avatar>
              <q-icon name="share" />
            </q-item-section>
            <q-item-section>Share App</q-item-section>
          </q-item>

          <q-item
            to="/updates"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Update')"
          >
            <q-item-section avatar>
              <q-icon name="update" />
            </q-item-section>
            <q-item-section>Updates</q-item-section>
          </q-item>

          <q-separator />

          <q-item
            to="/feedback"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Feedback')"
          >
            <q-item-section avatar>
              <q-icon name="feedback" />
            </q-item-section>
            <q-item-section>Feedback</q-item-section>
          </q-item>
          <q-item
            to="/policy"
            clickable
            v-ripple
            exact
            @click="changePageTitle('Terms and Policy')"
          >
            <q-item-section avatar>
              <q-icon name="mdi-file-document" />
            </q-item-section>
            <q-item-section>Terms and Policy</q-item-section>
          </q-item>
          <q-item to="/welcome" clickable v-ripple exact @click="logoutUser">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-top bg-grey-2 " style="height: 150px">
        <div class="absolute-bottom bg-transparent ellipse q-px-lg q-pb-md">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="user.profilePhoto" />
          </q-avatar>
          <div class="text-subtitle1 text-weight-bold text-grey-9">
            {{ user.name }}
          </div>
          <div class="text-grey-8">{{ user.email }}</div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Search from "../components/Search";
export default {
  name: "MainLayout",
  components: {
    appSearch: Search
  },
  data() {
    return {
      showHeader: true,
      drawer: false,
      active: "Transactions"
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      pageTitle: "getPageTiltle",
      isLogin: "isLogin"
    })
  },
  methods: {
    ...mapMutations(["changePageTitle", "logout"]),

    logoutUser() {
      this.logout();
      this.changePageTitle("Customers");
    }
  },
  created() {
    this.$store.dispatch("initAccounts");
  }
};
</script>
<style lang="scss" scoped>
.logo-text {
  width: 130px;
}
</style>

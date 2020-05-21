<template>
  <q-page
    class="q-px-md q-py-md"
    :class="{ 'q-px-xl': $q.screen.gt.xs }"
    @keypress.enter="onSubmit"
  >
    <div class="text-grey-9 text-h6 q-mb-md">Send a FeedBack</div>

    <q-card class="my-card" flat>
      <div v-if="loading"><q-linear-progress indeterminate /></div>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.username }}</q-item-label>
          <q-item-label caption>
            {{ user.email }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            outlined
            v-model="title"
            label="Title *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please add a title']"
          />

          <q-input
            v-model="message"
            outlined
            label="Message *"
            type="textarea"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please add a message']"
          />

          <div>
            <q-btn
              unelevated
              label="Submit"
              type="submit"
              color="primary"
              @click="onSubmit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "FeedBack",
  data: () => ({
    title: "",
    message: ""
  }),
  computed: {
    ...mapGetters({ user: "getUser", loading: "getLoading" })
  },
  methods: {
    ...mapMutations(["setLoading"]),
    ...mapActions(["addFeedback"]),

    onSubmit() {
      let feedBacks = {
        username: this.user.username,
        email: this.user.email,
        title: this.title,
        message: this.message
      };
      //check if fields are not empty before submiting feedback
      if (this.title.trim() !== "" && this.message.trim() !== "") {
        this.addFeedback(feedBacks);
        this.onReset();
        setTimeout(() => {
          this.$q.notify({
            color: "primary",
            message: `FeedBack submitted successful`
          });
        }, 1000);

        return true;
      } else {
        return false;
      }
    },

    onReset() {
      this.title = " ";
      this.message = " ";
    }
  }
};
</script>

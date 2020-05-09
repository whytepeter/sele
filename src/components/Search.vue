<template>
  <div class="row " :class="{ 'q-mx-xl q-mt-md': $q.screen.gt.xs }">
    <q-input
      @keyup="toggleSearch(text)"
      @keypress.enter="searchFuntion"
      class="col q-mx-sm bg-white rounded-borders q-px-xs"
      color="white"
      dense
      v-model="text"
      placeholder="Search by name"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    text: ""
  }),
  methods: {
    ...mapMutations(["toggleSearch", "setText"]),
    ...mapActions(["searchInit"]),
    searchFuntion() {
      this.setText(this.text.toLowerCase().trim()), this.searchInit();
    }
  }
};
</script>

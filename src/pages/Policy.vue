<template>
  <q-page
    class="q-px-sm q-py-lg text-grey-9 bg-grey-2"
    :class="{ 'q-px-xl': $q.screen.gt.xs }"
  >
    <app-terms />
  </q-page>
</template>

<script>
import Terms from "../components/TermsAndPolicy";
export default {
  name: "Policy",
  components: {
    appTerms: Terms
  }
};
</script>

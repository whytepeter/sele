import { auth, db } from "../../boot/firebase";

const state = {
  feedback: {},
  error: null
};

const mutations = {
  setFeedbackError(state, error) {
    state.error = error;
  }
};
const actions = {
  addFeedback({ commit }, feedBack) {
    db.collection("feedback")
      .add({
        username: feedBack.username,
        email: feedBack.email,
        title: feedBack.title,
        message: feedBack.message
      })
      .then(function() {
        console.log("Feedback succeffully submited!");
        commit("setFeedbackError", null);

        //console.log the feed
        console.log(feedBack);
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error submitting feedback: ", error);
        commit("setFeedbackError", error);
      });
  },

  initFeedback() {}
};

export default {
  state,
  mutations,
  actions
};

import { auth, db } from "../../boot/firebase";

const state = {
  login: true,
  loading: false,
  error: null,
  user: {
    userID: "",
    username: "",
    email: "",
    password: ""
  }
};

const getters = {
  isLogin(state) {
    return state.login;
  },

  getUser(state) {
    return state.user;
  },
  getAuthError(state) {
    return state.error;
  },
  getLoading(state) {
    return state.loading;
  }
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading;
  },
  // user mutation
  setUser(state, currentUser) {
    state.user = currentUser;
  },
  setLogin(state, mode) {
    state.login = mode;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  registerUser: ({ commit }, user) => {
    commit("setLoading", true);
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(cred => {
        console.log(cred.user);
        commit("setLogin", true);
        commit("setError", null);
        commit("setLoading", false);

        db.collection("users")
          .doc(cred.user.uid)
          .set({
            userID: cred.user.uid,
            username: user.username,
            email: user.email,
            password: user.password
          });
      })
      .catch(error => {
        console.log(error.message);
        commit("setError", error.message);
        commit("setLoading", false);
      });
  },

  loginUser: ({ state, commit }, user) => {
    //start the loading
    commit("setLoading", true);
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        commit("setLogin", true);
        commit("setError", null);
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error.message);
        commit("setError", error.message);
        commit("setLoading", false);
      });
  },

  logoutUser: ({ commit }) => {
    auth.signOut();
    commit("setLogin", false);
  },

  passwordReset: ({ commit }, user) => {
    auth
      .sendPasswordResetEmail(user.email)
      .then(res => {
        // Email sent.
        console.log("email send");
      })
      .catch(function(error) {
        // An error happened.
        commit("setError", error.message);
      });
  },

  handleAuthStateChanged({ commit, dispatch }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        commit("setLogin", true);
        console.log("login");
        //get current user id
        let userId = auth.currentUser.uid;

        //get current user details
        db.collection("users")
          .doc(userId)
          .get()
          .then(snapshot => {
            if (snapshot.exists) {
              let currentUser = snapshot.data();
              commit("setUser", currentUser);
              console.log(currentUser);
            } else {
              // snapshot.data() will be undefined in this case
              console.log("No such document!");
            }
          });
        //init customers account
        dispatch("initAccounts");
        dispatch("initTransactions");
        this.$router.push("/");
      } else {
        console.log("logout");
        commit("setLogin", false);
        commit("setUser", null);
        this.$router.replace("/welcome");
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

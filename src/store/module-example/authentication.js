import accounts from "../data/accounts";

const state = {
  login: true,
  user: {
    name: "Whyte Peter",
    email: "peteremmanuelwhyte@gmail.com",
    password: "whyte73837",
    profilePhoto: "statics/whyte.png"
  },
  accounts: []
};

const getters = {
  isLogin(state) {
    return state.login;
  },
  getAccounts(state) {
    return state.accounts;
  },
  getUser(state) {
    return state.user;
  }
};

const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts;
  },
  logout(state) {
    state.login = false;
  }
};

const actions = {
  initAccounts: ({ commit }) => {
    commit("setAccounts", accounts);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

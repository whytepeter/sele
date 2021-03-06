const state = {
  showHome: "app-account",
  pageTitle: "Transactions",
  dialogUpdate: false,
  dialogAdd: false,
  dialogTransaction: false,

  search: {
    error: false,
    searchAccounts: [],
    text: ""
  },

  welcome: {
    show: "app-login"
  }
};

const getters = {
  getHome(state) {
    return state.showHome;
  },
  getPageTiltle(state) {
    return state.pageTitle;
  },

  //get Dialog for form

  getDialogAdd() {
    return state.dialogAdd;
  },
  getDialogUpdate() {
    return state.dialogUpdate;
  },
  getDialogTransaction() {
    return state.dialogTransaction;
  },

  //Search Getters
  getSearchInput(state) {
    return state.search.text;
  },
  getError(state) {
    return state.search.error;
  },
  getSearch(state) {
    return state.search.searchAccounts;
  },

  //getters for welcome page
  getShow(state) {
    return state.welcome.show;
  }
};

const mutations = {
  //set dialog
  toggleDialogAdd(state, mode) {
    state.dialogAdd = mode;
  },
  toggleDialogUpdate(state, mode) {
    state.dialogUpdate = mode;
  },
  toggleDialogTransaction(state, mode) {
    state.dialogTransaction = mode;
  },

  //Search Mutations
  toggleSearch(state, text) {
    if (!text.length) {
      state.showHome = "app-account";
      state.search.text = "";
      state.search.searchAccounts = [];
      state.search.error = false;
    } else {
      state.showHome = "app-search-display";
    }
  },
  setError(state) {
    if (!state.search.searchAccounts.length) {
      state.search.error = true;
    } else {
      state.search.error = false;
    }
  },

  setText(state, text) {
    state.search.text = text;
  },
  setSearchAccount(state, account) {
    state.search.searchAccounts = account;
  },
  changePageTitle(state, title) {
    state.pageTitle = title;
  },
  //Mutations for welcome
  changeShow(state, page) {
    state.welcome.show = page;
  }
};

const actions = {
  searchInit: ({ commit, state, getters }) => {
    let searchResult = getters.getAccounts.filter(acc =>
      acc.accName.toLowerCase().includes(state.search.text)
    );
    commit("setSearchAccount", searchResult);
    commit("setError");
    console.log(state.search.searchAccounts);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};

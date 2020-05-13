import transactions from "../data/transactions";
const state = {
  addTransaction: false,
  transactions: [],
  summary: {
    totalGain: 0,
    totalExpenses: 0,
    totalSavings: 0
  }
};

const getters = {
  getTransactionSumary(state) {
    return state.summary;
  },
  getTransactions(state) {
    return state.transactions;
  },
  getTransactionAdd(state) {
    return state.addTransaction;
  }
};

const mutations = {
  //Transaction mutation
  toggleTransactionAdd(state, mode) {
    state.addTransaction = mode;
  },

  setTransactions(state, transactions) {
    state.transactions = transactions;
  },

  sumTransactions(state) {
    let totalGain = 0;
    let totalExpenses = 0;
    let totalSavings = 0;
    // calculate the totalGain, totalSavings and totalExpense
    state.transactions.forEach(transaction => {
      totalGain += transaction.dailyGain;
      totalSavings += transaction.dailySavings;
      totalExpenses += transaction.dailyExpenses;
    });
    // assign the values
    state.summary.totalGain = totalGain;
    state.summary.totalSavings = totalSavings;
    state.summary.totalExpenses = totalExpenses;
  }
};

const actions = {
  initTransactions: ({ commit }) => {
    commit("setTransactions", transactions);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};

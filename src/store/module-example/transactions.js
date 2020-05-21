import { auth, db } from "../../boot/firebase";

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
  addTransaction({ commit }, transaction) {
    //get the the current user customer collection
    let transactionCol = `transaction${auth.currentUser.uid}`;

    db.collection(transactionCol).add({
      date: transaction.date,
      dailyGain: transaction.dailyGain,
      dailySavings: transaction.dailySavings,
      dailyExpenses: transaction.dailyExpenses,
      reciept: transaction.reciept
    });

    commit("sumTransactions");
  },

  deleteTransaction({}, id) {
    //get the the current user customer collection
    let transactionCol = `transaction${auth.currentUser.uid}`;

    db.collection(transactionCol)
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },

  initTransactions: ({ commit, getters, state }) => {
    console.log("init transation");
    let transactionCol = `transaction${auth.currentUser.uid}`;

    let transactions = [];
    let transaction;

    db.collection(transactionCol)
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        transactions.length = 0; //very important! deletes the previous transaction
        snapshot.docs.forEach(doc => {
          //merge the unique ids and transaction details together
          transaction = {
            id: doc.id,
            date: doc.data().date,
            dailyGain: parseInt(doc.data().dailyGain),
            dailySavings: parseInt(doc.data().dailySavings),
            dailyExpenses: parseInt(doc.data().dailyExpenses),
            reciept: doc.data().reciept
          };
          transactions.push(transaction);
        });
        commit("setTransactions", transactions);
        commit("sumTransactions");
      });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};

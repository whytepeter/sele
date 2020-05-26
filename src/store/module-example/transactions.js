import { auth, db, st } from "../../boot/firebase";

const state = {
  currentMonth: "",
  currentYear: "",
  addTransaction: false,
  transactions: [],

  summary: {
    totalGain: 0,
    totalExpenses: 0,
    totalSavings: 0
  }
};

const getters = {
  getCurrentMonth(state) {
    return state.currentMonth;
  },
  getCurrentYear(state) {
    return state.currentYear;
  },
  getTransactionSumary(state) {
    return state.summary;
  },
  getTransactions(state) {
    //filter transactions base on current month and year
    return state.transactions.filter(transaction => {
      return (
        transaction.date.match(state.currentMonth) &&
        transaction.date.split(" ")[2].includes(state.currentYear)
      );
    });
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
  //setDate
  setMonth(state, month) {
    state.currentMonth = month;
  },
  setYear(state, year) {
    state.currentYear = year;
  },

  setTransactions(state, transactions) {
    state.transactions = transactions;
  }
};

const actions = {
  //set the current date
  setCurrentDate({ commit, state }) {
    //instantiate a
    let date = new Date();
    let options = {
      month: "long"
    };
    let currentMonth = new Intl.DateTimeFormat("en-US", options).format(date); // get current month
    let currentYear = date.getFullYear(); // get current year
    commit("setMonth", currentMonth);
    commit("setYear", currentYear);
  },

  //refresh Transactions
  refreshTransactions({ dispatch }) {
    dispatch("initTransactions");
  },

  //sum the transactions
  sumTransactions({ state, getters }) {
    let totalGain = 0;
    let totalExpenses = 0;
    let totalSavings = 0;
    // calculate the totalGain, totalSavings and totalExpense

    getters.getTransactions.forEach(transaction => {
      totalGain += transaction.dailyGain;
      totalSavings += transaction.dailySavings;
      totalExpenses += transaction.dailyExpenses;
    });
    // assign the values
    state.summary.totalGain = totalGain;
    state.summary.totalSavings = totalSavings;
    state.summary.totalExpenses = totalExpenses;
  },

  addTransaction({}, transaction) {
    //get the the current user customer collection
    let transactionCol = `transaction${auth.currentUser.uid}`;

    //get the file and the name if there's any
    let isReciept, filename, reciept, ext;

    isReciept = transaction.reciept;
    if (transaction.reciept !== null) {
      reciept = transaction.reciept[0];
      filename = transaction.reciept[0].name;
      ext = filename.slice(filename.lastIndexOf("."));
      add();
    } else {
      add();
    }

    //function add transaction
    function add() {
      db.collection(transactionCol)
        .add({
          date: transaction.date,
          dailyGain: transaction.dailyGain,
          dailySavings: transaction.dailySavings,
          dailyExpenses: transaction.dailyExpenses
        })
        .then(res => {
          //upload the reciept to cloud storage
          if (isReciept !== null) {
            st.ref(`reciept/${res.id}${ext}`)
              .put(reciept)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    }
  },

  deleteTransaction({}, transaction) {
    //get the the current user customer collection
    let transactionCol = `transaction${auth.currentUser.uid}`;

    db.collection(transactionCol)
      .doc(transaction.id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        //delete image exist
        if (transaction.reciept !== "statics/default.jpg") {
          st.ref(`reciept/${id}.jpg`)
            .delete()
            .then(function() {
              console.log("reciept deleted successfully");
            })
            .catch(function(error) {
              console.log("h-oh, an error occurred!");
            });
        }
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },

  initTransactions: ({ commit, state, dispatch }) => {
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
            dailyExpenses: parseInt(doc.data().dailyExpenses)
          };
          transactions.push(transaction);
        });
        //get the reciept
        transactions.forEach(trans => {
          st.ref(`reciept/${trans.id}.jpg`)
            .getDownloadURL()
            .then(url => {
              trans.reciept = url;
            })
            .catch(error => {
              switch (error.code) {
                case "storage/object-not-found":
                  // File doesn't exist
                  trans.reciept = "statics/default.jpg";
                  break;

                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;

                case "storage/canceled":
                  // User canceled the upload
                  break;

                case "storage/unknown":
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        });

        commit("setTransactions", transactions);
        dispatch("setCurrentDate");
        dispatch("sumTransactions");
      });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};

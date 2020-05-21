import { auth, db } from "../../boot/firebase";

const state = {
  accounts: []
};

const getters = {
  getAccounts(state) {
    return state.accounts;
  }
};

const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts;
  }
};

const actions = {
  addCustomer({}, account) {
    //get the the current user customer collection
    let customerCol = `customer${auth.currentUser.uid}`;

    db.collection(customerCol).add({
      bank: account.bank,
      accName: account.accName,
      accNumber: account.accNumber
    });
  },

  editCustomer({}, account) {
    //get the the current user customer collection
    let customerCol = `customer${auth.currentUser.uid}`;

    db.collection(customerCol)
      .doc(account.id)
      .update({
        bank: account.bank,
        accName: account.accName,
        accNumber: account.accNumber
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  },

  deleteCustomer({}, id) {
    //get the the current user customer collection
    let customerCol = `customer${auth.currentUser.uid}`;

    db.collection(customerCol)
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },

  initAccounts: ({ commit, getters }) => {
    console.log("init customer");
    //get the the current user customer collection
    let customerCol = `customer${auth.currentUser.uid}`;

    let accounts = [];
    let account;

    db.collection(customerCol).onSnapshot(snapshot => {
      accounts.length = 0; //very important! deletes the previous account
      snapshot.docs.forEach(doc => {
        //merge the unique ids and account details together
        account = {
          id: doc.id,
          bank: doc.data().bank,
          accName: doc.data().accName.toLowerCase(),
          accNumber: doc.data().accNumber
        };
        accounts.push(account);
      });

      commit("setAccounts", accounts);

    });

  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

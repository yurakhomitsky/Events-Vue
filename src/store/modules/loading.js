import NProgress from 'nprogress';
export const namespaced = true;
export const state = () => ({
  apiCallsCount: 0,
});

export const mutations = {
  START_LOADING(state) {
    state.apiCallsCount++;
  },
  DONE_LOADING(state) {
    state.apiCallsCount--;
  },
};

export const actions = {
  startLoading({ commit, getters }) {
    if (getters.getCallsCount === 0) {
      NProgress.start();
    }
    commit('START_LOADING');
  },
  doneLoading({ commit, getters }) {
    commit('DONE_LOADING');
    if (getters.getCallsCount === 0) {
      NProgress.done();
    }
  },
};

export const getters = {
  getCallsCount: (state) => state.apiCallsCount,
  getLoading: (state) => state.isLoading,
};

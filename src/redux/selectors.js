export const selectUserKeys = store => store.storeUserKey.stateUserKeys;
export const selectFilteredTweets = store =>
  store.storeUserKey.stateFilteredTweets;
export const selectAllTweets = store => store.storeUserKey.stateAllTweets;
export const selectUsersFilter = store => store.storeUserKey.stateUsersFilter;
export const selectCurrentPage = store => store.storeUserKey.stateCurrentPage;
export const selectTotalPages = store => store.storeUserKey.stateTotalPages;

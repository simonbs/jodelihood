export const Constants = {
  JODELS_REFRESH: "JODELS_REFRESH"
};

export const All = {
  jodelsRefresh: function() {
    this.dispatch(constants.JODELS_REFRESH);
  }
};

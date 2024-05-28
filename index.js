export const applyCustomCode = (externalCodeSetup) => {
  // call custom code api here - test
  externalCodeSetup.cssApi.addGlobalStyle("menuLabelStyle", {
    color: "#fff",
  });

  externalCodeSetup.cssApi.addGlobalStyle("container", {
    backgroundColor: "#030f2d",
  });
};

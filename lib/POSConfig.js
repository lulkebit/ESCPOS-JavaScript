let disablePrinting = false;

export const POSConfig = {
  isPrintingDisabled: () => disablePrinting,
  setDisablePrinting: (disable) => {
    disablePrinting = disable;
  }
};

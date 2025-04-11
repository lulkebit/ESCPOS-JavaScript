export const POSPrintStyle = Object.freeze({
    NONE: 0,
    FONT_B: 1,
    BOLD: 8,
    DOUBLE_HEIGHT: 16,
    DOUBLE_WIDTH: 32,
    UNDERLINE: 128
  });
  
  export const POSTextAlignment = Object.freeze({
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2
  });
  
  export const POSBarcodeType = Object.freeze({
    UPC_A: 0x41,
    UPC_E: 0x42,
    JAN13_EAN13: 0x43,
    JAN8_EAN8: 0x44,
    CODE39: 0x45,
    ITF: 0x46,
    CODABAR_NW_7: 0x47,
    CODE93: 0x48,
    CODE128: 0x49,
    GS1_128: 0x4A,
    GS1_DATABAR_OMNIDIRECTIONAL: 0x4B,
    GS1_DATABAR_TRUNCATED: 0x4C,
    GS1_DATABAR_LIMITED: 0x4D,
    GS1_DATABAR_EXPANDED: 0x4E
  });
  
  export const POSBarcodeWidth = Object.freeze({
    THINNEST: 2,
    THIN: 3,
    DEFAULT: 4,
    THICK: 5,
    THICKEST: 6
  });
  
  export const POSQRCodeSize = Object.freeze({
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4,
    EXTRA_LARGE: 5
  });
  
  export const POSQRCodeErrorCorrection = Object.freeze({
    LOW: 48,
    MEDIUM: 49,
    QUARTILE: 50,
    HIGH: 51
  });
  
export const POSCommand = Object.freeze({
    ESC: 0x1B,
    GS: 0x1D,
  
    // Text formatting
    INIT: 0x40,
    STYLE_MODE: 0x21,
    ALIGNMENT: 0x61,
    LINE_FEED: 0x0A,
    FEED_LINES: 0x64,
  
    // Barcode
    BARCODE_PRINT: 0x6B,
    SET_BARCODE_HEIGHT: 0x68,
    SET_BAR_WIDTH: 0x77,
    SET_BAR_LABEL_POSITION: 0x48,
    SET_BAR_LABEL_FONT: 0x66,
  
    // QR Code
    PAPER_CUT: 0x56,
    ESC_CUT: Buffer.from([0x1B, 0x69]),
  
    PAGE_MODE: 0x4C,
    PRINT_PAGE_MODE: 0x46,
    PRINTER_RESET: 0x40,
    STATUS_REQUEST: 0x72,
    UNIDIRECTIONAL_MODE: 0x55,
  
    getFullCutCommand: () => Buffer.from([0x1B, 0x56, 0x00]),
    getPartialCutCommand: () => Buffer.from([0x1B, 0x56, 0x01])
  });
  
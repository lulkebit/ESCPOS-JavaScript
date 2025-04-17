/**
 * @class
 * @description ESC/POS Command constants
 * 
 * This class defines all the ESC/POS printer command codes
 * used throughout the library. These represent the standard
 * ESC/POS protocol commands for controlling thermal printers.
 */
export class POSCommand {
  // Command prefixes
  /**
   * Escape character - prefix for ESC commands
   * @constant {number}
   */
  static ESC = 0x1B;
  
  /**
   * Group Separator - prefix for GS commands
   * @constant {number}
   */
  static GS = 0x1D;
  
  /**
   * File Separator - prefix for FS commands
   * @constant {number}
   */
  static FS = 0x1C;
  
  // Printer control
  /**
   * Initialize printer
   * @constant {number}
   */
  static INITIALIZE = 0x40;
  
  /**
   * Reset printer
   * @constant {number}
   */
  static PRINTER_RESET = 0x42;
  
  /**
   * Text style mode control
   * @constant {number}
   */
  static STYLE_MODE = 0x21;
  
  /**
   * Text alignment control 
   * @constant {number}
   */
  static ALIGNMENT = 0x61;
  
  // Barcode and QR code
  /**
   * Barcode print command
   * @constant {number}
   */
  static BARCODE_PRINT = 0x6B;
  
  /**
   * QR code model selection
   * @constant {number}
   */
  static QR_MODEL = 0x28;
  
  /**
   * QR code error correction level
   * @constant {number}
   */
  static QR_ERROR_CORRECTION = 0x69;
  
  // Advanced control
  /**
   * Page mode selection
   * @constant {number}
   */
  static PAGE_MODE = 0x4C;
  
  /**
   * Print page mode data
   * @constant {number}
   */
  static PRINT_PAGE_MODE = 0x0C;
  
  /**
   * Printer status request
   * @constant {number}
   */
  static STATUS_REQUEST = 0x72;
  
  /**
   * Unidirectional print mode
   * @constant {number}
   */
  static UNIDIRECTIONAL_MODE = 0x55;
}
  
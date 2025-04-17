import { POSPrinterInterface } from "./POSPrinterInterface.js";
import { POSConfig } from "./POSConfig.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class POSPrinter extends POSPrinterInterface {
  constructor(printerName) {
    super();
    
    if (!printerName || typeof printerName !== 'string') {
      throw new Error('Printer name must be provided as a string');
    }
    
    this.printerName = printerName;
  }

  /**
   * Print a document to the printer
   * @param {Object} document - The document to print (must have toBytes method)
   * @returns {Promise<boolean>} - Success status of the print operation
   * @throws {Error} If printing fails
   */
  async print(document) {
    if (!document || typeof document.toBytes !== 'function') {
      throw new Error('Invalid document: Must have a toBytes method');
    }
    
    // Check if printing is disabled in test mode
    if (this._isPrintingDisabled()) {
      console.log("[ESC/POS] Printing is disabled (test mode)");
      return true;
    }

    try {
      // Convert document to binary data
      const data = document.toBytes();
      
      // Write to temporary file
      const tempPath = this._createTempFile(data);
      
      // Get platform-specific print command
      const command = this._getPlatformCommand(tempPath);
      
      // Execute print command
      await this._executePrintCommand(command);
      
      return true;
    } catch (error) {
      console.error(`[ESC/POS] Printing error: ${error.message}`);
      throw new Error(`Failed to print: ${error.message}`);
    }
  }
  
  /**
   * Check if printing is disabled in test mode
   * @private
   */
  _isPrintingDisabled() {
    return POSConfig.isPrintingDisabled();
  }
  
  /**
   * Create a temporary file with the document data
   * @param {Buffer} data - The document data
   * @private
   */
  _createTempFile(data) {
    const tempPath = join(tmpdir(), `escpos-${Date.now()}.bin`);
    writeFileSync(tempPath, data);
    return tempPath;
  }

  /**
   * Get platform-specific print command
   * @param {string} filePath - Path to the temporary file
   * @private
   */
  _getPlatformCommand(filePath) {
    const name = this.printerName;
    
    switch (process.platform) {
      case "darwin":
      case "linux":
        return `lp -d "${name}" -o raw "${filePath}"`;
      case "win32":
        return `print /D:"${name}" "${filePath}"`;
      default:
        throw new Error(`Platform ${process.platform} is not supported`);
    }
  }
  
  /**
   * Execute print command
   * @param {string} command - Print command to execute
   * @private
   */
  async _executePrintCommand(command) {
    if (!command) {
      throw new Error('Invalid print command');
    }
    
    try {
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        console.error("[ESC/POS] Printer stderr:", stderr);
      }
      
      console.log(`[ESC/POS] Printed to ${this.printerName}`);
    } catch (error) {
      throw new Error(`Print command failed: ${error.message}`);
    }
  }
}

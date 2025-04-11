import { POSPrinterInterface } from "./POSPrinterInterface.js";
import { POSConfig } from "./POSConfig.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { exec } from "child_process";

export class POSPrinter extends POSPrinterInterface {
  constructor(printerName) {
    super();
    this.printerName = printerName;
  }

  print(document) {
    if (POSConfig.isPrintingDisabled()) {
      console.log("[ESC/POS] Printing is disabled (test mode)");
      return;
    }

    const data = document.toBytes();
    const tempPath = join(tmpdir(), `escpos-${Date.now()}.bin`);
    writeFileSync(tempPath, data);

    const command = this._getPlatformCommand(tempPath);

    if (!command) {
      console.error(`[ESC/POS] Platform ${process.platform} is not supported.`);
      return;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Printing error:", error.message);
      } else if (stderr) {
        console.error("Printer stderr:", stderr);
      } else {
        console.log(`[ESC/POS] Printed to ${this.printerName}`);
      }
    });
  }

  _getPlatformCommand(filePath) {
    const name = this.printerName;
    switch (process.platform) {
      case "darwin":
      case "linux":
        return `lp -d "${name}" -o raw "${filePath}"`;
      case "win32":
        return `print /D:"${name}" "${filePath}"`;
      default:
        return null;
    }
  }
}

import { POSPrinterInterface } from "./POSPrinterInterface.js";

export class POSPrinterMock extends POSPrinterInterface {
  constructor() {
    super();
    this.buffer = [];
  }

  print(document) {
    const data = document.toBytes();
    this.buffer.push(data);
    console.log(`[POSPrinterMock] Simulated printing ${data.length} bytes.`);
  }

  getPrintedData() {
    return this.buffer;
  }

  clearPrintedData() {
    this.buffer.length = 0;
  }
}

export class POSPrinterInterface {
    print(document) {
      throw new Error("Must implement print(document) in subclass.");
    }
  }
  
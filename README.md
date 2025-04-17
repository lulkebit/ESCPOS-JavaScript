# escpos-javascript

A **pure JavaScript** (ESModules) library for printing ESC/POS receipts, barcodes, and QR codes in Node.js.  
✅ Works on **macOS, Linux, and Windows** using system print commands like `lp` and `print`.

---

## 🚀 Features

✅ ESC/POS command generation  
✅ Formatted text (bold, underline, alignment, sizes)  
✅ QR codes and barcodes  
✅ Mock printer for unit testing  
✅ No dependencies, no native bindings  
✅ Fully cross-platform  
✅ Well-documented with JSDoc  
✅ Comprehensive test suite  
✅ Modern async/await printing API

---

## 📦 Installation

```bash
npm install escpos-javascript
```

---

## 📄 Usage Example 

```js
import {
  POSPrinter,
  POSReceiptBuilder,
  POSTextBuilder,
  POSPrintStyle,
  POSTextAlignment,
  POSBarcodeBuilder,
  POSBarcodeType,
  POSQRCodeBuilder,
  POSQRCodeSize,
  POSQRCodeErrorCorrection
} from "../lib/index.js";

const printer = new POSPrinter("Your_Printer_Name"); // See below to find the name

const receipt = new POSReceiptBuilder()
  .setTitle("ESC/POS DEMO")
  .addFeed()
  .addComponent(new POSTextBuilder("Left").setAlignment(POSTextAlignment.LEFT).build())
  .addComponent(new POSTextBuilder("Center").setAlignment(POSTextAlignment.CENTER).build())
  .addComponent(new POSTextBuilder("Right").setAlignment(POSTextAlignment.RIGHT).build())
  .addComponent(new POSTextBuilder("Bold").setStyle(POSPrintStyle.BOLD).build())
  .addItem("Item A", 3.5)
  .addItem("Item B", 5.0)
  .addComponent(
    new POSBarcodeBuilder("123456789012")
      .setType(POSBarcodeType.JAN13_EAN13)
      .build()
  )
  .addComponent(
    new POSQRCodeBuilder("https://example.com")
      .setSize(POSQRCodeSize.LARGE)
      .setErrorCorrection(POSQRCodeErrorCorrection.MEDIUM)
      .build()
  )
  .setFooter("Thank you!")
  .build();

// Using the new async/await API
try {
  await printer.print(receipt);
  console.log("Print job sent successfully");
} catch (error) {
  console.error("Print failed:", error.message);
}
```

---

## 🖨️ How to Find Your Printer Name

### On macOS / Linux

```bash
lpstat -p
```

### On Windows

```powershell
Get-Printer | Select Name
```

---

## 🧪 Testing (Mock Printer)

```js
import { POSPrinterMock, POSReceiptBuilder, POSTextBuilder } from "../lib/index.js";

const mock = new POSPrinterMock();
const receipt = new POSReceiptBuilder()
  .setTitle("Test")
  .addComponent(new POSTextBuilder("Line 1").build())
  .build();

mock.print(receipt);

console.log("Captured buffers:", mock.getPrintedData().length);
```

## 🔍 Running Tests

The library now includes comprehensive test coverage to ensure reliability:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
```

---

## 📝 Documentation

All classes, methods, and functions are documented with JSDoc comments. This makes it easy to understand the library's API and get proper IDE code completion.

Example of documented method:

```js
/**
 * Adds an item with name and price
 * @param {string} name - Item name 
 * @param {number} price - Item price
 * @returns {POSReceiptBuilder} This builder for chaining
 */
addItem(name, price) {
  // Implementation
}
```

---

## 🛠️ Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📣 Feature Request?

This repository is only for **bug reports and maintenance** related to the language-specific implementation.

Please open all **feature requests, enhancements, and cross-language discussions** in the **central repository**:  

👉 [DrBackmischung/ESCPOS](https://github.com/DrBackmischung/ESCPOS/issues)

---

## 📜 License

MIT

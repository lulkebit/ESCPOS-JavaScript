# escpos-js

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

---

## 📦 Installation

```bash
npm install escpos-js
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

printer.print(receipt);
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

---

## 🛠 Notes

- Uses Node.js `Buffer`, `fs`, and `child_process`
- Output is written as a `.bin` file and printed using native system tools
- You must ensure your printer accepts ESC/POS and is installed correctly

---

## 📜 License

MIT

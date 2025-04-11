import { POSDocument } from "./POSDocument.js";
import { POSTextBuilder } from "./POSText.js";
import { POSPrintStyle } from "./utils/constants.js";
import { POSTextAlignment } from "./utils/constants.js";
import { POSLineFeed } from "./POSLineFeed.js";

export class POSReceipt extends POSDocument {
  constructor() {
    super();
  }
}

export class POSReceiptBuilder {
  constructor() {
    this.receipt = new POSReceipt();
  }

  setTitle(title) {
    this.receipt.addComponent(
      new POSTextBuilder(title)
        .setStyle(POSPrintStyle.BOLD, POSPrintStyle.DOUBLE_HEIGHT)
        .setAlignment(POSTextAlignment.CENTER)
        .build()
    );
    return this;
  }

  addItem(name, price) {
    const line = `${name.padEnd(20)} ${price.toFixed(2).padStart(10)}`;
    this.receipt.addComponent(new POSTextBuilder(line).build());
    return this;
  }

  addItemStyled(name, price, ...styles) {
    const line = `${name.padEnd(20)} ${price.toFixed(2).padStart(10)}`;
    this.receipt.addComponent(new POSTextBuilder(line).setStyle(...styles).build());
    return this;
  }

  setFooter(footer) {
    this.receipt.addComponent(
      new POSTextBuilder(footer)
        .setStyle(POSPrintStyle.UNDERLINE)
        .setAlignment(POSTextAlignment.CENTER)
        .build()
    );
    this.receipt.addLineFeed(2);
    return this;
  }

  addComponent(component) {
    this.receipt.addComponent(component);
    return this;
  }

  addFeed(count = 1) {
    this.receipt.addLineFeed(count);
    return this;
  }

  build() {
    this.receipt.addLineFeed(3);
    return this.receipt;
  }
}

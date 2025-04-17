import { POSDocument } from "./POSDocument.js";
import { POSTextBuilder } from "./POSText.js";
import { POSPrintStyle } from "./utils/constants.js";
import { POSTextAlignment } from "./utils/constants.js";

/**
 * @class
 * @extends POSDocument
 * @description Specialized document class for creating receipts
 * 
 * The POSReceipt class extends the basic POSDocument with
 * functionality specific to receipt printing.
 */
export class POSReceipt extends POSDocument {
  /**
   * Creates a new receipt document
   */
  constructor() {
    super();
  }
  
  /**
   * Adds a component to the receipt
   * @param {POSComponent} component - Component to add
   * @returns {POSReceipt} This receipt for chaining
   */
  addContent(component) {
    this.addComponent(component);
    return this;
  }
  
  /**
   * Adds multiple line feeds to the receipt
   * @param {number} count - Number of line feeds to add
   * @returns {POSReceipt} This receipt for chaining
   */
  addFeeds(count = 1) {
    this.addLineFeed(count);
    return this;
  }
}

/**
 * @class
 * @description Builder class for creating receipts with a fluent API
 * 
 * The POSReceiptBuilder provides a convenient way to build receipt
 * documents with common elements like titles, items, and footers.
 */
export class POSReceiptBuilder {
  /**
   * Creates a new receipt builder
   */
  constructor() {
    this.receipt = new POSReceipt();
  }

  /**
   * Sets the receipt title
   * @param {string} title - Title text
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  setTitle(title) {
    this._addStyledText(
      title,
      POSTextAlignment.CENTER,
      [POSPrintStyle.BOLD, POSPrintStyle.DOUBLE_HEIGHT]
    );
    return this;
  }

  /**
   * Adds an item with name and price
   * @param {string} name - Item name 
   * @param {number} price - Item price
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  addItem(name, price) {
    const formattedLine = this._formatItemLine(name, price);
    this._addPlainText(formattedLine);
    return this;
  }

  /**
   * Adds a styled item with name and price
   * @param {string} name - Item name
   * @param {number} price - Item price
   * @param {...number} styles - Text styles to apply
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  addItemStyled(name, price, ...styles) {
    const formattedLine = this._formatItemLine(name, price);
    this._addStyledText(formattedLine, POSTextAlignment.LEFT, styles);
    return this;
  }

  /**
   * Sets the receipt footer text
   * @param {string} footer - Footer text
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  setFooter(footer) {
    this._addStyledText(
      footer,
      POSTextAlignment.CENTER,
      [POSPrintStyle.UNDERLINE]
    );
    this.addFeed(2);
    return this;
  }

  /**
   * Adds a custom component to the receipt
   * @param {POSComponent} component - Component to add
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  addComponent(component) {
    this.receipt.addContent(component);
    return this;
  }

  /**
   * Adds line feeds to the receipt
   * @param {number} count - Number of line feeds
   * @returns {POSReceiptBuilder} This builder for chaining
   */
  addFeed(count = 1) {
    this.receipt.addFeeds(count);
    return this;
  }

  /**
   * Builds and returns the receipt
   * @returns {POSReceipt} The built receipt
   */
  build() {
    this.addFeed(3);
    return this.receipt;
  }
  
  /**
   * Formats an item line with name and price
   * @param {string} name - Item name
   * @param {number} price - Item price
   * @returns {string} Formatted line
   * @private
   */
  _formatItemLine(name, price) {
    const formattedPrice = price.toFixed(2);
    return `${name.padEnd(20)}${formattedPrice.padStart(6)}`;
  }
  
  /**
   * Adds plain text to the receipt
   * @param {string} text - Text to add
   * @private
   */
  _addPlainText(text) {
    const textComponent = new POSTextBuilder(text).build();
    this.receipt.addContent(textComponent);
  }
  
  /**
   * Adds styled text to the receipt
   * @param {string} text - Text to add
   * @param {number} alignment - Text alignment
   * @param {number[]} styles - Text styles
   * @private
   */
  _addStyledText(text, alignment, styles = []) {
    const textBuilder = new POSTextBuilder(text);
    
    if (alignment !== undefined) {
      textBuilder.setAlignment(alignment);
    }
    
    if (styles.length > 0) {
      textBuilder.setStyle(...styles);
    }
    
    this.receipt.addContent(textBuilder.build());
  }
}

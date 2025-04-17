import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { getSpecialCharBuffer } from "./utils/POSSpecialCharacter.js";
import {
  POSPrintStyle,
  POSTextAlignment
} from "./utils/constants.js";

/**
 * @class
 * @extends POSComponent
 * @description Represents a text component with formatting options
 * 
 * The POSText class handles text printing with support for styles,
 * alignment and special characters.
 */
export class POSText extends POSComponent {
  /**
   * Creates a new text component
   * @param {POSTextBuilder} builder - Builder with configuration
   */
  constructor(builder) {
    super();
    this.text = builder.text;
    this.styles = builder.styles || [];
    this.alignment = builder.alignment || POSTextAlignment.LEFT;
  }

  /**
   * Converts the text component to a binary buffer for printing
   * @returns {Buffer} Binary representation of the text component
   */
  toBytes() {
    const buffers = [];
    
    // Add alignment settings
    buffers.push(this._createAlignmentBuffer());
    
    // Add style settings
    buffers.push(this._createStylesBuffer());
    
    // Add text content
    buffers.push(this._createContentBuffer());
    
    // Add line feed
    buffers.push(Buffer.from([0x0A]));
    
    // Reset to normal style
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, POSPrintStyle.NONE]));

    return Buffer.concat(buffers);
  }
  
  /**
   * Creates a buffer with alignment commands
   * @returns {Buffer} Alignment command buffer
   * @private
   */
  _createAlignmentBuffer() {
    return Buffer.from([POSCommand.ESC, POSCommand.ALIGNMENT, this.alignment]);
  }
  
  /**
   * Creates a buffer with style commands
   * @returns {Buffer} Style command buffer
   * @private
   */
  _createStylesBuffer() {
    const styleBuffers = [];
    for (const style of this.styles) {
      styleBuffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, style]));
    }
    return Buffer.concat(styleBuffers.length ? styleBuffers : [Buffer.from([])]); 
  }
  
  /**
   * Creates a buffer with the text content
   * @returns {Buffer} Text content buffer
   * @private
   */
  _createContentBuffer() {
    const byteArr = [];
    let i = 0;
    
    while (i < this.text.length) {
      if (this._isSpecialCharStart(i)) {
        const { newIndex, bytes } = this._processSpecialChar(i);
        bytes.forEach(b => byteArr.push(b));
        i = newIndex;
      } else {
        byteArr.push(this.text.charCodeAt(i));
        i++;
      }
    }
    
    return Buffer.from(byteArr);
  }
  
  /**
   * Checks if the character at the given index starts a special character
   * @param {number} index - Character index
   * @returns {boolean} True if it's a special character start
   * @private
   */
  _isSpecialCharStart(index) {
    return this.text[index] === "{" && this.text.indexOf("}", index) > index;
  }
  
  /**
   * Processes a special character sequence
   * @param {number} startIndex - Start index of the sequence
   * @returns {Object} Object with new index and byte array
   * @private
   */
  _processSpecialChar(startIndex) {
    const endIndex = this.text.indexOf("}", startIndex);
    const key = this.text.slice(startIndex + 1, endIndex);
    const charBuffer = getSpecialCharBuffer(key);
    
    if (charBuffer) {
      return { 
        newIndex: endIndex + 1, 
        bytes: charBuffer 
      };
    }
    
    return { 
      newIndex: startIndex + 1, 
      bytes: [this.text.charCodeAt(startIndex)] 
    };
  }
}

/**
 * @class
 * @description Builder for creating text components with a fluent API
 * 
 * The POSTextBuilder provides a convenient way to configure text
 * components with styles and alignment.
 */
export class POSTextBuilder {
  /**
   * Creates a new text builder
   * @param {string} text - Text content
   */
  constructor(text) {
    this.text = text;
    this.styles = [];
    this.alignment = POSTextAlignment.LEFT;
  }

  /**
   * Sets the text styles
   * @param {...number} styles - Style constants to apply
   * @returns {POSTextBuilder} This builder for chaining
   */
  setStyle(...styles) {
    this.styles = styles;
    return this;
  }

  /**
   * Sets the text alignment
   * @param {number} alignment - Alignment constant
   * @returns {POSTextBuilder} This builder for chaining
   */
  setAlignment(alignment) {
    this.alignment = alignment;
    return this;
  }

  /**
   * Builds and returns the text component
   * @returns {POSText} The built text component
   */
  build() {
    return new POSText(this);
  }
}

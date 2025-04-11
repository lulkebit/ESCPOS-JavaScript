import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { getSpecialCharBuffer } from "./utils/POSSpecialCharacter.js";
import {
  POSPrintStyle,
  POSTextAlignment
} from "./utils/constants.js";

export class POSText extends POSComponent {
  constructor(builder) {
    super();
    this.text = builder.text;
    this.styles = builder.styles || [];
    this.alignment = builder.alignment || POSTextAlignment.LEFT;
  }

  toBytes() {
    const buffers = [];

    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.ALIGNMENT, this.alignment]));

    for (const style of this.styles) {
      buffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, style]));
    }

    const byteArr = [];
    for (let i = 0; i < this.text.length; i++) {
      if (this.text[i] === "{" && this.text.indexOf("}", i) > i) {
        const end = this.text.indexOf("}", i);
        const key = this.text.slice(i + 1, end);
        const charBuf = getSpecialCharBuffer(key);
        if (charBuf) {
          for (const b of charBuf) byteArr.push(b);
          i = end;
          continue;
        }
      }
      byteArr.push(this.text.charCodeAt(i));
    }

    buffers.push(Buffer.from(byteArr));
    buffers.push(Buffer.from([0x0A]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, POSPrintStyle.NONE]));

    return Buffer.concat(buffers);
  }
}

export class POSTextBuilder {
  constructor(text) {
    this.text = text;
    this.styles = [];
    this.alignment = POSTextAlignment.LEFT;
  }

  setStyle(...styles) {
    this.styles = styles;
    return this;
  }

  setAlignment(alignment) {
    this.alignment = alignment;
    return this;
  }

  build() {
    return new POSText(this);
  }
}

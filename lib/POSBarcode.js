import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { POSBarcodeType, POSBarcodeWidth } from "./utils/constants.js";

export class POSBarcode extends POSComponent {
  constructor(builder) {
    super();
    this.data = builder.data;
    this.type = builder.type || POSBarcodeType.CODE128;
    this.width = builder.width || POSBarcodeWidth.DEFAULT;
  }

  toBytes() {
    const buffers = [];

    buffers.push(Buffer.from([
      POSCommand.GS,
      POSCommand.SET_BAR_WIDTH,
      this.width
    ]));

    const dataBuf = Buffer.from(this.data, "ascii");

    buffers.push(Buffer.from([
      POSCommand.GS,
      POSCommand.BARCODE_PRINT,
      this.type,
      dataBuf.length
    ]));

    buffers.push(dataBuf);
    buffers.push(Buffer.from([POSCommand.LINE_FEED]));

    return Buffer.concat(buffers);
  }
}

export class POSBarcodeBuilder {
  constructor(data) {
    this.data = data;
    this.type = POSBarcodeType.CODE128;
    this.width = POSBarcodeWidth.DEFAULT;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setWidth(width) {
    this.width = width;
    return this;
  }

  build() {
    return new POSBarcode(this);
  }
}

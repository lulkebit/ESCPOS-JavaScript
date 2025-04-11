import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { POSQRCodeSize, POSQRCodeErrorCorrection } from "./utils/constants.js";

export class POSQRCode extends POSComponent {
  constructor(builder) {
    super();
    this.data = builder.data;
    this.size = builder.size || POSQRCodeSize.MEDIUM;
    this.errorCorrection = builder.errorCorrection || POSQRCodeErrorCorrection.MEDIUM;
  }

  toBytes() {
    const buffers = [];

    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 4, 0, 49, 65, 50, 0]));
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 67, this.size]));
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 69, this.errorCorrection]));

    const dataBuf = Buffer.from(this.data, "ascii");
    const totalLength = dataBuf.length + 3;
    const pL = totalLength % 256;
    const pH = Math.floor(totalLength / 256);

    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, pL, pH, 49, 80, 48]));
    buffers.push(dataBuf);

    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 81, 48]));
    buffers.push(Buffer.from([POSCommand.LINE_FEED]));

    return Buffer.concat(buffers);
  }
}

export class POSQRCodeBuilder {
  constructor(data) {
    this.data = data;
    this.size = POSQRCodeSize.MEDIUM;
    this.errorCorrection = POSQRCodeErrorCorrection.MEDIUM;
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  setErrorCorrection(ec) {
    this.errorCorrection = ec;
    return this;
  }

  build() {
    return new POSQRCode(this);
  }
}

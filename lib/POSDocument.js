import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { POSTextBuilder } from "./POSText.js";
import { POSPrintStyle } from "./utils/constants.js";
import { POSTextAlignment } from "./utils/constants.js";
import { POSLineFeed } from "./POSLineFeed.js";

export class POSDocument extends POSComponent {
  constructor() {
    super();
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
  }

  addLineFeed(count = 1) {
    this.components.push(new POSLineFeed(count));
  }

  toBytes() {
    const buffers = [];

    const filler = new POSTextBuilder("")
      .setStyle(POSPrintStyle.BOLD, POSPrintStyle.DOUBLE_WIDTH)
      .setAlignment(POSTextAlignment.CENTER)
      .build()
      .toBytes();

    for (let i = 0; i < 4; i++) buffers.push(filler);

    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PAGE_MODE]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINTER_RESET]));
    buffers.push(Buffer.from([POSCommand.GS, POSCommand.STATUS_REQUEST, 1]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.UNIDIRECTIONAL_MODE, 1]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINT_PAGE_MODE]));

    this.components.forEach(comp => {
      buffers.push(comp.toBytes());
    });

    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINTER_RESET]));

    return Buffer.concat(buffers);
  }
}

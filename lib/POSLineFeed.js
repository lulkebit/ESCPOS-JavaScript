import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";

export class POSLineFeed extends POSComponent {
  constructor(count = 1) {
    super();
    this.count = count;
  }

  toBytes() {
    return Buffer.alloc(this.count, POSCommand.LINE_FEED);
  }
}

import { POSComponent } from "./POSComponent.js";

const LINE_FEED = 0x0A; // Standard Line Feed character

export class POSLineFeed extends POSComponent {
  constructor(count = 1) {
    super();
    this.count = count;
  }

  toBytes() {
    // Use the defined LINE_FEED constant
    return Buffer.alloc(this.count, LINE_FEED);
  }
}

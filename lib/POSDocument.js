import { POSComponent } from "./POSComponent.js";
import { POSCommand } from "./POSCommand.js";
import { POSLineFeed } from "./POSLineFeed.js";

/**
 * @class
 * @extends POSComponent
 * @description Represents a printable document composed of multiple components
 * 
 * The POSDocument class is a container for multiple POSComponent instances.
 * It handles initialization of the printer and composition of different
 * components into a single print job.
 */
export class POSDocument extends POSComponent {
  /**
   * Creates a new POSDocument instance
   */
  constructor() {
    super();
    this.components = [];
    
    // Initialize with ESC/POS initialization sequence
    this.initSequence = Buffer.from([
      POSCommand.ESC, 
      POSCommand.INITIALIZE
    ]);
  }

  /**
   * Adds a component to the document
   * @param {POSComponent} component - Component to add
   * @returns {POSDocument} This document for chaining
   * @throws {Error} If the component is not a POSComponent instance
   */
  addComponent(component) {
    if (!(component instanceof POSComponent)) {
      throw new Error("Component must be an instance of POSComponent");
    }
    
    this.components.push(component);
    return this;
  }

  /**
   * Adds multiple line feeds to the document
   * @param {number} count - Number of line feeds to add
   * @returns {POSDocument} This document for chaining
   */
  addLineFeed(count = 1) {
    this.addComponent(new POSLineFeed(count));
    return this;
  }

  /**
   * Converts the document and all its components to a binary buffer for printing
   * @returns {Buffer} Binary representation of the document
   */
  toBytes() {
    // Combine initialization and all components
    const buffers = [this.initSequence];
    
    for (const component of this.components) {
      buffers.push(component.toBytes());
    }
    
    return Buffer.concat(buffers);
  }
}

/**
 * @interface
 * @description Base interface for all ESC/POS components
 * The POSComponent interface defines the common methods that all ESC/POS
 * components must implement. Components represent printable elements.
 */
export class POSComponent {
  /**
   * Converts the component to a binary buffer for printing
   * @returns {Buffer} Binary representation of the component
   */
  toBytes() {
    throw new Error("toBytes() method must be implemented");
  }
}
  
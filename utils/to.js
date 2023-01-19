/** A collection of conversion helper functions. */
class ConvertTo {
  /** meters to km */
  km(meters, precision = 2) {
    return (meters / 1000).toFixed(precision);
  }
  /** meters to miles */
  m(meters, precision = 2) {
    return (meters * 0.00062137).toFixed(precision);
  }
  /** seconds to hours */
  h(seconds, precision = 2) {
    return (seconds / 60 / 60).toFixed(precision);
  }
}

const to = new ConvertTo();

export default to;

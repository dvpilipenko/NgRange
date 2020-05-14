export class CommonFunc {
  static getBorderValue(min: number, max: number, val: number) {
    return val < min ? min : val > max ? max : val;
  }
}

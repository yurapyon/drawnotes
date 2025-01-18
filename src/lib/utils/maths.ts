export namespace Maths {
  export interface Point {
    x: number;
    y: number;
  }

  export namespace Point {
    export const zero = (): Point => {
      return { x: 0, y: 0 };
    };
  }

  export const mod = (a: number, b: number) => {
    return ((a % b) + b) % b;
  };

  export const clamp = (value: number, min: number, max: number) => {
    return Math.max(Math.min(value, max), min);
  };
}

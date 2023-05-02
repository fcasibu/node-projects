import MyArray from ".";

describe("#myFind", () => {
  const array = new MyArray(1, 2, 3, 4, 5);

  it("should return the found value when the condition is satisfied", () => {
    const target = 3;
    expect(array.myFind((el) => el === target)).toBe(target);
  });

  it("should return undefined if no value is found", () => {
    expect(array.myFind((el) => el > 5)).toBeUndefined();
  });

  it("should work with finding an object", () => {
    const array = new MyArray({ x: 1 }, { x: 2 }, { x: 3 });

    expect(array.myFind((el) => el.x === 2)).toEqual({ x: 2 });
  });
});

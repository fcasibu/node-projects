import MyArray from ".";

describe("#myFindIndex", () => {
  const array = new MyArray(1, 2, 3, 4, 5);

  it("should return the index of the found value when the condition is satisfied", () => {
    const target = 3;
    expect(array.myFindIndex((el) => el === target)).toBe(2);
  });

  it("should return -1 if no value is found", () => {
    expect(array.myFindIndex((el) => el > 5)).toBe(-1);
  });

  it("should work with finding the index of an object", () => {
    const array = new MyArray({ x: 1 }, { x: 2 }, { x: 3 });

    expect(array.myFindIndex((el) => el.x === 2)).toBe(1);
  });
});

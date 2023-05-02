import MyArray from ".";

describe("#myAt", () => {
  const array = new MyArray(1, 2, 3, 4, 5, 6);
  const firstValue = 1;
  const thirdValue = 3;
  const lastValue = 6;
  const positiveOutOfBoundsIndex = 7;
  const negativeOutOfBoundsIndex = -7;

  it("does not return anything if a postive index is out of bounds", () => {
    expect(array.myAt(positiveOutOfBoundsIndex)).toBeUndefined();
  });

  it("does not return anything if a negative index is out of bounds", () => {
    expect(array.myAt(negativeOutOfBoundsIndex)).toBeUndefined();
  });

  it("wraps to the end of the array if the index is negative", () => {
    expect(array.myAt(-1)).toBe(lastValue);
  });

  it(`correctly returns the value ${firstValue} if the index is 0`, () => {
    expect(array.myAt(0)).toBe(firstValue);
  });

  it(`correctly returns the value of ${thirdValue} if the index is 2`, () => {
    expect(array.myAt(2)).toBe(thirdValue);
  });
});

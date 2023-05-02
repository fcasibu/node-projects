import MyArray from ".";
describe("#myCopyWithin", () => {
  let array = new MyArray(1, 2, 3, 4, 5);

  beforeEach(() => {
    array = new MyArray(1, 2, 3, 4, 5);
  });

  it("should mutate the original array and not create a new array instance", () => {
    expect(array.myCopyWithin(2)).toBe(array);
  });

  it("should not extend the array if only the target is specified", () => {
    expect(array.myCopyWithin(4)).not.toBe(new MyArray(1, 2, 3, 4, 1));
  });

  it("should change the target's value when specified a start", () => {
    expect(array.myCopyWithin(0, 3)).toEqual(new MyArray(4, 5, 3, 4, 5));
  });

  it("should copy from the range of start until but not including the end and change from the target", () => {
    expect(array.myCopyWithin(0, 2, 4)).toEqual(new MyArray(3, 4, 3, 4, 5));
  });

  it("should not copy when index is out of bounds", () => {
    expect(array.myCopyWithin(-10)).toEqual(new MyArray(1, 2, 3, 4, 5));
  });

  it("should not copy when start is greater than or equal to the array length", () => {
    expect(array.myCopyWithin(0, array.length)).toEqual(
      new MyArray(1, 2, 3, 4, 5)
    );
  });

  it("should not copy when end is positioned before or at start", () => {
    expect(array.myCopyWithin(0, 2, 1)).toEqual(new MyArray(1, 2, 3, 4, 5));
  });

  it("should be able to work backwards when negative integers are used", () => {
    expect(array.myCopyWithin(-2, -3, -1)).toEqual(new MyArray(1, 2, 3, 3, 4));
  });
});

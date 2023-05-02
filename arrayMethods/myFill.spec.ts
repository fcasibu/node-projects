import MyArray from ".";

describe("#myFill", () => {
  let array = new MyArray(1, 2, 3, 4, 5);

  beforeEach(() => {
    array = new MyArray(1, 2, 3, 4, 5);
  });

  it("shoud mutate the original array", () => {
    expect(array.myFill(1)).toBe(array);
  });

  it("should fill the array with only the value if no start is specified", () => {
    expect(array.myFill(1)).toEqual(new MyArray(1, 1, 1, 1, 1));
  });

  it("should fill the array with the value at the specified start position", () => {
    expect(array.myFill(1, 2)).toEqual(new MyArray(1, 2, 1, 1, 1));
  });

  it("should fill the array with the value at the specified start until the specified end", () => {
    expect(array.myFill(1, 1, 3)).toEqual(new MyArray(1, 1, 1, 1, 5));
  });

  it("should fill the array with any value other than a number", () => {
    const obj = { x: 1 };
    expect(array.myFill(obj)).toEqual(new MyArray(obj, obj, obj, obj, obj));
  });
});

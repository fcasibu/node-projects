import MyArray from ".";

describe("#mySlice", () => {
  let array = new MyArray(1, 2, 3, 4, 5);

  beforeEach(() => {
    array = new MyArray(1, 2, 3, 4, 5);
  });

  it("should create a new array instance with all elements when no argument is specified", () => {
    expect(array.mySlice()).not.toBe(array);
  });

  it("should extract elements after and including the specified start", () => {
    expect(array.mySlice(2)).toEqual(new MyArray(3, 4, 5));
  });

  it("should extract elements at the start up to but not including the end", () => {
    expect(array.mySlice(1, 4)).toEqual(new MyArray(2, 3, 4));
  });
});

import MyArray from ".";

describe("#myFlat", () => {
  it("should by default flatten with a depth of 1", () => {
    const array = new MyArray(1, 2, 3, new MyArray(4, 5));
    expect(array.myFlat()).toEqual(new MyArray(1, 2, 3, 4, 5));
  });

  it("should flattened two inner arrays with a depth of 2", () => {
    const array = new MyArray(1, new MyArray(2, 3, new MyArray(4, 5)));

    expect(array.myFlat(2)).toEqual(new MyArray(1, 2, 3, 4, 5));
  });

  it("should throw an error if depth is greater than 20", () => {
    const array = new MyArray([4, 5, 1, 2, 3, new MyArray(1, 2, 3)], 1);
    expect(() => array.myFlat(21)).toThrow("Depth cannot go above 20");
  });
});

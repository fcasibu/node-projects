import MyArray from ".";

describe("#myConcat", () => {
  let array = new MyArray(1, 2, 3, 4, 5, 6);

  beforeEach(() => {
    array = new MyArray(1, 2, 3, 4, 5, 6);
  });

  it("should return a new array instance", () => {
    expect(array.myConcat()).not.toBe(array);
  });

  it("should return a new array instance with the appended values", () => {
    const toAppend = new MyArray(7, 8, 9, 10);
    expect(array.myConcat(toAppend)).toEqual(
      new MyArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
  });

  it("should return a new array instance with the appended value of 7", () => {
    const toAppend = 7;
    expect(array.myConcat(toAppend)).toEqual(new MyArray(1, 2, 3, 4, 5, 6, 7));
  });

  it("should return a new array intance with multiple appended values", () => {
    expect(array.myConcat(7, 8, 9, 10)).toEqual(
      new MyArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
  });

  it("should append the values in another array to itself and return a new array instance", () => {
    const toAppend = new MyArray(7, 8, 9, 10);
    expect(array.myConcat(toAppend)).toEqual(
      new MyArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
  });
});

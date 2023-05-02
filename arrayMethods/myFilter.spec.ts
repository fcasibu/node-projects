import MyArray from ".";

describe("#myFitle", () => {
  const array = new MyArray(1, 2, 3, 4, 5);

  it("should return a new instance of the array", () => {
    expect(array.myFilter((el) => el <= 3)).not.toBe(array);
  });

  it("it should return a new instance of the array with filtered values", () => {
    expect(array.myFilter((el) => el <= 3)).toEqual(new MyArray(1, 2, 3));
  });

  it("should work filtering an array of objects", () => {
    const array = new MyArray({ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 });
    expect(array.myFilter((el) => el.x !== 3)).toEqual(
      new MyArray({ x: 1 }, { x: 2 }, { x: 4 }, { x: 5 })
    );
  });
});

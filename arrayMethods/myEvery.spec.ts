import MyArray from ".";

describe("#myEvery", () => {
  it("should return false if every elements in the array does not satisfy the condition in the predicate", () => {
    const array = new MyArray(1, 2, 3, 4, 5);
    const expected = array.myEvery((element) => element <= 4);
    expect(expected).toBeFalsy();
  });

  it("should return true if every elements in the array satisfies the condition in the predicate", () => {
    const array = new MyArray(2, 4, 6, 8, 10);
    const expected = array.myEvery((element) => element % 2 === 0);
    expect(expected).toBeTruthy();
  });
});

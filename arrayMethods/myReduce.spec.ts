import MyArray from ".";

describe("#myFlat", () => {
  it("should be able to sum all the elements in an array", () => {
    const array = new MyArray(1, 2, 3, 4, 5);
    const sum = array.myReduce((acc, curr) => acc + curr);

    expect(sum).toEqual(15);
  });

  it("should be able to add an initial value as the accumulator", () => {
    const array = new MyArray(1, 2, 3, 4, 5);
    const sum = array.myReduce((acc, curr) => acc + curr, 15);

    expect(sum).toEqual(30);
  });

  it("should be able to create an array value type based on the initial value", () => {
    const array = new MyArray(1, 2, 3, 4, 5);
    const newValue = array.myReduce(
      (acc, curr) => acc.concat(curr),
      [] as number[]
    );

    expect(newValue instanceof MyArray).toBeFalsy();
    expect(newValue instanceof Array).toBeTruthy();
    expect(newValue).toEqual([1, 2, 3, 4, 5]);
  });

  it("should be able to create an object value type based on the initial value", () => {
    const array = new MyArray(1, 2, 3, 4, 5);
    const newValue = array.myReduce(
      (acc, curr) => ({ ...acc, [curr]: curr }),
      {} as Record<number, number>
    );

    expect(newValue instanceof MyArray).toBeFalsy();
    expect(newValue instanceof Object).toBeTruthy();
    expect(newValue).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
  });

  it("should throw an error if array has no elements and there is no initial value specified", () => {
    const array = new MyArray();
    expect(array.myReduce).toThrow(
      "Reduce of empty array with no initial value"
    );
  });
});

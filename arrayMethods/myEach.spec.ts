import MyArray from ".";

describe("#myEach", () => {
  const array = new MyArray(1, 2, 3, 4, 5, 6);

  it("should execute the block for each element", () => {
    const myEachResults: number[] = [];
    const eachResults: number[] = [];

    array.myEach((element) => {
      myEachResults.push(element * 2);
    });

    array.forEach((element) => {
      eachResults.push(element * 2);
    });

    expect(myEachResults).toEqual(eachResults);
  });
});

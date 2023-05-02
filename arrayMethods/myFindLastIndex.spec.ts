import MyArray from ".";

describe("#myFindLast", () => {
  const array = new MyArray(1, 2, 3, 4, 5);

  it("should take two steps to get the index of the value 4", () => {
    let i = 0;
    const foundValue = array.myFindLastIndex((el) => {
      i++;
      return el === 4;
    });

    expect(i).toBe(2);
    expect(foundValue).toBe(3);
  });

  it("should return the index of the found value when the condition is satisfied", () => {
    const target = 3;
    expect(array.myFindLastIndex((el) => el === target)).toBe(2);
  });

  it("should return -1 if no value is found", () => {
    expect(array.myFindLastIndex((el) => el > 5)).toBe(-1);
  });

  it("should work with finding an object", () => {
    const array = new MyArray({ x: 1 }, { x: 2 }, { x: 3 });

    expect(array.myFindLastIndex((el) => el.x === 2)).toEqual(1);
  });
});

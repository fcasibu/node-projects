import MyArray from ".";

describe("#myFindLast", () => {
  const array = new MyArray(1, 2, 3, 4, 5);

  it("should take two steps to get the value 4", () => {
    let i = 0;
    const foundValue = array.myFindLast((el) => {
      i++;
      return el === 4;
    });
    expect(i).toBe(2);
    expect(foundValue).toBe(4);
  });

  it("should return the found value when the condition is satisfied", () => {
    const target = 3;
    expect(array.myFindLast((el) => el === target)).toBe(target);
  });

  it("should return undefined if no value is found", () => {
    expect(array.myFindLast((el) => el > 5)).toBeUndefined();
  });

  it("should work with finding an object", () => {
    const array = new MyArray({ x: 1 }, { x: 2 }, { x: 3 });

    expect(array.myFindLast((el) => el.x === 2)).toEqual({ x: 2 });
  });
});

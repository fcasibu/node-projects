type CallbackFn<T, K = T> = (element: T, index: number, array: MyArray<T>) => K;

type ReduceFn<T, K> = (
  accumulator: K,
  currentValue: T,
  index: number,
  array: MyArray<T>
) => K;
// didn't know about this pattern, just got it from their lib, good stuff
type Flatten<T, D extends number> = {
  done: T;
  recurse: T extends MyArray<infer InnerArr> | Array<infer InnerArr>
    ? Flatten<
        InnerArr,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ][D]
      >
    : T;
}[D extends -1 ? "done" : "recurse"];

export default class MyArray<T extends unknown> extends Array {
  constructor(...value: T[] | unknown[]) {
    super(...(value as any));
  }

  public myAt(index: number): T | undefined {
    if (index < 0) {
      return this[index + this.length];
    }

    return this[index];
  }

  public myConcat<K>(...args: K[]): MyArray<T | K> {
    const newArray = new MyArray(...this);

    if (!args.length) return newArray;

    for (const element of Array.isArray(args[0]) ? args[0] : args) {
      newArray.push(element);
    }

    return newArray;
  }

  public myCopyWithin(target: number, start = 0, end = this.length) {
    const normalizedTarget = this.normalize(target);
    const normalizedStart = this.normalize(start);
    const normalizedEnd = this.normalize(end);

    if (normalizedTarget === normalizedStart) return this;
    if (normalizedStart >= this.length) return this;
    if (normalizedEnd <= normalizedStart) return this;

    const copiedElements = this.mySlice(normalizedStart, normalizedEnd);

    for (let i = 0; i < copiedElements.length; ++i) {
      this[normalizedTarget + i] = copiedElements[i];
    }

    return this;
  }

  public myEvery(predicate: CallbackFn<T, boolean>) {
    for (let i = 0; i < this.length; i++) {
      if (!predicate(this[i], i, this)) {
        return false;
      }
    }

    return true;
  }

  public myFill<K>(value: K, start = 0, end = this.length) {
    const normalizedStart = this.normalize(start);
    const normalizedEnd = this.normalize(end);

    let i = normalizedStart;
    while (i <= normalizedEnd && i !== this.length) {
      this[i] = value;
      i++;
    }

    return this;
  }

  public myFilter<K>(callback: CallbackFn<T, K>): MyArray<T> {
    const newArray = new MyArray<T>();

    for (let i = 0; i < this.length; ++i) {
      const callbackResult = callback(this[i], i, this);
      if (callbackResult) {
        newArray.push(this[i]);
      }
    }

    return newArray;
  }

  public myFind(callback: CallbackFn<T, boolean>): T | undefined {
    for (let i = 0; i < this.length; ++i) {
      const callbackResult = callback(this[i], i, this);

      if (callbackResult) {
        return this[i];
      }
    }

    return undefined;
  }

  public myFindIndex(callback: CallbackFn<T, boolean>) {
    for (let i = 0; i < this.length; ++i) {
      const callbackResult = callback(this[i], i, this);

      if (callbackResult) {
        return i;
      }
    }

    return -1;
  }

  public myFindLast(callback: CallbackFn<T, boolean>): T | undefined {
    for (let i = this.length - 1; i >= 0; --i) {
      const callbackResult = callback(this[i], i, this);

      if (callbackResult) {
        return this[i];
      }
    }

    return undefined;
  }

  public myFindLastIndex(callback: CallbackFn<T, boolean>) {
    for (let i = this.length - 1; i >= 0; i--) {
      const callbackResult = callback(this[i], i, this);

      if (callbackResult) {
        return i;
      }
    }

    return -1;
  }

  public myFlat<D extends number = 1>(
    d?: D
  ): MyArray<Flatten<MyArray<T> | Array<T>, D>> {
    const depth = d ?? 1;
    if (depth > 20) throw new Error("Depth cannot go above 20");

    return this.myReduce((acc, curr) => {
      if (Array.isArray(curr) && depth !== 0) {
        acc.push(...this.myFlat.call(curr, depth - 1));
        return acc;
      }

      acc.push(curr);
      return acc;
    }, new MyArray() as MyArray<Flatten<MyArray<T> | Array<T>, D>>);
  }

  public myReduce<K = T>(callback: ReduceFn<T, K>, initialValue?: K) {
    if (!this?.length)
      throw new Error("Reduce of empty array with no initial value");

    let result = initialValue;
    const start = initialValue ? 0 : 1;

    for (let i = start; i < this.length; ++i) {
      result = callback(result ?? this[i - 1], this[i], i, this);
    }

    return result as K;
  }

  public myEach(callback: CallbackFn<T, void>) {
    for (let i = 0; i < this.length; ++i) {
      callback(this[i], i, this);
    }
  }

  public mySlice(start = 0, end = this.length): MyArray<T> {
    const newArray = new MyArray();
    const normalizedStart = this.normalize(start);
    const normalizedEnd = this.normalize(end);

    for (let i = normalizedStart; i < normalizedEnd; ++i) {
      newArray.push(this[i]);
    }

    return newArray;
  }

  public myEachCons(n: number, callback: (element: MyArray<T>) => void) {
    for (let i = 0; i <= this.length - n; ++i) {
      callback(this.mySlice(i, n + i));
    }
  }

  private normalize(value: number) {
    if (value < -this.length) return 0;

    if (value > this.length) return this.length;

    if (value < 0) return value + this.length;

    return value;
  }
}

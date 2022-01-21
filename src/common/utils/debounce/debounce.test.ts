import "@testing-library/react";
import { debounce } from "./debounce";

let countExecution = 0;
let parameters: any = null;

const time = (time: number) => new Promise<void>((r) => setTimeout(r, time));

const testFunction = (params?: any) => {
  if (params) {
    parameters = params;
  }
  countExecution++;
};

describe("debounce", () => {
  beforeEach(() => {
    countExecution = 0;
  });

  test("Execute just once in 1 second by default", async () => {
    const fnDebounce = debounce(testFunction);

    for (let index = 0; index < 400; index++) {
      fnDebounce();
    }

    await time(1000);

    expect(countExecution).toEqual(1);
  });

  test("Return same parameters after its execution", async () => {
    const fnDebounce = debounce(testFunction, 1);

    const objectTest = {
      name: "test1",
      id: 12
    };

    fnDebounce(objectTest);

    await time(10);

    expect(parameters).toEqual({ ...objectTest });
  });
});

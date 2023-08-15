import ProblemBody from "../src/routes/ProblemBody";
import createConfig from "../src/routes/createConfig";
import OutputConfig from "../src/solver/OutputConfig";
const matchStr = { left: (x: string) => x, right: () => "" };
const matchConfig = {
  left: () => ({ format: "text", includePageCount: true } as OutputConfig),
  right: (x: OutputConfig) => x,
};
describe("createConfig", () => {
  test("empty body", () => {
    const body = {};
    const config = createConfig(body);
    expect(config.isLeft()).toBeTruthy();
    const err = config.match(matchStr);
    expect(err).toBe("must specify the output format");
  });
  describe("JSON format", () => {
    const body: Partial<ProblemBody> = { format: "json" };
    test("empty page count", () => {
      const config = createConfig(body);
      expect(config.isLeft()).toBeTruthy();
      const err = config.match(matchStr);
      expect(err).toBe("must specify if a page count is required or not");
    });
    test("page count true", () => {
      body.pageCount = true;
      const config = createConfig(body);
      expect(config.isRight()).toBeTruthy();
      const value = config.match(matchConfig);
      expect(value.format).toBe("json");
      expect(value.includePageCount).toBeTruthy();
      delete body.pageCount;
    });
    test("page count false", () => {
      body.pageCount = false;
      const config = createConfig(body);
      expect(config.isRight()).toBeTruthy();
      const value = config.match(matchConfig);
      expect(value.format).toBe("json");
      expect(value.includePageCount).toBeFalsy();
      delete body.pageCount;
    });
  });
  describe("text format", () => {
    const body: Partial<ProblemBody> = { format: "text" };
    test("empty page count", () => {
      const config = createConfig(body);
      expect(config.isLeft()).toBeTruthy();
      const err = config.match(matchStr);
      expect(err).toBe("must specify if a page count is required or not");
    });
    test("page count true", () => {
      body.pageCount = true;
      const config = createConfig(body);
      expect(config.isRight()).toBeTruthy();
      const value = config.match(matchConfig);
      expect(value.format).toBe("text");
      expect(value.includePageCount).toBeTruthy();
      delete body.pageCount;
    });
    test("page count false", () => {
      body.pageCount = false;
      const config = createConfig(body);
      expect(config.isRight()).toBeTruthy();
      const value = config.match(matchConfig);
      expect(value.format).toBe("text");
      expect(value.includePageCount).toBeFalsy();
      delete body.pageCount;
    });
  });
});

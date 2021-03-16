const banana = require("../building_blocks/getquestion").banana;
describe("Test", () => {
  test("test works", () => {
    expect(banana("name")).toBe(5);
  });
});

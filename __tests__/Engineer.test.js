const Engineer = require("../lib/Engineer");

test("must instantiate Engineer Object", () => {
  const e = new Engineer();
  expect(typeof(e)).toBe("object");
});

test("able to pass the arguments via constructor", () => {
  const e = new Engineer(1, "name", "testdata@testdata.com","testhub");
  expect(e.id).toBe(1);
});

test("able to recieve github name of engineer from getGitHub()", () => {
    const testData = "testhub";
    const e = new Engineer(1, "name", "testdata@testdata.com","testhub");
    expect(e.getGitHub()).toBe(testData);
  });
  

test("must see \"Engineer\" as return from getRole()", () => {
  const testData = "Engineer";
  const e = new Engineer(1,"subhash", "testdata@testdata.com","testhub");
  expect(e.getRole()).toBe(testData);
});
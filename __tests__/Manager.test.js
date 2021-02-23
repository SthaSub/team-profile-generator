const Manager = require("../lib/Manager");

test("must instantiate Manager Object", () => {
  const e = new Manager();
  expect(typeof(e)).toBe("object");
});

test("able to pass the arguments via constructor", () => {
  const e = new Manager(1, "name", "testdata@testdata.com", "0000");
  expect(e.id).toBe(1);
});

test("able to recieve office number of manager from getOfficerNumber()", () => {
    const testData = "0812344";
    const e = new Manager(1, "name", "testdata@testdata.com","0812344");
    expect(e.getOfficerNumber()).toBe(testData);
  });
  

test("must see \"Manager\" as return from getRole()", () => {
  const testData = "Manager";
  const e = new Manager(1,"subhash", "testdata@testdata.com","0812344");
  expect(e.getRole()).toBe(testData);
});
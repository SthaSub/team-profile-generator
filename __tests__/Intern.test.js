const Intern = require("../lib/Intern");

test("must instantiate Intern Object", () => {
  const e = new Intern();
  expect(typeof(e)).toBe("object");
});

test("able to pass the arguments via constructor", () => {
  const e = new Intern(1, "name", "testdata@testdata.com","UOFA");
  expect(e.id).toBe(1);
});

test("able to recieve school name of intern from getSchool()", () => {
    const testData = "UOFA";
    const e = new Intern(1, "name", "testdata@testdata.com","UOFA");
    expect(e.getSchool()).toBe(testData);
  });
  

test("must see \"Intern\" as return from getRole()", () => {
  const testData = "Intern";
  const e = new Intern(1,"subhash", "testdata@testdata.com","UOFA");
  expect(e.getRole()).toBe(testData);
});
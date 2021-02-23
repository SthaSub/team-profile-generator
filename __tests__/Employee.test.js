const Employee = require("../lib/Employee");

test("must instantiate Employee Object", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("able to pass the arguments via constructor", () => {
  const e = new Employee(1, "name", "testdata@testdata.com");
  expect(e.id).toBe(1);
});

test("able to get id from getID()", () => {
  const testData = 1;
  const e = new Employee(1, "name","email");
  expect(e.getID()).toBe(testData);
});

test("able to recieve email from getEmail()", () => {
  const testdata = "testdata@testdata.com";
  const e = new Employee(1, "name" ,testdata);
  expect(e.getEmail()).toBe(testdata);
});

test("able to get name from getName()", () => {
  const testData = "Subhash";
  const e = new Employee(1,testData,"test@test.com");
  expect(e.getName()).toBe(testData);
});


test("must see \"Employee\" as return from getRole()", () => {
  const testData = "Employee";
  const e = new Employee(1,"subhash", "testdata@testdata.com");
  expect(e.getRole()).toBe(testData);
});
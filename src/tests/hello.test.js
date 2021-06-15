import React from "react";

describe("JSX", () => {
  it("calls React.createElement", () => {
    const createElementSpy = jest.spyOn(React, "createElement");
    <h1>Hi, JSX!</h1>;
    expect(createElementSpy).toHaveBeenCalledWith("h1", null, "Hi, JSX!");
  });
});

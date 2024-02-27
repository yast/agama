/*
 * Copyright (c) [2022-2024] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import {
  classNames, partition, noop, toValidationError,
  localConnection, remoteConnection, isObject,
  findContent
} from "./utils";

describe("noop", () => {
  it("returns undefined", () => {
    const result = noop();
    expect(result).toBeUndefined();
  });
});

describe("partition", () => {
  it("returns two groups of elements that do and do not satisfy provided filter", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [odd, even] = partition(numbers, number => number % 2);

    expect(odd).toEqual([1, 3, 5]);
    expect(even).toEqual([2, 4, 6]);
  });
});

describe("classNames", () => {
  it("join given arguments, ignoring falsy values", () => {
    expect(classNames(
      "bg-yellow",
      false && "h-24",
      undefined,
      null,
      true && "w-24",
    )).toEqual("bg-yellow w-24");
  });
});

describe("toValidationError", () => {
  it("converts an issue to a validation error", () => {
    const issue = {
      description: "Issue 1",
      details: "Details issue 1",
      source: "config",
      severity: "warn"
    };
    expect(toValidationError(issue)).toEqual({ message: "Issue 1" });
  });
});

const localURL = new URL("http://127.0.0.90/");
const localURL2 = new URL("http://localhost:9090/");
const remoteURL = new URL("http://example.com");

describe("localConnection", () => {
  describe("when the page URL is " + localURL, () => {
    it("returns true", () => {
      expect(localConnection(localURL)).toEqual(true);
    });
  });

  describe("when the page URL is " + localURL2, () => {
    it("returns true", () => {
      expect(localConnection(localURL2)).toEqual(true);
    });
  });

  describe("when the page URL is " + remoteURL, () => {
    it("returns false", () => {
      expect(localConnection(remoteURL)).toEqual(false);
    });
  });
});

describe("remoteConnection", () => {
  describe("when the page URL is " + localURL, () => {
    it("returns true", () => {
      expect(remoteConnection(localURL)).toEqual(false);
    });
  });

  describe("when the page URL is " + localURL2, () => {
    it("returns true", () => {
      expect(remoteConnection(localURL2)).toEqual(false);
    });
  });

  describe("when the page URL is " + remoteURL, () => {
    it("returns false", () => {
      expect(remoteConnection(remoteURL)).toEqual(true);
    });
  });
});

describe("isObject", () => {
  it("returns true when called with an object", () => {
    expect(isObject({ dummy: "object" })).toBe(true);
  });

  it("returns false when called with null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("returns false when called with undefined", () => {
    expect(isObject()).toBe(false);
  });

  it("returns false when called with a string", () => {
    expect(isObject("dummy string")).toBe(false);
  });

  it("returns false when called with an array", () => {
    expect(isObject(["dummy", "array"])).toBe(false);
  });

  it("returns false when called with a date", () => {
    expect(isObject(new Date())).toBe(false);
  });

  it("returns false when called with regexp", () => {
    expect(isObject(/aRegExp/i)).toBe(false);
  });

  it("returns false when called with a set", () => {
    expect(isObject(new Set(["dummy", "set"]))).toBe(false);
  });

  it("returns false when called with a map", () => {
    const map = new Map([
      ["dummy", "map"]
    ]);
    expect(isObject(map)).toBe(false);
  });
});

describe("findContent", () => {
  const obj = {
    example: "of an object",
    to: { find: "something" },
    deep: {
      enough: "by using findContent method"
    }
  };

  it("returns undefined is an object is not given", () => {
    expect(findContent({ in: ["Dummy", "Array"], at: "something.deep" })).toBe(undefined);
  });

  it("returns undefined is path is not given", () => {
    expect(findContent({ in: obj })).toBe(undefined);
  });

  it("returns undefined is path is not given", () => {
    expect(findContent({ in: obj })).toBe(undefined);
  });

  it("returns undefined is given path does not exist", () => {
    expect(findContent({ in: obj, at: "something.not.defined.yet" })).toBe(undefined);
  });

  it("returns found content at given path (string)", () => {
    expect(findContent({ in: obj, at: "deep.enough" })).toBe("by using findContent method");
  });

  it("returns found content at given path (array)", () => {
    expect(findContent({ in: obj, at: ["deep.enough"] })).toBe("by using findContent method");
  });

  it("returns first content found when more than one path are given", () => {
    expect(
      findContent({ in: obj, at: ["not.defined", "to", "example", "deep.enough"] })
    ).toEqual({ find: "something" });
  });
});

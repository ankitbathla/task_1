const { readFile, writeData, fetchData, main } = require("./index");
const axios = require("axios");
const fs = require("fs");

beforeEach(() => jest.restoreAllMocks());
describe("spyOn axios", () => {
    test("should return a default value that we set using overRiding", () => {
        const spy = jest.spyOn(axios, "get").mockImplementation(() => {
            return Promise.resolve("URL");
        });
        return fetchData("african").then((data) => {
            expect(data).toEqual("URL");
        });
    });

    test("should return an error value", () => {
        const spy = jest.spyOn(axios, "get").mockImplementation(() => {
            return Promise.reject(new Error("cant fetch the Api"));
        });
        return fetchData("african").catch((data) => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

describe("readFile", () => {
    test("should read the file", () => {
        const spy = jest
            .spyOn(fs, "readFile")
            .mockImplementation((_, __, cb) => {
                cb();
            });
        return readFile().then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    test("fail to read the file", () => {
        const spy = jest
            .spyOn(fs, "readFile")
            .mockImplementation((_, __, cb) => {
                cb(new Error("file cant be read"));
            });
        return readFile().catch((err) => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

describe("writeFile", () => {
    test("should be able to writeFile", () => {
        const spy = jest
            .spyOn(fs, "writeFile")
            .mockImplementation((_, __, cb) => {
                cb();
            });
        return writeData().then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    test("should not be able to write the file", () => {
        const spy = jest
            .spyOn(fs, "writeFile")
            .mockImplementation((_, __, cb) => {
                cb(new Error("file cant be write"));
            });
        return writeData().catch(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

test("data is african", () => {
    return expect(readFile()).resolves.toBe("african");
});
test("final result success", () => {
    return main().then((result) => {
        expect(result).toEqual(true);
    });
});

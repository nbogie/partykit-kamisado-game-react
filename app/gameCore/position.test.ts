import { generateAllPositionsBetween } from "./position";

test("vertical 1a", () => {
    const result = generateAllPositionsBetween({ x: 0, y: 0 }, { x: 0, y: 7 });
    expect(result).toEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 0, y: 6 },
    ]);
});
test("vertical 1b", () => {
    const result = generateAllPositionsBetween({ x: 0, y: 7 }, { x: 0, y: 0 });
    expect(result).toEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 0, y: 6 },
    ]);
});
test("horizontal 1a", () => {
    const result = generateAllPositionsBetween({ x: 0, y: 0 }, { x: 7, y: 0 });
    expect(result).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
    ]);
});
test("horizontal 1b", () => {
    const result = generateAllPositionsBetween({ x: 7, y: 0 }, { x: 0, y: 0 });
    expect(result).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
    ]);
});

test("diagonal 1", () => {
    const result = generateAllPositionsBetween({ x: 1, y: 1 }, { x: 4, y: 4 });
    expect(result).toEqual([
        { x: 2, y: 2 },
        { x: 3, y: 3 },
    ]);
});

test("diagonal 2a", () => {
    const result = generateAllPositionsBetween({ x: 4, y: 1 }, { x: 1, y: 4 });
    expect(result).toEqual([
        { x: 3, y: 2 },
        { x: 2, y: 3 },
    ]);
});

test("diagonal 2b", () => {
    const result = generateAllPositionsBetween({ x: 1, y: 4 }, { x: 4, y: 1 });
    expect(result).toEqual([
        { x: 2, y: 3 },
        { x: 3, y: 2 },
    ]);
});

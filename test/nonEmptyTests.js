const assert = require("assert");
const { NonEmptyArray, NonEmptySet } = require("../nonEmpty");

const arrayCannotBeEmptied = array => {
    try {
        array.splice(0, array.length);
    } catch (e) {
        return true;
    }
    return false;
}

describe("nonEmptyArray", function () {
    describe("#constructor", function () {
        it("should be NonEmptyArray", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            assert.strictEqual(nonEmpty.constructor, NonEmptyArray);
        });
    });

    describe("#length", function () {
        it("should be correct", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            assert.strictEqual(nonEmpty.length, 4);
            nonEmpty.length = 3;
            assert.strictEqual(nonEmpty.length, 3);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#concat", function () {
        it("should work with a single value", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const result = nonEmpty.concat(5);
            assert.deepEqual(nonEmpty, [1, 2, 3, 4]);
            assert.deepEqual(result, [1, 2, 3, 4, 5]);
            assert(arrayCannotBeEmptied(result));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
        it("should work with an Array", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const result = nonEmpty.concat([5, 6, 7]);
            assert.deepEqual(nonEmpty, [1, 2, 3, 4]);
            assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
            assert(arrayCannotBeEmptied(result));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
        it("should work with a nonEmptyArray", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const result = nonEmpty.concat(NonEmptyArray(5, 6, 7));
            assert.deepEqual(nonEmpty, [1, 2, 3, 4]);
            assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
            assert(arrayCannotBeEmptied(result));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#copyWithin", function () {
        it("should copy", function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const result = nonEmpty.copyWithin(2, 0);
            assert.deepEqual(result, nonEmpty);
            assert.deepEqual(result, [1, 2, 1, 2]);
            assert(arrayCannotBeEmptied(result));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#entries", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            assert.deepEqual(array.entries(), nonEmpty.entries());
        });
    });

    describe("#every", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            const f = x => x < 5;
            const g = x => x > 1;
            assert.deepEqual(array.every(f), nonEmpty.every(f));
            assert.deepEqual(array.every(g), nonEmpty.every(g));
        });
    });

    describe("#fill", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            const filledArrayResult = array.fill(10);
            assert.strictEqual(filledArrayResult, array);
            const filledNonEmptyResult = nonEmpty.fill(10);
            assert(filledNonEmptyResult.constructor === NonEmptyArray);
            assert(arrayCannotBeEmptied(filledNonEmptyResult));
            assert.deepEqual(filledArrayResult, filledNonEmptyResult);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#filter", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            const f = x => x < 4;
            const g = x => x > 1;
            const filteredArray = array.filter(f);
            const filteredNonEmpty = nonEmpty.filter(f);
            assert.deepEqual(filteredArray, filteredNonEmpty);
            assert(arrayCannotBeEmptied(filteredNonEmpty));
            assert.deepEqual(array.filter(g), nonEmpty.filter(g));
        });
    });

    describe("#find", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            const f = x => x < 4;
            const g = x => x > 1;
            const arrayFound = array.find(f);
            const nonEmptyFound = nonEmpty.find(f);
            assert.deepEqual(arrayFound, nonEmptyFound);
            assert.strictEqual(array.find(g), nonEmpty.find(g));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#findIndex", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(...array);
            const f = x => x < 4;
            const g = x => x > 1;
            const arrayFound = array.findIndex(f);
            const nonEmptyFound = nonEmpty.findIndex(f);
            assert.deepEqual(arrayFound, nonEmptyFound);
            assert.strictEqual(array.findIndex(g), nonEmpty.findIndex(g));
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#from", function() {
        it("should work like Array", function() {
            const string = "qwertyuiop";
            const array = Array.from(string);
            const nonEmpty = NonEmptyArray.from(string);
            assert.deepEqual(array, nonEmpty);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#isArray", function() {
        it("should work like Array", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4)
            assert(Array.isArray(nonEmpty));
        });
    });

    describe("#map", function() {
        it("should work like Array", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const mapped = nonEmpty.map(x => x * 2);
            assert(arrayCannotBeEmptied(mapped));
        });
    });

    describe("#pop", function() {
        it("should work like Array", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const popped = nonEmpty.pop();
            assert.strictEqual(popped, 4);
            assert.deepEqual(nonEmpty, [1, 2, 3]);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#push", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const arrayLength = array.push(5);
            const nonEmptyLength = nonEmpty.push(5);
            assert.strictEqual(arrayLength, nonEmptyLength);
            assert.deepEqual(nonEmpty, array);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#reverse", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const reversedArray = array.reverse();
            const reversedNonEmpty = nonEmpty.reverse();
            assert.deepEqual(reversedNonEmpty, reversedArray);
            assert.deepEqual(nonEmpty, array);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#shift", function() {
        it("should work like Array", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const shifted = nonEmpty.shift();
            assert.strictEqual(shifted, 1);
            assert.deepEqual(nonEmpty, [2, 3, 4]);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#sort", function() {
        it("should work like Array", function() {
            const array = [1, 4, 3, 2];
            const nonEmpty = NonEmptyArray(1, 4, 3, 2);
            const sortedArray = array.sort();
            const sortedNonEmpty = nonEmpty.sort();
            assert.deepEqual(sortedNonEmpty, sortedArray);
            assert.deepEqual(nonEmpty, array);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#splice", function () {
        it('should return []', function () {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            assert.deepEqual(nonEmpty.splice(2, 0, "Lemon"), []);
            assert.deepEqual(nonEmpty, [1, 2, "Lemon", 3, 4]);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#unshift", function() {
        it("should work like Array", function() {
            const array = [1, 2, 3, 4];
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            const arrayLength = array.unshift(5);
            const nonEmptyLength = nonEmpty.unshift(5);
            assert.strictEqual(arrayLength, nonEmptyLength);
            assert.deepEqual(nonEmpty, array);
            assert(arrayCannotBeEmptied(nonEmpty));
        });
    });

    describe("#index", function() {
        it("should work", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            assert.strictEqual(nonEmpty[3], 4);
            nonEmpty[3] = 12;
            assert.deepEqual(nonEmpty, [1, 2, 3, 12]);
            assert(arrayCannotBeEmptied(nonEmpty));
        })
    });

    describe("#instanceof", function() {
        it("should work", function() {
            const nonEmpty = NonEmptyArray(1, 2, 3, 4);
            assert(nonEmpty instanceof Array);
            assert(nonEmpty instanceof NonEmptyArray);
        })
    });
});

const setCannotBeEmptied = set => {
    try {
        set.clear();
    } catch (e) {
        return true;
    }
    return false;
}

describe("nonEmptySet", function () {
    describe("#constructor", function () {
        it("should be NonEmptySet", function () {
            const nonEmpty = NonEmptySet(1, 2, 3, 4);
            assert.strictEqual(nonEmpty.constructor, NonEmptySet);
        });
    });

    describe("#size", function () {
        it("should be correct", function () {
            const nonEmpty = NonEmptySet(1, 2, 3, 4);
            assert.strictEqual(nonEmpty.size, 4);
        });
    });

    describe("#add", function () {
        it("should work like Set", function () {
            const nonEmpty = NonEmptySet(1, 2, 3, 4);
            const set = new Set(nonEmpty);
            const nonEmptyResult = nonEmpty.add(5);
            const setResult = set.add(5);
            assert.deepEqual([...nonEmpty], [...set]);
            assert.deepEqual(nonEmptyResult, setResult);
            assert(setCannotBeEmptied(nonEmptyResult));
            assert(setCannotBeEmptied(nonEmpty));
        });
    });

    describe("#delete", function () {
        it("should work like Set", function () {
            const nonEmpty = NonEmptySet(2, 3);
            const set = new Set(nonEmpty);
            const nonEmptyResult = nonEmpty.delete(3);
            const setResult = set.delete(3);
            assert.deepEqual([...nonEmpty], [...set]);
            assert.strictEqual(nonEmptyResult, setResult);
            assert(setCannotBeEmptied(nonEmptyResult));
            assert(setCannotBeEmptied(nonEmpty));
            assert.throws(
                () => {
                    nonEmpty.delete(2);
                },
                TypeError
            );
        });
    });

    describe("#instanceof", function() {
        it("should work", function() {
            const nonEmpty = NonEmptySet(1, 2, 3, 4);
            assert(nonEmpty instanceof Set);
            assert(nonEmpty instanceof NonEmptySet);
        })
    });
});


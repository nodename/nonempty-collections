const getProperty = (target, propertyName) => {
    const property = Reflect.get(target, propertyName);
    if (property instanceof Function) {
        return property.bind(target);
    } else {
        return property;
    }
}

const arrayHandler = {
    get: function (nonEmptyArray, propertyName) {
        if (propertyName == "splice") { // mutating function that may truncate the array
            return function (...args) {
                const array = Array(...nonEmptyArray);
                const result = array.splice(...args);
                if (array.length == 0) {
                    throw new TypeError("NonEmptyArray must not be empty");
                } else {
                    return nonEmptyArray.splice(...args);
                }
                return result;
            }
        } else if (propertyName == "concat"
            || propertyName == "slice"
            || propertyName == "copyWithin"
            || propertyName == "fill"
            || propertyName == "filter"
            || propertyName == "map") { // return value must be made into a NonEmptyArray
            return function (...args) {
                const property = getProperty(nonEmptyArray, propertyName);
                const result = property(...args);
                return NonEmptyArray(...result);
            };
        } else if (propertyName == "reverse") {
            return function () {
                nonEmptyArray.reverse();
                return nonEmptyArray;
            };
        } else if (propertyName == "constructor") {
            return NonEmptyArray;
        } else {
            return getProperty(nonEmptyArray, propertyName);
        }
    }
};


// We insert a new prototype between the nonempty array and Array.prototype:

const NonEmptyArrayPrototype = {
    toString: function () {
        const superValue = Array.prototype.toString.bind(this)();
        return "NonEmptyArray[" + superValue + "]";
    }
};
Reflect.setPrototypeOf(NonEmptyArrayPrototype, Array.prototype);

const NonEmptyArray = (...values) => {
    if (values.length == 0) {
        throw new TypeError("NonEmptyArray must not be empty");
    }
    Reflect.setPrototypeOf(values, NonEmptyArrayPrototype);
    return new Proxy(values, arrayHandler);
};

// This is needed to make instanceof work properly:
NonEmptyArray.prototype = NonEmptyArrayPrototype;
// This would not accomplish that!:
// Reflect.setPrototypeOf(NonEmptyArray, NonEmptyArrayPrototype);

NonEmptyArray.from = obj => {
    const values = Array.from(obj);
    return NonEmptyArray(...values);
}

const setHandler = {
    get: function (nonEmptySet, propertyName) {
        if (propertyName == "delete") { // mutating function that may truncate the set
            return function (arg) {
                const set = new Set(nonEmptySet);
                const result = set.delete(arg);
                if (set.size == 0) {
                    throw new TypeError("NonEmptySet must not be empty");
                } else {
                    return nonEmptySet.delete(arg);
                }
                return result;
            }
        } else if (propertyName == "constructor") {
            return NonEmptySet;
        } else {
            return getProperty(nonEmptySet, propertyName);
        }
    }
};


// We insert a new prototype between the nonempty array and Array.prototype:

const NonEmptySetPrototype = {
    toString: function () {
        return "[object NonEmptySet]";
    },
    clear: function () {
        throw new TypeError("NonEmptySet must not be empty");
    }
};
Reflect.setPrototypeOf(NonEmptySetPrototype, Set.prototype);

const NonEmptySet = (...values) => {
    if (values.length == 0) {
        throw new TypeError("NonEmptySet must not be empty");
    }
    const set = new Set(values);
    Reflect.setPrototypeOf(set, NonEmptySetPrototype);
    return new Proxy(set, setHandler);
};

// This is needed to make instanceof work properly:
NonEmptySet.prototype = NonEmptySetPrototype;
// This would not accomplish that!:
// Reflect.setPrototypeOf(NonEmptySet, NonEmptySetPrototype);

var exports = module.exports = {
    NonEmptySet: NonEmptySet,
    NonEmptyArray: NonEmptyArray
};


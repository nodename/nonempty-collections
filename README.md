# nonempty-collections

A type NonEmptyArray that inherits from JavaScript's Array type and guarantees that it always has at least one item.
A type NonEmptySet that inherits from JavaScript's Set type and guarantees that it always has at least one item.

Usage:

```javascript
const { NonEmptyArray, NonEmptySet } = require("nonempty-collections");

myArray = NonEmptyArray(1, 2, 3);
mySet = NonEmptyset(1, 2, 3);
```

The APIs are the same as those of Array and Set respectively; where appropriate, they return an object of their own type rather than the base type. Any operation that would empty the container will instead throw a TypeError.
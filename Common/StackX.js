/**
 * Created by Mark on 2/6/2015.
 */

Common = {
    StackX: function StackX(maxArraySize) {
        var maxSize, stackArray, top;


        maxSize = maxArraySize;
        stackArray = new Array(maxSize);
        top = -1;

        this.push = function (input) {
            stackArray[++top] = input;

        };

        this.pop = function () {
            if (!this.isEmpty()) {
                return stackArray[top--];
            }

        };

        this.isEmpty = function () {
            return (top === -1);
        };

        this.isFull = function () {
            return (top === maxSize - 1);
        }


    }
};
//# sourceURL=Common/StackX.js
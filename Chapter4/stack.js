/**
 * Created by Mark on 2/6/2015.
 */

(function () {

    $("#content").append('<div class="page-header">' +
    '<h1>Chapter 4 - Listing 4.1 - The Stack</h1></div>');

    var theStack = new StackX();

    theStack.push(20);
    theStack.push(40);
    theStack.push(60);
    theStack.push(80);


    BrowserHelper.printMessage("Popping the stack...");
    while (!theStack.isEmpty()) {
        BrowserHelper.printMessage(theStack.pop() + " ");
    }

    function StackX(maxArraySize) {
        var maxSize, stackArray, top;


        maxSize = maxArraySize;
        stackArray = new Array(10);
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

})();
//# sourceURL=Chapter4/stack.js
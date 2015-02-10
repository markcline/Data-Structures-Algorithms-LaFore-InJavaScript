/**
 * Created by Mark on 2/6/2015.
 */

var Namespace = {


    StackX: function StackX(maxArraySize) {
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
};

//equivalent to our main function
(function () {

    function doRev(inputString) {


        var stackSize = inputString.length;

        var theStack = new Namespace.StackX(stackSize);

        for (var counter = 0; counter < inputString.length; counter++) {
            theStack.push(inputString.charAt(counter));
        }

        var output = "";

        while (!theStack.isEmpty()) {
            output = output + (theStack.pop());
        }

        $("#reversedstring").empty();

        BrowserHelper.printMessage("Reversed String:" + output, "reversedstring");

    }

    $.get("fragments/reverse.html", function (data) {
        $("#content").append(data);

        //add submit handler to the form button
        $('#form').submit(function (event) {
            event.preventDefault();
            doRev($("#inputString").val());
            return false;
        });
    });

    $("#content").append('<h1>Chapter 4 - Listing 4.2 - Reversing a string</h1>');

    //}*/
})();


//# sourceURL=Chapter4/reverse.js
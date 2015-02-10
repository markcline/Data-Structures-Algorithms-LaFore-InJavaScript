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


    },

    BracketChecker: function (userInput) {
        var input = userInput;


        this.check = function () {
            var stackSize = input.length;
            var theStack = new Namespace.StackX(stackSize);

            var currentChar;

            for (var i = 0; i < input.length; i++) {
                currentChar = input.charAt(i);
                switch (currentChar) {
                    case "{":
                    case "[":
                    case "(":
                    {
                        theStack.push(currentChar);
                        break;
                    }
                    case "}":
                    case "]":
                    case ")":
                    {
                        if (!theStack.isEmpty()) {
                            olderChar = theStack.pop();
                            if ((currentChar === '}' && olderChar !== "{") ||
                                (currentChar === "]" && olderChar !== "[") ||
                                (currentChar === ")" && olderChar !== "(")) {
                                console.log("Error:" + currentChar + " at position #" + i);
                                return false;
                            }
                        }
                        else //prematurely empty
                        {
                            console.log("Error:" + currentChar + " at position #" + i);
                            return false;
                        }
                    }

                }
            }
            //at this point, all the brackets should have been completed
            if (!theStack.isEmpty()) {
                console.log("Error: Missing Right Delimiter(s)" + theStack);
                return false;
            }
            else {
                return true;
            }
        }
    } //end bracket checker
};

//equivalent to our main function
(function () {

    function bracketsApp(inputString) {


        var bracketChecker = new Namespace.BracketChecker(inputString);

        $("#result").empty();

        if (bracketChecker.check()) {
            BrowserHelper.printMessage("The check was successful", "result");
        }
        else {
            BrowserHelper.printMessage("The check was NOT successful", "result");

        }


    }

    $.get("fragments/brackets.html", function (data) {
        $("#content").append(data);

        //add submit handler to the form button
        $('#form').submit(function (event) {
            event.preventDefault();
            bracketsApp($("#inputString").val());
            return false;
        });
    });

    $("#content").append('<h1>Chapter 4 - Listing 4.3 - Stacks used to check matching brackets</h1>');

    //}*/
})();


//# sourceURL=Chapter4/brackets.js
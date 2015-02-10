/**
 * Created by Mark on 2/6/2015.
 */

modules.postfix = function () {


    this.InToPost = function (userInput) {

        var input = userInput;
        var operatorStack = new Common.StackX(input.length);

        //this(in terms of the new instance is implicitely returned when using NEW InToPost(userInput)

        function gotParen(input2) {

            var output = "";

            //pop the stack until we find the opening paren
            while (!operatorStack.isEmpty()) {
                var opTop = operatorStack.pop();
                if (opTop !== "(") {
                    output = output + opTop;
                }
                else {
                    break;
                }
            }
            return output;
        }

        function gotOper(currentOperator, precendence) {
            var precedence2;

            while (!operatorStack.isEmpty()) {
                var opTop = operatorStack.pop(); //get last operator from the stack
                if (opTop === "(") {
                    operatorStack.push(opTop); //put previous one back on the stack
                    break;
                }
                else {
                    precedence2 = getPrecedence(opTop);

                    /*if the operator on the stack has high precedence
                     put it back on the stack
                     */
                    if (precedence2 < precendence) {
                        operatorStack.push(opTop);
                        break;
                    }
                    else {
                        return opTop; //newer operator has higher precedence, so we can pop the old one
                    }
                }
            }
            operatorStack.push(currentOperator); //add current operator to the stack

        }

        //as functions aren't available outside the namespace, this is similar to using private
        function getPrecedence(operator) {
            if (operator === "+" || operator === "-")
                return 1;
            else // * or /
                return 2;
        }


        this.evaluatePostFix = function (postfixArray) {
            var tempStack, val1, val2, operator, interimCalculation;

            tempStack = new Common.StackX(100);

            for (var i = 0; i < postfixArray.length; i++) {
                //this code looks confusing and would be better as a named function
                //but it's just showing an example of how anonymous immediate functions can be used
                if ((function (obj) {
                        return !$.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
                    })(postfixArray[i])) //each time this is run, pass the current value into the function
                {
                    console.log("It's a number! " + postfixArray[i]);
                    tempStack.push(parseFloat(postfixArray[i]));
                }
                else {
                    //pop operands
                    operator = postfixArray[i];
                    val1 = tempStack.pop();
                    val2 = tempStack.pop();

                    switch (operator) {
                        case "+":
                        {
                            interimCalculation = val1 + val2;
                            break;
                        }
                        case "_":
                        {
                            interimCalculation = val1 - val2;
                            break;
                        }
                        case "*":
                        {
                            interimCalculation = val1 * val2;
                            break;
                        }
                        case "/":
                        {
                            interimCalculation = val1 / val2;
                            break;
                        }
                        default:
                        {
                            interimCalculation = 0;

                        }


                    }
                    tempStack.push(interimCalculation); //push interim back onto the stack
                }
            }
            return interimCalculation; //this will be the last interim answer
        };

        function shiftAndReduce(inputArray) {

            return (inputArray.splice(0, inputArray.length).reduce(function (previousValue, currentValue) {
                return previousValue.concat(currentValue);
            })); //pull operand off it's stack

        }

        this.doTrans = function () {

            var output = [];
            var returnVal;
            var temp = [];

            for (var i = 0; i < input.length; i++) {


                console.log("current character is:" + input[i]);
                switch (input[i]) {
                    case "+":
                    case "-":
                    {
                        returnVal = gotOper(input[i], 1);
                        output.push(shiftAndReduce(temp));

                        /*output.push(temp.splice(0,temp.length).reduce(function(previousValue, currentValue, index, array)
                         {
                         return previousValue.concat(currentValue);
                         })); //pull operand off it's stack*/
                        if (returnVal)
                            output.push(returnVal); //here we're using the regular JS push command
                        break;
                    }
                    case "*":
                    case "/":
                    {
                        returnVal = gotOper(input[i], 2);
                        if (temp.length > 0) {
                            output.push(shiftAndReduce(temp));
                        }
                        if (returnVal)
                            output.push(returnVal);
                        break;
                    }
                    case "(":
                    {
                        operatorStack.push(input[i]); //push parens to stack
                        break;
                    }
                    case ")":
                    {
                        returnVal = gotParen(input[i]);
                        if (temp.length > 0) {
                            output.push(shiftAndReduce(temp));
                        }
                        if (returnVal)
                            output.push(returnVal);
                        break;
                    }
                    default:
                    {
                        //temp = temp + input[i];
                        temp.push(input[i]);
                        //output.push(input[i]); //must be an operand - add to output
                        break;
                    }
                }
            }

            if (temp.length > 0) {
                output.push(shiftAndReduce(temp));
            }

            while (!operatorStack.isEmpty()) {
                //display stack
                output.push(operatorStack.pop());
            }
            //display stack again
            return output;
        }

    }; //end intopost


    //equivalent to our main function
    this.initView = function () {


        //making this (which is the parent object, aka the namespace available through a closure
        var that = this;

        $.get("fragments/infix.html", function (data) {
            $("#content").append(data);

            //add submit handler to the form button
            $('#form').submit(function (event) {
                event.preventDefault();
                (function (inputString) {
                    var inFix = new that.InToPost(inputString);

                    var el = $("#result")

                    el.empty();

                    var results = inFix.doTrans();

                    var mathAnswer = inFix.evaluatePostFix(results);

                    el.append(results);

                    el.append("=" + mathAnswer);

                })($("#inputString").val());

                return false;
            });
        });

        $("#content").append('<h1>Chapter 4 - Listing 4.8 - A real calculator</h1>');

        //}*/
    }


}; //end postfix module


//# sourceURL=Chapter4/postfix.js
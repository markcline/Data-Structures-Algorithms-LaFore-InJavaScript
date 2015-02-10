/**
 * Created by Mark on 2/6/2015.
 */

modules.infix = function () {


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

        function getPrecedence(operator) {
            if (operator === "+" || operator === "-")
                return 1;
            else // * or /
                return 2;
        }

        this.doTrans = function () {

            var output = "";
            var returnVal;

            for (var i = 0; i < input.length; i++) {


                console.log("current character is:" + input[i]);
                switch (input[i]) {
                    case "+":
                    case "-":
                    {
                        returnVal = gotOper(input[i], 1);
                        if (returnVal)
                            output = output + returnVal;
                        break;
                    }
                    case "*":
                    case "/":
                    {
                        returnVal = gotOper(input[i], 2);
                        if (returnVal)
                            output = output + returnVal;
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
                        if (returnVal)
                            output = output + returnVal;
                        break;
                    }
                    default:
                    {
                        output = output + input[i]; //must be an operand - add to output
                        break;
                    }
                }
            }
            while (!operatorStack.isEmpty()) {
                //display stack
                output = output + operatorStack.pop();
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

                    var el = $("#result");
                    el.empty();

                    var results = inFix.doTrans();

                    el.append(results);

                })($("#inputString").val());

                return false;
            });
        });

        $("#content").append('<h1>Chapter 4 - Listing 4.7 - Parsing Arithmetic - converts pre-fix to post-fix</h1>');

        //}*/
    }


}; //end InFix namespace


//# sourceURL=Chapter4/infix.js
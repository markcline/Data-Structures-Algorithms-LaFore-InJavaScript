/**
 * Created by Mark on 1/30/2015.
 */

//static class for helpers like printing to the screen
var BrowserHelper = {


    //takes in an arbitrary data element and prints it
    //prints multi-dimensional objects as tables within tables (rows not columns)
    printMessage : function(message)
    {

        //var _div = document.createElement("div");


        //inner function (not accessible outside this function
        //used for recursion - recurses until the item isn't an array
        var printInnerMessage = function(message)
        {


            if (message.constructor === Array)  //or could have used Array.isArray
            {

                var _div = document.createElement("div");

                _div.classList.add("container");

                //print a table if the incoming object was an array
                var _table = document.createElement("table");

                _div.appendChild(_table);


                _table.classList.add("table");
                _table.classList.add("table-bordered");
                _table.classList.add("table-striped");


                _div.appendChild(_table);
                var _tbody = document.createElement("tbody");

                _table.appendChild(_tbody);

                message.forEach(function(element) {

                    var _row = document.createElement("tr");
                    _tbody.appendChild(_row);

                    var _td = document.createElement("td");
                    _row.appendChild(_td);

                    _td.appendChild(printInnerMessage(element));
                });

                return _div;

            }
            else
            {
                var _paragraph = document.createElement("p");

                var _text = document.createTextNode(message);
                _paragraph.appendChild(_text);

                return _paragraph;
            }

        };



        document.getElementById("content").appendChild( printInnerMessage(message));

    }
};

var MainApp = {
simpleRouter : function() {
    var newTarget = window.location.hash.replace("#", "");

    $("#content").empty();

    switch (newTarget) {
        case "Listing23":
        {
            new HighArrayApp();
            break;
        }
        case "About":
        {
            $(function () {
                $.get("fragments/About.html", function (data) {
                    $("#content").append(data);
                });
            });
        }

    }
},

initialize: function () {
    $(window).on('hashchange', MainApp.simpleRouter);
}
};

window.onload = MainApp.initialize;


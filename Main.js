/**
 * Created by Mark on 1/30/2015.
 */


//simple little holder for our modules (i.e. lessons)
var modules = {};

//static class for helpers like printing to the screen
var BrowserHelper = {


    //takes in an arbitrary data element and prints it
    //prints multi-dimensional objects as tables within tables (rows not columns)
    printMessage: function (message, root)
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


        //use our main content area unless otherwise specified
        if (!root)
            root = "content";

        document.getElementById(root).appendChild(printInnerMessage(message));

    }
};

var MainApp = {

//very simple router to handle page transitions
simpleRouter : function() {


    var newTarget = window.location.hash.replace("#", "");

    var URL;
    URL = {
        "Listing24": "Chapter2/OrderedArrayApp.js",
        "Listing23": "Chapter2/HighArrayApp.js",
        "Listing25" : "Chapter2/ClassDataArray.js",
        "Listing31" : "Chapter3/BubbleSortApp.js",
        "Listing32" : "Chapter3/SelectionSort.js",
        "Listing33": "Chapter3/InsertSort.js",
        "Listing34": "Chapter3/ObjectSort.js",
        "Listing41": "Chapter4/stack.js",
        "Listing42": "Chapter4/Reverse.js",
        "Listing43": "Chapter4/Brackets.js",
        "Listing44": "Chapter4/queue.js",
        "Listing45": "Chapter4/queuewithout.js",
        "Listing46": "Chapter4/priorityqueue.js",
        "Listing47": "Chapter4/infix.js",
        "Listing48": "Chapter4/postfix.js",
        "About": "About.js",
        "$": "About.js" //just going to index(ie no hash) will show about page



    };

    $("#content").empty();

    function NotFound() {
        $.get("fragments/NotFound.html", function (data) {
            $("#content").append(data);
        });
    }


    for (var key in URL)
        //for (var i=0;i<URL.length;i++)
        if (URL.hasOwnProperty(key)) //without this, we'd pull prototype methods too
        {
        {
            if (newTarget.match(key)) //for now, uses RegEx syntax
            {
                var newURL = URL[key];
                break;
            }
        }
        }



            //not found in map
            if (!newURL) {
                NotFound();
            }
            else
            {
                //unable to load the URL (probably an error
                $.getScript(newURL, function () {
                    //regex to strip out .js and any path information
                    var className = newURL.match(/.*\/([a-zA-Z0-9]*)|([a-zA-Z0-9]*)/);

                    //backwards compatibility - make sure these methods exist
                    //historical ones use immediate functions instead of init
                    if (modules[className[1]]) {
                        var module = new modules[className[1]]();
                        if (module.initView) {
                            (new modules[className[1]]().initView());
                        }
                    }
                }).fail(function () {//(jqxhr, settings, exception)
                        NotFound()
                    }
                );
            }


},

initialize: function () {

    //call our router when the hash changes
    $(window).on('hashchange', MainApp.simpleRouter);

    //this will help initiate the app and give us a homepage
    MainApp.simpleRouter();

}
};

window.onload = MainApp.initialize;


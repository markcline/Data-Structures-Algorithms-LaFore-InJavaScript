/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

(function ObjectSortApp()
{

    function ObjectSort(size) //inner function - doesn't pollute global namespace
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 3 - Listing 3.4 - Insertion Sort w/Objects</h1>' +
        '<span><p>An example extending listing 3.3 to use objects instead of integers. <strong>NOTE:</strong>' +
            ' The book showed this hardcoded to lastname. This code lets you pass on the property name to use. ' +
        '</p></span></div>');

        var arr = new Array(size); //you wouldn't typically write it this way in JS, but keeping consistency with book


        var nElems = 0; //don't technically need this since JS arrays include this


        this.insert = function(value)
        {
          arr[nElems] = value;
            nElems++;
        };

        this.sort = function(sortKey) {
            //arr.push(value);
            /*push is a stack-like construct which would be the typical way to do this in JS
             you don't need to resize the array or worry about running out of space
             */

            var in_counter,out_counter;

            if (!sortKey)
            {
                sortKey = "toString";
            }
            else
            {
                sortKey = "get" + sortKey;
            }

            for (out_counter=1;out_counter<nElems;out_counter++)
            {
                var temp = arr[out_counter];
                in_counter = out_counter;

                while (in_counter>0 && arr[in_counter-1][sortKey]() >= temp[sortKey]())
                {
                    arr[in_counter] = arr[in_counter-1]; //move one position to the left
                    --in_counter; //decrement counter - stop at first position at the latest
                }
                arr[in_counter] = temp; //move marked item to its correct position
            }

        };



        this.printArray = function () {

            BrowserHelper.printMessage("Array Length:" + nElems);
            BrowserHelper.printMessage(arr);

        }


    }


    var maxSize = 100;

    arr = new ObjectSort(maxSize);

    arr.insert(new Person("Evans","Patty",24));
    arr.insert(new Person("Smith","Lorraine",37));
    arr.insert(new Person("Yee","Tom",43));
    arr.insert(new Person("Adams","Henry",63));
    arr.insert(new Person("Hashimoto","Sato",21));
    arr.insert(new Person("Stimson","Henry",29));
    arr.insert(new Person("Velasquez","Jose",72));
    arr.insert(new Person("Lamarque","Henry",72));
    arr.insert(new Person("Vang","Minh",22));
    arr.insert(new Person("Creswell","Lucinda",18));

    arr.printArray();

    BrowserHelper.printMessage("Now sorting by First Name");

    arr.sort();

    arr.printArray();

})();
//# sourceURL=Chapter3/ObjectSort.js
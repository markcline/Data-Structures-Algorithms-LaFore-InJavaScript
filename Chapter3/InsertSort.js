/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

(function InsertSortApp()
{

    function InsertSort(size) //inner function - doesn't pollute global namespace but does prevent inheritance
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 3 - Listing 3.3 - Insertion Sort</h1>' +
        '<span><p>Shows an implementation of a insertion sort' +
        '</p></span></div>');

        var arr = new Array(size); //you wouldn't typically write it this way in JS, but keeping consistency with book


        var nElems = 0; //don't technically need this since JS arrays include this


        this.insert = function(value) {
            //arr.push(value);
            /*push is a stack-like construct which would be the typical way to do this in JS
             you don't need to resize the array or worry about running out of space
             */

            arr[nElems] = value; //insert our value
            nElems++; //increment internal counter (yes, JS array also has one)

            return true;

        };

        this.insertionSort = function()
        {

            var in_counter,out_counter;

            for (out_counter=1;out_counter<nElems;out_counter++)
        {
            var temp = arr[out_counter];
            in_counter = out_counter;

            while (in_counter>0 && arr[in_counter-1] >= temp)
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

    var sorter = new InsertSort(maxSize);

    sorter.insert(77);
    sorter.insert(99);
    sorter.insert(44);
    sorter.insert(55);
    sorter.insert(22);
    sorter.insert(88);
    sorter.insert(11);
    sorter.insert(00);
    sorter.insert(66);
    sorter.insert(33);

    sorter.printArray();

    sorter.insertionSort();


    sorter.printArray();


})();
//# sourceURL=Chapter3/InsertSort.js
/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

(function SelectionSortApp()
{

    function SelectionSort(size) //inner function - doesn't pollute global namespace but does prevent inheritance
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 3 - Listing 3.2 - Selection Sort</h1>' +
        '<span><p>Shows an implementation of a selection sort' +
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

        this.selectionSort = function()
        {

            var lowest = 0;

            for (var out_counter=0;out_counter<nElems-1;out_counter++) {
                lowest = out_counter;
                for (var in_counter = out_counter+1; in_counter < nElems; in_counter++) {

                    if (arr[in_counter] < arr[lowest])
                        lowest = in_counter;

                    //could make it even faster by finding highest at the same time
                }
                this.swap(out_counter,lowest);

            }


        };

        this.swap = function(position1, position2)
        {
            var tempValue;
            tempValue = arr[position1];
            arr[position1   ] = arr[position2];
            arr[position2] = tempValue;
        };

        this.printArray = function () {

            BrowserHelper.printMessage("Array Length:" + nElems);
            BrowserHelper.printMessage(arr);

        }


    }


    var maxSize = 100;

    var sorter = new SelectionSort(maxSize);

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


    sorter.selectionSort();


    sorter.printArray();


})();
//# sourceURL=Chapter3/SelectionSort.js
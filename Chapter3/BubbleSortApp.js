/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

(function BubbleSortApp()
{

    function BubbleSort(size) //inner function - doesn't pollute global namespace but does prevent inheritance
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 3 - Listing 3.1 - Bubble Sort</h1>' +
        '<span><p>Shows an implementation of a bubble sort' +
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

        this.bubbleSort = function()
        {

            //after one full loop, the item on the right is the highest number (hence it's sorted)
            //at each loop, one more item on the right is sorted (hence the highest values are bubbling up)
            for (var out_counter=nElems-1;out_counter>1;out_counter--) { //loop starting from the right to left
                for (var in_counter = 0; in_counter < out_counter; in_counter++) { //inner loop going from 0 to outer max
                    if (arr[in_counter] > arr[in_counter + 1])
                        this.swap(in_counter, in_counter + 1);
                }
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

    var sorter = new BubbleSort(maxSize);

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


    sorter.bubbleSort();


    sorter.printArray();


})();
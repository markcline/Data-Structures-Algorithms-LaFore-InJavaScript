/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

function OrderedArrayApp()
{
    function OrderedArray(size) //inner function - doesn't pollute global namespace
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 2 - Listing 2.4 - Ordered Array/Binary Search</h1>' +
        '<span><p>An example showing a simple binary search and the required ordered array' +
        '</p><strong>NOTE:</strong><p>As with most examples, this is for learning purposes and doesn\'t represent' +
        'the best way to accomplish something in Javascript (JS arrays support pretty much' +
        'of all this functionality natively</p></span></div>');

        var arr = new Array(size); //you wouldn't typically write it this way in JS, but keeping consistency with book


        var nElems = 0; //don't technically need this since JS arrays include this

        this.exists = function(searchKey) //duplicate function from HighArrayApp
        {
            return this.search(searchKey) !== -1;
        };

        this.search = function search(searchKey)
        {

            var lowerBound = 0;
            var upperBound = nElems - 1;

            var curIn;

            //short-circuit if length = 1 or 0
            if (nElems === 1)
                return (arr[0] == searchKey ? 0 : -1);
            else if (nElems === 0)
            {
                return -1; //if the array is empty, nothing to find!
            }
            else {
                while (true) //infinite loop - not a good practice!
                {
                    curIn = Math.round((lowerBound + upperBound) / 2);

                    if (arr[curIn] === searchKey) {
                        return curIn; //we found it!
                    }
                    else if (lowerBound > upperBound)
                    {
                        return -1; //couldn't find it
                    }
                    else
                    {
                        if (arr[curIn] < searchKey)
                        {
                            lowerBound = curIn + 1; //it's in the upper half above the midpoint
                        }
                        else
                        {
                            upperBound = curIn - 1; //it's in the lower half below the midpoint
                        }
                    }

                }
            }

        };

        this.insert = function(value) {
            //arr.push(value);
            /*push is a stack-like construct which would be the typical way to do this in JS
             you don't need to resize the array or worry about running out of space
             */

            var insertPos;

            /*linear search - not especially fast - could also use
              the binary search that we just implemented above
             */
            for (insertPos=0;insertPos<nElems;insertPos++)
            {
                if (arr[insertPos] > value)
                {
                    break;
                }
            }

            var i;
            for (i=nElems;i>insertPos;i--) //start at end and move everything up one position to make room
            {
                arr[i] = arr[i-1];
            }

            arr[insertPos] = value; //insert our value
            nElems++; //increment internal counter (yes, JS array also has one)

            return true;

        };

        /*this method didn't need to be changed
          from HighArrayApp since we can assume they are in order already
         */
        this.deleteValue = function(value)
        {
            var position = this.search(value); //first get the position of the value
            if (position === -1) {
                return false;
            } else {
                for (var i = position; i < nElems - 1; i++) //move higher ones down
                {
                    arr[i] = arr[i + 1];
                }

                nElems = nElems - 1; //this is the way this code is keeping tracking
                arr.length = nElems; //keep JS in sync
                return true;
            }

        };

        this.printArray = function () {

            BrowserHelper.printMessage("Array Length:" + nElems);
            BrowserHelper.printMessage(arr);

        }


    }


    var maxSize = 100;

    arr = new OrderedArray(maxSize);

    arr.insert(77);
    arr.insert(99);
    arr.insert(44);
    arr.insert(55);
    arr.insert(22);
    arr.insert(88);
    arr.insert(11);
    arr.insert(00);
    arr.insert(66);
    arr.insert(33);

    arr.printArray();

    var searchKey = 55;

    BrowserHelper.printMessage((arr.exists(searchKey) ? "Found item" : "Couldn't find item") + searchKey);


    arr.deleteValue(00);
    arr.deleteValue(55);
    arr.deleteValue(99);

    arr.printArray();

}
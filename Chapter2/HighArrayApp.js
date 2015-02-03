/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
to show the underlying parts
 */

function HighArrayApp()
{
    function HighArray(size) //inner function - doesn't pollute global namespace
{

    $("#content").append('<div class="page-header">' +
    '<h1>Chapter 2 - Listing 2.3 - High Array</h1>' +
    '<span><p>A somewhat more object oriented example of working with basic arrays' +
    '</p><strong>NOTE:</strong><p>As with most examples, this is for learning purposes and doesn\'t represent ' +
    'the best way to accomplish something in Javascript (JS arrays support pretty much ' +
    'all of this functionality natively</p></span></div>');

    var arr = new Array(size); //you wouldn't typically write it this way in JS, but keeping consistency with book


    var nElems = 0; //don't technically need this since JS arrays include this

    this.exists = function(searchKey)
    {
        return this.search(searchKey) !== -1; //leverages our find function to return true or false
    };

    this.search = function search(searchKey)
    {
        var matchPos;

        for(var i = 0;i< nElems;i++)
        {
            if (arr[i] === searchKey) { //if we found a match, break out of the loop
                matchPos = i;
                return matchPos;
            }
        }

        return -1; //return -1 to indicate that we didn't find it


    };

    this.insert = function(value) {
        //arr.push(value);
        /*push is a stack-like construct which would be the typical way to do this in JS
         you don't need to resize the array or worry about running out of space
         */

            arr[nElems] = value;
            nElems++;
            return true;

    };

    this.deleteValue = function(value)
    {
            var position = this.search(value); //first get the position of the value
            if (position !== -1)
            {
                for (var i = position;i<nElems-1;i++) //move higher ones down
                {
                    arr[i] = arr[i+1];
                }

                nElems = nElems - 1; //this is the way this code is keeping tracking
                arr.length = nElems; //keep JS in sync
                return true;
            }
            else
            {
                return false;
            }

    };

    this.printArray = function () {

        BrowserHelper.printMessage("Array Length:" + nElems);
        BrowserHelper.printMessage(arr);

    }


}


    var maxSize = 100;

    arr = new HighArray(maxSize);

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

    var searchKey = 35;

    BrowserHelper.printMessage((arr.exists(searchKey) ? "Found item" : "Couldn't find item") + searchKey);


    arr.deleteValue(00);
    arr.deleteValue(55);
    arr.deleteValue(99);

    arr.printArray();

}
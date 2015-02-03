/**
 * Created by Mark on 1/30/2015.
 */
/* This is not to say this is the best way to do this - in fact this is way overly complicated but is intended
 to show the underlying parts
 */

function ClassDataArrayApp()
{

    function ClassDataArray(size) //inner function - doesn't pollute global namespace
    {

        $("#content").append('<div class="page-header">' +
        '<h1>Chapter 2 - Listing 2.5 - Class Data Array</h1>' +
        '<span><p>An example extending listing 2.4 to use objects instead of integers. <strong>NOTE:</strong>' +
            ' The book example removed the binary search because it isn\'t inserting in alphabetical order but this code ' +
        ' does. A hashtable would be a better solution for this kind of key,value requirement' +
        '</p></span></div>');

        var arr = new Array(size); //you wouldn't typically write it this way in JS, but keeping consistency with book


        var nElems = 0; //don't technically need this since JS arrays include this

        this.exists = function(searchKey) //duplicate function from HighArrayApp
        {
            return this.search(searchKey) !== -1;
        };

        this.search = function search(searchKey)
        {
            var matchPos;



            for(var i = 0;i< nElems;i++)
            {
                if (typeof arr[i].getKey === 'function') {

                    if (searchKey === arr[i].getKey()) { //if we found a match, break out of the loop
                        matchPos = i;
                        return matchPos;
                    }
                }
                else
                {
                    console.log("Item doesn't implement getKey interface and was skipped" + arr[i]);
                }
            }

            return -1; //return -1 to indicate that we didn't find it

        };

        this.insert = function(value) {
            //arr.push(value);
            /*push is a stack-like construct which would be the typical way to do this in JS
             you don't need to resize the array or worry about running out of space
             */


            /* Since we are making this a person array, make sure it is actually a person!
             kind of the equivalent to typing the input (which isn't possible in JS
            * */
            if (value.constructor !== Person)
            {
                return false;
            }

            var insertPos;

            /*linear search - not especially fast - could also use
              the binary search that we just implemented above
             */
            for (insertPos=0;insertPos<nElems;insertPos++)
            {
                if (arr[insertPos].getKey() > value.getKey())
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
                console.log("Value:" + value + " not found. Unable to delete.");
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

    arr = new ClassDataArray(maxSize);

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

    var searchKey = "Stimson";

    BrowserHelper.printMessage((arr.exists(searchKey) ? "Found item: " : "Couldn't find item: ") + searchKey);


    BrowserHelper.printMessage("Deleting Smith, Yee & Creswell");
    arr.deleteValue("Smith");
    arr.deleteValue("Yee");
    arr.deleteValue("Creswell");

    arr.printArray();

}
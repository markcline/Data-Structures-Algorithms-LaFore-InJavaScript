/**
 * Created by Mark on 1/29/2015.
 */




    var MainApp = function()
{


    var arrayApp = new ArrayApp(   [77, 99, 44, 55, 22, 88, 11, 00, 66, 33]);

    var searchKey = 66;

    var deleteKey = 88;


    arrayApp.printArray();

    var matchResult = arrayApp.findItem(searchKey);

    BrowserHelper.printMessage(matchResult === -1 ? "Can't find searchkey:" + searchKey :
        "Found key: " + searchKey + " in position #" + matchResult);

    matchResult = arrayApp.deleteItem(deleteKey);

    BrowserHelper.printMessage(matchResult === -1 ? "Can't find deletekey:" + deleteKey :
    "Found delete key: " + deleteKey + " in position #" + matchResult);

    BrowserHelper.printMessage(matchResult === -1 ? "Can't find searchkey:" + searchKey :
    "Found key: " + searchKey + " in position #" + matchResult);

    arrayApp.printArray();





};

var ArrayApp = function(arrayValues) {

    var arr = arrayValues;

    this.deleteItem = function(deleteKey)
    {

        var matchPosition;

        var i;

        //first find where the key to be deleted is located
        for (i = 0;i<arr.length;i++) //using a for loop to show concepts plus foreach doesn't support break in JS
        {
            if (arr[i] === deleteKey)
            {
                matchPosition = i;
                break;
            }
        }

        if (matchPosition) //variable will be undefined if it wasn't found which is false here
        {
            for (i = matchPosition;i<arr.length-1;i++)
            {
                arr[i] = arr[i+1];
            }

            arr.length = arr.length-1; //drop the last position since we moved everything up
        }

        return matchPosition;
    };

    this.findItem = function (searchKey)
    {

        var matchPosition = -1; //-1 is the default meaning not found

        for (var i = 0;i<arr.length;i++) //using a for loop to show concepts plus foreach doesn't support break in JS
        {
            if (arr[i] === searchKey)
            {
                matchPosition = i;
                break;
            }
        }

        return matchPosition; //returns the position number where we found the match or -1 if no match

    };

    this.printArray = function () {

        BrowserHelper.printMessage("Array Length:" + arr.length);
        BrowserHelper.printMessage(arr);

    };


};



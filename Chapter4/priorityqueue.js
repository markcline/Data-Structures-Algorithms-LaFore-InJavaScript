/**
 * Created by Mark on 2/6/2015.
 */

modules.priorityqueue = function () {


    this.Queue = function (length) {

        var queueArray, front, rear, nItems, maxSize;

        maxSize = length;


        //not necessary since Javascript will auto expand/contract but just being consistent with the book
        //var queueArray = [] would be perfectly fine in JS.
        queueArray = new Array(length);
        front = 0;
        rear = -1;
        nItems = 0;

        //in a priority queue, we're going to put something at the end unless it's more important than the top items
        this.insert = function (input) {

            if (!this.isFull()) {
                if (nItems === 0) {
                    queueArray[nItems++] = input;
                }
                else {
                    for (var i = nItems - 1; i >= 0; i--) //start at end and figure out where this guy goes
                    {
                        if (input > queueArray[i]) {
                            //shift existing items to the right
                            queueArray[i + 1] = queueArray[i];
                        }
                        else
                            break; //done shifting things
                    }
                    queueArray[i + 1] = input;
                    nItems++;
                } //end else (nItems > 0)

            }
            else {
                //throw exception
                //this is not really true - a JS array would dynamically re-size
                throw new RangeError("Max queue size has been exceeded - unable to add more items");

            }

        };

        this.remove = function () //take the first item from the queue and return it
        {
            var temp;

            if (!this.isEmpty()) {
                temp = queueArray[front++]; //get value and increment front
                if (front == maxSize) //deal with wraparound
                    front = 0;
                nItems--;
                return temp;
            }
            else {
                //throw exception
            }
        };

        this.peekFront = function () //return the top item without removing it
        {
            return queueArray[front];
        };

        this.isEmpty = function () {
            return nItems === 0;
        };

        this.isFull = function () {
            return nItems === maxSize;
        };

        this.size = function () {
            return nItems;
        }

    }; //end queue


    //equivalent to our main function
    this.initView = function () {

        $("#content").append('<h1>Chapter 4 - Listing 4.6 - Priority Queue</h1>');


        var theQueue = new this.Queue(5);


        function insert(value) {
            theQueue.insert(value);
            BrowserHelper.printMessage("Added Value:" + value); //10
        }

        $("#result").empty();

        insert(30);
        insert(50);
        insert(10);
        insert(40);
        insert(20);

        BrowserHelper.printMessage("Emptying and removing stack"); //10

        while (!theQueue.isEmpty()) //empty queue and display
        {
            BrowserHelper.printMessage("Removed Value:" + theQueue.remove()); //10

        }


        //}*/
    }


}; //end queue module


//# sourceURL=Chapter4/priorityqueue.js
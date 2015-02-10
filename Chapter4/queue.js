/**
 * Created by Mark on 2/6/2015.
 */

modules.queue = function () {


    this.Queue = function (length) {

        //not necessary since Javascript will auto expand/contract but just being consistent with the book
        //var arr = [] would be perfectly fine in JS.
        var queueArray, front, rear, nItems, maxSize;

        maxSize = length;
        queueArray = new Array(length);
        front = 0;
        rear = -1;
        nItems = 0;

        this.insert = function (input) {

            if (!this.isFull()) {
                if (rear === maxSize - 1) //wrap around to beginning so that we don't have to move things
                    rear = -1;
                queueArray[++rear] = input; //increment rear and insert - so the first time this run, we insert into pos 0
                nItems++;
            }
            else {
                //throw exception
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

        $("#content").append('<h1>Chapter 4 - Listing 4.4 - Example of a queue (first in, first out)</h1>');


        var theQueue = new this.Queue(5);


        function insert(value) {
            theQueue.insert(value);
            BrowserHelper.printMessage("Added Value:" + value); //10
        }

        $("#result").empty();

        insert(10);
        insert(20);
        insert(30);
        insert(40);


        BrowserHelper.printMessage("Removed Value:" + theQueue.remove()); //10
        BrowserHelper.printMessage("Removed Value:" + theQueue.remove()); //20
        BrowserHelper.printMessage("Removed Value:" + theQueue.remove()); //30

        insert(50);
        insert(60);
        insert(70);
        insert(80);


        BrowserHelper.printMessage("Emptying and removing stack"); //10

        while (!theQueue.isEmpty()) //empty queue and display
        {
            BrowserHelper.printMessage("Removed Value:" + theQueue.remove()); //10

        }


        //}*/
    }


}; //end queue module


//# sourceURL=Chapter4/queue.js
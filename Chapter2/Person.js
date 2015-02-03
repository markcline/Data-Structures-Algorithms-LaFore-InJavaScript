/**
 * Created by Mark on 2/2/2015.
 */

//originally used as part of Listing 2.5


function Person(fName, lName, age) {

        var lastName;
        var firstName;
        var personAge;

        lastName = fName || ""; //no particular reason to do this, just using the || null operator
        firstName = lName || "";
        personAge = age || "";

        this.getKey = function () //interface-like method
        {
            return this.getLastName();
        };

        this.getLastName = function () //in JS you typically wouldn't do getters/setters like this
        {
            return lastName;
        };

        this.getFirstName = function () {
            return firstName;
        };

        this.getAge = function () {
            return age;
        };

        this.toString = function () //override the toString function from object
        {
            return "Last Name:" + lastName + ",First Name:" + firstName + ", age:" + personAge;
        }

}
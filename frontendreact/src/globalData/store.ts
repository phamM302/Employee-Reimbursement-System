/* This is a basic implementation of a store, which is basically global data storage 

Any data that you want to use throughout the entire app can reside here
Feel free look into Context API early for a more robust way to do this */

//This is just an object that stores other objects or standalone variables
export const store:any = {

    //Let's store loggedInUser info (filled after successful login)
    loggedInUser:{
        userId:0,
        username:"",
        role:""
    }, //We could have modeled this after a UserInterface, but I didn't

    //Think about your requirements when it comes to storing global data
    //you only NEED to globally store data you intend to use in multiple component

    //for instance, you could store the base URL to the server
    baseUrl: "http://localhost:7777/"

}
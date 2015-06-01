/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed url is defined', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed name is defined', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    //Test for the Menu
    describe('The menu', function() {

        // The menu element is hidden by default. Use css class menu-hidden. 
        it('is hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Check for visibility toggle of the menu when menu icon is clicked.
        it('is displayed or hidden on click', function(){
            var initialState = $('body').hasClass('menu-hidden');

            //on click of the menu icon, expect currentState to flip.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(initialState);

            //on click of the menu icon, expect currentState to flip.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(initialState);
        });
    });
    
    //Test for Initial Entries
    describe ('Initial Entries', function(){

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //loop through all the feeds.
        for (var i = 0; i<allFeeds.length-1; i++){
            beforeEach(function(done){
                loadFeed(i, function(){
                    done(); //use done() to accomodate for async call
                });
            });

            //make sure each feeds have at least one element.
            it('has at least one entry within feed', function(done){
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            });
        }
    });

    //Test for Feed Selection
    describe('New Feed Selection', function(){
        var headerTitle, postTitles;

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var i = 0;
        var j = i +1; //change 1 to 0 to check for when content is updated even when the same index is used.
        beforeEach(function(done) { //use done() for async calls
            loadFeed(i, function() {
                headerTitle = $('h1.header-title').text();
                postTitles = $('.feed .entry h2').text();
                loadFeed(j, function() {
                    done();
                });
            });
        });

        //check for update in the header title
        it('updates header title', function() {
            expect($('h1.header-title').text()).not.toBe(headerTitle);
        });

        //check for update in post titles
        it('update post title', function() {
            expect($('.feed .entry h2').text()).not.toBe(postTitles);    
        });
    });
}());

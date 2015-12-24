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
        //Test that loops through each feed
        //in the allFeeds object and ensures it has a URL defined
        //and that the URL is not empty
        it('has a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    describe('The Menu', function() {

        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('visible when clicked', function() {
            //Trigger menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //Hide menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least one entry', function(done) {
            var feedEntry = $('.feed .entry-link');
            expect(feedEntry.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var $oldFeed,
            $newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                $oldFeed = $('.feed').html();
                loadFeed(1, function() {
                    $newFeed = $('.feed').html();
                    done();
                });
            });
        });
        it('changes content when new feed loads', function(done) {
            expect($oldFeed).not.toBe($newFeed);
            done();
        });
    });
}());
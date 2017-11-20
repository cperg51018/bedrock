/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * General DOM ready handler applied to all pages in base template.
 */
(function($) {
    // page must be loaded and ready before onWindowLoad fires

    // as of jQuery 3.0, ready may not always fire before loaded,
    // so we're making sure both have completed prior to attaching
    // our 'loaded' class to the <html> element.

    // https://github.com/jquery/jquery/issues/3194#issuecomment-228556922
    var loaded = false;
    var ready = false;

    // the 'loaded' class added here is a trigger for our functional tests
    // to know when a page has fully loaded & is ready to be interacted with.
    // this class is only added after document.ready AND window.load have
    // completed.
    function onWindowLoad() {
        $('html').addClass('loaded');
    }

    $(function() {
        var client = Mozilla.Client;
        var utils = Mozilla.Utils;

        utils.initDownloadLinks();
        utils.initMobileDownloadLinks();
        utils.initLangSwitcher();

        /* Bug 1264843: In partner distribution of desktop Firefox, switch the
        downloads to corresponding partner build of Firefox for Android. */
        if (client.isFirefoxDesktop) {
            client.getFirefoxDetails(utils.maybeSwitchToDistDownloadLinks);
        }

        // if window.load happened already, fire onWindowLoad
        if (loaded) {
            onWindowLoad();
        }

        // note that document.ready happened to inform window.load
        ready = true;
    });

    $(window).on('load', function () {
        // if document.ready happened already, fire onWindowLoad
        if (ready) {
            onWindowLoad();
        }

        // note that window.load happened in case document.ready hasn't
        // finished yet
        loaded = true;
    });
})(window.jQuery);

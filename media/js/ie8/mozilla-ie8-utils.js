/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Create namespace
if (typeof Mozilla === 'undefined') {
    var Mozilla = {};
}

(function() {
    'use strict';

    var IE8Utils = {};

    /**
     * Bug 393263 A special function for IE < 9.
     * Without this hack there is no prompt to download after they click. sigh.
     * @param {link} direct link to download URL
     * @param {userAgent} optional UA string for testing purposes.
     */
    IE8Utils.triggerIEDownload = function(link, userAgent) {
        var ua = userAgent !== undefined ? userAgent : navigator.userAgent;
        // Only open if we got a link and this is IE < 9.

        // IE8 conditional comments *should* ensure this script is only loaded
        // for IE 8 and below. Should we keep this check for an extra level of
        // certainty?
        if (link && window.site.platform === 'windows' && /MSIE\s[1-8]\./.test(ua)) {
            window.open(link, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
            window.focus();
        }
    };

    // attach an event to all the download buttons to trigger the special
    // ie functionality if on ie
    IE8Utils.initDownloadLinks = function() {
        $('.download-link').each(function() {
            var $el = $(this);
            $el.click(function() {
                IE8Utils.triggerIEDownload($el.data('direct-link'));
            });
        });
        $('.download-list').attr('role', 'presentation');
    };

    window.Mozilla.IE8Utils = IE8Utils;

})();

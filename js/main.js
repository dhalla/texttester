$(document).ready(function() {

    $("#preview").click(function(event) {
        event.preventDefault();
        txt.init();
        tools.nowrap('.headline-preview, .copy-preview', $('body'));
        // txt.indicateOverflow('.preview');
    });

    $("#headline-test, #copy-test").keyup(function(event) {
        txt.init();
        tools.nowrap('.headline-preview, .copy-preview', $('body'));
        // txt.indicateOverflow('.preview');
        tools.updateCharCount($(this));
    });

});

txt = {

    init: function() {

        var headline = txt.getContent("#headline-test");
        var copy = txt.getContent("#copy-test");

        $(".headline-preview").text(headline);
        $(".copy-preview").html(txt.withLinebreaks(copy));

        txt.goTo("#preview-area");

    },

    /**
     * Get content from selector
     */
    getContent: function(selector) {

        var content = $(selector).val();
        return content;

    },

    /**
     * Preserve Linebreaks, convert \n to br-Tags
     */
    withLinebreaks: function(copy) {

        var br = copy.replace(/\n/g,'<br/>')
        return br;

    },

    /**
     * Scroll to position
     */
    goTo: function(selector) {
        // todo
    },

    /**
     * Provide some visual feedback:
     * Turn selector-BG red if content overflows selector
     */
    indicateOverflow: function(selector) {

        $(selector).each(function(i, p) {
            var el = $(p);
            if( (el.height() < el.prop("scrollHeight")) || (el.width() < el.prop("scrollHeight"))){
                el.addClass('error');
            } else {
                el.removeClass('error');
            }
        });

    }

};

tools = {

    noBrList: "W 196, SLK-Class,SLK-KlasseSL-Class,SL-Klasse,GLK-Class,GLK-Klasse,GL-Class,GL-Klasse,CLA-Class,CLS-Klasse,CL-Class,CL-Klasse,SLS AMG,CLA-Klasse,CLS 63 AMG,A 180,A 45 AMG,Mercedes-Benz,Mercedes-AMG,G 63 AMG,E 63 AMG,C 63 AMG,SLS AMG,Mercedes-Benz S-Klasse,Formel-1,Formel1,Mercedes-Simplex,Mercedes-Benz S-Class,S-Class,R-Class,M-Class,G-Class,E-Class,C-Class,B-Class,A-Class,S-Klasse,R-Klasse,M-Klasse,G-Klasse,E-Klasse,C-Klasse,B-Klasse,A-Klasse,B 200,Mercedes-Benz Fashion Wee",

    updateCharCount: function(selector) {
        var numChars = $(selector).val().length;
        $(selector)
            .next("p")
            .children(".counter")
            .text(numChars);
    },

    nowrap: function(selectors, context) {

        wordsTofind = tools.noBrList.split(','); // create csv
        wordsTofindLength = wordsTofind.length,
        $copies = jQuery(selectors, context),
        copiesLength = $copies.length;

        // sort array to wrap words correctly
        wordsTofind = wordsTofind.sort().reverse();

        // loop copies
        $copies.each(function(i) {

            var $el = jQuery(this),
                $elHtml = "" + $el.html() + "",
                replacedText = $elHtml;

            for( var j=0; j<wordsTofindLength; j++ ) {

                if( $elHtml.indexOf(wordsTofind[j]) > -1 ) {
                    replacedText = replacedText.replace(new RegExp(wordsTofind[j], 'g') , '<mark class="nowrap">' + wordsTofind[j] + '</mark>');
                }

                if( j === (wordsTofindLength-1) ) {
                    $el.html( replacedText );
                }

                if( i === (copiesLength-1) && j === (wordsTofindLength-1) ) {
                    // if loop is ready go ahead
                }
            }

            $el.html( replacedText );

        });

    }

};
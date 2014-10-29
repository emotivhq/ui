/**
 * Created by Stuart on 10/28/14.
 */

describe('General Button', generalButton);

function generalButton() {

    var documentStore;

    beforeEach(function() {
        documentStore = document;
        spyOn(document, 'createElement');
        spyOn(document.head, 'appendChild');
        spyOn(document.head, 'removeChild');
        spyOn(document, 'querySelector').andReturn({});

        window.makeGiftStartButton('http://google.com', 'test title', 12999,
            'http://image.com/image.jpg');
    });

    afterEach(function() {
        document = documentStore;
    });

    it('Should add a script pointing to giftstarter to the head',
        testScriptHead);
    function testScriptHead() {
        expect(document.createElement).toHaveBeenCalled();
        expect(document.head.appendChild).toHaveBeenCalled();
    }

    it('Should remove scripts after data fetch', testSendDataCleanup);
    function testSendDataCleanup() {
        expect(document.head.removeChild).toHaveBeenCalled();
    }

}
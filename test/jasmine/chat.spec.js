'use strict';

describe('ChatCtrl', function() {


    beforeEach(module('chat'));
    beforeEach(module('btford.socket-io'));

    var socket,
        scope,
        $timeout,
        $browser,
        mockIoSocket,
        ctrl;

    beforeEach(inject(function (socketFactory, _$browser_, $rootScope, _$timeout_, $controller) {
        $browser = _$browser_;
        $timeout = _$timeout_;
        scope = $rootScope.$new();
        mockIoSocket = io.connect();
        socket = socketFactory({
          ioSocket: mockIoSocket,
          scope: scope
        });
        ctrl = $controller('ChatCtrl', {
            $scope: scope
        });
    }));


    it('should say hello', function() {
        // FIXME: socket is currently not working
        mockIoSocket.on('nameResult', {name: 'Guest1'});
        expect(ctrl.nickName).toBe('Guest1');
    });


});
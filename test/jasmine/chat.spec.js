'use strict';

/*
Simple mock for socket.io
see: https://github.com/hackify/hackify-server/blob/master/test/controllers.test.js
and https://github.com/btford/angular-socket-io-seed/issues/4
*/
function SockMock($rootScope){
  this.events = {};
  this.emits = {};

  // intercept 'on' calls and capture the callbacks
  this.on = function(eventName, callback){
    if(!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  };

  // intercept 'emit' calls from the client and record them to assert against in the test
  this.emit = function(eventName){
    var args = Array.prototype.slice.call(arguments, 1);

    if(!this.emits[eventName])
      this.emits[eventName] = [];
    this.emits[eventName].push(args);
  };

  //simulate an inbound message to the socket from the server (only called from the test)
  this.receive = function(eventName){
    var args = Array.prototype.slice.call(arguments, 1);

    if(this.events[eventName]){
      angular.forEach(this.events[eventName], function(callback){
        $rootScope.$apply(function() {
          callback.apply(this, args);
        });
      });
    }
  };

}

describe('ChatCtrl', function() {
    beforeEach(module('chat'));

    var scope,
      socketMock;

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();

      socketMock = new SockMock($rootScope);

      $controller('ChatCtrl', {$scope: scope, socket: socketMock});
    }));

    it('should set username correctly', function() {
      socketMock.receive('nameResult', {'name': 'Guest1'});
      expect(scope.nickName).toBe('Guest1');
    });

    it('should get new messages', function() {
      socketMock.receive('send:message', 'this is the new message');
      expect(scope.messages[0]).toBe('this is the new message');
    });

    it('should send new message with nickName', function() {
      scope.message = 'send this message';
      scope.nickName = 'Guest1';
      scope.sendMessage();

      expect(scope.messages[0].author).toBe('Guest1');
      expect(scope.messages[0].content).toBe('send this message');
    });

});
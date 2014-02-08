'use strict';

angular.module('chat', [

    // 3rd parties
    'btford.socket-io'
]).
factory('socket', function(socketFactory) {
    return socketFactory();
});
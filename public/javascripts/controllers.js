'use strict';

angular.module('chat.system').controller('ChatCtrl', ['$scope', 'Socket', function($scope, socket) {
    $scope.message = "";
    $scope.messages = [];

    $scope.sendMessage = function() {
        $scope.messages.push({
            author: $scope.nickName,
            content: $scope.message
        });

        socket.emit('send:message', {
            message: $scope.message
        });

        $scope.message = "";
    };

    socket.on('send:message', function(message) {
        console.log(message);
        $scope.messages.push(message);
    });

    socket.on('nameResult', function(data) {
        $scope.nickName = data.name;
    });
}]);
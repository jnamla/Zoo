// Generated by CoffeeScript 1.9.1
angular.module('Zoo.controllers', []).controller('DiscoverController', function($scope, $log, discoveryService, discoveryResultRepository, inboxService) {
  $scope.scanResults = [];
  $scope.approveData = [];
  $scope.discoverableBindings = [];
  $scope.scan = function() {
    return inboxService.scan();
  };
  $scope.approve = function(thingUID) {
    var label;
    label = $scope.approveData[thingUID].label;
    return inboxService.approve({
      thingUID: thingUID
    }, label, function(arg) {
      $log.info("Approved " + thingUID, arg);
      return $scope.updateScanResults();
    });
  };
  $scope.ignore = function(thing) {
    return $log.warn('Not implemented, should ignore ', thing, $scope.thingToApprove);
  };
  $scope.updateScanResults = function() {
    return discoveryResultRepository.getAll(function(data) {
      var i, len, results, thing;
      $log.info(data);
      $scope.scanResults = data;
      $scope.approveData = [];
      results = [];
      for (i = 0, len = data.length; i < len; i++) {
        thing = data[i];
        results.push($scope.approveData[thing.thingUID] = angular.copy(thing));
      }
      return results;
    }, function(err) {
      return $log.error('Error on fetching inbox', err);
    });
  };
  $scope.updateDiscoverableBindings = function() {
    return discoveryService.getAll(function(bindings) {
      return $scope.discoverableBindings = bindings;
    });
  };
  $scope.updateDiscoverableBindings();
  return $scope.updateScanResults();
});

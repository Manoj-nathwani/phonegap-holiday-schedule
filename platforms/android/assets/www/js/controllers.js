var page1 = angular.module('page1', []);

page1.factory('data', function($http) {
  return {
    allItems: function(callback) {
      $http.get('data/settings.json', {
        cache: true
      }).success(callback);
    }
  }
});

page1.controller('ListGroupCtrl', function($scope, data) {
  data.allItems(function(data) {
    $scope.items = data;
  });
});


var page2 = angular.module('page2', []);

page2.factory('data', function($http) {
  return {
    allItems: function(callback) {
      $http.get('data/settings.json', {
        cache: true
      }).success(callback);
    }
  }
});

page2.controller('navbar', function($scope, data) {
  data.allItems(function(data) {
    data = FilterItem(data);
    $scope.navbar_title = data.name;
  });
});

page2.controller('tile', function($scope, data) {
  data.allItems(function(data) {
    data = FilterItem(data);
    $scope.tile_icon = data.fa_icon;
  });
});

page2.controller('table_data', function($scope, data) {
  data.allItems(function(data) {
    data = FilterItem(data);
    $scope.items = data.table_data;
  });
});

page2.controller('attachments_data', function($scope, data) {
  data.allItems(function(data) {
    data = FilterItem(data);
    $scope.items = data.attachments;
  });
});

function FilterItem(data) {
  var heading_index = parseInt(getParameterByName("heading"));
  var event_index = parseInt(getParameterByName("event"));
  return data[heading_index].events[event_index];
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

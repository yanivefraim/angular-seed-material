'use strict';

angular.module('starterApp.version', [
  'starterApp.version.interpolate-filter',
  'starterApp.version.version-directive'
])

.value('version', '0.1');

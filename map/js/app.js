angular.module('MapApp', 
	['ngRoute', 
	'appRoutes', 
	'MainCtrl', 
	'EditCtrl', 
	'EditService', 
	'MapsCtrl', 
	'MapsService',
	'angularUtils.directives.dirPagination'
])

.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('js/vendors/pagination/dirPagination.tpl.html');
})
describe('CalculatorController', function() {
    'use strict';
    var $controller, $rootScope;
    var  $httpBackend, $q, SQLQuery, queryResultToObjects, baseURI;

    beforeEach(angular.mock.module('crate'));
    beforeEach(angular.mock.module('common'));
    beforeEach(angular.mock.module('sql'));

    beforeEach(angular.mock.module('calculator'));
    beforeEach(inject(function(_$controller_, _$rootScope_, $injector){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get('$httpBackend');
        $q = $injector.get('$q');
        SQLQuery = $injector.get('SQLQuery');
        queryResultToObjects = $injector.get('queryResultToObjects');
        baseURI = $injector.get('baseURI');
    }));


    describe('$scope.resultt', function() {
        var $scope, controller;
        beforeEach(function() {
            $scope = {};
            controller = $controller('CalculatorController', { $scope: $scope });
        });

        it('sharding-calculator-defualt', function() {
            expect($scope.result()).toEqual(33);
        });

        it('sharding-calculator-changing-value', function(){
            $scope.partitionSize = 3;
            expect($scope.result()).toEqual(98);
        });

        it('sharding-calculator-select-table', function(){
            var stmt = 'CREATE TABLE TTTest (test1 int);';
            SQLQuery.execute(stmt, {}, false, false, false, false).then(function (query) {
                $scope.selected = ['doc','TTTest'];
                $scope.tableSelected();
                expect($scope.result()).toEqual(4);
                var stmt2 = 'DROP TABLE TTTest;';
                SQLQuery.execute(stmt2, {}, false, false, false, false);
            });
        });
    });
});

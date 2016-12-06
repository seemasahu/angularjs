var MC = angular.module('mortgageCalculator', []);

// create the controller and inject Angular's $scope//
MC.controller('homeController', ['$scope',function($scope) {
    $scope.appName = 'Mortgage Calculator';
	
	$scope.calculateMortgage = function(){
		if(!$scope.vailadteCalculator()){
			return;
		}
		var P = parseFloat($scope.calculator.principalAmount.value);
		var IR = parseFloat($scope.calculator.interestRate.value);
		var MP = parseFloat($scope.calculator.monthlyPayment.value);
		var DM = 0
		var TA = 0;
		var CL = {
			principalAmount: P,
			interestRate: IR,
			monthlyPayment: MP
		};
		$scope.result.lastMonthPayment.value = '';
		
		while(P>0){
			var YI = (IR/100)*P;
			var MI = YI/12;
			if(P<MP){
				MP = P+MI;
				P = 0;
				$scope.result.lastMonthPayment.value = MP.toFixed(2);
			}else {
				var MA = MP-MI;
				P = P-MA;
			}
			TA += MP;
			DM++;
		}
		var NY = Math.floor(DM/12);
		var NM = (DM-(NY*12));
		$scope.result.duration.years.value = NY;
		$scope.result.duration.months.value = NM;
		$scope.result.totalAmount.value = TA.toFixed(2);
		$scope.logs.prevCalcLogs.unshift(CL);
	};
	
	$scope.clearCalculator = function(){
		$scope.calculator.principalAmount.value = '';
		$scope.calculator.interestRate.value = '';
		$scope.calculator.monthlyPayment.value = '';
	};
	
	$scope.clearResult = function(){
		$scope.result.duration.years.value = '';
		$scope.result.duration.months.value = '';
		$scope.result.totalAmount.value = '';
		$scope.result.lastMonthPayment.value = '';
	};
	
	$scope.clearAll = function(){
		$scope.clearCalculator();
		$scope.clearResult();
	};
	
	$scope.vailadteCalculator = function(){
			if($scope.calculator.principalAmount.value !='' && $scope.calculator.interestRate.value!='' && $scope.calculator.monthlyPayment.value!=''){
				return true;
			}else {
				return false
			}
	};
	
	$scope.calculator = {
		title: 'Calculator',
		principalAmount: {
			title: 'Principal Amount($)',
			label: 'Enter Principla Amount',
			value: 10000
		},
		interestRate: {
			title: 'Annual interest rate(%)',
			label: 'Enter annual interest rate',
			value: 1.27
		},
		monthlyPayment: {
			title: 'Monthly Payment ($)',
			label: 'Enter monthly payment',
			value: 300
		},
		actionButtons: {
			submit: {
				title: 'Calculate',
				action: $scope.calculateMortgage
			},
			clear: {
				title: 'Clear',
				calculator: $scope.clearCalculator,
				result: $scope.clearResult,
				all: $scope.clearAll
			}
		}
	};
	
	$scope.result = {
		title: 'Result',
		duration: {
			title: 'Duration',
			years: {
				title: 'Years',
				value: ''
			},
			months: {
				title: 'Months',
				value: ''
			}
		},
		totalAmount: {
			title: 'Total Amount including interest($)',
			value: ''
		},
		lastMonthPayment: {
			text: 'Last month payment is less than the actual monthly payment, which is $',
			value: ''
		}
	};
	
	$scope.logs = {
		title: 'Previous Calculation Logs',
		prevCalcLogs: [],
		actions: {
			updateCalculatorField: function(calcField, fieldVal){
				$scope.clearResult();
				$scope.calculator[calcField].value = fieldVal;
			},
			deleteLog: function(i){
				$scope.logs.prevCalcLogs.splice(i, 1);
			}
		}
	};
}]);
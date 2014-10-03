var StoryAdUnitDirective = function ($window, $interval, $timeout) {
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			var _blocks = elem.find('ul');
			var _minWidth = 320;
			var _minHeight = 200;
			var _gridMatrix = false;
			var _baseClasses = '';
			var _reference = [
				'n1',
				'n2',
				'n3',
				'n4'
			];
			var _currentSet = 0;
			var _sets = [
				[0,2,4],
				[1,3,5]
			];


			var _getLayout = function () {
				var ratio = elem.outerWidth()/elem.outerHeight()
				if (ratio > 1) return 'horizontal';
				else if (ratio < 1) return 'vertical';
				else if (ratio == 1) return 'square';
				else return false;
			};
			var _getGridMatrix = function () {
				var layout = _getLayout();

				if (layout === 'horizontal') {
					var cols = Math.ceil(elem.outerWidth()/elem.outerHeight());
					var width = elem.outerWidth()/cols;
					var rows = Math.ceil(elem.outerHeight()/_minHeight);
					var height = elem.outerHeight()/rows;
				}
				else if (layout === 'vertical') {
					var cols = Math.ceil(elem.outerWidth()/_minWidth);
					var width = elem.outerWidth()/cols;
					var rows = Math.ceil(elem.outerHeight()/elem.outerWidth());
					var height = elem.outerHeight()/rows;
				}
				else {
					var cols = Math.ceil(elem.outerWidth()/_minWidth);
					var width = elem.outerWidth()/cols;
					var rows = Math.ceil(elem.outerHeight()/_minHeight);
					var height = elem.outerHeight()/rows;
				}

				if (width < _minWidth && cols > 1) {
					cols--;
					width = elem.outerWidth()/cols;
				}

				if (height < _minHeight && rows > 1) {
					rows--;
					height = elem.outerHeight()/rows;
				}

				//
				return cols + ':' + rows;
			};
			var _setLayoutClasses = function () {
				var ratioArray = _gridMatrix.split(':');
				var className = _baseClasses + ' x' + ratioArray[0] + ' y' + ratioArray[1];
				elem[0].className = className;
			};


			_baseClasses = elem[0].className;
			if (!_gridMatrix) _gridMatrix = _getGridMatrix();
			_setLayoutClasses();


			var _swapBlockFocus = function ($block) {
			
				

				if ($block.hasClass('expand')) {
					var _len = _reference.length;
					var _next = false;
					var _now = false;

					while (_len--) {
						if ($block.hasClass(_reference[_len])) {
							if (_reference[_len + 1]) _next = _reference[_len + 1];
							else _next = _reference[0];
						}
					}

					if (!_next) {
						_next = _reference[0];
					}

					$block.attr('data-next', _next);

					$block[0].className = 'ad-block';

				}
				else {
					if (!$block.attr('data-next')) _now = _reference[0];
					else _now = $block.attr('data-next');
					$block.addClass('expand ' + _now);
					$block.removeAttr('data-next');
				}
			};

			var _targetBlocks = function (set) {
				
				var _len = _blocks.length;

				while (_len--) {
					// console.log(_blocks[set[_len]]);
					_swapBlockFocus(angular.element(set[_len]));
				}

				// console.log('---')
			};



			// _targetBlocks(_sets[_currentSet]);

			$interval(function () {

				// angular.element(_blocks[0]).addClass('expand');
				// _swapBlockFocus(angular.element(_blocks[0]));

				// if (_currentSet === 0) {
					_targetBlocks(_blocks);
				// 	_currentSet = 1;
				// }
				// else {
				// 	_targetBlocks(_sets[0]);
				// 	_currentSet = 0;
				// }


			}, 4000);

			// $timeout(function () {
			// 	elem.find('ul').removeClass('open fourth');
			// }, 4000)

			// $timeout(function () {
			// 	elem.find('ul').addClass('open second');
			// }, 6000)

			// $timeout(function () {
			// 	elem.find('ul').removeClass('open second');
			// }, 8000)

			//  Methods
			// var _handleEvent = function (e, attr) {
			// 	var _eventType = e.type ? e.type : e.name;
			// 	switch(_eventType) {
			// 		case 'ng_LoadingLayer_remove':
			// 			console.log('ng_LoadingLayer_remove');
			// 			elem.addClass('hide');
			// 			break;
			// 	}
			// };
			//  Listeners
			// scope.$on("ng_LoadingLayer_remove", _handleEvent);
		}
  };
};
module.exports = StoryAdUnitDirective;
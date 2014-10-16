(function(document) {
	var TableColFilter = (function(array) {

		var _input;
		var _col;

		function _onInputEvent(e) {
			_input = e.target;
			_col = _input.offsetParent.cellIndex;

			var tables = [];
			tables.push(getParentTable(_input));

			array.forEach.call(tables, function(table) {
				array.forEach.call(table.tBodies, function(tbody) {
				array.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.cells[_col].textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table_column_filter');
				array.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			TableColFilter.init();
		}
	});

})(document);

function getParentTable(node) {
    var element = node;
    while (element.tagName.toLowerCase() !== 'table') {
        element = element.parentNode;
    }
    return element;
}
var grid;
var date1;
var date2;
var date3;
var flag = true;
document.getElementById('render').addEventListener('click', renderGrid);
document.getElementById('destroy').addEventListener('click', destoryGrid);
createLazyLoadData();

function renderGrid() {
    grid = new ej.grids.Grid({
        dataSource: lazyLoadData,
        enableVirtualization: true,
        height: 400,
        editSettings: { allowEditing: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' },
        toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Print', 'Search', 'ColumnChooser'],
        pageSettings: { pageSize: 50 },
        allowFiltering: true,
        allowSorting: true,
        filterSettings: { type: 'Excel' },
        allowGrouping: true,
        allowReordering: true,
        created: function () {
            date1 = new Date().getTime();
        },
        actionBegin: function (args) {
            if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching' ||
                args.requestType === 'grouping' || args.requestType === 'reorder' || args.requestType == 'columnstate'
                || args.requestType === 'paging' || args.requestType === 'ungrouping') {
                date3 = new Date().getTime();
            }
        },
        actionComplete: function (args) {
            if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching' ||
                args.requestType === 'grouping' || args.requestType === 'reorder' || args.requestType === 'columnstate'
                || args.requestType === 'paging' || args.requestType === 'ungrouping') {
                if (date3) {
                    var dateAction = new Date().getTime();
                    document.getElementById('performanceTime1').innerHTML = 'Action Time Taken: ' + (dateAction - date3) + 'ms';
                }
            }
        },
        columns: [
            { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right', width: 120 },
            { field: 'ProductName', headerText: 'Product Name', width: 160 },
            { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
            { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
            { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
        ],
        dataBound: hide,
    });
    grid.appendTo('#Grid');
}

function hide() {
    if (flag && date1) {
        date2 = new Date().getTime();
        document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
        flag = false;
    }
}
function destoryGrid() {
    if (grid && !grid.isDestroyed) {
        grid.destroy();
    }
}

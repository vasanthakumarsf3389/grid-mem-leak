define(["require", "exports", "@syncfusion/ej2-base", "./src/grid/base/grid", "./src/grid/actions/virtual-scroll", "./src/grid/actions/infinite-scroll", "./src/grid/actions/page", "./src/grid/actions/group", "./src/grid/actions/selection", "./src/grid/filter", "./src/grid/sort", "./src/grid/actions/toolbar", "@syncfusion/ej2-data", "./src/grid/actions/freeze", "./src/grid/actions/edit", "./src/grid/actions/resize", "./src/grid/actions/aggregate", "./datasource", "./src/grid/actions/foreign-key", "./src/grid/actions/column-chooser", "./src/grid/actions/lazy-load-group", "./src/grid/actions/search"], function (require, exports, ej2_base_1, grid_1, virtual_scroll_1, infinite_scroll_1, page_1, group_1, selection_1, filter_1, sort_1, toolbar_1, ej2_data_1, freeze_1, edit_1, resize_1, aggregate_1, datasource_1, foreign_key_1, column_chooser_1, lazy_load_group_1, search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_base_1.enableRipple(true);
    grid_1.Grid.Inject(virtual_scroll_1.VirtualScroll, infinite_scroll_1.InfiniteScroll, filter_1.Filter, edit_1.Edit, page_1.Page, aggregate_1.Aggregate, group_1.Group, sort_1.Sort, foreign_key_1.ForeignKey, toolbar_1.Toolbar, freeze_1.Freeze, resize_1.Resize, column_chooser_1.ColumnChooser, lazy_load_group_1.LazyLoadGroup, ej2_data_1.ODataAdaptor, selection_1.Selection, search_1.Search);
    var grid;
    var date1;
    var date2;
    var date3;
    var flag = true;
    document.getElementById('render').addEventListener('click', renderGrid);
    document.getElementById('destroy').addEventListener('click', destoryGrid);
    datasource_1.createLazyLoadData();
    function renderGrid() {
        var autoComplete;
        grid = new grid_1.Grid({
            dataSource: datasource_1.lazyLoadData,
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
});

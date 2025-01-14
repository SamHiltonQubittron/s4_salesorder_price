sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zsalesapp.zsalesapp.controller.View1", {
        onInit() {
            var params = new URLSearchParams(window.location.search);
            var SalesOrderId = params.get("SalesOrderId");
            var SalesOrderItemId = params.get("SalesOrderItemId");       
           
                     
            this.model = this.getOwnerComponent().getModel();
            this.dataModel = this.getOwnerComponent().getModel("dataModel")
            this._getData(SalesOrderId,SalesOrderItemId) 
            //https://my417160-api.s4hana.cloud.sap/sap/opu/odata/sap/YY1_ZSALES_CREATION_CDS
            //https://my417160-api.s4hana.cloud.sap/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder('10000055')/to_Item

        },    
        _getData: function (sSalesOrderId, sSalesOrderItemId) {
            var sPath = `/A_SalesOrder('${sSalesOrderId}')/to_Item`;
            // var sFilter = `SalesOrder eq '${salesOrderId}' and SalesOrderItem eq '${salesOrderItemId}'`;

            this.model.read(sPath, {
                filters: [new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.EQ, sSalesOrderId),
                        new sap.ui.model.Filter("SalesOrderItem", sap.ui.model.FilterOperator.EQ, sSalesOrderItemId)
                    ],
                    and: true
                })],
                success: function (oData, response) {
                    this.dataModel.setProperty("/PriceDetails", oData.results);
                }.bind(this),
                error: function (error) {
                    console.error("Error fetching data:", error);
                }
            });

        }
    });
});
({
    createFornecedor: function(component, fornecedor) {
        let action = component.get("c.saveFornecedor");
        action.setParams({
            "fornecedor": fornecedor
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let fornecedores = component.get("v.fornecedores");
                fornecedores.push(response.getReturnValue());
                component.set("v.fornecedores", fornecedores);
            }
        });
        $A.enqueueAction(action);
    }
})
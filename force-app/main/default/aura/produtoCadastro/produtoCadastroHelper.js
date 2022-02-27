({
    createProduto: function(component, produto) {
        let action = component.get("c.saveProduto");
        action.setParams({
            "produto": produto
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let produtos = component.get("v.produtos");
                produtos.push(response.getReturnValue());
                component.set("v.produtos", produtos);
            }
        });
        $A.enqueueAction(action);
    }
})
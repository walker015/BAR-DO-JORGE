({
    createVenda: function(component, venda) {
        let action = component.get("c.saveVenda");
        action.setParams({
            "venda": venda
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            console.log(state);
            if (state === "SUCCESS") {
                let vendas = component.get("v.vendas");
                vendas.push(response.getReturnValue());
                component.set("v.vendas", vendas);
            }
        });
        $A.enqueueAction(action);
    },

    valorTotal: function(component) {
		let carrinho = component.get('v.issearching');
        let listProd = component.get("v.produto");
		let quantidade = parseFloat(carrinho.Quantidade);
		for(let i=0; i<=listProd.length-1; i++){
			if(listProd[i].value.toString() === carrinho.Produto.toString()){
				var valordoproduto = listProd[i].valordoproduto;
			}
		}
		let total = valordoproduto * quantidade;
		console.log("Total " + listProd[0].valordoproduto);
		component.set("v.valortotal", total);
    },

    searchProd: function(component, response) {
        const listProd = [];
        let prods = response.getReturnValue() || [];
        for (let i = 0; i<=prods.length-1;i++){
            const item = {
                "label": prods[i].Name.toString(),
                "value": prods[i].Id.toString(),
                "valordoproduto": prods[i].Preco_de_Venda__c.toString()
            }
            listProd.push(item);
        }
        component.set("v.produto", listProdcard);

        const listProdcard = [];
        for (let i = 0; i<=prods.length-1;i++){
            const item = {
                "name": prods[i].Name.toString(),
                "Id": prods[i].Id.toString(),
                "valordoproduto": prods[i].Preco_de_Venda__c.toString(),
                "Description": prods[i].Description.toString(),
                "Quantidade": prods[i].Quantida__c.toString()
            }
            listProdcard.push(item);
        }
        component.set("v.listaparaocarrinho", listProdcard);
    },

    createListProduct: function(component, viewProduct) {
        let listProd = component.get("v.listaparaocarrinho");
        let carrinho = component.get("v.issearching");
        
    }
})
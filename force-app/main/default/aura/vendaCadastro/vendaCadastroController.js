({
	handleOptionSelected: function (component, event) {
		let selectedOptionValue = event.getParam("value");
		let listProd = component.get("v.produto");
		for(let i=0; i<=listProd.length-1; i++){
			if(listProd[i].value === selectedOptionValue){
				component.set("v.valorproduto", listProd[i].valordoproduto);
			}
		}
    },
	
	clickProduto: function(component, event, helper) {
		let viewproduct = component.get('v.carrinhoprodutos');
		component.set('v.truthy', true);
		helper.createListProduct(component, viewproduct);
		helper.valorTotal(component);
	},

    clickCreate: function(component, event, helper) {
        let validVenda = component.find('vendaform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validVenda){
            // Create the new venda
            let newVenda = component.get("v.newVenda");
			let id = component.get("v.issearching");
			newVenda.Valor_total__c = component.get('v.valortotal');
			newVenda.Produtos__c = id.Produto;
			newVenda.Quantidade_Venda__c = id.Quantidade;
            console.log("Create venda: " + JSON.stringify(newVenda));
            helper.createVenda(component, newVenda);
        }
    },

    // Load vendas from Salesforce
	doInit: function(component, event, helper) {
		// Create the action
		let action = component.get("c.getVendas");
		// Add callback behavior for when response is received
		action.setCallback(this, function(response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.vendas", response.getReturnValue());
			}
			else {
				console.log("Failed with state: " + state);
			}
		});

		$A.enqueueAction(action);
	},

	inicio: function(component, event, helper) {		
		let action = component.get("c.getProdutos");
		action.setCallback(this, function(response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				helper.searchProd(component, response);
			}
			else {
				console.log("FAILED WITH STATE: " + state);
			}
		});
		// Send action off to be executed
		$A.enqueueAction(action);

	},
})
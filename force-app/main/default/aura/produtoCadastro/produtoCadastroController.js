({
    clickCreate: function(component, event, helper) {
        let validProduto = component.find('produtoform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
		console.log(component.find('produtoform'));
        // If we pass error checking, do some real work
        if(validProduto){
            // Create the new produto
            let newProduto = component.get("v.newProduto");
            console.log("Create produto: " + JSON.stringify(newProduto));
            helper.createProduto(component, newProduto);
			console.log("Family = " + newProduto.Family);
        }
    },

    // Load produtos from Salesforce
	doInit: function(component, event, helper) {
		// Create the action
		let action = component.get("c.getProdutos");
		// Add callback behavior for when response is received
		action.setCallback(this, function(response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.produtos", response.getReturnValue());
			}
			else {
				console.log("Failed with state: " + state);
			}
		});
		// Send action off to be executed
		$A.enqueueAction(action);
	},
})
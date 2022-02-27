({
    clickCreate: function(component, event, helper) {
        let validFornecedor = component.find('fornecedorform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validFornecedor){
            // Create the new fornecedor
            let newFornecedor = component.get("v.newFornecedor");
            console.log("Create fornecedor: " + JSON.stringify(newFornecedor));
            helper.createFornecedor(component, newFornecedor);
        }
    },

    // Load fornecedores from Salesforce
	doInit: function(component, event, helper) {
		// Create the action
		let action = component.get("c.getFornecedores");
		// Add callback behavior for when response is received
		action.setCallback(this, function(response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.fornecedores", response.getReturnValue());
			}
			else {
				console.log("Failed with state: " + state);
			}
		});
		// Send action off to be executed
		$A.enqueueAction(action);
	},
})
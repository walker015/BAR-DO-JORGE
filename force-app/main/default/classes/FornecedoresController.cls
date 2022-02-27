public with sharing class FornecedoresController {
	// STERN LECTURE ABOUT WHAT'S MISSING HERE COMING SOON
	@AuraEnabled
    public static List<Fornecedor__c> getFornecedores() {
        // Check to make sure all fields are accessible to this user
        String[] fieldsToCheck = new String[] {
            'Id', 'Name', 'Nome__c', 'Produto__c', 'Telefone__c', 'Email__c', 'CNPJ__c'
        };
        Map<String,Schema.SObjectField> fieldDescribeTokens =
            Schema.SObjectType.Fornecedor__c.fields.getMap();
        for(String field : fieldsToCheck) {
            if (! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        return [SELECT Id, Name, Nome__c, Produto__c, Telefone__c, Email__c, CNPJ__c
               FROM Fornecedor__c];
    }

    // FIXAR O REGISTRO NO SOBJECT DA SALESFORCE
    @AuraEnabled
    public static Fornecedor__c saveFornecedor(Fornecedor__c fornecedor){
        // Perform isUpdateable() checking first, then
        upsert fornecedor;
        return fornecedor;
    }
}
public with sharing class ProdutoController {
	// STERN LECTURE ABOUT WHAT'S MISSING HERE COMING SOON
	@AuraEnabled
    public static List<Product2> getProdutos() {
        // Check to make sure all fields are accessible to this user
        String[] fieldsToCheck = new String[] {
                                                'Id',
                                                'Name',
                                                'Description',
                                                'Family',
                                                'Quantidade__c',
                                                'Preco_de_Venda__c',
                                                'ProductCode'};
        Map<String,Schema.SObjectField> fieldDescribeTokens =
            Schema.SObjectType.product2.fields.getMap();
        for(String field : fieldsToCheck) {
            if (! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        return [SELECT Id, Name, Description, Family, Quantidade__c, Preco_de_Venda__c, ProductCode
                 FROM Product2];
    }

    // FIXAR O REGISTRO NO SOBJECT DA SALESFORCE
    @AuraEnabled
    public static product2 saveProduto(product2 produto){
        // Perform isUpdateable() checking first, then
        upsert produto;
        return produto;
    }
}
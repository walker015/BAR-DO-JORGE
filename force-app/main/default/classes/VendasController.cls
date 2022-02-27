public with sharing class VendasController {
	// STERN LECTURE ABOUT WHAT'S MISSING HERE COMING SOON
	@AuraEnabled
    public static List<Venda__c> getVendas() {
        // Check to make sure all fields are accessible to this user
        String[] fieldsToCheck = new String[] {
            'Id', 'Name', 'Cliente__c', 'Produtos__c', 'Telefone_do_Cliente__c',
            'Valor_total__c', 'Quantidade_Venda__c' };
        Map<String,Schema.SObjectField> fieldDescribeTokens =
            Schema.SObjectType.Venda__c.fields.getMap();
        for(String field : fieldsToCheck) {
            if (! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        return [SELECT Id, Name, Cliente__c, Produtos__c, Telefone_do_Cliente__c, Valor_total__c, Quantidade_Venda__c
               FROM Venda__c];
    }

    // FIXAR O REGISTRO NO SOBJECT DA SALESFORCE
    @AuraEnabled
    public static Venda__c saveVenda(Venda__c venda){
        // Perform isUpdateable() checking first, then
        upsert venda;
        return venda;
    }

    @AuraEnabled
    public static List<Product2> getProdutos(){
        return [SELECT Id, Name, Preco_de_Venda__c  FROM Product2];
    }
}
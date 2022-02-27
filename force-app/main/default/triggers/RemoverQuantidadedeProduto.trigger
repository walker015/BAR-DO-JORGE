trigger RemoverQuantidadedeProduto on Venda__c(after upsert) {
    List<Product2> prodList = new List<Product2>;

    Map<Produtos__c,Quantidade_Venda__c> lastvnd = new Map<Produtos__c,Quantidade_Venda__c>(
        [SELECT Produtos__c, Quantidade_Venda__c FROM Venda__c ORDER BY Id DESC LIMIT 1]
    );

    
}
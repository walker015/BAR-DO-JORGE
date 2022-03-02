public class RemoverQuantidadeHandler {
    public static void afterInsertHandler(List<Venda__c> newRecords){
        List<Product2> novoProd = new List<Product2>();
        List<Venda__c> listRef = new List<Venda__C>(
            [SELECT Produtos__C, Quantidade_Venda__c FROM Venda__c ORDER BY Id DESC LIMIT 1]);
        List<Product2> listProd = new List<Product2>(
            [SELECT Id, Quantidade__c FROM Product2]);
        Double quantVenda = listRef[0].Quantidade_Venda__c;
        Double quantProd = 0;
        for(integer i = 0; i <= listProd.size()-1; i++){
            if(listProd[i].Id == listRef[0].Produtos__c){
                quantProd = listProd[i].Quantidade__c;
            }
        }
        Double result = quantProd - quantVenda;
        novoProd.add(new Product2(Id = listRef[0].Produtos__C,
                                 Quantidade__c = result));
        update novoProd;
    }
    
    public static void afterUpdateHandler(List<Venda__c> newRecords){
        
    }
}
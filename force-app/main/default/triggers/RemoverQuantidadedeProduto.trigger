trigger RemoverQuantidadedeProduto on Venda__c(after insert, after update) {
    Switch on Trigger.operationType {
        when AFTER_INSERT {
            RemoverQuantidadeHandler.afterInsertHandler(Trigger.new);
        }
        
        when AFTER_UPDATE {
            RemoverQuantidadeHandler.afterUpdateHandler(Trigger.new);
        }
    }
}
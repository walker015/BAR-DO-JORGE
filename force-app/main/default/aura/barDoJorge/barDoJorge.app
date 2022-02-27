<aura:application extends="force:slds">
    <c:homePage/>
    <lightning:tabset>
        <lightning:tab label="Produto" title="Adicionar, deletar e editar produtos">
            <c:produtoHP/>
        </lightning:tab>
        <lightning:tab label="Venda" title="Adicionar, deletar e editar vendas">
            <c:vendaHP/>
        </lightning:tab>
        <lightning:tab label="Fornecedor" title="Adicionar, deletar e editar fornecedores">
            <c:fornecedorHP/>
        </lightning:tab>
    </lightning:tabset>
</aura:application>
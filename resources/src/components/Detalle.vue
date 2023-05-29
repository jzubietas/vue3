<template>
<div>
    <b-modal ref="modal-1" size="lg" centered title="Caja" hide-footer>
        <template #modal-title>
            Detalles de Pago
        </template>
 
    </b-modal>

</div>
</template>
<script>
export default {
    name: 'DetallesPago',
    data(){
        return {
            title: "Detalle de Pago"
        }
    }
}
</script>
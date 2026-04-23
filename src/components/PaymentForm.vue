<!-- ============================================ -->
<!-- PAYMENT FORM — Formulario de pago simulado  -->
<!-- Pide tarjeta, titular, fecha y CVV.          -->
<!-- Valida localmente, no procesa pagos reales.  -->
<!-- Responsable: Jason Rodríguez                 -->
<!-- ============================================ -->

<template>
  <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Datos de pago</h3>

    <!-- Número de tarjeta — formato con espacios cada 4 dígitos -->
    <div class="mb-4">
      <label class="block text-gray-600 text-sm mb-1">Número de tarjeta</label>
      <input
        v-model="form.numero"
        @input="formatearNumero"
        type="text"
        maxlength="19"
        placeholder="0000 0000 0000 0000"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <!-- Nombre del titular tal como aparece en la tarjeta -->
    <div class="mb-4">
      <label class="block text-gray-600 text-sm mb-1">Titular de la tarjeta</label>
      <input
        v-model="form.titular"
        type="text"
        placeholder="Nombre como aparece en la tarjeta"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <!-- Fecha y CVV en la misma fila para ahorrar espacio -->
    <div class="grid grid-cols-2 gap-4 mb-2">
      <div>
        <label class="block text-gray-600 text-sm mb-1">Vencimiento</label>
        <input
          v-model="form.vencimiento"
          @input="formatearFecha"
          type="text"
          maxlength="5"
          placeholder="MM/AA"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div>
        <label class="block text-gray-600 text-sm mb-1">CVV</label>
        <input
          v-model="form.cvv"
          type="text"
          maxlength="4"
          placeholder="123"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>

    <!-- Nota sobre que es solo simulación, por transparencia -->
    <p class="text-xs text-gray-400 mt-2">
      ⚠ Pago simulado — no se realiza ninguna transacción real.
    </p>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

// El padre (Checkout) nos pasa un objeto que vamos a modificar con v-model-like behavior
// Usamos defineModel para que el padre reciba los cambios automáticamente
const datosPago = defineModel({ required: true })

// Estado interno del formulario — arrancamos vacío
const form = reactive({
  numero: '',
  titular: '',
  vencimiento: '',
  cvv: ''
})

// Cada vez que cambia el form, lo reflejamos en el modelo del padre
watch(form, (nuevo) => {
  datosPago.value = { ...nuevo }
}, { deep: true })

// Formatea el número de tarjeta agregando un espacio cada 4 dígitos
function formatearNumero() {
  const soloDigitos = form.numero.replace(/\D/g, '')
  form.numero = soloDigitos.replace(/(.{4})/g, '$1 ').trim()
}

// Formatea la fecha de vencimiento como MM/AA automáticamente
function formatearFecha() {
  const soloDigitos = form.vencimiento.replace(/\D/g, '')
  if (soloDigitos.length >= 3) {
    form.vencimiento = soloDigitos.slice(0, 2) + '/' + soloDigitos.slice(2, 4)
  } else {
    form.vencimiento = soloDigitos
  }
}
</script>

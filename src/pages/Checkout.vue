<!-- ============================================ -->
<!-- CHECKOUT — Página de finalizar compra       -->
<!-- Dirección de envío, datos de pago simulado  -->
<!-- y resumen final. Al confirmar guarda pedido. -->
<!-- Responsable: Jason Rodríguez                -->
<!-- ============================================ -->

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Finalizar compra</h1>

    <!-- Si el carrito está vacío, no tiene sentido estar aquí -->
    <div
      v-if="cartStore.items.length === 0"
      class="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
      <p class="text-gray-600 mb-4">No hay productos en tu carrito.</p>
      <router-link
        to="/products"
        class="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
        Ir a productos
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Columna izquierda — formularios de envío y pago -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Sección de dirección de envío -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Dirección de envío</h3>

          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Nombre completo</label>
            <input
              v-model="envio.nombre"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Dirección</label>
            <input
              v-model="envio.direccion"
              type="text"
              placeholder="Av. / calle / número"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-600 text-sm mb-1">Ciudad</label>
              <input
                v-model="envio.ciudad"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label class="block text-gray-600 text-sm mb-1">Teléfono</label>
              <input
                v-model="envio.telefono"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <!-- Selector de método de pago -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Método de pago</h3>

          <div class="space-y-2">
            <!-- Opción: tarjeta — pide datos en el formulario de abajo -->
            <label class="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
              <input type="radio" v-model="metodoPago" value="tarjeta" />
              <span>💳 Tarjeta de crédito / débito</span>
            </label>

            <!-- Opción: pago contra entrega — no pide datos adicionales -->
            <label class="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
              <input type="radio" v-model="metodoPago" value="contraentrega" />
              <span>💵 Pago contra entrega</span>
            </label>
          </div>
        </div>

        <!-- Formulario de tarjeta — solo aparece si se eligió "tarjeta" -->
        <PaymentForm v-if="metodoPago === 'tarjeta'" v-model="datosTarjeta" />

        <!-- Mensaje de error si algo falla al pagar -->
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </div>

      <!-- Columna derecha — resumen y botón de confirmar -->
      <div class="bg-white rounded-lg shadow-sm p-6 h-fit border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Resumen del pedido</h2>

        <!-- Lista compacta de productos a comprar -->
        <ul class="space-y-2 border-b border-gray-100 pb-3 mb-3">
          <li
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex justify-between text-sm text-gray-700">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>S/ {{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>

        <!-- Total a pagar -->
        <div class="flex justify-between font-bold text-lg text-gray-800 mb-4">
          <span>Total</span>
          <span>S/ {{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>

        <!-- Botón final de confirmar compra -->
        <button
          @click="confirmarCompra"
          :disabled="procesando"
          class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed">
          {{ procesando ? 'Procesando...' : 'Confirmar compra' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { useUserStore } from '../stores/userStore'
import PaymentForm from '../components/PaymentForm.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()

// Datos de envío — se prellena el nombre si el usuario lo tiene en su sesión
const envio = reactive({
  nombre: userStore.user?.name || '',
  direccion: '',
  ciudad: '',
  telefono: ''
})

const metodoPago = ref('tarjeta')           // método por defecto
const datosTarjeta = ref({})                // llenado por PaymentForm vía v-model
const error = ref('')                       // mensajes de error
const procesando = ref(false)               // desactiva el botón mientras "paga"

// Valida y "procesa" la compra. La simulación consiste en:
// 1) validar los campos visibles
// 2) esperar ~1 segundo como si fuera una pasarela real
// 3) guardar el pedido, limpiar carrito y redirigir
async function confirmarCompra() {
  error.value = ''

  // Validación de la dirección — todos los campos son obligatorios
  if (!envio.nombre || !envio.direccion || !envio.ciudad || !envio.telefono) {
    error.value = 'Por favor completa todos los datos de envío.'
    return
  }

  // Si pagan con tarjeta, validamos los campos del formulario de tarjeta
  if (metodoPago.value === 'tarjeta') {
    const { numero, titular, vencimiento, cvv } = datosTarjeta.value
    if (!numero || !titular || !vencimiento || !cvv) {
      error.value = 'Por favor completa todos los datos de la tarjeta.'
      return
    }
    // El número de tarjeta debe tener al menos 13 dígitos (sin contar espacios)
    const digitos = numero.replace(/\s/g, '')
    if (digitos.length < 13) {
      error.value = 'El número de tarjeta no es válido.'
      return
    }
    // El CVV debe ser numérico y de 3 o 4 dígitos
    if (!/^\d{3,4}$/.test(cvv)) {
      error.value = 'El CVV no es válido.'
      return
    }
  }

  // Simulamos el procesamiento del pago con un pequeño retraso
  procesando.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Guardamos el pedido en el historial del usuario
  const nuevoPedido = orderStore.addOrder({
    items: [...cartStore.items],
    total: cartStore.totalPrice,
    envio: { ...envio },
    metodoPago: metodoPago.value === 'tarjeta' ? 'Tarjeta' : 'Contra entrega'
  })

  // Vaciamos el carrito ya que la compra se confirmó
  cartStore.clearCart()
  procesando.value = false

  // Avisamos al usuario y lo mandamos a su lista de pedidos
  alert('¡Compra confirmada! Tu pedido ' + nuevoPedido.id + ' ha sido registrado.')
  router.push('/orders')
}
</script>

# Prueba_tecnica_AdamsPay

DON ONOFRE desea aumentar sus ventas y para hacerlo, quiere exponer sus productos
y servicios en internet para que sus clientes pueden ordenar y pagar online. Para ello, ha
seleccionado la pasarela de pagos AdamsPay (https://adamspay.com) y te pide su sitio
web a vos.

## Condiciones 

1. Implementar una página web que despliegue productos o servicios de DON
ONOFRE (quedan libres a tu imaginación) y que el cliente los pague online.
2. Tu sistema debe indicar claramente tanto al cliente como a DON ONFRE si
una órden ha sido pagada y proveer el link de pago para hacerlo.
3. La implementación debe utilizar como pasarela de pagos AdamsPay,
implementando correcta y totalmente el ciclo de cobro de acuerdo a su
documentación.
4. El lenguaje de implementación debe ser uno de los tops 2023.
5. Los pagos pueden ser efectuados con el simulador de AdamsPay.

## Objetivos

- [ ] Frontend:
  - [x] Desplegar productos.
  - [x] Carrito.
    - [x] Diseño.
    - [x] Agregar al carrito.
    - [x] Remover del carrito.
    - [x] limpiar el carrito.
  - [x] Pago.
    - [x] Conexión con la API de pago.
  - [x] Interfaz de administrador.
  - [x] Login.
  - [x] Conexión con la API de backend.
  - [ ] Opcional:
    - [ ] Buscador.
    - [ ] Filtro.
    - [ ] Responsive.

- [ ] Backend:
  - [x] Modelo de productos.
  - [x] Modelo de usuarios.
  - [x] Modelo de deuda.
  - [x] Serializadores para los modelos.
  - [x] Views de productos.
  - [x] Views de usuario.
    - [x] Get.
    - [x] Create.
    - [x] Update.
    - [x] Delete.
  - [ ] Configuración para postgres.

- [ ] Despliegue (aws?)



## Herramientas utilizadas

 - Backend: Python-Django.
  - DjangoRestFramework.
  - Django-cors-headers. 
 - Frontend: Reactjs.







Página	            Elemento	            Localizador usado	                                                Acción
Bank Login	        Campo email	            getByPlaceholder('correo@ejemplo.com')'	                            fill
Bank Login          Campo contraseña        getByPlaceholder('Ingrese su contraseña')                           fill
Bank Login	        Botón Ingresar	        getByRole('button', { name: 'Ingresar' })	                        click
Bank Dashboard      Boton Cerrar sesión     getByRole('button', { name: 'Cerrar Sesión'})                       click
Bank Dashboard      Link Hacia historial    getByRole('link', { name: 'Ver Historial Completo →'})              click
Bank Dashboard      Descripción             getByRole('cell', { name: 'Transferencia Nequi' }) 
Bank Dashboard      Visualizar inicio       getByText('Hola, Carlos Andrés López')
Bank Historial      Botón panel             getByRole('link', { name: '← Panel'})                               click
Bank Historial      Boton Cerrar sesión     getByRole('button', { name: 'Cerrar Sesión'})                       click
Bank Historial      Combobox Todos tipos    getByRole('combobox')                                               select
Bank Historial      Selector credito        getByRole('option', { name: 'Crédito' })                            select
Bank Historial      Selector debito         getByRole('option', { name: 'Dédito' })                             select
Bank Historial      Descripción             getByRole('cell', { name: 'Nómina Empresa ABC' })                   
Bank Historial      Campo Buscar            getByPlaceholder('Buscar por descripción...')                       fill
Clinic Login        Campo documento         getByPlaceholder('Ej. 1234567890')                                  fill
Clinic Login        Campo contraseña        getByPlaceholder('Ingrese su contraseña')                           fill
Clinic Login        Botón ingresar          getByRole('button', { name: 'Ingresar' })                           click
Clinic Reserva      Botón Cerrar sesión     getByRole('button', { name: 'Cerrar Sesión' })                      click
Clinic Reserva      Combo Centro Medico     getByRole('combobox', { name: 'Centro Médico' })                    select
Clinic Reserva      Radio Si                getByRole('radio', { name: 'Sí' })                                  click
Clinic Reserva      Radio No                getByRole('radio', { name: 'No' })                                  click
Clinic Reserva      Combo Programa salud    getByRole('combobox', { name: 'Programa de Salud' })                select
Clinic Reserva      Fechas                  locator('[id="visitDate"]')                                         select
Clinic Reserva      Campo comentarios       getByPlaceholder('Describa sus síntomas, alergias o información relevante...')  fill
Clinic Reserva      Boton reservar          getByRole('button', { name: 'Reservar Cita'})                       click
Shop Catalogo       Campo Buscar productos  getByRole('textbox', { name: 'Buscar productos...'})                fill
Shop Catalogo       Botón Carrito           getByRole('link', { name: '🛒'})                                    click
Shop Catalogo       Producto café colombi   getByRole('link', { name: /Café Colombiano Premium 500g/ })         click
Shop Catalogo      Boton agregar al carrito locator('.product-card').filter({ hasText: 'Café Colombiano Premium 500g' }).getByRole('button', { name: 'Agregar al Carrito' })      click
Shop Catalogo       Spinbutton carrito      getByRole('row').filter({ hasText: 'Café Colombiano Premium 500g' }).getByRole('spinbutton')         click
Shop Catalogo       Botón remove            getByRole('button', { name: '✕'})                                   click
Shop Catalogo       Botón Seguir comprando  getByRole('link', { name: 'Seguir Comprando'})                       click
Shop Catalogo       Botón Ir a pagar        getByRole('link', { name: 'Ir a Pagar'})                             click
Shop Catalogo       Botón index             getByRole('link', { name: 'QAX Shop'})                               click
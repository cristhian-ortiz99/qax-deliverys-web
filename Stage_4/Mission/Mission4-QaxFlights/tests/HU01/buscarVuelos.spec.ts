import { test, expect } from '@playwright/test';

import { FlightsApi } from '../../apis/FlightsApis';
import { BuscarVueloPage } from '../../pages/BuscarVueloPage';

test.describe('HU01 - Buscar vuelos', () => {

    test('CP - Buscar vuelos disponibles', async ({page,request }) =>{

        const flightsApi = new FlightsApi(request);
        const buscarVueloPage = new BuscarVueloPage(page);

        const origin = 'BOG';
        const destination = 'MDE';
        const depart = '2026-08-15';
        const adults = 2;
        let flights: any[];

        await test.step('Given: Existe un vuelo disponible obtenido desde API', async () => {
            const result = await flightsApi.search({
                origin,
                destination,
                date: depart
            });
            expect(result.response.status()).toBe(200);

            flights = result.body;

            expect(flights.length).toBeGreaterThan(0);
        });


        await test.step('When: El usuario ingresa a la página de búsqueda con parámetros', async () => {
            await buscarVueloPage.navigate();
            await buscarVueloPage.searchFlight(
                origin,
                destination,
                depart,
                adults.toString()
            );
        });

        await test.step('Then: La página muestra los resultados de vuelos', async () => {

            await buscarVueloPage.validateResultsDisplayed();
        
        });

        await test.step('Then: El resumen muestra origen, destino, fecha y pasajeros', async () => {
            
            await buscarVueloPage.validateSummary(
                'Bogotá',
                'Medellín',
                depart,
                adults.toString()
            );
        });

        await test.step('Then: La información del vuelo coincide con la API', async () => {
            
            const airlines = await buscarVueloPage.getAirlines();

            expect(airlines).toContain(flights[0].airline);
        });
    })

    test('CP - Filtrar vuelos por aerolinea', async ({page, request}) => {
        
        const flightsApi = new FlightsApi(request);
        const buscarVueloPage = new BuscarVueloPage(page);
        let flights:any[];

        await test.step('Given: Obtener vuelos disponibles desde API', async()=>{
            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flights = result.body;
            expect(flights.length).toBeGreaterThan(0);
        });

        await test.step('When: Usuario busca vuelos disponibles', async()=>{
            const flight = flights[0];
            await buscarVueloPage.navigate();
            await buscarVueloPage.searchFlight(
                flight.origin,
                flight.destination,
                flight.departDate,
                '1'
            );
        });

        await test.step('And: Activar filtro de aerolinea', async()=>{
            await buscarVueloPage.filterByAirline(
                flights[0].airline
            );
        });

        await test.step('Then: Solo aparecen vuelos de la aerolinea seleccionada', async()=>{
            const airlines =await buscarVueloPage.getDisplayedAirlines();
            airlines.forEach(airline=>{expect(airline).toBe(flights[0].airline);
            });
        });
    });

    test('CP - Ordenar vuelos por precio menor a mayor', async ({page, request})=>{

        const flightsApi = new FlightsApi(request);
        const buscarVueloPage = new BuscarVueloPage(page);

        let flights:any[];

        await test.step('Given: Existe una lista de vuelos disponibles', async()=>{
            
            const result =await flightsApi.getAll();
            flights = result.body;
            expect(flights.length)
                .toBeGreaterThan(0);
        });

        await test.step('When: Usuario busca vuelos', async()=>{
            const flight = flights[0];

            await buscarVueloPage.navigate();
            await buscarVueloPage.searchFlight(
                flight.origin,
                flight.destination,
                flight.departDate,
                '1'
            );
        });

        await test.step('When: Ordena por precio menor a mayor', async()=>{
            await buscarVueloPage.sortBy(
                'price-asc'
            );
        });
    });

    test('CP - Buscar vuelos sin resultados', async ({page})=>{
        const buscarVueloPage =new BuscarVueloPage(page);

        await test.step('Given: Ruta inexistente', async()=>{
            await buscarVueloPage.navigate();
            await buscarVueloPage.searchFlight(
                'BOG',
                'MDE',
                '2023-01-01',
                '1'
            );
        });

        await test.step('Then: Mostrar mensaje sin resultados', async()=>{
            await expect(page.getByText('No se encontraron vuelos')).toBeVisible();
        });
    });

})
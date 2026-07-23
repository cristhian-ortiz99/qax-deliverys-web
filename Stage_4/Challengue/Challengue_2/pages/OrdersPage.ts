import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrdersPage extends BasePage{

    private readonly txtBuscar: Locator;
    private readonly cboEstado: Locator;
    private readonly tableBody: Locator;

    constructor(page: Page){
        super(page);

        this.txtBuscar = page.locator('#searchOrder');
        this.cboEstado = page.locator('#filterStatus');
        this.tableBody = page.locator('#ordersTableBody');
    }

    async searchOrder(texto: string) {
        await this.txtBuscar.fill(texto);
    }

    async filtrarEstado(estado: string) {
        await this.cboEstado.selectOption(estado);
    }

    async validarCliente(cliente: string) {
        await expect(this.tableBody).toContainText(cliente);
    }

    async validarProducto(producto: string) {
        await expect(this.tableBody).toContainText(producto);
    }

    async validarTotalProducto(producto: string, total: number) {
        const fila = this.page.locator('tbody tr').filter({hasText: producto});
        await expect(fila).toContainText(total.toLocaleString('es-CO'));
    }

    async validarEstado(estado: string) {
        await expect(this.tableBody).toContainText(estado);
    }


}
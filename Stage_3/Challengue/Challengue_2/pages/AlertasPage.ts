import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AlertasPage extends BasePage{
    readonly cmbActivo: Locator;
    readonly cmbCondicion: Locator;
    readonly txtPrecioObjetivo: Locator;
    readonly btnCrearAlerta: Locator;

    readonly listaAlertas: Locator;
    readonly itemsAlerta: Locator;
    readonly primerItemAlerta: Locator;
    readonly primerToggle: Locator;
    readonly primerEliminar: Locator;

    readonly estadoVacio: Locator;

    constructor(page : Page){
        super(page);

        this.cmbActivo = page.locator('#alertAsset');
        this.cmbCondicion = page.locator('#alertCondition');
        this.txtPrecioObjetivo = page.locator('#alertTarget');
        this.btnCrearAlerta = page.locator('.btn-create');

        this.listaAlertas = page.locator('#alertList');
        this.itemsAlerta = page.locator('.alert-item');
        this.primerItemAlerta = this.itemsAlerta.first();
        this.primerToggle = this.primerItemAlerta.locator('.toggle-btn');
        this.primerEliminar = this.primerItemAlerta.locator('.delete-btn');

        this.estadoVacio = page.locator('#emptyAlerts');
    }

    async seleccionarActivo(activo: string): Promise<void> {
        await this.cmbActivo.selectOption(activo);
    }

    async seleccionarCondicion(condicion: string): Promise<void> {
        await this.cmbCondicion.selectOption(condicion);
    }

    async ingresarPrecio(precio: number): Promise<void> {
        await this.txtPrecioObjetivo.fill(precio.toString());
    }

    async crearAlerta(activo: string, condicion: string, precio: number): Promise<void> {
        await this.seleccionarActivo(activo);
        await this.seleccionarCondicion(condicion);
        await this.ingresarPrecio(precio);

        await this.btnCrearAlerta.click();
    }

    async desactivarPrimeraAlerta(): Promise<void> {
        await this.primerToggle.click();
    }

    async eliminarPrimeraAlerta(): Promise<void> {
        await this.primerEliminar.click();
    }

    async validarFormulario(): Promise<void> {
        await expect(this.cmbActivo).toBeVisible();
        await expect(this.cmbCondicion).toBeVisible();
        await expect(this.txtPrecioObjetivo).toBeVisible();
        await expect(this.btnCrearAlerta).toBeVisible();
    }

    async validarAlertaCreada(): Promise<void> {
        await expect(this.itemsAlerta).toHaveCount(1);
    }

    async validarToggleVisible(): Promise<void> {
        await expect(this.primerToggle).toBeVisible();
    }

    async validarClaseInactiva(): Promise<void> {
        await expect(this.primerItemAlerta).toHaveClass(/inactive/);
    }

    async validarAlertaEliminada(): Promise<void> {
        await expect(this.itemsAlerta).toHaveCount(0);
    }

    async validarEstadoVacio(): Promise<void> {
        await expect(this.estadoVacio).toBeVisible();
    }
}
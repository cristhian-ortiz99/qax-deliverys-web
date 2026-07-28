import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage{

    private readonly btnNuevoProducto: Locator;

    private readonly txtNombreProducto: Locator;
    private readonly txtDescripcion: Locator;
    private readonly cmbCategoria: Locator;
    private readonly txtPrecio: Locator;
    private readonly txtStock: Locator;

    private readonly btnPublicarProducto: Locator;
    private readonly lnkOrdenesRecibidas: Locator;

    constructor(page:Page){
        
        super(page);

        this.btnNuevoProducto = page.getByRole('link', {name: '+ Publicar Nuevo Producto'});
        this.txtNombreProducto = page.getByRole('textbox', {name: 'Nombre del Producto'});
        this.txtDescripcion = page.getByRole('textbox', {name: 'Descripción'});
        this.cmbCategoria = page.getByLabel('Categoría');
        this.txtPrecio = page.getByRole('spinbutton', {name: 'Precio (COP)'});
        this.txtStock = page.getByRole('spinbutton', {name: 'Stock Disponible'});
        this.btnPublicarProducto = page.getByRole('button', {name: 'Publicar Producto'});
        this.lnkOrdenesRecibidas = page.getByRole('link', {name: 'Órdenes Recibidas'});
    }

    async abrirFormularioNuevoProducto() {
        await this.btnNuevoProducto.click();
    }

    async registrarProducto(producto: any) {
        await this.txtNombreProducto.fill(producto.nombre);
        await this.txtDescripcion.fill(producto.descripcion);
        await this.cmbCategoria.selectOption(producto.categoria);
        await this.txtPrecio.fill(producto.precio);
        await this.txtStock.fill(producto.stock);
    }

    async publicarProducto() {
        await this.btnPublicarProducto.click();
    }

    async irOrdenesRecibidas() {
        await this.lnkOrdenesRecibidas.click();
    }

}
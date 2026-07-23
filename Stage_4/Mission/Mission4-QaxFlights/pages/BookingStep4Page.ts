import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingStep4Page extends BasePage{

    readonly creditCardOption: Locator;
    readonly debitCardOption: Locator;
    readonly pseOption: Locator;

    readonly cardForm: Locator;
    readonly cardNumberInput: Locator;
    readonly expiryInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderInput: Locator;

    readonly orderSummary: Locator;

    readonly payButton: Locator;
    readonly buttonText: Locator;
    readonly spinner: Locator;
    readonly totalAmount: Locator;
    readonly paymentError: Locator;

    constructor(page:Page){

        super(page);

        this.creditCardOption = page.locator('[data-method="credit"]');
        this.debitCardOption = page.locator('[data-method="debit"]');
        this.pseOption = page.locator('[data-method="pse"]');

        this.cardForm = page.locator('#cardForm');
        this.cardNumberInput = page.locator('#cardNumber');
        this.expiryInput = page.locator('#expiry');
        this.cvvInput = page.locator('#cvv');
        this.cardHolderInput = page.locator('#cardHolder');

        this.orderSummary = page.locator('#orderSummary');

        this.payButton = page.locator('#payBtn');
        this.buttonText = page.locator('.btn-text');
        this.spinner = page.locator('.spinner');
        this.totalAmount = page.locator('.total-row dd');
        this.paymentError = page.locator('#payError');
    }

    async open(flightId: string, pax: number) {
        await this.navigate(`/booking-step4.html?flight=${flightId}&pax=${pax}`);
    }

    async validatePageLoaded() {
        await expect(this.page).toHaveURL(/booking-step4/);
        await expect(this.payButton).toBeVisible();
    }

    async validateDefaultPaymentMethod() {
        await expect(this.creditCardOption).toHaveClass(/selected/);
    }

    async selectCreditCard() {
        await this.creditCardOption.click();
    }

    async selectDebitCard() {
        await this.debitCardOption.click();
    }

    async selectPSE() {
        await this.pseOption.click();
    }

    async validateCardFormVisible() {
        await expect(this.cardForm).toBeVisible();
    }

    async validateCardFormHidden() {
        await expect(this.cardForm).toBeHidden();
    }

    async fillCardInformation(
        cardNumber: string,
        expiry: string,
        cvv: string,
        holder: string
    ) {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryInput.fill(expiry);
        await this.cvvInput.fill(cvv);
        await this.cardHolderInput.fill(holder);
    }

    async validateOrderSummary() {
        await expect(this.orderSummary).toBeVisible();
    }

    async validateSummaryContains(text: string) {
        await expect(this.orderSummary).toContainText(text);
    }

    async validateTotal(total: string) {
        await expect(this.orderSummary).toContainText(total);
    }

    async clickPay() {
        await this.payButton.click();
    }

    async validateProcessingState() {
        await expect(this.spinner).toBeVisible();
        await expect(this.buttonText).toBeHidden();
    }

    async validatePaymentError(message: string) {
        await expect(this.paymentError).toBeVisible();
        await expect(this.paymentError).toContainText(message);
    }

    async validateNavigationToConfirmation() {
        await expect(this.page).toHaveURL(/booking-confirm.html/);
    }

    async validateBookingCode() {
        await expect(this.page).toHaveURL(/id=QAX-TVL-/);
    }

    async getTotal(): Promise<number> {
        const totalText = await this.totalAmount.textContent();
        if (!totalText) {
            throw new Error('No se encontró el total.');
        }
        return Number(totalText.replace('$', '').replace(/\./g, '').replace(',', '').trim());
    }

}
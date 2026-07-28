import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingStep3Page extends BasePage{

    readonly baggageOptions: Locator;
    readonly baggageSummary: Locator;
    readonly baggageTotal: Locator;
    readonly continueButton: Locator;

    constructor(page:Page){
        super(page);

        this.baggageOptions = page.locator('.baggage-option');
        this.baggageSummary = page.locator('#baggageBreakdown');
        this.baggageTotal = page.locator('#baggageTotal');

        this.continueButton = page.getByRole('button', {name: 'Continuar a Pago'});
    }

    getOption(optionId: string): Locator {
        return this.page.locator(`#opt_${optionId}`);
    }

    async open(flightId: string, pax: number) {
        await this.navigate(`/booking-step3.html?flight=${flightId}&pax=${pax}`);
    }

    async selectBaggage(optionId: string) {
        await this.getOption(optionId).click();
    }

    async continueToPayment() {
        await Promise.all([
            this.page.waitForURL(/booking-step4\.html/),
            this.continueButton.click()
        ]);
    }

    async validatePageLoaded() {
        await expect(this.page).toHaveURL(/booking-step3/);
        await expect(this.page.getByRole('heading', {name: 'Servicios de equipaje'})).toBeVisible();
    }

    async validateOptions(quantity: number) {
        await expect(this.baggageOptions).toHaveCount(quantity);
    }

    async validateOptionSelected(optionId: string) {
        await expect(this.getOption(optionId)).toHaveClass(/selected/);
    }

    async validateOptionNotSelected(optionId: string) {
        await expect(this.getOption(optionId)).not.toHaveClass(/selected/);
    }

    async validateSummary(text: string) {
        await expect(this.baggageSummary).toContainText(text);
    }

    async validateEmptySummary() {
        await expect(this.baggageSummary).toContainText('Sin servicios seleccionados');
        await expect(this.baggageTotal).toContainText('$0');
    }

    async validateTotal(total: string) {
        await expect(this.baggageTotal).toContainText(total);
    }

    async validateNavigationToStep4() {
        await expect(this.page).toHaveURL(/booking-step4/);
    }

}
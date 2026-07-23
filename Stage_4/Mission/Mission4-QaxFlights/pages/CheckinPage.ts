import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckinPage extends BasePage{

    readonly bookingCodeInput: Locator;
    readonly lastNameInput: Locator;
    readonly searchButton: Locator;
    readonly errorMessage: Locator;

    readonly bookingInfo: Locator;
    readonly flightInfo: Locator;
    readonly passengerList: Locator;

    readonly passengerSelect: Locator;
    readonly newSeatSelect: Locator;
    readonly changeSeatButton: Locator;
    readonly seatChangeMessage: Locator;

    readonly boardingPass: Locator;
    readonly boardingContent: Locator;
    readonly qrCode: Locator;

    constructor(page:Page){
        super(page);

        this.bookingCodeInput = page.locator('#bookingCode');
        this.lastNameInput = page.locator('#lastName');
        this.searchButton = page.getByRole('button', { name: 'Buscar reserva' });
        this.errorMessage = page.locator('#checkinError');

        this.bookingInfo = page.locator('#bookingInfo');
        this.flightInfo = page.locator('#flightInfo');
        this.passengerList = page.locator('#passengerList');

        this.passengerSelect = page.locator('#passengerSelect');
        this.newSeatSelect = page.locator('#newSeatSelect');
        this.changeSeatButton = page.getByRole('button', { name: 'Cambiar Asiento' });
        this.seatChangeMessage = page.locator('#seatChangeMsg');

        this.boardingPass = page.locator('#boardingPass');
        this.boardingContent = page.locator('#boardingContent');
        this.qrCode = page.locator('#qrCode svg');
    }

    async open() {
        await this.navigate('/checkin.html');
    }

    async searchBooking(code: string, lastName: string) {
        await this.bookingCodeInput.fill(code);
        await this.lastNameInput.fill(lastName);
        await this.searchButton.click();
    }

    async validatePageLoaded() {
        await expect(this.page).toHaveURL(/checkin\.html/);
        await expect(this.bookingCodeInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.searchButton).toBeVisible();
    }

    async validateBookingLoaded() {
        await expect(this.bookingInfo).toBeVisible();
    }

    async validateFlightInformation(booking: any) {
        await expect(this.flightInfo).toContainText(booking.airline);
        await expect(this.flightInfo).toContainText(`${booking.origin} → ${booking.destination}`);
        await expect(this.flightInfo).toContainText(booking.departDate);
        await expect(this.flightInfo).toContainText(`${booking.departTime} - ${booking.arriveTime}`);
    }

    async validatePassengers(booking: any) {
        for (const passenger of booking.passengers) {
            await expect(this.passengerList).toContainText(`${passenger.firstName} ${passenger.lastName}`);
            await expect(this.passengerList).toContainText(passenger.docNumber);
        }
        for (const seat of booking.selectedSeats) {
            await expect(this.passengerList).toContainText(seat);
        }
    }

    async selectPassenger(index: number) {
        await this.passengerSelect.selectOption(index.toString());
    }

    async selectSeat(seat: string) {
        await this.newSeatSelect.selectOption(seat);
    }

    async clickChangeSeat() {
        await this.changeSeatButton.click();
    }

    async validateSeatChanged(newSeat: string) {
        await expect(this.passengerList).toContainText(newSeat);
    }

    async validateSeatChangeMessage() {
        await expect(this.seatChangeMessage).toBeVisible();
        await expect(this.seatChangeMessage).toContainText(
            '¡Asiento cambiado!'
        );
    }

    async validateBoardingPass() {
        await expect(this.boardingPass).toBeVisible();
    }

    async validateBoardingPassengers(booking: any) {
        for (const passenger of booking.passengers) {
            await expect(this.boardingContent).toContainText(`${passenger.firstName} ${passenger.lastName}`);
            await expect(this.boardingContent).toContainText(passenger.docNumber);
        }
        for (const seat of booking.selectedSeats) {
            await expect(this.boardingContent).toContainText(seat);
        }
    }

    async validateQRCode() {
        await expect(this.qrCode).toBeVisible();
    }

    async validateSearchError(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
    }

    async performCheckin(booking: any) {
        await this.searchBooking(booking.id,booking.passengers[0].lastName);
        await this.validateBookingLoaded();
    }

    async selectFirstAvailableSeat(): Promise<string> {
        const options = this.page.locator('#newSeatSelect option');
        const seat = await options.nth(1).getAttribute('value') ?? '';
        await this.newSeatSelect.selectOption(seat);
        return seat;
    }

}
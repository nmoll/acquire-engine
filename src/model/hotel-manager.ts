import { BoardUtils } from "../utils/board-utils";
import { BoardSquareState } from "./board-square-state";
import { Hotel } from "./hotel";
import { HotelChainType } from "./hotel-chain-type";

export class HotelManager {
  private hotelsByType: Record<HotelChainType, Hotel>;

  constructor(private boardState: BoardSquareState[]) {
    this.hotelsByType = this.initializeHotelsByType();
  }

  getHotel(type: HotelChainType): Hotel {
    return this.hotelsByType[type];
  }

  getActiveHotels(): Hotel[] {
    return this.hotels.filter((hotel) => hotel.isActive());
  }

  getInactiveHotels(): Hotel[] {
    return this.hotels.filter((hotel) => !hotel.isActive());
  }

  findAllAdjacentToSquare(square: number): Hotel[] {
    return this.hotels.filter((hotel) =>
      hotel.boardSquareIds.some((id) =>
        BoardUtils.isAdjacent(this.boardState, id, square)
      )
    );
  }

  getLargestHotel(hotels: Hotel[]): Hotel[] {
    const maxSize = Math.max(...hotels.map((hotel) => hotel.getSize()));
    return hotels.filter((hotel) => hotel.getSize() === maxSize);
  }

  /**
   * A square is considered "dead" if it merges 2 companies that are safe.
   */
  isDeadSquare(square: number): boolean {
    const adjacentHotels = this.findAllAdjacentToSquare(square);
    return adjacentHotels.filter((hotel) => hotel.isSafe()).length >= 2;
  }

  private get hotels(): Hotel[] {
    return Object.values(this.hotelsByType);
  }

  private initializeHotelsByType(): Record<HotelChainType, Hotel> {
    return {
      American: new Hotel("American", this.getSquaresForHotel("American")),
      Continental: new Hotel(
        "Continental",
        this.getSquaresForHotel("Continental")
      ),
      Festival: new Hotel("Festival", this.getSquaresForHotel("Festival")),
      Imperial: new Hotel("Imperial", this.getSquaresForHotel("Imperial")),
      Worldwide: new Hotel("Worldwide", this.getSquaresForHotel("Worldwide")),
      Tower: new Hotel("Tower", this.getSquaresForHotel("Tower")),
      Luxor: new Hotel("Luxor", this.getSquaresForHotel("Luxor")),
    };
  }

  private getSquaresForHotel(type: HotelChainType): number[] {
    return this.boardState
      .map((square, idx) =>
        square.type === "HasHotelChain" && square.hotelChainType === type
          ? idx
          : null
      )
      .filter((idx): idx is number => idx !== null);
  }
}

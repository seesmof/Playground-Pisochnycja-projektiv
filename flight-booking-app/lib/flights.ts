export type Airport = {
  code: string
  city: string
  name: string
}

export const AIRPORTS: Airport[] = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy Intl' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles Intl' },
  { code: 'ORD', city: 'Chicago', name: "O'Hare Intl" },
  { code: 'MIA', city: 'Miami', name: 'Miami Intl' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco Intl' },
  { code: 'DFW', city: 'Dallas', name: 'Dallas/Fort Worth Intl' },
  { code: 'LHR', city: 'London', name: 'Heathrow' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle' },
  { code: 'NRT', city: 'Tokyo', name: 'Narita Intl' },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith' },
]

export type Flight = {
  id: string
  airline: string
  flightNumber: string
  from: string
  to: string
  departure: string // ISO
  arrival: string // ISO
  durationMinutes: number
  price: number // USD per passenger
  seatsTotal: number
  seatsLeft: number
  stops: number
  aircraft: string
}

function isoDaysFromNow(days: number, hour: number, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString()
}

type Seed = Omit<Flight, 'id' | 'departure' | 'arrival'> & {
  id: string
  daysOut: number
  depHour: number
  depMinute?: number
}

const SEEDS: Seed[] = [
  { id: 'FL-101', airline: 'Skyline Air', flightNumber: 'SK 214', from: 'JFK', to: 'LAX', daysOut: 2, depHour: 8, durationMinutes: 360, price: 249, seatsTotal: 180, seatsLeft: 42, stops: 0, aircraft: 'Boeing 737' },
  { id: 'FL-102', airline: 'Skyline Air', flightNumber: 'SK 215', from: 'LAX', to: 'JFK', daysOut: 3, depHour: 14, durationMinutes: 330, price: 269, seatsTotal: 180, seatsLeft: 35, stops: 0, aircraft: 'Boeing 737' },
  { id: 'FL-103', airline: 'Atlantic Wings', flightNumber: 'AW 88', from: 'JFK', to: 'LHR', daysOut: 5, depHour: 19, depMinute: 30, durationMinutes: 425, price: 549, seatsTotal: 280, seatsLeft: 61, stops: 0, aircraft: 'Boeing 787' },
  { id: 'FL-104', airline: 'Atlantic Wings', flightNumber: 'AW 89', from: 'LHR', to: 'JFK', daysOut: 9, depHour: 10, durationMinutes: 460, price: 529, seatsTotal: 280, seatsLeft: 58, stops: 0, aircraft: 'Boeing 787' },
  { id: 'FL-105', airline: 'Pacific Jet', flightNumber: 'PJ 402', from: 'SFO', to: 'NRT', daysOut: 7, depHour: 11, durationMinutes: 660, price: 799, seatsTotal: 320, seatsLeft: 74, stops: 0, aircraft: 'Airbus A350' },
  { id: 'FL-106', airline: 'Continental Hop', flightNumber: 'CH 117', from: 'ORD', to: 'DFW', daysOut: 1, depHour: 9, depMinute: 15, durationMinutes: 135, price: 129, seatsTotal: 150, seatsLeft: 22, stops: 0, aircraft: 'Embraer E190' },
  { id: 'FL-107', airline: 'Continental Hop', flightNumber: 'CH 118', from: 'DFW', to: 'ORD', daysOut: 1, depHour: 17, durationMinutes: 135, price: 139, seatsTotal: 150, seatsLeft: 18, stops: 0, aircraft: 'Embraer E190' },
  { id: 'FL-108', airline: 'Euro Connect', flightNumber: 'EC 305', from: 'JFK', to: 'CDG', daysOut: 4, depHour: 21, durationMinutes: 440, price: 499, seatsTotal: 260, seatsLeft: 47, stops: 0, aircraft: 'Airbus A330' },
  { id: 'FL-109', airline: 'Sun Coast', flightNumber: 'SC 77', from: 'MIA', to: 'JFK', daysOut: 2, depHour: 7, depMinute: 45, durationMinutes: 170, price: 149, seatsTotal: 170, seatsLeft: 29, stops: 0, aircraft: 'Airbus A320' },
  { id: 'FL-110', airline: 'Sun Coast', flightNumber: 'SC 78', from: 'JFK', to: 'MIA', daysOut: 6, depHour: 16, depMinute: 20, durationMinutes: 175, price: 159, seatsTotal: 170, seatsLeft: 33, stops: 0, aircraft: 'Airbus A320' },
  { id: 'FL-111', airline: 'Pacific Jet', flightNumber: 'PJ 610', from: 'LAX', to: 'SYD', daysOut: 12, depHour: 22, durationMinutes: 885, price: 949, seatsTotal: 340, seatsLeft: 88, stops: 0, aircraft: 'Boeing 777' },
  { id: 'FL-112', airline: 'Budget Flyer', flightNumber: 'BF 333', from: 'ORD', to: 'LAX', daysOut: 3, depHour: 6, depMinute: 30, durationMinutes: 245, price: 99, seatsTotal: 190, seatsLeft: 12, stops: 1, aircraft: 'Boeing 737' },
  { id: 'FL-113', airline: 'Budget Flyer', flightNumber: 'BF 334', from: 'LAX', to: 'ORD', daysOut: 8, depHour: 12, durationMinutes: 240, price: 109, seatsTotal: 190, seatsLeft: 15, stops: 1, aircraft: 'Boeing 737' },
  { id: 'FL-114', airline: 'Skyline Air', flightNumber: 'SK 501', from: 'SFO', to: 'JFK', daysOut: 4, depHour: 13, depMinute: 10, durationMinutes: 320, price: 229, seatsTotal: 180, seatsLeft: 40, stops: 0, aircraft: 'Airbus A321' },
  { id: 'FL-115', airline: 'Euro Connect', flightNumber: 'EC 512', from: 'CDG', to: 'JFK', daysOut: 10, depHour: 9, durationMinutes: 480, price: 519, seatsTotal: 260, seatsLeft: 52, stops: 0, aircraft: 'Airbus A330' },
  { id: 'FL-116', airline: 'Desert Air', flightNumber: 'DA 204', from: 'DFW', to: 'LAX', daysOut: 2, depHour: 18, depMinute: 40, durationMinutes: 190, price: 179, seatsTotal: 160, seatsLeft: 26, stops: 0, aircraft: 'Boeing 737' },
]

export const FLIGHTS: Flight[] = SEEDS.map((s) => {
  const departure = isoDaysFromNow(s.daysOut, s.depHour, s.depMinute ?? 0)
  return {
    id: s.id,
    airline: s.airline,
    flightNumber: s.flightNumber,
    from: s.from,
    to: s.to,
    departure,
    arrival: addMinutes(departure, s.durationMinutes),
    durationMinutes: s.durationMinutes,
    price: s.price,
    seatsTotal: s.seatsTotal,
    seatsLeft: s.seatsLeft,
    stops: s.stops,
    aircraft: s.aircraft,
  }
})

export type FlightSearch = {
  from?: string
  to?: string
  date?: string // YYYY-MM-DD
  passengers?: number
}

export function searchFlights(search: FlightSearch): Flight[] {
  return FLIGHTS.filter((f) => {
    if (search.from && f.from !== search.from) return false
    if (search.to && f.to !== search.to) return false
    if (search.date) {
      const depDate = new Date(f.departure).toISOString().slice(0, 10)
      if (depDate !== search.date) return false
    }
    if (search.passengers && f.seatsLeft < search.passengers) return false
    return true
  }).sort(
    (a, b) => +new Date(a.departure) - +new Date(b.departure)
  )
}

export function getFlightById(id: string): Flight | null {
  return FLIGHTS.find((f) => f.id === id) ?? null
}

export function airportCity(code: string): string {
  return AIRPORTS.find((a) => a.code === code)?.city ?? code
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

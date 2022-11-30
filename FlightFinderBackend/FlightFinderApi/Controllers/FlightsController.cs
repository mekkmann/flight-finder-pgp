using Microsoft.AspNetCore.Mvc;
using FlightFinderApi.Models;
using FlightFinderApi.Models.DTO;
using System.Text.Json;

namespace FlightFinderApi.Controllers.FlightsController;

[ApiController]
public class FlightsController : ControllerBase
{
    // create booking
    [HttpPost("/bookings")]
    public IActionResult CreateBooking()
    {
        // TODO: Implement "booking"
        return Ok("PHBooked!");
    }

    // get flights by search criteria
    [HttpGet("/flights/search")]
    public async Task<IActionResult> GetAllFlightsBySearchCriteria(
        string? departureLocation = null,
        string? departureDate = null,
        string? arrivalDate = null,
        string? returnDate = null,
        string? arrivalDestination = null,
        bool roundTrip = true,
        int adults = 1,
        int children = 0,
        bool direct = false)
    {
        // enforce invariants
        if (adults <= 0 || children < 0) return BadRequest("Amount of adults must be 1+ and children can't be negative");

        List<Flight> allFlights = new();

        using (StreamReader r = new StreamReader("Data\\data.json"))
        {
            var json = await r.ReadToEndAsync();
            if (string.IsNullOrWhiteSpace(json))
            {
                return StatusCode(500); // internal server error
            }
            allFlights = JsonSerializer.Deserialize<List<Flight>>(json);
        }

        if (allFlights == null) return StatusCode(500);


        // if !roundTrip
        if (!roundTrip && !string.IsNullOrWhiteSpace(departureLocation) && !string.IsNullOrWhiteSpace(arrivalDestination))
        {
            var locationFiltered = allFlights.Where(x => x.DepartureDestination.ToLower() == departureLocation.ToLower() &&
                                                         x.ArrivalDestination.ToLower() == arrivalDestination.ToLower()).ToList();

            List<Itinerary> itineraries = new();
            var flightId = "";
            var departureDest = "";
            var arrivalDest = "";
            foreach (var route in locationFiltered)
            {
                flightId = route.FlightId;
                departureDest = route.DepartureDestination;
                arrivalDest = route.ArrivalDestination;
                for (var i = 0; i < route.Itineraries.Count; i++)
                {
                    if (route.Itineraries[i].DepartureAt.ToString().Split(" ")[0] == departureDate && route.Itineraries[i].AvailableSeats >= (adults + children))
                    {
                        itineraries.Add(route.Itineraries[i]);
                    }
                }
            }
            OneWayFlightDTO completedFiltering = new(flightId, departureDest, arrivalDest, itineraries);
            List<OneWayFlightDTO> list = new() { completedFiltering };
            return Ok(list);
        }

        // for roundtrip
        if (roundTrip && !string.IsNullOrWhiteSpace(departureLocation) && !string.IsNullOrWhiteSpace(arrivalDestination))
        {
            // for outbound flight
            var locationFiltered1 = allFlights.Where(x => x.DepartureDestination.ToLower() == departureLocation.ToLower() &&
                                                         x.ArrivalDestination.ToLower() == arrivalDestination.ToLower()).ToList();

            List<Itinerary> itineraries1 = new();

            var flightId1 = "";
            var departureDest1 = "";
            var arrivalDest1 = "";
            foreach (var route in locationFiltered1)
            {
                flightId1 = route.FlightId;
                departureDest1 = route.DepartureDestination;
                arrivalDest1 = route.ArrivalDestination;
                for (var i = 0; i < route.Itineraries.Count; i++)
                {
                    if (route.Itineraries[i].DepartureAt.ToString().Split(" ")[0] == departureDate && route.Itineraries[i].AvailableSeats >= (adults + children))
                    {
                        itineraries1.Add(route.Itineraries[i]);
                    }
                }
            }
            OneWayFlightDTO outbound = new(flightId1, departureDest1, arrivalDest1, itineraries1);


            // for return flight
            var locationFiltered2 = allFlights.Where(x => x.DepartureDestination.ToLower() == arrivalDestination.ToLower() &&
                                                         x.ArrivalDestination.ToLower() == departureLocation.ToLower()).ToList();
            List<Itinerary> itineraries2 = new();

            var flightId2 = "";
            var departureDest2 = "";
            var arrivalDest2 = "";
            foreach (var route in locationFiltered2)
            {
                flightId2 = route.FlightId;
                departureDest2 = route.DepartureDestination;
                arrivalDest2 = route.ArrivalDestination;
                for (var i = 0; i < route.Itineraries.Count; i++)
                {
                    if (route.Itineraries[i].DepartureAt.ToString().Split(" ")[0] == returnDate && route.Itineraries[i].AvailableSeats >= (adults + children))
                    {
                        Console.WriteLine(route.Itineraries[i].DepartureAt.ToString().Split(" ")[0]);
                        itineraries2.Add(route.Itineraries[i]);
                    }
                }
            }
            OneWayFlightDTO returnFlight = new(flightId2, departureDest2, arrivalDest2, itineraries2);
            List<OneWayFlightDTO> flightList = new() { outbound, returnFlight };
            return Ok(flightList);
        }





        // return internal server error
        return StatusCode(500);

    }

    // HELPER METHODS

}
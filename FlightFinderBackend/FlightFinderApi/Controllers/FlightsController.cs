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


        // if !roundTrip, departureLocation and arrivalLocation is specified, filter flights based on that
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
            return Ok(completedFiltering);
        }





        // returns all flights if no criteria is met
        return Ok(allFlights);

    }

    // MAYBE: get singular flight
    // [HttpGet("/flights/{id}")]
    // public IActionResult GetFlight(string id)
    // {
    //     return Ok(id);
    // }

    // HELPER METHODS

}
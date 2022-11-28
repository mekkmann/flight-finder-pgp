using Microsoft.AspNetCore.Mvc;
using FlightFinderApi.Models.Flight;
using System.Text.Json;

namespace FlightFinderApi.Controllers.FlightsController;

[ApiController]
public class FlightsController : ControllerBase
{
    // create booking
    [HttpPost("/bookings")]
    public IActionResult CreateBooking()
    {
        return Ok("PHBooked!");
    }

    // get all flights (mostly for testing)
    // [HttpGet("/flights")]
    // public async Task<IActionResult> GetAllFlights()
    // {
    //     List<Flight> flights = new();

    //     using (StreamReader r = new StreamReader("Data\\data.json"))
    //     {
    //         string json = await r.ReadToEndAsync();
    //         if (string.IsNullOrWhiteSpace(json))
    //         {
    //             return StatusCode(500); // internal server error
    //         }

    //         flights = JsonSerializer.Deserialize<List<Flight>>(json);
    //     }

    //     return Ok(flights);
    // }
    // get flights by search criteria
    [HttpGet("/flights/search")]
    public async Task<IActionResult> GetAllFlightsBySearchCriteria(
        string? departureLocation = null,
        DateTime? departureDate = null,
        DateTime? arrivalDate = null,
        DateTime? returnDate = null,
        string? arrivalDestination = null,
        bool roundTrip = true,
        int adults = 1,
        int children = 0)
    {
        // enforce invariants
        if (adults <= 0 || children < 0) return BadRequest("Amount of adults/children can't be negative");


        var fakedJson = "";
        List<Flight> flights = new();


        // below gets all flights if no location/departure data is provided
        if (departureDate == null &&
            arrivalDate == null &&
            string.IsNullOrWhiteSpace(departureLocation) &&
            string.IsNullOrWhiteSpace(arrivalDestination))
        {
            using (StreamReader r = new StreamReader("Data\\data.json"))
            {
                fakedJson = await r.ReadToEndAsync();
                if (string.IsNullOrWhiteSpace(fakedJson))
                {
                    return StatusCode(500); // internal server error
                }

            }
            flights = JsonSerializer.Deserialize<List<Flight>>(fakedJson);
        }

        return Ok(flights);
    }

    // MAYBE: get singular flight
    // [HttpGet("/flights/{id}")]
    // public IActionResult GetFlight(string id)
    // {
    //     return Ok(id);
    // }

    // HELPER METHODS

}
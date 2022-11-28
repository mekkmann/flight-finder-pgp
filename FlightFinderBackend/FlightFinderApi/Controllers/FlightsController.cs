using Microsoft.AspNetCore.Mvc;

//test file read
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
        return Ok();
    }
    // get all flights
    [HttpGet("/flights")]
    public async Task<IActionResult> GetAllFlights()
    {
        List<Flight> flights = new();

        using (StreamReader r = new StreamReader("Data\\data.json"))
        {
            string json = await r.ReadToEndAsync();
            flights = JsonSerializer.Deserialize<List<Flight>>(json);
        }

        return Ok(flights);
    }
    // get flights by search criteria

    // MAYBE: get singular flight
    [HttpGet("/flights/{id}")]
    public IActionResult GetFlight(string id)
    {
        return Ok(id);
    }
}
using Microsoft.AspNetCore.Mvc;
using FlightFinderApi.Models;
using FlightFinderApi.Models.DTO;
using System.Text.Json;
using System.Net.Mail;
using System.Net;

namespace FlightFinderApi.Controllers.FlightsController;

[ApiController]
public class FlightsController : ControllerBase
{

    // "post to database" aka rewrite json
    [HttpPost("/flights/book")]
    public async Task<IActionResult> BookFlight(
        string? flightId1,
        DateTime? departureDate1,
        string? flightId2,
        DateTime? departureDate2,
        string? recipientEmail,
        int amountOfPassengers = 1
        )
    {

        List<Flight> updatedFlights = new();
        string jsonToWrite = "";

        using (StreamReader r = new StreamReader("Data\\data.json"))
        {

            var json = await r.ReadToEndAsync();

            if (string.IsNullOrWhiteSpace(json))
            {
                return StatusCode(500); // internal server error
            }
            var deserJson = JsonSerializer.Deserialize<List<Flight>>(json);

            // if (deserJson.Count == 0) return StatusCode(500); // internal server error
            // for oneway
            if (!string.IsNullOrWhiteSpace(flightId1) && string.IsNullOrWhiteSpace(flightId2))
            {


                var flightsToUpdate1 = deserJson.Where(x => x.FlightId == flightId1).ToList();
                var flightsToNotUpdate1 = deserJson.Where(x => x.FlightId != flightId1).ToList();

                var itinerariesToUpdate1 = flightsToUpdate1.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() == departureDate1.ToString()).ToList();
                var itinerariesToNotUpdate1 = flightsToUpdate1.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() != departureDate1.ToString()).ToList();

                itinerariesToUpdate1[0].AvailableSeats -= amountOfPassengers;

                var updatedItinerary1 = itinerariesToUpdate1[0];

                List<Itinerary> togetherAgain1 = itinerariesToNotUpdate1.Concat(itinerariesToUpdate1).ToList();
                flightsToUpdate1[0].Itineraries = togetherAgain1;
                var flightsTogetherAgain1 = flightsToNotUpdate1.Concat(flightsToUpdate1).ToList();
                jsonToWrite = JsonSerializer.Serialize(flightsTogetherAgain1);
            }
            // for round trip
            if (!string.IsNullOrWhiteSpace(flightId1) && !string.IsNullOrWhiteSpace(flightId2))
            {

                var flightsToUpdate1 = deserJson.Where(x => x.FlightId == flightId1).ToList();
                var flightsToNotUpdate1 = deserJson.Where(x => x.FlightId != flightId1 && x.FlightId != flightId2).ToList();

                var flightsToUpdate2 = deserJson.Where(x => x.FlightId == flightId2).ToList();
                // var flightsToNotUpdate2 = deserJson.Where(x => x.FlightId != flightId2).ToList(); // // previous

                var itinerariesToUpdate1 = flightsToUpdate1.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() == departureDate1.ToString()).ToList();
                var itinerariesToNotUpdate1 = flightsToUpdate1.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() != departureDate1.ToString()).ToList();

                var itinerariesToUpdate2 = flightsToUpdate2.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() == departureDate2.ToString()).ToList();
                var itinerariesToNotUpdate2 = flightsToUpdate2.SelectMany(f => f.Itineraries).Where(i => i.DepartureAt.ToString() != departureDate2.ToString()).ToList();

                var listOfItinerariesListToUpdate = flightsToUpdate1.Select(f => f.Itineraries).ToList();





                // update availableSeats in itineraries 
                itinerariesToUpdate1[0].AvailableSeats -= amountOfPassengers;
                itinerariesToUpdate2[0].AvailableSeats -= amountOfPassengers;


                var updatedItinerary1 = itinerariesToUpdate1[0];
                var updatedItinerary2 = itinerariesToUpdate2[0];


                List<Itinerary> togetherAgain1 = itinerariesToNotUpdate1.Concat(itinerariesToUpdate1).ToList();
                List<Itinerary> togetherAgain2 = itinerariesToNotUpdate2.Concat(itinerariesToUpdate2).ToList();



                flightsToUpdate1[0].Itineraries = togetherAgain1;
                flightsToUpdate2[0].Itineraries = togetherAgain2;

                var flightsTogetherAgain1 = flightsToNotUpdate1.Concat(flightsToUpdate1).ToList();
                // var flightsTogetherAgain2 = flightsToNotUpdate2.Concat(flightsToUpdate2).ToList(); // //previous
                var flightsTogetherAgain2 = flightsTogetherAgain1.Concat(flightsToUpdate2).ToList();

                var allFlightsTogetherAtLast = flightsTogetherAgain1.Concat(flightsTogetherAgain2);
                // jsonToWrite = JsonSerializer.Serialize(allFlightsTogetherAtLast);   // //previous
                jsonToWrite = JsonSerializer.Serialize(flightsTogetherAgain2);


            }

        }

        Helpers.WriteToFile(jsonToWrite, "Data\\data.json");

        if (!string.IsNullOrWhiteSpace(recipientEmail))
        {
            try
            {

                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailMessage email = new MailMessage();
                // START
                email.From = new MailAddress("alex.p.liljekvist@gmail.com");
                email.To.Add(recipientEmail);
                email.CC.Add("alex.p.liljekvist@gmail.com");
                email.Subject = "FlightFinder Confirmation (PGP)";
                email.Body = "Congratulations, your flight is booked! Now sit back, relax and grab yourself a beverage.";
                //END
                SmtpServer.Timeout = 5000;
                SmtpServer.EnableSsl = true;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new NetworkCredential("alex.p.liljekvist@gmail.com", "yabnnmarjsmqtahk");
                SmtpServer.Send(email);
                Console.WriteLine("Email Successfully Sent");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        return Ok("booked");
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
                        itineraries2.Add(route.Itineraries[i]);
                    }
                }
            }
            OneWayFlightDTO returnFlight = new(flightId2, departureDest2, arrivalDest2, itineraries2);
            List<OneWayFlightDTO> flightList = new() { outbound, returnFlight };
            Helpers.Sleep(3000);
            return Ok(flightList);
        }


        // return internal server error
        return StatusCode(500);

    }



}

// HELPER METHODS CLASS
public static class Helpers
{
    public static void Sleep(int milliseconds)
    {
        System.Threading.Thread.Sleep(3000);
    }
    public static void WriteToFile(string jsonString, string path)
    {
        File.WriteAllText(path, jsonString);
    }
}
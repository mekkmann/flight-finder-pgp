
using System.Text.Json.Serialization;

namespace FlightFinderApi.Models.Flight;

public class Flight
{
    [JsonPropertyName("flight_id")]
    public string FlightId { get; set; }
    [JsonPropertyName("depatureDestination")]
    public string DepartureDestination { get; set; }

    [JsonPropertyName("arrivalDestination")]
    public string ArrivalDestination { get; set; }

    [JsonPropertyName("itineraries")]
    public IList<Itinerary> Itineraries { get; set; }
}
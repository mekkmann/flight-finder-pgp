
using System.Text.Json.Serialization;

namespace FlightFinderApi.Models.DTO;

public class OneWayFlightDTO
{
    [JsonPropertyName("flight_id")]
    public string FlightId { get; set; }
    [JsonPropertyName("departureDestination")]
    public string DepartureDestination { get; set; }

    [JsonPropertyName("arrivalDestination")]
    public string ArrivalDestination { get; set; }

    [JsonPropertyName("itineraries")]
    public List<Itinerary> Itineraries { get; set; }

    // basic constructor
    [JsonConstructor]
    public OneWayFlightDTO(string id, string departureDestination, string arrivalDestination, List<Itinerary> itineraries)
    {
        FlightId = id;
        DepartureDestination = departureDestination;
        ArrivalDestination = arrivalDestination;
        Itineraries = itineraries;
    }
}
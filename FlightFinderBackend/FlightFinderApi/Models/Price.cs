using System.Text.Json.Serialization;

namespace FlightFinderApi.Models;

public class Price
{
    [JsonPropertyName("currency")]
    public string Currency { get; set; }
    [JsonPropertyName("adult")]
    public int Adult { get; set; }
    [JsonPropertyName("child")]
    public int Child { get; set; }
}
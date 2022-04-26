using JsonSubTypes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Microsoft.Cadl.Remote {

  [JsonConverter(typeof(JsonSubtypes), "type")]
  [JsonSubtypes.KnownSubType(typeof(RemoteObjectMeta), "object")]
  [JsonSubtypes.KnownSubType(typeof(RemoteArrayMeta), "array")]
  [JsonSubtypes.KnownSubType(typeof(RemoteValueMeta<>), "value")]
  public abstract record RemoteMeta([property: JsonProperty("type")] string Type);

  public record RemoteObjectMeta([property: JsonProperty("id")] long Id, [property: JsonProperty("members")] ObjectMember[] Members) : RemoteMeta("object");
  public record RemoteArrayMeta([property: JsonProperty("items")] RemoteMeta[] Items) : RemoteMeta("array");
  public record RemoteValueMeta<T>([property: JsonProperty("value")] T Value) : RemoteMeta("value");

  [JsonConverter(typeof(StringEnumConverter))]
  public enum ObjectMemeberType {
    Method,
    Property,
  }

  public record ObjectMember([property: JsonProperty("name")] string Name, [property: JsonProperty("type")] ObjectMemeberType Type);
}

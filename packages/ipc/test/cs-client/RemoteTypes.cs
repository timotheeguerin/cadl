using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Microsoft.Cadl.Remote {

  public record RemoteMeta([property: JsonProperty("type")] string Type);
  public record RemoteObjectMeta([property: JsonProperty("id")] long Id, [property: JsonProperty("members")] ObjectMember[] Members) : RemoteMeta("Object");
  public record RemoteArrayMeta([property: JsonProperty("items")] RemoteMeta[] Items) : RemoteMeta("Array");
  public record RemoteValueMeta<T>([property: JsonProperty("value")] T Value) : RemoteMeta("Value");

  [JsonConverter(typeof(StringEnumConverter))]
  public enum ObjectMemeberType {
    Method,
    Property,
  }

  public record ObjectMember([property: JsonProperty("name")] string Name, [property: JsonProperty("type")] ObjectMemeberType Type);
}

using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;

namespace Microsoft.Cadl.Remote {

  public record RemoteMeta(string Type);
  public record RemoteObjectMeta(long Id, ObjectMember[] Members) : RemoteMeta("Object");
  public record RemoteValueMeta<T>(T Value) : RemoteMeta("Value");

  [JsonConverter(typeof(StringEnumConverter))]
  public enum ObjectMemeberType {
    Method,
    Property,
  }

  public record ObjectMember(string Name, ObjectMemeberType Type);
}

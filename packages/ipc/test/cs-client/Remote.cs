using Newtonsoft.Json;
using StreamJsonRpc;

namespace Microsoft.Cadl.Remote {
  public static class RemoteRequests {
    public const string PropertyGet = "CADL_OBJECT_PROP_GET";
    public const string MethodCall = "CADL_OBJECT_METHOD_CALL";
    public const string ImportModule = "CADL_IMPORT_MODULE";
  }


  public class PropertyAccessRequest {
    [JsonProperty("objectId")]
    public long ObjectId { get; set; }

    [JsonProperty("key")]
    public string Key { get; set; }
  }

  public class ImportModuleRequest {
    [JsonProperty("name")]
    public string Name { get; set; }
  }


  public class CadlRemote {
    private readonly JsonRpc connection;

    public CadlRemote(JsonRpc connection) {
      this.connection = connection;
    }

    public Task<RemoteObjectMeta> ImportModuleAsync(string name) {
      return this.connection.InvokeAsync<RemoteObjectMeta>(RemoteRequests.ImportModule, new ImportModuleRequest { Name = name });
    }
  }
}

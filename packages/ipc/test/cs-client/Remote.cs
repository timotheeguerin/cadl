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

  public class MethodCallRequest {
    [JsonProperty("objectId")]
    public long ObjectId { get; set; }

    [JsonProperty("key")]
    public string Key { get; set; }

    [JsonProperty("args")]
    public RemoteMeta[] Args { get; set; }
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
      return connection.InvokeAsync<RemoteObjectMeta>(RemoteRequests.ImportModule, new ImportModuleRequest { Name = name });
    }


    public async Task<T> ImportModuleAsync<T>(string name) {
      var module = await ImportModuleAsync(name);
      var proxy = new IpcProxyObject(this, module);
      return (T)Activator.CreateInstance(typeof(T), proxy)!;
    }

    public Task<T> CallMethodAsync<T>(RemoteObjectMeta target, string methodName, RemoteMeta[] args) {
      return connection.InvokeAsync<T>(RemoteRequests.MethodCall, new MethodCallRequest { ObjectId = target.Id, Key = methodName, Args = args });
    }

    public T GetProperty<T>(RemoteObjectMeta target, string propertyName) where T : RemoteMeta {
      return this.GetPropertyAsync<T>(target, propertyName).GetAwaiter().GetResult();
    }

    public Task<T> GetPropertyAsync<T>(RemoteObjectMeta target, string propertyName) where T : RemoteMeta {
      return this.connection.InvokeAsync<T>(RemoteRequests.PropertyGet, new PropertyAccessRequest { ObjectId = target.Id, Key = propertyName });
    }
  }
}

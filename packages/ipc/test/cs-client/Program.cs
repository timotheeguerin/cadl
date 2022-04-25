using Nerdbank.Streams;
using Newtonsoft.Json;
using StreamJsonRpc;

class Program {
  static async Task<int> Main(string[] args) {
    await RespondToRpcRequestsAsync(FullDuplexStream.Splice(Console.OpenStandardInput(), Console.OpenStandardOutput()), 0);

    return 0;
  }

  private static async Task RespondToRpcRequestsAsync(Stream stream, int clientId) {
    await Console.Error.WriteLineAsync($"Connection request #{clientId} received. Spinning off an async Task to cater to requests.");
    var server = new Server();

    var jsonRpc = JsonRpc.Attach(stream, server);
    server.Connection = jsonRpc;
    await Console.Error.WriteLineAsync($"JSON-RPC listener attached to #{clientId}. Waiting for requests...");
    await jsonRpc.Completion;
    await Console.Error.WriteLineAsync($"Connection #{clientId} terminated.");
  }
}

internal class Server {
  public JsonRpc Connection { get; internal set; }

  public async Task onEmit(IpcObjectData program) {

    // Log to STDERR so as to not corrupt the STDOUT pipe that we may be using for JSON-RPC.
    Console.Error.WriteLine($"Received request: {String.Join(", ", program.Properties)}");
    var programProxy = new IpcProxyObject(this.Connection, program);
    var options = await programProxy.GetObjectAsync("compilerOptions");
    Console.Error.WriteLine($"Received options: {options.Id}, {String.Join(", ", options.Properties)}");
    var outputPath = await options.GetAsync<string>("outputPath");
    Console.Error.WriteLine($"OutputPath: {outputPath}");
    return;
  }
}


class IpcObjectData {
  public long Id { get; set; }

  public string Type { get; set; }

  public string[] Properties { get; set; }

}

class IpcProxyObject : IpcObjectData {
  private readonly JsonRpc connection;

  public IpcProxyObject(JsonRpc connection, IpcObjectData data) {
    this.connection = connection;
    this.Id = data.Id;
    this.Type = data.Type;
    this.Properties = data.Properties;
  }

  public Task<T> GetAsync<T>(string propertyName) {
    return connection.InvokeAsync<T>("CADL_OBJECT_PROP_ACCESS", new PropertyAccessRequest { ObjectId = this.Id, Key = propertyName });
  }

  public async Task<IpcProxyObject> GetObjectAsync(string propertyName) {
    var data = await this.GetAsync<IpcObjectData>(propertyName);
    return new IpcProxyObject(this.connection, data);
  }
}

class PropertyAccessRequest {
  [JsonProperty("objectId")]
  public long ObjectId { get; set; }

  [JsonProperty("key")]
  public string Key { get; set; }
}

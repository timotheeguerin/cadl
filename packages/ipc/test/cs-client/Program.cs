using Microsoft.Cadl.Remote;
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

  public async Task onEmit(RemoteObjectMeta program) {

    // Log to STDERR so as to not corrupt the STDOUT pipe that we may be using for JSON-RPC.
    var programProxy = new Microsoft.Cadl.Compiler.Program(new IpcProxyObject(this.Connection, program));
    var options = programProxy.CompilerOptions;
    var outputPath = options.OutputPath;
    Console.Error.WriteLine($"OutputPath: {outputPath}");

    var remote = new CadlRemote(this.Connection);
    var rest = await remote.ImportModuleAsync("@cadl-lang/rest");
    Console.Error.WriteLine("Rest library:");
    foreach (var member in rest.Members) {
      Console.Error.WriteLine($"  {member.Type}: ${member.Name}");
    }
    return;
  }
}

public class IpcProxyObject {
  private readonly JsonRpc connection;

  public RemoteObjectMeta Data { get; }

  public IpcProxyObject(JsonRpc connection, RemoteObjectMeta data) {
    this.connection = connection;
    this.Data = data;
  }

  public T Get<T>(string propertyName) where T : RemoteMeta {
    return this.GetAsync<T>(propertyName).GetAwaiter().GetResult();
  }

  public Task<T> GetAsync<T>(string propertyName) where T : RemoteMeta {
    return connection.InvokeAsync<T>(RemoteRequests.PropertyGet, new PropertyAccessRequest { ObjectId = this.Data.Id, Key = propertyName });
  }


  public T GetValue<T>(string propertyName) {
    return this.GetValueAsync<T>(propertyName).GetAwaiter().GetResult();
  }

  public async Task<T> GetValueAsync<T>(string propertyName) {
    var data = await this.GetAsync<RemoteValueMeta<T>>(propertyName);
    return data.Value;
  }

  public IpcProxyObject GetObject(string propertyName) {
    return GetObjectAsync(propertyName).GetAwaiter().GetResult();
  }

  public async Task<IpcProxyObject> GetObjectAsync(string propertyName) {
    var data = await this.GetAsync<RemoteObjectMeta>(propertyName);
    return new IpcProxyObject(this.connection, data);
  }
}
